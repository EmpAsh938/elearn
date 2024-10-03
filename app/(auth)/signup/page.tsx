"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

// Define form schema for validation
const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    phonenumber: z.string().length(10, { message: "Phone number must be exactly 10 digits." }),
    otp: z.string().length(6, { message: "OTP must be exactly 6 digits." }),
    email: z.string().email({ message: "This is not a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
});

export default function Signup() {
    const { toast } = useToast();

    const [step, setStep] = useState(1); // Track current step
    const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP status
    const [validOtp, setValidOtp] = useState(''); // Store valid OTP from the server
    const [isSendingOtp, setIsSendingOtp] = useState(false); // Track whether OTP is being sent

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phonenumber: "",
            otp: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Handle form submission based on step
    const handleNextStep = () => {
        if (step === 2) {
            // Validate OTP input and check with the server's OTP
            const userOtp = form.getValues("otp");
            if (userOtp === validOtp) {
                setStep(3);
            } else {
                toast({
                    variant: "destructive",
                    title: "OTP Error",
                    description: "Invalid OTP. Please try again.",
                });
            }
        } else if (step === 3) {
            // Final form submission
            form.handleSubmit(onSubmit)();
        }
    };

    // Submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { firstName, lastName, phonenumber, email, password } = values;

        console.log('1')
        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: `${firstName} ${lastName}`, phonenumber, otp: validOtp, email, password }),
            });

            const response = await request.json();
            // if (!response.ok) throw Error(response.error);
            toast({ description: "Registration Successful" });
            form.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Registration Failed", description: error.message });
        }
    }

    // Handle OTP sending
    async function handleSendOTP() {
        const phonenumber = form.getValues("phonenumber");

        form.trigger(["firstName", "lastName", "phonenumber"]).then(async (isValid) => {
            if (!isValid) return; // Don't proceed if validation fails

            setIsSendingOtp(true); // Set sending state to prevent multiple requests
            try {
                const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/get-phone-number`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobileNo: phonenumber }),
                });
                const result = await request.json();

                toast({ description: "OTP Sent Successfully" });
                setValidOtp(result.otp); // Store OTP from the server
                setIsOtpSent(true); // Mark OTP as sent
                setStep(2); // Move to OTP step
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Sending OTP Failed",
                    description: error.message,
                });
                setIsSendingOtp(false); // Reset OTP sending state on failure
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
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

                {step === 1 && (
                    <div>
                        <div className="flex items-center w-full gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phonenumber"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <Input placeholder="9800019201" {...field} />
                                            <Button
                                                type="button"
                                                onClick={handleSendOTP}
                                                disabled={isOtpSent || isSendingOtp} // Disable during OTP sending
                                                className="bg-blue hover:bg-blue"
                                            >
                                                {isOtpSent ? "OTP Sent" : isSendingOtp ? "Sending..." : "Send OTP"}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="abc@example.com" {...field} />
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
                                    <FormLabel>Password</FormLabel>
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
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {step > 1 && (
                    <Button onClick={handleNextStep}>
                        {step === 2 ? "Verify OTP" : step === 3 ? "Register" : "Next"}
                    </Button>
                )}
            </form>
        </Form>
    );
}
