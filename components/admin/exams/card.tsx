import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { TExam } from "@/app/lib/types";
import Image from "next/image";
import { PDFViewer } from "@/components/pdfviewer";

import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ExamCardProps {
    exam: TExam;
}

export function ExamCard({ exam }: ExamCardProps) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
    const [title, setTitle] = useState(exam.title);
    const [deadline, setDeadline] = useState(() => {
        const date = new Date(exam.deadline);
        return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
    });
    const [file, setFile] = useState<File | null>(null);

    // Function to handle editing an exam
    const handleEdit = async () => {
        if (!title || !deadline) {
            toast({ variant: 'destructive', description: 'Title and deadline are required.' });
            return;
        }


        // Step 1: Upload the image if a file is selected
        if (file) {
            const formData = new FormData();
            formData.append("file", file); // Append the file to FormData
            formData.append("examId", exam.examId); // Include exam ID if needed

            try {
                const imageResponse = await fetch('/api/upload/exam', {
                    method: 'POST',
                    body: formData,
                });
                const imageData = await imageResponse.json();

                if (imageResponse.status !== 200) {
                    throw new Error(imageData.error || "Error uploading image");
                }
                toast({ title: "File Upload", description: "File uploaded. Saving..." })
                setEditDialogOpen(false);

            } catch (error: any) {
                toast({ variant: "destructive", title: "File Upload Failed", description: error.toString() });
                return; // Exit if image upload fails
            }
        }

        // Step 2: Update the exam details
        // try {
        //     const request = await fetch(`/api/exam`, {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ title, deadline, examId: exam.examId })
        //     });
        //     const response = await request.json();
        //     if (response.status !== 200) throw new Error(response.error);

        //     toast({ description: "Exam Updated Successfully" });
        //     setEditDialogOpen(false); // Close the dialog after successful update
        // } catch (error: any) {
        //     toast({ variant: "destructive", title: "Update Failed", description: error.toString() });
        //     console.error(error);
        // }


    };

    // Function to handle deleting an exam
    const handleDelete = async () => {
        try {
            const request = await fetch(`/api/exam/?examId=${exam.examId}`, {
                method: 'DELETE',
            });
            const response = await request.json();
            if (response.status !== 200) throw new Error(response.error);

            toast({ description: "Exam Deleted Successfully" });
            setDeleteDialogOpen(false); // Close the delete confirmation dialog

            window.location.href = "/admin/exams";
        } catch (error: any) {
            toast({ variant: "destructive", title: "Delete Failed", description: error.toString() });
            console.error(error);
        }
    };

    // Determine whether the image is a valid image or a PDF
    const isImage = (filename: string) => {
        return /\.(jpg|jpeg|png|gif)$/.test(filename);
    };

    const imageUrl = exam.imageName
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}exam/file/${exam.imageName}`
        : '/images/courses/default.png';


    return (
        <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-darkNavy">{exam.title}</CardTitle>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditDialogOpen(true)}>
                        <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteDialogOpen(true)}>
                        <Trash size={16} className="text-red-500" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center">
                <p className="text-darkNavy mb-2">Deadline: {new Date(exam.deadline).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm">Package: {exam.category.categoryTitle}</p>
            </CardContent>

            <CardFooter>
                <Button className="bg-blue text-white w-full" onClick={() => setViewDetailsOpen(true)}>
                    View Details
                </Button>
            </CardFooter>

            {/* View Details Modal to Show Image */}
            <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
                <DialogContent className="max-w-[600px] max-h-[90%] w-full overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{exam.title}</DialogTitle>
                        <DialogDescription>Details of the selected exam</DialogDescription>
                    </DialogHeader>
                    {isImage(exam.imageName) ? (
                        <Image
                            src={imageUrl}
                            alt={exam.title}
                            width={300}
                            height={200}
                            className="rounded-md mb-4"
                        />
                    ) : (
                        <PDFViewer fileUrl={imageUrl} />
                        // <PdfViewer url={imageUrl} />
                        // <PDFViewer fileUrl="https://example.com/sample.pdf" />
                        // <div>
                        //     <p className="underline">
                        //         <a href={imageUrl} download="file.pdf">
                        //             Download PDF
                        //         </a>
                        //     </p>
                        // </div>


                    )}


                    <p className="text-darkNavy">Deadline: {new Date(exam.deadline).toLocaleDateString()}</p>
                    <DialogFooter>
                        <Button onClick={() => setViewDetailsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog Modal */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-[600px] w-full">
                    <DialogHeader>
                        <DialogTitle>Edit Exam</DialogTitle>
                        <DialogDescription>Update the exam details below</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right">Title</label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="deadline" className="text-right">Deadline</label>
                            <Input
                                id="deadline"
                                type="datetime-local" // Change here
                                value={deadline} // Ensure this is the formatted deadline
                                onChange={(e) => setDeadline(e.target.value)} // Update state correctly
                                className="col-span-3"
                            />
                        </div>


                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="image" className="text-right">Upload Image</label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/jpeg, image/jpg, application/pdf"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setFile(e.target.files[0]); // Update the state with the selected file
                                    }
                                }}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleEdit}>Save Changes</Button>
                        <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[500px] w-full">
                    <DialogHeader>
                        <DialogTitle>Delete Exam</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this exam?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
