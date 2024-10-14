"use client";

import { useState } from "react";
import RightSidebar from "@/components/dashboard/rightsidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types for Assignment and Exam Paper
interface Assignment {
    id: number;
    class: string;
    title: string;
    student: string;
    studentAvatar: string; // Added student profile image URL
    status: "Pending" | "Completed";
}

interface ExamPaper {
    id: number;
    class: string;
    student: string;
    studentAvatar: string; // Added student profile image URL
    submittedAt: string;
}

// Pagination setup
const ITEMS_PER_PAGE = 5;

export default function Console() {
    // Sample data for assignments and exam papers
    const [assignments, setAssignments] = useState<Assignment[]>([
        {
            id: 1,
            class: "Class 1",
            title: "Math Homework",
            student: "John Doe",
            studentAvatar: "/images/profile/user.jpeg", // Placeholder for the profile image
            status: "Pending",
        },
        {
            id: 2,
            class: "Class 2",
            title: "Science Project",
            student: "Jane Smith",
            studentAvatar: "/images/profile/user.jpeg",
            status: "Completed",
        },
        {
            id: 3,
            class: "Class 3",
            title: "History Essay",
            student: "Sam Wilson",
            studentAvatar: "/images/profile/user.jpeg",
            status: "Pending",
        },
        // Add more data here
    ]);

    const [examPapers, setExamPapers] = useState<ExamPaper[]>([
        {
            id: 1,
            class: "Class 1",
            student: "John Doe",
            studentAvatar: "/images/profile/user.jpeg",
            submittedAt: "2024-10-10",
        },
        {
            id: 2,
            class: "Class 2",
            student: "Jane Smith",
            studentAvatar: "/images/profile/user.jpeg",
            submittedAt: "2024-10-11",
        },
        {
            id: 3,
            class: "Class 3",
            student: "Sam Wilson",
            studentAvatar: "/images/profile/user.jpeg",
            submittedAt: "2024-10-12",
        },
        // Add more data here
    ]);

    const [assignmentPage, setAssignmentPage] = useState(1);
    const [examPage, setExamPage] = useState(1);

    // Pagination handlers
    const paginatedAssignments = assignments.slice((assignmentPage - 1) * ITEMS_PER_PAGE, assignmentPage * ITEMS_PER_PAGE);
    const paginatedExamPapers = examPapers.slice((examPage - 1) * ITEMS_PER_PAGE, examPage * ITEMS_PER_PAGE);

    const totalAssignmentPages = Math.ceil(assignments.length / ITEMS_PER_PAGE);
    const totalExamPages = Math.ceil(examPapers.length / ITEMS_PER_PAGE);

    const handleAssignmentClick = (assignmentId: number) => {
        console.log(`Navigate to assignment details for ID: ${assignmentId}`);
        // You can add navigation logic here based on your router.
    };

    const handleExamPaperClick = (examPaperId: number) => {
        console.log(`Navigate to exam paper details for ID: ${examPaperId}`);
        // You can add navigation logic here based on your router.
    };

    return (
        <div className="mr-0 md:mr-64 ml-0 md:ml-52 mt-16 p-6">
            <RightSidebar />

            {/* Teacher Console/dashboard main/mid contents */}
            <section className="flex flex-col gap-4">
                {/* Assignments Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {paginatedAssignments.map((assignment) => (
                                <div
                                    key={assignment.id}
                                    className="cursor-pointer flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded"
                                    onClick={() => handleAssignmentClick(assignment.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <Avatar>
                                            <AvatarImage src={assignment.studentAvatar} alt={assignment.student} />
                                            <AvatarFallback>{assignment.student.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {/* Assignment Details */}
                                        <div>
                                            <p className="font-semibold">
                                                {assignment.title} - <span className="text-sm text-gray-500">{assignment.student}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">{assignment.class}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={assignment.status === "Pending" ? "destructive" : "default"}
                                        >
                                            {assignment.status}
                                        </Badge>
                                        <ArrowRight className="text-gray-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination for Assignments */}
                        <div className="mt-4 flex justify-between items-center">
                            <Button
                                variant="outline"
                                onClick={() => setAssignmentPage(prev => Math.max(prev - 1, 1))}
                                disabled={assignmentPage === 1}
                            >
                                Previous
                            </Button>
                            <p>
                                Page {assignmentPage} of {totalAssignmentPages}
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setAssignmentPage(prev => Math.min(prev + 1, totalAssignmentPages))}
                                disabled={assignmentPage === totalAssignmentPages}
                            >
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Exam Papers Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Papers to Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {paginatedExamPapers.map((paper) => (
                                <div
                                    key={paper.id}
                                    className="cursor-pointer p-3 bg-gray-100 rounded flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleExamPaperClick(paper.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <Avatar>
                                            <AvatarImage src={paper.studentAvatar} alt={paper.student} />
                                            <AvatarFallback>{paper.student.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {/* Exam Paper Details */}
                                        <div>
                                            <p className="font-semibold">{paper.student}</p>
                                            <p className="text-sm text-gray-500">{paper.class}</p>
                                            <p className="text-sm text-gray-400">Submitted: {paper.submittedAt}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-500" />
                                </div>
                            ))}
                        </div>

                        {/* Pagination for Exam Papers */}
                        <div className="mt-4 flex justify-between items-center">
                            <Button
                                variant="outline"
                                onClick={() => setExamPage(prev => Math.max(prev - 1, 1))}
                                disabled={examPage === 1}
                            >
                                Previous
                            </Button>
                            <p>
                                Page {examPage} of {totalExamPages}
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setExamPage(prev => Math.min(prev + 1, totalExamPages))}
                                disabled={examPage === totalExamPages}
                            >
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
