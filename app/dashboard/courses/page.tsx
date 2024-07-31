"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import Link from "next/link";

const planData = {
    planName: "Grade 10 (Basic)",
    subjects: [
        {
            id: 1,
            name: "Mathematics",
            description: "Explore various mathematical concepts and solve problems.",
            progress: 90
        },
        {
            id: 2,
            name: "Science",
            description: "Understand the principles of physics, chemistry, and biology.",
            progress: 50
        },
        {
            id: 3,
            name: "Computer Science",
            description: "Learn the basics of computer science and programming.",
            progress: 75
        }
    ]
};

export default function Courses() {
    const [plan, setPlan] = useState(planData);

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Your Courses</h1>
                <p className="text-lg text-darkNavy mb-4">
                    Manage and track your progress in the subjects under your <span className="text-blue font-medium">{plan.planName} plan </span>.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plan.subjects.map(subject => (
                    <Card key={subject.id} className="bg-white shadow-lg">
                        <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                            <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                                <BookOpen className="mr-2 text-blue" /> {subject.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-darkNavy mb-4">{subject.description}</p>
                            <div className="mb-4">
                                <Progress value={subject.progress} className="h-2 bg-green" />
                                <p className="text-lg text-darkNavy">{subject.progress}% Complete</p>
                            </div>
                            <Link href={`/dashboard/courses/${subject.id}`}>
                                <Button className="bg-blue text-white w-full">Go to Course</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
