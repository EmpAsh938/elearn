"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/hooks/use-toast";

// Step 1: Define form schemas for both steps (phone and OTP/password)
const phoneSchema = z.object({
    phonenumber: z
        .string()
        .min(10, { message: "Enter a valid phone number." }),
});

const otpSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits." }),
    newPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Forgot() {
    const [otpSent, setOtpSent] = useState(false); // To track if OTP is sent
    const [phoneNumber, setPhoneNumber] = useState(""); // To store phone number separately

    // Phone number form
    const phoneForm = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phonenumber: "",
        },
    });

    // OTP and new password form
    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
            newPassword: "",
        },
    });

    // Clear OTP form when OTP is sent
    useEffect(() => {
        if (otpSent) {
            otpForm.reset({
                otp: "",
                newPassword: "",
            });
        }
    }, [otpSent, otpForm]);

    // Handle sending OTP (trigger API for sending OTP)
    const sendOtp = async (values: z.infer<typeof phoneSchema>) => {
        const { phonenumber } = values;
        try {
            const req = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/forgetpw`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phnum: phonenumber }),
                }
            );
            const result = await req.json();

            if (!result.otp) throw Error(result.error);

            // Check response before updating the state
            toast({ description: "OTP Sent" });
            setPhoneNumber(phonenumber); // Store phone number in separate state
            setOtpSent(true); // Update the state to move to OTP step
        } catch (error: any) {
            toast({ variant: "destructive", description: error.message });
        }
    };

    // Handle OTP submission and password reset
    const resetPassword = async (values: z.infer<typeof otpSchema>) => {
        const { otp, newPassword } = values;

        try {
            const resp = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/update-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phnum: phoneNumber, otp, newPassword }),
                }
            );
            await resp.text();

            phoneForm.reset();
            otpForm.reset();
            setOtpSent(false); // Go back to the initial state after password reset
            toast({ description: "Password Reset Completed Successfully" });
        } catch (error: any) {
            toast({ variant: "destructive", description: error.message });
        }
    };

    return (
        <div className="flex flex-col gap-4 mx-auto">
            {/* <div className="w-full">
                <Image
                    src="/images/big-logo.avif"
                    alt="Detailed Logo"
                    height={300}
                    width={300}
                    className="w-40 object-cover"
                />
            </div> */}


            {!otpSent && <Form {...phoneForm}>
                <form
                    onSubmit={phoneForm.handleSubmit(sendOtp)}
                    className="flex flex-col gap-4"
                >
                    <div className="w-full mb-4">
                        <h1 className="text-2xl font-semibold">Forgot your password</h1>
                        <p className="text-sm text-gray-500">
                            Enter your phone number to receive an OTP.
                        </p>
                    </div>

                    <FormField
                        control={phoneForm.control}
                        name="phonenumber"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-semibold text-stone-800">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="9800000000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-[250px] md:w-[300px] mx-auto" type="submit">
                        Send OTP
                    </Button>
                </form>
            </Form>}
            {otpSent &&
                <Form {...otpForm}>
                    <form
                        onSubmit={otpForm.handleSubmit(resetPassword)}
                        className="flex flex-col gap-4"
                    >
                        <div className="w-full mb-4">
                            <h1 className="text-2xl font-semibold">Reset your password</h1>
                            <p className="text-sm text-gray-500">
                                Enter the OTP you received and set a new password.
                            </p>
                        </div>

                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-semibold text-stone-800">OTP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter OTP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={otpForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-semibold text-stone-800">New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="New password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-[250px] md:w-[300px] mx-auto" type="submit">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            }

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                <p>Already have an account?</p>
                <Link className="text-gray-900 font-semibold hover:underline" href="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}
