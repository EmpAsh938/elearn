"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LucideUser, MoreVertical } from "lucide-react";
import Image from "next/image";
import { TUser } from "@/app/lib/types";

// Define classes (for simplicity)
const classes = ["All", "Web Development", "NEB 12 Management", "NEB 12 Science"];


export default function TeacherPage() {
    const [teachers, setTeachers] = useState<TUser[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5); // Number of teachers to show per page
    const [loading, setLoading] = useState(true);
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

    // Filter teachers based on selected class
    const filteredTeachers = teachers.filter((teacher) => {
        return teacher;
        // return selectedClass === "All" ? teacher : teacher.class === selectedClass;
    });

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

function TeacherCard({ teacher, onUpdate, onDelete }: { teacher: TUser; onUpdate: (teacher: TUser) => void; onDelete: (id: number) => void; }) {
    const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // const [assignClass, setAssignClass] = useState<string>(teacher.class || "");
    // const [assignSubject, setAssignSubject] = useState<string>(teacher.subject || "");
    // const [updateName, setUpdateName] = useState<string>(teacher.name);
    // const [updateClass, setUpdateClass] = useState<string>(teacher.class);
    // const [updateSubject, setUpdateSubject] = useState<string>(teacher.subject);

    const { toast } = useToast();

    async function handleAssign() {
        try {
            const response = await fetch("/api/assign-class", {
                method: "POST",
                // body: JSON.stringify({ teacherId: teacher.id, class: assignClass, subject: assignSubject }),
            });

            // if (!response.ok) throw new Error("Failed to assign class");

            // const updatedTeacher = { ...teacher, class: assignClass, subject: assignSubject };
            // onUpdate({});
            // toast({ description: `Assigned ${assignClass} - ${assignSubject} to ${teacher.name}` });
            setIsAssignDialogOpen(false);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    }

    async function handleUpdate() {
        // const updatedTeacher = { ...teacher, name: updateName, class: updateClass, subject: updateSubject };
        // onUpdate(updatedTeacher);
        setIsUpdateDialogOpen(false);
        toast({ description: `Updated details for ${teacher.name}` });
    }

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
                {/* <Image src={teacher.profilePicture} alt={teacher.name} width={400} height={400} className="w-12 h-12 rounded-full mr-4" /> */}
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
                    <p className="text-sm text-gray-500">
                        Not Assigned
                        {/* {teacher.class ? `${teacher.class} - ${teacher.subject}` : "Not Assigned"} */}
                    </p>
                </div>
            </div>

            {/* More Options */}
            <div className="relative">
                <Button variant="ghost" onClick={() => setIsMoreOptionsVisible(!isMoreOptionsVisible)}>
                    <MoreVertical />
                </Button>
                {isMoreOptionsVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                        <Button variant="ghost" className="w-full" onClick={() => setIsAssignDialogOpen(true)}>
                            Assign Class
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setIsUpdateDialogOpen(true)}>
                            Update Teacher
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
                            Delete Teacher
                        </Button>
                    </div>
                )}
            </div>

            {/* Assign Class Dialog */}
            {/* <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Class & Subject</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Select onValueChange={setAssignClass} defaultValue={assignClass}>
                            <SelectTrigger>
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
                        <Select onValueChange={setAssignSubject} defaultValue={assignSubject}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {["Math", "Science", "English"].map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-500 text-white" onClick={handleAssign}>
                            Assign
                        </Button>
                    </div>
                </DialogContent>
            </Dialog> */}

            {/* Update Teacher Dialog */}
            {/* <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Teacher Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <input
                            type="text"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                            placeholder="Teacher Name"
                            className="p-2 border rounded w-full"
                        />
                        <Select onValueChange={setUpdateClass} defaultValue={updateClass}>
                            <SelectTrigger>
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
                        <Select onValueChange={setUpdateSubject} defaultValue={updateSubject}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {["Math", "Science", "English"].map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-500 text-white" onClick={handleUpdate}>
                            Update
                        </Button>
                    </div>
                </DialogContent>
            </Dialog> */}

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
