import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Course {
    id: string;
    title: string;
    content: string;
    videoLink: string;
}

interface CourseCardProps {
    course: Course;
    onEdit: (updatedCourse: Course) => void;
    onDelete: () => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(course.title);

    const handleEdit = () => {
        onEdit({ ...course, title: editTitle });
        setEditDialogOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Card className="bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-300">
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
            </Card>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                            Make changes to the course details below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="block text-sm font-medium mb-2">Course Title</label>
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Enter new course title"
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
