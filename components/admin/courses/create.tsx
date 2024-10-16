"use client";

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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic"; // Dynamic import for @uiw/react-md-editor

// Dynamically import the MDEditor to work with Next.js SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// Define the schema for form validation
const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title cannot exceed 50 characters"),
    videoLink: z.string().url("Please enter a valid URL").optional(),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

export function CreateDialog({ categoryId }: { categoryId: string }) {

    // Form hook for handling form submission and validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            videoLink: "",
            content: "",
        },
    });

    // Submit handler for the form
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, content, videoLink } = values;

        // Ensure localStorage is only accessed in the browser
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        try {
            if (Object.entries(user).length === 0) throw Error("User ID not found");
            const request = await fetch("/api/subject", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    userId: user.id,
                    categoryId,
                    videoLink,
                    content,
                }),
            });
            const response = await request.json();
            if (response.status !== 201) throw Error(response.error);
            toast({ description: "Post Created Successfully" });
            form.reset();
            window.location.href = "/admin/posts?categoryId=" + categoryId;
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Creating Post Failed",
                description: error.toString(),
            });
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-blue">Create Subject</Button>
            </SheetTrigger>

            <SheetContent className="overflow-y-auto max-h-[100vh]">
                <SheetHeader>
                    <SheetTitle>Create Subject</SheetTitle>
                    <SheetDescription>
                        Fill all the input fields and click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Syllabus Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mathematics" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Video Link Field */}
                        <FormField
                            control={form.control}
                            name="videoLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/video" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Markdown Editor for Syllabus Content */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content (Markdown)</FormLabel>
                                    <FormControl>
                                        <MDEditor
                                            value={field.value}
                                            onChange={(value) => field.onChange(value || '')}
                                            height={300}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
