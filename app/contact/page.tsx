"use client";

import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
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

                <section className="bg-white py-12">
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


                            <Button className="w-[300px] mx-auto bg-darkNavy hover:bg-darkNavy" type="submit">Submit</Button>


                        </form>
                    </Form>
                </section>

                <section className="py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
                        <div className="flex justify-center space-x-6 mb-8">
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                        <div className="flex justify-center space-x-6 mb-8 items-center flex-col md:flex-row">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-6 h-6 text-gray-500" />
                                <p>123 Main Street, Anytown, USA</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-6 h-6 text-gray-500" />
                                <p>+1 (123) 456-7890</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-6 h-6 text-gray-500" />
                                <p>contact@example.com</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093774!2d144.95373531584445!3d-37.81720974202125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774feda95a9e0!2sEureka%20Skydeck!5e0!3m2!1sen!2sus!4v1600653496294!5m2!1sen!2sus"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="w-full rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
