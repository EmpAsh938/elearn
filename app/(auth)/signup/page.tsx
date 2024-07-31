"use client"

import Image from "next/image"
import Link from "next/link"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
    fullname: z.string().min(4, {
        message: "Fullname must be at least 4 characters.",
    }),
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email"),
    phonenumber: z.number().min(10, {
        message: "Phonenumber must be length of 10.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
}).refine((values) => {
    return values.password === values.confirmPassword;
},
    {
        message: "Password must match!",
        path: ["confirmPassword"],
    }
);

export default function Signup() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phonenumber: 9800019290,
            password: "",
            confirmPassword: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="w-full">
                    <Image
                        src="/images/big-logo.avif"
                        alt="Detailed Logo"
                        height={300}
                        width={300}
                        className="w-40 object-cover"
                    />
                </div>
                <div className="w-full mb-4">
                    <h1 className=" text-2xl font-semibold">Create your account</h1>
                    <p className="text-sm text-gray-500">Empower your learning journey with interactive live classes, seamless video streaming, dynamic chats, and easy exam management</p>
                </div>
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">Fullname</FormLabel>
                            <FormControl>
                                <Input placeholder="abc" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center w-full gap-4">

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
                        name="phonenumber"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-semibold text-stone-800">Phonenumber</FormLabel>
                                <FormControl>
                                    <Input placeholder="9800019201" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col items-start w-full gap-3">
                    <FormLabel className="font-semibold text-stone-800">School/Faculty</FormLabel>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose school" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center w-full gap-4">

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-semibold text-stone-800">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-semibold text-stone-800">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-[300px] mx-auto" type="submit">Register</Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <p>Already have an account</p>
                    <Link className="text-gray-900 font-semibold hover:underline" href="/login">Login</Link>
                </div>
            </form>
        </Form>
    )
}
