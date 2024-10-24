"use client";

import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail, LucideMail, Instagram, Youtube } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";


const formSchema = z.object({
    name: z.string()
        .min(4, { message: "This field has to be filled." }),
    phonenumber: z.string()
        .min(10, { message: "This field has to be filled." }),
    message: z.string().min(15, {
        message: "Message must be at least 15 characters.",
    })
});


export default function Contact() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phonenumber: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        toast({ description: "You message has been sent successfully" })
    }
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
                <section className="p-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                        <p className="text-lg mb-6">
                            We’d love to hear from you! Please fill out the form below or reach out to us through our social media channels.
                        </p>
                    </div>
                </section>

                <section className="bg-white py-12 px-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] mx-auto flex flex-col gap-4">


                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-semibold">Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="abc" {...field} />
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
                                        <FormLabel className="font-semibold">PhoneNumber</FormLabel>
                                        <FormControl>
                                            <Input placeholder="980000000" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="message">Your message</Label>
                                <Textarea placeholder="Type your message here." id="message" name="message" />
                            </div>


                            <Button className="w-[200px] md:w-[300px] mx-auto bg-darkNavy hover:bg-darkNavy" type="submit">Submit</Button>


                        </form>
                    </Form>
                </section>

                <section className="py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
                        <div className="flex justify-center space-x-6 mb-8">
                            <Link href="https://www.facebook.com/utkristashikshya" target="_blank" className="hover:underline" aria-label="Facebook">
                                <Facebook className="w-8 h-8 text-blue" />
                            </Link>
                            <Link href="mailto:utkristashikshya@gmail.com" className="hover:underline" aria-label="Mail">
                                <LucideMail className="w-8 h-8 text-blue" />
                            </Link>
                            <Link href="https://www.instagram.com/utkrista_shikshya/" className="hover:underline" aria-label="Instagram">
                                <Instagram className="w-8 h-8 text-pink-600" />
                            </Link>
                            <Link href="https://www.youtube.com/@utkristashikshya" className="hover:underline" aria-label="Youtube">
                                <Youtube className="w-8 h-8 text-red-600" />
                            </Link>
                        </div>
                        <div className="flex justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 items-center flex-col md:flex-row">
                            <div className="flex items-center space-x-2 text-gray-700">
                                <MapPin className="w-6 h-6 text-blue-500" />
                                <p className="font-medium">MM5G+4XQ, Damak 57217</p>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-700">
                                <Phone className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="font-medium">970-2642012</p>
                                    <p className="font-medium">976-7781922</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-700">
                                <Mail className="w-6 h-6 text-red-500" />
                                <p className="font-medium">utkristashikshya@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex justify-center">

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.707805078271!2d87.67489747446353!3d26.6578363709991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58f0076fd5507%3A0xe74a9298e30d41ce!2zVXRrcmlzdGEgU2hpa3NoeWEtIOCkieCkpOCljeCkleClg-Ckt-CljeCknyDgpLbgpL_gpJXgpY3gpLfgpL4!5e0!3m2!1sen!2snp!4v1727932793592!5m2!1sen!2snp" width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="w-full rounded-lg"></iframe>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
