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
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define form schema
const formSchema = z.object({
    fullname: z.string().min(4, { message: "Fullname must be at least 4 characters." }),
    email: z.string().email({ message: "This is not a valid email." }),
    phonenumber: z.string().length(10, { message: "Phone number must be exactly 10 digits." }), // Handle as string for leading zeroes
    otp: z.string().length(4, { message: "OTP must be a 4-digit number." }),
    school: z.string().min(10, { message: "School name must be at least 10 characters long." }),
    grade: z.string().min(1, { message: "Grade must be choosen from dropdown." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
});

interface IGrade {
    categoryId: string;
    categoryTitle: string;
    categoryDescription: string;
}

export default function Signup() {

    const { toast } = useToast();

    const [grades, setGrades] = useState<IGrade[]>([]);

    // Define form handling using react-hook-form and zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phonenumber: "",
            otp: "",
            school: "",
            grade: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { fullname, email, phonenumber, otp, grade, school, password } = values;
        // const faculty = grades.filter(item => item.categoryTitle == grade)[0].categoryId;
        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fullname, email, phonenumber, otp, faculty: grade, collegename: school, password }),
            });

            const response = await request.json();
            if (response.status !== 201) throw new Error(response.error);
            toast({ description: "Registration Successful" });

            // Handle successful registration (e.g., set cookie, redirect)
        } catch (error: any) {
            toast({ variant: "destructive", title: "Registration Failed", description: error.message });
            console.error(error);
        }
    }

    // OTP sending function
    async function handleSendOTP() {
        const phonenumber = form.getValues("phonenumber");

        const o_attempt = localStorage.getItem("o_attempt");
        if (o_attempt) {
            return toast({ variant: "destructive", title: "OTP Operation", description: "OTP cannot be sent multiple times" });
        }

        localStorage.setItem("o_attempt", "true");

        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/get-phone-number`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNo: phonenumber }),
            });
            const response = await request.json();
            if (response.status !== 200) throw new Error(response.error);
            form.reset();
            toast({ description: "OTP Sent Successfully" });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Sending OTP Failed", description: error.message });
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const request = await fetch('/api/faculty/');
                const response = await request.json();
                if (response.status !== 200) throw Error(response.error);
                setGrades(response.body); // Assuming response has a `data` property containing grades
            } catch (error: any) {
                console.log(error);
            }
        }

        fetchGrades();
    }, []);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="w-full">
                    <Link href="/">
                        <Image
                            src="/images/big-logo.avif"
                            alt="Detailed Logo"
                            height={300}
                            width={300}
                            className="w-40 object-cover"
                        />
                    </Link>
                </div>

                <div className="w-full mb-4">
                    <h1 className="text-2xl font-semibold">Create your account</h1>
                    <p className="text-sm text-gray-500">
                        Empower your learning journey with interactive live classes, seamless video streaming, dynamic chats, and easy exam management
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">Fullname</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                                    <Input type="email" placeholder="abc@example.com" {...field} />
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
                                <FormLabel className="font-semibold text-stone-800">Phone Number</FormLabel>
                                <FormControl>
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input placeholder="9800019201" {...field} />
                                        <Button onClick={handleSendOTP} type="button" className="bg-blue hover:bg-blue">Send OTP</Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-semibold text-stone-800">OTP</FormLabel>
                            <FormControl>
                                <Input placeholder="1234" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center w-full gap-4">
                    <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="font-semibold text-stone-800">School</FormLabel>
                                <FormControl>
                                    <Input placeholder="ABC English School" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Grade Dropdown */}
                    <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Grade</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)} // Ensure form state is updated
                                        value={field.value || undefined} // Ensure the value is controlled and undefined if not selected
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grades.length > 0 ? (
                                                grades.map((item) => (
                                                    <SelectItem key={item.categoryTitle} value={item.categoryTitle}>
                                                        {item.categoryTitle}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="0" disabled>
                                                    Loading grades...
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>

                <div className="flex items-center w-full gap-4">
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-semibold text-stone-800">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className="w-[300px] mx-auto" type="submit">Register</Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <p>Already have an account?</p>
                    <Link className="text-gray-900 font-semibold hover:underline" href="/login">Login</Link>
                </div>
            </form>
        </Form>
    );
}
