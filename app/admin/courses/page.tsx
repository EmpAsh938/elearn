"use client";

import { useEffect, useState } from "react"
import { CreateDialog } from "@/components/admin/courses/create";
import { CourseCard } from "@/components/admin/courses/card";


interface Course {
    id: string
    title: string
    content: string
    videoLink: string
}

export default function AdminCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [isClient, setIsClient] = useState(false);

    const handleEdit = (index: number) => {
        // Logic for editing a course, such as opening an edit dialog
        console.log(`Edit course at index: ${index}`)
    }

    const handleDelete = (index: number) => {
        // Logic for deleting a course
        setCourses(courses.filter((_, i) => i !== index))
    }

    useEffect(() => {
        setIsClient(true);

        const fetchCourses = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            try {
                if (Object.entries(user).length === 0) throw Error("User not found");
                const req = await fetch('/api/subject?userId=' + user.id);
                const res = await req.json();
                setCourses(res.body.content);
            } catch (error) {
                console.log(error);
            }

        }

        fetchCourses();
    }, [])

    // console.log(courses)
    if (!isClient) {
        return null; // Prevent rendering on server-side
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Courses</h2>
            {/* Add course management UI here */}
            <section>
                <CreateDialog />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {courses.length === 0 ? <p>No thing to show</p> : courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            onEdit={() => handleEdit(index)}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
