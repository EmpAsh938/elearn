import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming Select is part of your UI library
import { useState, useEffect } from "react";
import { User } from "./userstable";


type Props = {
    user: User;
    open: boolean;
    onClose: () => void;
    onSave: (email: string, role: string) => void;
};

export function UpdateRoleModal({ user, open, onClose, onSave }: Props) {
    const [selectedRole, setSelectedRole] = useState<string>(user.roles[0].name);


    const handleSave = () => {
        onSave(user.email, selectedRole);
        onClose(); // Close the modal after saving
    };

    useEffect(() => {
        if (user) {
            setSelectedRole(user.roles[0].name); // Set the current user role
        }
    }, [user]);



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

                    {/* Role Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-darkNavy mb-1">Role</label>
                        <Select onValueChange={setSelectedRole} value={selectedRole}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>

                                <SelectItem value="ROLE_ADMIN">ROLE_ADMIN</SelectItem>
                                <SelectItem value="ROLE_NORMAL">ROLE_NORMAL</SelectItem>
                                <SelectItem value="ROLE_SUBSCRIBED">ROLE_SUBSCRIBED</SelectItem>
                                <SelectItem value="ROLE_TEACHER">ROLE_TEACHER</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
