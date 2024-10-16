"use client";

import { useState } from "react";
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
import ReactMarkdown from "react-markdown";

// Dynamically load MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
    const [editVideoLink, setEditVideoLink] = useState(course.videoLink);
    const [editContent, setEditContent] = useState(course.content); // Markdown content

    const handleEdit = () => {
        onEdit({ ...course, title: editTitle, content: editContent, videoLink: editVideoLink });
        setEditDialogOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Card className="bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-300">
                <p className="px-4 py-3 bg-gray-200">{course.category.categoryTitle}</p>

                <CardHeader className="flex flex-row justify-between items-center px-4 py-3 bg-gray-50 border-b">
                    <CardTitle className="text-xl font-semibold text-darkNavy truncate">
                        {course.title}
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditDialogOpen(true)}
                            className="hover:bg-gray-100 p-2 rounded-md"
                        >
                            <Edit size={18} className="text-gray-500 hover:text-gray-800" />
                        </Button>

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
                <DialogContent className="max-h-[80vh] max-w-[90%] w-full overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Syllabus</DialogTitle>
                        <DialogDescription>
                            Make changes to the syllabus details below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <label className="block text-sm font-medium mb-2">Syllabus Title</label>
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Enter new syllabus title"
                        />
                        <label className="block text-sm font-medium mb-2">Video Link</label>
                        <Input
                            value={editVideoLink}
                            onChange={(e) => setEditVideoLink(e.target.value)}
                            placeholder="Enter Video title"
                        />

                        <label className="block text-sm font-medium mt-4 mb-2">Syllabus Content (Markdown)</label>
                        <MDEditor
                            value={editContent}
                            onChange={(value) => setEditContent(value || '')}
                            height={300}
                        />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleEdit}>Save</Button>
                        <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Syllabus</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this syllabus? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleDelete} className="bg-red text-white">
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
