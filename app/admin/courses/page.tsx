"use client";

import { useState } from "react"
import { CreateDialog } from "@/components/admin/courses/create";
import { CourseCard } from "@/components/admin/courses/card";


interface Course {
    title: string
    description: string
}

const initialCourses: Course[] = [
    {
        title: "Introduction to Mathematics",
        description: "Explore the fundamental concepts and techniques in mathematics.",
    },
    {
        title: "Physics Basics",
        description: "Understand the core principles and theories of physics.",
    },
    {
        title: "Introduction to Programming",
        description: "Learn the basics of programming with hands-on examples.",
    },
]

export default function AdminCourses() {
    const [courses, setCourses] = useState(initialCourses)

    const handleEdit = (index: number) => {
        // Logic for editing a course, such as opening an edit dialog
        console.log(`Edit course at index: ${index}`)
    }

    const handleDelete = (index: number) => {
        // Logic for deleting a course
        setCourses(courses.filter((_, i) => i !== index))
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Courses</h2>
            {/* Add course management UI here */}
            <section>
                <CreateDialog />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            onEdit={() => handleEdit(index)}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
