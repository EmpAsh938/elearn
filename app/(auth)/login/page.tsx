"use client"

import { useState } from "react";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z.string().min(10, { message: "This field has to be filled." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

export default function Login() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        setIsSubmitting(true); // Disable the button while submitting

        try {
            const request = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password })
            });
            const response = await request.json();

            if (response.status !== 200) throw new Error(response.error);

            form.reset();
            localStorage.setItem("user", JSON.stringify(response.user));

            if (response.user.roles[0].id == 501) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/dashboard';
            }

            toast({ description: "Login Successful" });

        } catch (error: any) {
            toast({ variant: "destructive", title: "Login Failed", description: error.toString() });
            console.log(error);
        } finally {
            setIsSubmitting(false); // Re-enable the button after submission
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                <div className="w-full mb-4">
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm text-gray-500">Please fill the details with correct credentials</p>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="9800000000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end">
                    <Link className="font-semibold text-xs hover:underline" href="/forgot">Forgot Password</Link>
                </div>

                {/* Login Button */}
                <Button className="w-[300px] mx-auto" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <p>Don&apos;t have an account?</p>
                    <Link className="text-gray-900 font-semibold hover:underline" href="/signup">Register</Link>
                </div>
            </form>
        </Form>
    )
}
