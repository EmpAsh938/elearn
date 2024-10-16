"use client";

import Image from "next/image";
import { UserPlus } from "lucide-react"; // Lucide icons
import RightSidebar from "@/components/dashboard/rightsidebar";
import AdminBarChart from "@/components/admin/charts/barchart";
import AdminPieChart from "@/components/admin/charts/piechart";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Dummy data for New Users
const newUsers = [
    { name: "John Doe", role: "Teacher", joinDate: "2024-10-10", image: "/images/profile/user.jpeg" },
    { name: "Jane Smith", role: "Guest", joinDate: "2024-10-09", image: "/images/profile/user.jpeg" },
    { name: "Mike Johnson", role: "Subscribed", joinDate: "2024-10-08", image: "/images/profile/user.jpeg" },
    { name: "Emily Davis", role: "Teacher", joinDate: "2024-10-07", image: "/images/profile/user.jpeg" },
];

const itemsPerPage = 3; // Adjust this value to change the number of users per page


export default function AdminHome() {

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(newUsers.length / itemsPerPage);

    // Get the users to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = newUsers.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className="p-6 md:mr-64">
            {/* Mid Content */}
            <div className="">
                {/* Student Metrics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">

                    <AdminBarChart />
                    {/* <p className="text-center text-sm text-gray-500 mb-6">Current statistics of student engagement</p> */}
                    <AdminPieChart />
                </div>

                {/* New Users Section */}
                <div className="bg-gray-100">
                    <div>

                        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-teal-700">
                            <UserPlus className="w-6 h-6 text-teal-500" /> New Users (Last 7 Days)
                        </h2>
                        <p className="text-center text-sm text-gray-500">Recent signups</p>
                    </div>


                    <div>
                        {currentUsers.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center my-2 gap-4 bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                            >
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full border border-gray-300"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 space-x-2">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                        >
                            Next
                        </Button>
                    </div>

                </div>

            </div>

            {/* Right Sidebar */}
            <RightSidebar />
        </div>
    );
}


const getBadgeClass = (role: string) => {
    switch (role) {
        case "Admin":
            return "text-red"; // Red badge for Admin
        case "Teacher":
            return "text-blue"; // Blue badge for Teacher
        case "Student":
            return "text-green"; // Green badge for Student
        case "Guest":
            return "text-yellow-800"; // Yellow badge for Guest
        default:
            return "text-gray-800"; // Default badge
    }
};
