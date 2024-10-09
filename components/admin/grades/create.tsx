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

// Define some pre-existing tags for the dropdown
const predefinedType = ["Pre-booking", "upcoming"];

// Update the form schema to include price and tag validation
const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(30, "Name cannot exceed 30 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(200, "Description cannot exceed 200 characters"),
    price: z.string().regex(/^(1|[1-2][0-9]{3}|99999)$/, "Price must be between 1-99999"), // Price as a string in the range 1500-3500
    tag: z.string().min(1, "Tag is required"), // Tag validation
    type: z.string().min(1, "Type is required"), // Tag validation
})

export function CreateDialog({ grades, loading }: { grades: TCourses[], loading: boolean }) {

    const { toast } = useToast();
    const [tags, setTags] = useState<string[]>([]); // Manage tags list
    const [newTag, setNewTag] = useState(""); // To store new tag input

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            tag: "",
            type: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, description, price, tag, type } = values;

        try {


            const request = await fetch('/api/faculty', {
                method: 'POST',
                body: JSON.stringify({ description, title: name, price, tag, type })
            })
            const response = await request.json();
            if (response.status !== 201) throw Error(response.error);
            toast({ description: "Course Created Successfully" });
            form.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Creating Course Failed", description: error.toString() });
            console.error(error);
        }
    }

    // Function to add a new tag to the dropdown
    function handleAddTag() {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag(""); // Reset new tag input
        }
    }

    useEffect(() => {
        // Get unique mainCategory values from the grades array
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
                        {/* Description Field (Textarea) */}
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
                        {/* Price Field */}
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
                        {/* Tag Field (Dropdown) */}
                        <FormField
                            control={form.control}
                            name="tag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <FormControl>
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

                        {/* Type Field (Dropdown) */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
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

                        {/* Submit Button inside the form */}
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
