import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { User } from "./userstable";

type Props = {
    user: User;
    open: boolean;
    onClose: () => void;
    onSave: (email: string, role: string) => void;
};

interface IGrade {
    categoryId: string;
    categoryTitle: string;
    categoryDescription: string;
}

export function UpdatePackageModal({ user, open, onClose, onSave }: Props) {
    const [selectedPackage, setSelectedPackage] = useState<string>(user.faculty || ""); // Initialize with user's faculty or empty string
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    const handleSave = () => {
        onSave(user.id, selectedPackage);
        onClose(); // Close the modal after saving
    };

    useEffect(() => {
        if (user) {
            setSelectedPackage(user.faculty || ""); // Ensure selectedPackage has a value
        }
    }, [user]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const request = await fetch("/api/faculty/");
                const response = await request.json();
                if (response.status !== 200) throw Error(response.error);
                setGrades(response.body); // Assuming response has a `body` property containing grades
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchGrades();
    }, []);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User Package</DialogTitle>
                    <DialogDescription>
                        Make changes to the user&apos;s information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {/* Package Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-darkNavy mb-1">Package</label>
                        <Select onValueChange={setSelectedPackage} value={selectedPackage || "Select Package"}>
                            <SelectTrigger>
                                <SelectValue>{selectedPackage}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {grades.map((item) => (
                                    <SelectItem key={item.categoryId} value={item.categoryTitle}>
                                        {item.categoryTitle}
                                    </SelectItem>
                                ))}
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
