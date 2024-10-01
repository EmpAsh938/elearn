import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "./userstable";


type Props = {
    user: User;
    open: boolean;
    onClose: () => void;
    onDelete: any;
}

export function DeleteUserModal({ user, open, onClose, onDelete }: Props) {
    const handleDelete = () => {
        onDelete(user.id); // Pass the user ID to the delete function
        onClose(); // Close the modal after deleting
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the user <strong>{user?.name}</strong>? This action cannot be undone.
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
