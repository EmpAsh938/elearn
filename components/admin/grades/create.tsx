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
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { TCourses } from "@/app/lib/types"

// Define the course types
const predefinedType = ["Upcoming", "Pre-booking", "Ongoing"];

// Update the form schema
const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(30, "Name cannot exceed 30 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
    price: z
        .string()
        .regex(/^(1|[1-9][0-9]{0,4})$/, "Price must be between 1-99999")
        .optional(), // Price is optional and only required for certain types
    tag: z.string().min(1, "Tag is required"),
    type: z.string().min(1, "Type is required"),
});

export function CreateDialog({ grades, loading }: { grades: TCourses[], loading: boolean }) {
    const { toast } = useToast();
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form with zod schema validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "1",
            tag: "",
            type: predefinedType[0],
        },
    });

    const { watch } = form;

    // Use watch to observe the type field
    const selectedType = watch("type");

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, description, price, tag, type } = values;

        setIsSaving(true);

        try {
            // Include price only if "type" is "Ongoing" or "Pre-booking"
            const payload = {
                description,
                title: name,
                price: (selectedType === "Ongoing" || selectedType === "Pre-booking") ? price : undefined,
                tag,
                type,
            };

            const request = await fetch('/api/faculty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const response = await request.json();
            console.log(response); // Add logging to inspect response

            if (response.status !== 201) throw new Error(response.error || "Unexpected error");

            toast({ description: "Course Created Successfully" });
            form.reset(); // Reset form after successful submission
        } catch (error: any) {
            console.error(error); // Log full error details
            toast({
                variant: "destructive",
                title: "Creating Course Failed",
                description: error.message || "Something went wrong",
            });
        } finally {
            setIsSaving(false);
        }
    }

    // Function to handle adding new tags
    function handleAddTag() {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag("");
        }
    }

    // Fetch unique tags on component mount
    useEffect(() => {
        const uniqueTags = [...new Set(grades.map(grade => grade.mainCategory))];
        setTags(uniqueTags);
    }, [grades]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-blue">Create Package</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Package</SheetTitle>
                    <SheetDescription>
                        Fill all the input fields and click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 py-4">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="HTML Course" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description Field */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Package Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Type Field */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl className="ml-2 text-sm">
                                        <select {...field}>
                                            {predefinedType.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Conditionally render Price Field */}
                        {(selectedType === "Ongoing" || selectedType === "Pre-booking") && (
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (1-99999)</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="1500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Tag Field */}
                        <FormField
                            control={form.control}
                            name="tag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <FormControl className="ml-2 text-sm">
                                        <select {...field}>
                                            {tags.map((tag) => (
                                                <option key={tag} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                    {/* Option to create a new tag */}
                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            placeholder="Create new tag"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                        />
                                        <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <SheetFooter>
                            <Button disabled={isSaving} type="submit">{isSaving ? 'Saving...' : 'Save changes'}</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
