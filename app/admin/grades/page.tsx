"use client";

import { useCallback, useEffect, useState } from "react"
import { CreateDialog } from "@/components/admin/grades/create";
import { GradeCard } from "@/components/admin/grades/card";
import { GradesTable } from "@/components/admin/grades/grades-table";

interface Grade {
    categoryId: string
    categoryTitle: string
    categoryDescription: string
}


export default function Grades() {

    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true);


    const handleEdit = (index: number) => {
        // Logic for editing a grade, such as opening an edit dialog
        console.log(`Edit grade at index: ${index}`)
    }

    const handleDelete = (index: number) => {
        // Logic for deleting a grade
        setGrades(grades.filter((_, i) => i !== index))
    }

    const fetchGrades = useCallback(async () => {
        setLoading(true);
        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/`);
            const response = await request.json();
            // if (response.status !== 200) throw Error(response.error);
            // console.log(response);
            setGrades(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGrades();
    }, [fetchGrades])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Grades/Faculty</h2>
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
            <GradesTable grades={grades} loading={loading} />
        </div>
    )
}
