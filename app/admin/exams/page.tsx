"use client";

import { ExamCard } from "@/components/admin/exams/card";
import { CreateExamDialog } from "@/components/admin/exams/create";
import { useState } from "react"


interface Exam {
    title: string
    description: string
    date: string
    questions: { questionText: string; options: string[]; correctOption: number }[]
}

const initialExams: Exam[] = [
    {
        title: "Math Exam",
        description: "Covers algebra, geometry, and calculus.",
        date: "2024-08-10",
        questions: [],
    },
    {
        title: "Science Exam",
        description: "Includes physics, chemistry, and biology topics.",
        date: "2024-09-15",
        questions: [],
    },
]

export default function Exams() {
    const [exams, setExams] = useState(initialExams)

    const handleCreate = (newExam: Exam) => {
        setExams([...exams, newExam])
    }

    const handleEdit = (index: number) => {
        // Logic for editing an exam, such as opening an edit dialog
        console.log(`Edit exam at index: ${index}`)
    }

    const handleDelete = (index: number) => {
        // Logic for deleting an exam
        setExams(exams.filter((_, i) => i !== index))
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Exams</h2>
            <section>
                <CreateExamDialog onCreate={handleCreate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {exams.map((exam, index) => (
                        <ExamCard
                            key={index}
                            exam={exam}
                            onEdit={() => handleEdit(index)}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
