import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TBookedCourse } from "@/app/lib/types";


type Props = {
    course: TBookedCourse;
    open: boolean;
    onClose: () => void;
    onDelete: any;
}

export function DeleteModal({ course, open, onClose, onDelete }: Props) {
    const handleDelete = () => {
        onDelete(); // Pass the course ID to the delete function
        onClose(); // Close the modal after deleting
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Package</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the user <strong>{course?.category.categoryTitle}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
