"use client";

import { useState } from "react"
import { CreateDialog } from "@/components/admin/grades/create";
import { GradeCard } from "@/components/admin/grades/card";
import { GradesTable } from "@/components/admin/grades/grades-table";

interface Grade {
    title: string
    description: string
}

const initialGrades: Grade[] = [
    {
        title: "Grade 10",
        description: "Secondary Level",
    },
    {
        title: "Grade 9",
        description: "Secondary Level",
    },
    {
        title: "Grade 11",
        description: "Higher Secondary Level",
    },
]

export default function Grades() {
    const [grades, setGrades] = useState(initialGrades)


    const handleEdit = (index: number) => {
        // Logic for editing a grade, such as opening an edit dialog
        console.log(`Edit grade at index: ${index}`)
    }

    const handleDelete = (index: number) => {
        // Logic for deleting a grade
        setGrades(grades.filter((_, i) => i !== index))
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Grades</h2>
            <CreateDialog />
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {grades.map((grade, index) => (
                    <GradeCard
                        key={index}
                        grade={grade}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </div> */}
            <GradesTable />
        </>
    )
}
