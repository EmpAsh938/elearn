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
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(30, "Name cannot exceed 30 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(100, "Description cannot exceed 100 characters"),
})

export function CreateDialog() {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, description } = values;
        try {
            const request = await fetch('/api/faculty', {
                method: 'POST',
                body: JSON.stringify({ description, title: name })
            })
            const response = await request.json();
            if (response.status !== 201) throw Error(response.error);
            toast({ description: "Grade Created Successfully" });
            form.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Creating grade Failed", description: error.toString() });
            console.error(error);
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-blue">Create Faculty/Grade</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Faculty/Grade</SheetTitle>
                    <SheetDescription>
                        Fill all the input fields and click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                {/* Ensure that the button is within the form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Class 11 Science" {...field} />
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
                                        <Input placeholder="Grade Description" {...field} />
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
