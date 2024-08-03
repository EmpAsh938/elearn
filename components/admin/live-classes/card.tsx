"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LiveExamCardProps {
    title: string;
    description: string;
    startTime: string;
    duration: number;
    onEdit: (title: string, description: string, startTime: string, duration: number) => void;
    onDelete: () => void;
}

const LiveExamCard = ({
    title,
    description,
    startTime,
    duration,
    onEdit,
    onDelete,
}: LiveExamCardProps) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editStartTime, setEditStartTime] = useState(startTime);
    const [editDuration, setEditDuration] = useState(duration);

    const handleEditSubmit = () => {
        onEdit(editTitle, editDescription, editStartTime, editDuration);
        setIsEditOpen(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-darkNavy">{title}</h3>
            <p className="text-darkNavy mb-2">{description}</p>
            <p className="text-darkNavy mb-2">
                <strong>Start Time:</strong> {startTime}
            </p>
            <p className="text-darkNavy">
                <strong>Duration:</strong> {duration} minutes
            </p>
            <div className="flex mt-4">
                <Button className="mr-2" variant="secondary" onClick={() => setIsEditOpen(true)}>
                    Edit
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <h2 className="text-xl font-bold mb-4">Edit Live Exam</h2>
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
                            <label className="block text-darkNavy mb-1">Description</label>
                            <Input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
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
                        <div className="mb-4">
                            <label className="block text-darkNavy mb-1">Duration (minutes)</label>
                            <Input
                                type="number"
                                value={editDuration}
                                onChange={(e) => setEditDuration(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="default" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LiveExamCard;
