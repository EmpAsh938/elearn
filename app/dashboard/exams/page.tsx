// pages/exams.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { format } from 'date-fns';
import Link from "next/link";

// Sample data for exams
const examsData = [
    {
        examId: 1,
        title: "Mathematics Midterm Exam",
        imageName: "/images/exam.avif",
        addedDate: new Date('2024-07-01T10:00:00'),
        deadline: new Date('2024-08-01T23:59:59')
    },
    {
        examId: 2,
        title: "Science Final Exam",
        imageName: "/images/exam.avif",
        addedDate: new Date('2024-07-15T10:00:00'),
        deadline: new Date('2024-08-15T23:59:59')
    },
    {
        examId: 3,
        title: "Computer Science Practical",
        imageName: "/images/exam.avif",
        addedDate: new Date('2024-07-20T10:00:00'),
        deadline: new Date('2024-08-20T23:59:59')
    }
];

export default function Exams() {
    const [exams, setExams] = useState(examsData);

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Upcoming Exams</h1>
                <p className="text-lg text-darkNavy mb-4">Here are your upcoming exams with their details and deadlines.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map(exam => (
                    <Card key={exam.examId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative w-full h-40">
                            <Image src={exam.imageName} alt={exam.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
                        </div>
                        <CardHeader className="py-4 px-4 border-b border-gray-200">
                            <CardTitle className="text-2xl font-bold text-darkNavy">
                                {exam.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 px-4">
                            <p className="text-lg text-darkNavy mb-2"><strong>Added Date:</strong> {format(exam.addedDate, 'MMMM d, yyyy h:mm a')}</p>
                            <p className="text-lg text-darkNavy mb-4"><strong>Deadline:</strong> {format(exam.deadline, 'MMMM d, yyyy h:mm a')}</p>
                            <Link href={`/dashboard/exams/${exam.examId}`}>
                                <Button className="bg-blue text-white w-full">Join Exam</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
