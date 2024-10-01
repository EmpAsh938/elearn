import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // Correct `useForm` import
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define the schema for form validation
const formSchema = z.object({
    title: z.string().min(3, "Title is required").max(50, "Title cannot exceed 50 characters"),
    grade: z.string().min(1, "Please select a grade"),
    streamLink: z.string().url("Please enter a valid URL"),
    startTime: z.string().min(1, "Please enter a valid start time"),
});

export function CreateDialog() {
    const [grades, setGrades] = useState<IGrade[]>([]);

    // Use form hook with Zod validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            grade: "",
            streamLink: "",
            startTime: "",
        },
    });

    // Submit handler for the form
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, streamLink, startTime } = values;
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const categoryId = form.getValues("grade");
        try {
            if (Object.entries(user).length === 0) throw Error("User ID not found");
            const request = await fetch("/api/live", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    categoryId,
                    title,
                    streamLink,
                    startTime,
                }),
            });
            const response = await request.json();
            if (response.status !== 201) throw Error(response.error);
            form.reset();
            toast({ description: "Live Class Created Successfully" });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Creating Live Class Failed",
                description: error.toString(),
            });
        }
    }

    // Fetch grades (categories) for the grade dropdown
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const request = await fetch("/api/faculty/");
                const response = await request.json();
                if (response.status !== 200) throw Error(response.error);
                setGrades(response.body); // Assuming response has a `data` property containing grades
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchGrades();
    }, []);
    console.log(grades)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue">Create Live Class</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Live Class</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new live class.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Live Class Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live Class Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mathematics" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Stream Link Field */}
                        <FormField
                            control={form.control}
                            name="streamLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stream Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="http://stream.com/abc/live"
                                            {...field}
                                        />
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
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {grades.length > 0 &&
                                                    grades.map((item) => (
                                                        <SelectItem
                                                            key={item.categoryId}
                                                            value={item.categoryId}
                                                        >
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

                        {/* Start Time Field */}
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

interface LiveClass {
    id: string;
    title: string;
    streamLink: string;
    startTime: string; // Keeping startTime as a string for datetime-local input
}

interface IGrade {
    categoryId: string;
    categoryTitle: string;
    categoryDescription: string;
}
