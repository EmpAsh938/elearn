import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TBookedCourse } from "@/app/lib/types";

type Props = {
    course: TBookedCourse;
    open: boolean;
    onClose: () => void;
    onSave: any;
}

export function UpdateModal({ course, open, onClose, onSave }: Props) {
    const [title, setTitle] = useState(course?.category.categoryTitle || "");
    const [description, setDescription] = useState(course?.category.categoryDescription || "");

    const handleSave = () => {
        const updatedData = { ...course, categoryTitle: title, categoryDescription: description };
        onSave(updatedData);
        onClose(); // Close the modal after saving
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Package</DialogTitle>
                    <DialogDescription>
                        Make changes to the package&apos;s information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Name" />
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
