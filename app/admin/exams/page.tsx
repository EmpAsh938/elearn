"use client";

import { TExam } from "@/app/lib/types";
import { ExamCard } from "@/components/admin/exams/card";
import { CreateExamDialog } from "@/components/admin/exams/create";
import { useEffect, useState } from "react"



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
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Exams</h2>
            <section>
                <CreateExamDialog />
                {isLoading ? <p>Loading...</p> : exams.length === 0 ? <p>Nothing to display</p> : <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-6">
                    {exams.map((exam, index) => (
                        <ExamCard
                            key={index}
                            exam={exam}
                        />
                    ))}
                </div>}
            </section>
        </div>
    )
}
