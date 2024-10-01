import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "./userstable";

type Props = {
    user: User;
    open: boolean;
    onClose: () => void;
    onSave: any;
}

export function UpdateUserModal({ user, open, onClose, onSave }: Props) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [role, setRole] = useState(user?.roles[0]?.name || ""); // Assuming single role

    const handleSave = () => {
        const updatedUser = { ...user, name, email, roles: [{ name: role }] };
        onSave(updatedUser);
        onClose(); // Close the modal after saving
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Make changes to the user&apos;s information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    {/* <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" /> */}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
