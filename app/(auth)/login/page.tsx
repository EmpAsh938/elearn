"use client"

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
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email"),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    })
});

export default function Login() {
    const { toast } = useToast();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        try {
            const request = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password })
            })
            const response = await request.json();
            // console.log(response)
            if (response.status !== 200) throw Error(response.error);
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
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* <div className="w-full">
                    <Link href={"/"}>
                        <Image
                            src="/images/big-logo.avif"
                            alt="Detailed Logo"
                            height={300}
                            width={300}
                            className="w-40 object-cover"
                        />
                    </Link>
                </div> */}
                <div className="w-full mb-4">
                    <h1 className=" text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm text-gray-500">Please fill the details with correct credentials</p>
                </div>


                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="abc@example.com" {...field} />
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
                <Button className="w-[300px] mx-auto" type="submit">Login</Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <p>Don&apos;t have an account</p>
                    <Link className="text-gray-900 font-semibold hover:underline" href="/signup">Register</Link>
                </div>
            </form>
        </Form>
    )
}
