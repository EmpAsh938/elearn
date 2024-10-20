"use client";

import { useCallback, useEffect, useState } from "react"
import { CreateDialog } from "@/components/admin/grades/create";
import { GradesTable } from "@/components/admin/grades/grades-table";
import { TCourses } from "@/app/lib/types";


export default function Grades() {

    const [grades, setGrades] = useState<TCourses[]>([])
    const [loading, setLoading] = useState(true);


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
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Packages</h2>
            <CreateDialog grades={grades} loading={loading} />
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
