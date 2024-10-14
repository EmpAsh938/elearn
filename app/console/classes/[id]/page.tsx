"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Materials from "./materials";
import Students from "./students";
import Ask from "./ask";

export default function Page() {
    const [selectedTab, setSelectedTab] = useState("Materials"); // Default tab

    // List of class options for navigation
    const classOptions = [
        "Materials",
        "Assignments",
        "Tests",
        "Exams",
        "Ask",
        "Students",
    ];

    return (
        <div className="ml-0 md:ml-52 mt-16">
            {/* Sidebar Navigation for Class Options */}
            <div className="fixed left-0 md:left-52 top-16 w-48 space-y-2 h-screen overflow-y-auto p-4 bg-white shadow-lg">
                {classOptions.map((option) => (
                    <Button
                        key={option}
                        variant={selectedTab === option ? "default" : "secondary"}
                        onClick={() => setSelectedTab(option)}
                        className={`w-full py-4 text-lg ${selectedTab === option ? 'bg-blue text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {option}
                    </Button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-56">
                {selectedTab === "Materials" && (
                    <Materials />
                )}
                {selectedTab === "Assignments" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Assignments content */}
                            <p>List of assignments will appear here.</p>
                        </CardContent>
                    </Card>
                )}
                {selectedTab === "Tests" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Tests content */}
                            <p>Upcoming and past tests will appear here.</p>
                        </CardContent>
                    </Card>
                )}
                {selectedTab === "Exams" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Exams</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Exams content */}
                            <p>Exam information and results will appear here.</p>
                        </CardContent>
                    </Card>
                )}
                {selectedTab === "Ask" && (
                    <Ask />
                )}
                {selectedTab === "Students" && (
                    <Students />
                )}
            </div>
        </div>
    );
}
