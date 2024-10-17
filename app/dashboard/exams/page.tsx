// pages/exams.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { format } from 'date-fns';
import Link from "next/link";
import { TExam } from "@/app/lib/types";



export default function Exams() {
    const [exams, setExams] = useState<TExam[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const req = await fetch('/api/exam');
                const res = await req.json();
                setExams(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);
    return (
        <div className="md:ml-52 mt-16 p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Upcoming Exams</h1>
                <p className="text-lg text-darkNavy mb-4">Here are your upcoming exams with their details and deadlines.</p>
            </section>

            <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {isLoading ? <p>Loading...</p> : exams.length === 0 ? <p>Nothing to show</p> : exams.map(exam => (
                    <Card key={exam.examId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative w-full h-40">
                            <Image src="/images/exam.avif" alt={exam.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
                        </div>
                        <CardHeader className="py-4 px-4 border-b border-gray-200">
                            <CardTitle className="text-2xl font-bold text-darkNavy">
                                {exam.title}
                            </CardTitle>
                            <p className="text-lg text-gray-600 mt-1">{exam.category.categoryTitle}</p>

                        </CardHeader>
                        <CardContent className="py-4 px-4">
                            {/* <p className="text-lg text-darkNavy mb-2"><strong>Added Date:</strong> {format(exam.addedDate, 'MMMM d, yyyy h:mm a')}</p> */}
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
