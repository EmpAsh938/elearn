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
    const [isSubmitting, setIsSubmitting] = useState(false); // Track whether form is being submitted

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phonenumber: "",
            otp: "",
            email: "a@a.com",
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
        const { firstName, lastName, phonenumber, password } = values;
        setIsSubmitting(true); // Disable the button

        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: `${firstName} ${lastName}`, phonenumber, otp: validOtp, email: phonenumber, password }),
            });

            const response = await request.json();
            if (!response.id) throw Error(response.error);
            // if (!response.ok) throw Error(response.error);
            toast({ description: "Registration Successful. Redirecting..." });
            form.reset();
            window.location.href = "/login";
        } catch (error: any) {
            toast({ variant: "destructive", title: "Registration Failed", description: error.message });
        } finally {
            setIsSubmitting(false); // Re-enable the button in case of error
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
                if (!result.otp) throw Error(result.error);
                toast({ description: "OTP Sent Successfully" });
                setValidOtp(result.otp); // Store OTP from the server
                setIsOtpSent(true); // Mark OTP as sent
                setStep(2); // Move to OTP step
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Sending OTP Failed",
                });
                setIsSendingOtp(false); // Reset OTP sending state on failure
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                <div className="w-full mb-4">
                    <h1 className=" text-2xl font-semibold">Register</h1>
                    <p className="text-sm text-gray-500">Please fill the details with correct credentials and complete all the steps to create a new account</p>
                </div>

                {step === 1 && (
                    <>
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
                                    <FormItem className="w-full mt-4">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="9800019201" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={isOtpSent || isSendingOtp} // Disable during OTP sending
                            className="bg-darkNavy hover:bg-darkNavy"
                        >
                            Register
                        </Button>
                    </>
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
                        {/* <FormField
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
                        /> */}

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

                {step > 1 ? (
                    <Button
                        onClick={handleNextStep}
                        disabled={isSubmitting} // Disable the button during form submission
                    >
                        {isSubmitting ? "Submitting..." : (step === 2 ? "Verify OTP" : step === 3 ? "Register" : "Next")}
                    </Button>
                ) : <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <p>Already have an account</p>
                    <Link className="text-gray-900 font-semibold hover:underline" href="/login">Login</Link>
                </div>}
            </form>
        </Form>
    );
}
