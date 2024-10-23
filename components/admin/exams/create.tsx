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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useGlobalContext } from "@/hooks/use-globalContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming you're using a Select component
import { TCourses } from "@/app/lib/types";
import { Spinner } from "@/components/ui/spinner";

export function CreateExamDialog() {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [grades, setGrades] = useState<TCourses[]>([]); // grades or categories
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // state for selected category
    const [image, setImage] = useState<File | null>(null); // state for image file
    const [loading, setLoading] = useState(false); // loading state for exam creation
    const [imageUploading, setImageUploading] = useState(false); // loading state for image upload

    const { user } = useGlobalContext();

    const handleCreate = async () => {
        if (!title || !deadline || !selectedCategoryId || !image) {
            toast({ variant: 'destructive', description: "Title, Deadline, Category, and Image are required" });
            return;
        }

        setLoading(true); // Start loading
        let examId = '';

        const categoryId = grades.find(item => item.categoryTitle === selectedCategoryId)?.categoryId;

        try {
            const req = await fetch('/api/exam', {
                method: 'POST',
                body: JSON.stringify({ title, deadline, userId: user.id, categoryId }),
            });

            const res = await req.json();
            if (res.status !== 201) throw Error(res.error);
            examId = res.body.examId;
            toast({ description: 'Exam created successfully!' });

        } catch (error: any) {
            toast({ variant: 'destructive', description: error.toString() });
            setLoading(false); // Stop loading if error
            return;
        }

        // Upload image after exam creation
        if (examId && image) {
            setImageUploading(true); // Start image upload loading
            const formData = new FormData();
            formData.append("file", image); // Append the file to FormData
            formData.append("examId", examId); // Append the exam ID to FormData

            try {
                const imageResponse = await fetch('/api/upload/exam', {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await imageResponse.json();

                if (imageResponse.status !== 200) {
                    throw new Error(imageData.error || "Error uploading image");
                }
                toast({ description: 'Image uploaded successfully!' });

            } catch (error: any) {
                toast({ variant: 'destructive', description: "Failed to upload image: " + error.toString() });
            } finally {
                setImageUploading(false); // Stop image upload loading
            }
        }

        setLoading(false); // Stop loading after both exam creation and image upload
        setTitle("");
        setDeadline("");
        setSelectedCategoryId(null);
        setImage(null); // clear image after creating

        window.location.href = "/admin/exams";
    };

    // Fetch grades (categories) for the grade dropdown
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const request = await fetch("/api/faculty/");
                const response = await request.json();
                if (response.status !== 200) throw Error(response.error);
                setGrades(response.body); // Assuming response.body contains grades
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchGrades();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue">Create Exam</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Exam Details</DialogTitle>
                    <DialogDescription>
                        Enter the details of the exam below. Click create when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Exam Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {/* Grade Dropdown */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="grade" className="text-right">
                            Select Grade
                        </Label>
                        <div className="col-span-3">
                            <Select
                                onValueChange={(value) => setSelectedCategoryId(value)}
                                value={selectedCategoryId || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.length > 0 &&
                                        grades.map((grade) => (
                                            <SelectItem
                                                key={grade.categoryId}
                                                value={grade.categoryTitle}
                                            >
                                                {grade.categoryTitle}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Deadline Input */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline
                        </Label>
                        <Input
                            id="deadline"
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {/* Image Upload */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Upload Question Paper
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/jpeg, image/jpg, application/pdf"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setImage(file);
                            }}
                            className="col-span-3"
                        />
                    </div>
                    {/* Display loading state */}
                    {loading && (
                        <div className="col-span-4 text-center">
                            <Spinner /> Creating exam...
                        </div>
                    )}
                    {imageUploading && (
                        <div className="col-span-4 text-center">
                            <Spinner /> Uploading image...
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleCreate}
                        disabled={loading || imageUploading}
                    >
                        {loading || imageUploading ? "Processing..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
