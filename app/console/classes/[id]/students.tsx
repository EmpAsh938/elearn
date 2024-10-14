"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Students() {
    // Sample data for students with avatars
    const students = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: 4, name: "Lucy Brown", email: "lucy.brown@example.com", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 5, name: "Michael Scott", email: "michael.scott@example.com", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 6, name: "Diana Prince", email: "diana.prince@example.com", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: 7, name: "Clark Kent", email: "clark.kent@example.com", avatar: "https://i.pravatar.cc/150?img=7" },
        { id: 8, name: "Peter Parker", email: "peter.parker@example.com", avatar: "https://i.pravatar.cc/150?img=8" },
        { id: 9, name: "Bruce Wayne", email: "bruce.wayne@example.com", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: 10, name: "Tony Stark", email: "tony.stark@example.com", avatar: "https://i.pravatar.cc/150?img=10" },
    ];

    const itemsPerPage = 5; // Number of students to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(students.length / itemsPerPage);

    // Get current students to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map((student) => (
                                <tr key={student.id} className="border-t border-gray-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Avatar>
                                            <AvatarImage src={student.avatar} />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {student.email}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 text-white bg-blue rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 text-white bg-blue rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Next
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
