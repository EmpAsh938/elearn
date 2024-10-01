"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LiveExamCardProps {
    title: string;
    startTime: string;
    streamlink: string;
    onEdit: (title: string, startTime: string) => void;
    onDelete: () => void;
}

const LiveExamCard = ({
    title,
    startTime,
    streamlink,
    onEdit,
    onDelete,
}: LiveExamCardProps) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editStartTime, setEditStartTime] = useState(startTime);

    const handleEditSubmit = () => {
        onEdit(editTitle, editStartTime);
        setIsEditOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setIsDeleteOpen(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-darkNavy">{title}</h3>
            <p className="text-darkNavy mb-2">
                <strong>Start Time:</strong> {startTime}
            </p>
            <p className="text-darkNavy mb-2">
                <strong>Stream Link:</strong> {streamlink}
            </p>

            <div className="flex mt-4">
                <Button className="mr-2" variant="secondary" onClick={() => setIsEditOpen(true)}>
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                    Delete
                </Button>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Live Exam</DialogTitle>
                        <DialogDescription>
                            Make changes to the exam details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEditSubmit();
                        }}
                    >
                        <div className="mb-4">
                            <label className="block text-darkNavy mb-1">Title</label>
                            <Input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-darkNavy mb-1">Start Time</label>
                            <Input
                                type="datetime-local"
                                value={editStartTime}
                                onChange={(e) => setEditStartTime(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="default" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="ghost" onClick={() => setIsEditOpen(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Live Exam</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this exam? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete}>
                            Confirm Delete
                        </Button>
                        <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LiveExamCard;
