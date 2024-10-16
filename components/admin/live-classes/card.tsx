"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Edit, Clock, LinkIcon } from 'lucide-react'; // Importing icons
import Image from 'next/image'; // Importing Next.js Image component

interface LiveExamCardProps {
    title: string;
    startTime: string;
    streamlink: string;
    onEdit: (title: string, startTime: string) => void;
    onDelete: () => void;
    imageUrl?: string; // Optional prop for the class image
}

const LiveExamCard = ({
    title,
    startTime,
    streamlink,
    onEdit,
    onDelete,
    imageUrl, // Accepting imageUrl as a prop
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

    // Default image URL (replace with your default image path)
    const defaultImageUrl = "/images/live.avif";

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
            {/* Displaying the image */}
            <div className="mb-4">
                <Image
                    src={imageUrl || defaultImageUrl} // Use provided image or default
                    alt="Live Class"
                    width={400}
                    height={250}
                    className="h-36 object-cover rounded-lg"
                />
            </div>
            {/* Title Section */}
            <h3 className="text-2xl font-bold text-darkNavy mb-2">{title}</h3>

            {/* Info Section */}
            <div className="flex items-center mb-3">
                <Clock className="mr-2 text-darkNavy" />
                <p className="text-darkNavy">
                    <strong>Start Time:</strong> {startTime}
                </p>
            </div>
            <div className="flex items-center mb-3">
                <LinkIcon className="mr-2 text-darkNavy" />
                <p className="text-darkNavy">
                    <strong>Stream Link:</strong> <span className="text-blue-600 hover:underline">{streamlink}</span>
                </p>
            </div>

            <div className="flex mt-4 space-x-2">
                <Button variant="secondary" onClick={() => setIsEditOpen(true)} className="flex items-center">
                    <Edit className="mr-2" />
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)} className="flex items-center">
                    <Trash className="mr-2" />
                    Delete
                </Button>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-lg">
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
                <DialogContent className="max-w-lg">
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
