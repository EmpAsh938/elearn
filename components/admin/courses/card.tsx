import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css"; // Import SimpleMDE's CSS
import ReactMarkdown from "react-markdown";

// Dynamically load SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface ICat {
    categoryId: string;
    categoryTitle: string;
}

interface ICourse {
    postId: string;
    title: string;
    content: string;
    videoLink: string;
    category: ICat;
}

interface CourseCardProps {
    course: ICourse;
    onEdit: (updatedCourse: ICourse) => void;
    onDelete: () => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(course.title);
    const [editContent, setEditContent] = useState(course.content); // Markdown content

    const handleEdit = () => {
        onEdit({ ...course, title: editTitle, content: editContent });
        setEditDialogOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setDeleteDialogOpen(false);
    };

    // Memoize the SimpleMDE editor to prevent losing focus
    const handleEditorChange = useCallback((value: string) => {
        setEditContent(value);
    }, []);

    const simpleMDEEditor = useMemo(
        () => (
            <SimpleMDE
                value={editContent}
                onChange={handleEditorChange}
                options={{
                    spellChecker: true,
                    placeholder: "Enter course content in Markdown format...",
                    status: false,
                    autofocus: true, // Focus immediately on load
                }}
            />
        ),
        [editContent, handleEditorChange] // Only re-render if the content changes
    );

    return (
        <>
            <Card className="bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-300">
                <p className="px-4 py-3 bg-gray-200">{course.category.categoryTitle}</p>

                <CardHeader className="flex flex-row justify-between items-center px-4 py-3 bg-gray-50 border-b">
                    <CardTitle className="text-xl font-semibold text-darkNavy truncate">
                        {course.title}
                    </CardTitle>
                    <div className="flex gap-2">
                        {/* Edit Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditDialogOpen(true)}
                            className="hover:bg-gray-100 p-2 rounded-md"
                        >
                            <Edit size={18} className="text-gray-500 hover:text-gray-800" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteDialogOpen(true)}
                            className="hover:bg-gray-100 p-2 rounded-md"
                        >
                            <Trash size={18} className="text-red-500 hover:text-red-700" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-4">
                        <div className="prose text-sm text-gray-500">
                            <ReactMarkdown>{course.content.slice(0, 20) + "..."}</ReactMarkdown>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                            Make changes to the course details below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {/* Edit Course Title */}
                        <label className="block text-sm font-medium mb-2">Course Title</label>
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Enter new course title"
                        />

                        {/* Render SimpleMDE Editor */}
                        <label className="block text-sm font-medium mt-4 mb-2">Course Content (Markdown)</label>
                        {simpleMDEEditor}
                    </div>

                    <DialogFooter>
                        <Button onClick={handleEdit}>Save</Button>
                        <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this course? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleDelete} className="bg-red-600 text-white">
                            Confirm Delete
                        </Button>
                        <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
