"use client";

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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"  // SimpleMDE's CSS
import { useEffect, useRef, useState } from "react"

// Define the schema for form validation
const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title cannot exceed 50 characters"),
    grade: z.string().min(1, "Please select a grade"),
    videoLink: z.string().url("Please enter a valid URL"),
    content: z.string().min(10, "Content must be at least 10 characters"), // No max limit since it's markdown
})

interface IGrade {
    categoryId: string;
    categoryTitle: string;
    categoryDescription: string;
}

export function CreateDialog() {
    const [grades, setGrades] = useState<IGrade[]>([]);
    const simpleMdeRef = useRef<any>(null); // Use ref to track SimpleMDE instance

    // Form hook for handling form submission and validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            grade: "",
            videoLink: "",
            content: "",
        },
    })

    // Submit handler for the form
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, grade, videoLink, content } = values;
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        try {
            if (Object.entries(user).length === 0) throw Error("User ID not found");
            const request = await fetch('/api/subject', {
                method: 'POST',
                body: JSON.stringify({ title, userId: user.id, categoryId: grade, videoLink, content }),
            })
            const response = await request.json();
            if (response.status !== 201) throw Error(response.error);
            toast({ description: "Course Created Successfully" });
            form.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Creating Course Failed", description: error.toString() });
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

    // UseEffect to update editor instance when content changes
    useEffect(() => {
        if (simpleMdeRef.current) {
            simpleMdeRef.current.value(form.watch("content")); // Update editor value if content changes
        }
    }, [form]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-blue">Create Course</Button>
            </SheetTrigger>

            <SheetContent className="overflow-y-auto max-h-[100vh]"> {/* Enable scrolling */}
                <SheetHeader>
                    <SheetTitle>Create Course</SheetTitle>
                    <SheetDescription>
                        Fill all the input fields and click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">

                        {/* Course Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mathematics" {...field} />
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {grades.length > 0 && grades.map((item) => (
                                                    <SelectItem key={item.categoryId} value={item.categoryId}>
                                                        {item.categoryTitle}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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

                        {/* Description Field with Markdown Editor */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content (Markdown)</FormLabel>
                                    <FormControl>
                                        <SimpleMDE
                                            value={field.value}
                                            onChange={field.onChange}
                                            getMdeInstance={(instance) => {
                                                simpleMdeRef.current = instance; // Store the instance in ref
                                            }}
                                            options={{
                                                placeholder: "Write your course contents here in markdown...",
                                                spellChecker: false,
                                            }}
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
    )
}
