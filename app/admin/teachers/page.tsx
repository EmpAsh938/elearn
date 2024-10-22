"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LucideUser, MoreVertical } from "lucide-react";
import Image from "next/image";
import { TUser } from "@/app/lib/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define classes (for simplicity)
const classes = ["All", "Web Development", "NEB 12 Management", "NEB 12 Science"];


export default function TeacherPage() {
    const [teachers, setTeachers] = useState<TUser[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5); // Number of teachers to show per page
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // Search state
    const { toast } = useToast();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/user');
                const result = await response.json();
                if (result.status !== 200) throw Error(result.error);
                const teacherData: TUser[] = result.body;
                setTeachers(teacherData.filter(item => (item.roles[0]['id'] == '504'))); // Set the data from API

            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    // Filter data based on searchQuery
    const filteredTeachers = useMemo(() => {
        return teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, teachers]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="w-full p-6">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Teachers</h1>
            {/* Search Input */}
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search students..."
                    className="border p-2 rounded-md w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                />
            </div>

            {/* Sort by Class */}
            <div className="flex items-center mb-4">
                <Select onValueChange={(value) => {
                    setSelectedClass(value);
                    setCurrentPage(1); // Reset to the first page when class is changed
                }} defaultValue={selectedClass}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                                {cls}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Teacher List */}
            <div className="grid gap-4">
                {currentTeachers.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} onUpdate={(updatedTeacher) => {
                        setTeachers((prev) => prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
                    }} onDelete={(id) => {
                        // setTeachers((prev) => prev.filter(t => t.id !== id));
                    }} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 items-center mt-4">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </Button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}


function TeacherCard({
    teacher,
    onUpdate,
    onDelete,
}: {
    teacher: TUser;
    onUpdate: (teacher: TUser) => void;
    onDelete: (id: number) => void;
}) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { toast } = useToast();

    async function handleDelete() {
        const response = await fetch(`/api/delete-teacher/${teacher.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete teacher." });
            return;
        }

        // onDelete(teacher.id);
        toast({ description: `Deleted ${teacher.name}` });
        setIsDeleteDialogOpen(false);
    }

    return (
        <div className="p-4 border rounded-lg flex items-center justify-between">
            <div className="flex items-center">
                {teacher && teacher.imageName ? (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/image/${teacher.imageName}`}
                        alt={teacher.name}
                        width={50}
                        height={50}
                        className="w-10 h-10 object-cover rounded-full cursor-pointer"
                    />
                ) : (
                    <LucideUser className="w-10 h-10 text-gray-600 cursor-pointer" />
                )}
                <div className="ml-2">
                    <p className="font-semibold capitalize">{teacher.name}</p>
                    <p className="text-sm text-gray-500">Not Assigned</p>
                </div>
            </div>

            {/* More Options with ShadCN Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log("Assign class")}>
                        Assign Class
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Update teacher")}>
                        Update Teacher
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                        Delete Teacher
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Teacher Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete {teacher.name}?</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this teacher? This action cannot be undone.</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

