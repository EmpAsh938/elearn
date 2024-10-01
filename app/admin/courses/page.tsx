"use client";

import { useEffect, useState } from "react";
import { CreateDialog } from "@/components/admin/courses/create";
import { CourseCard } from "@/components/admin/courses/card";

interface Course {
    id: string;
    title: string;
    content: string;
    videoLink: string;
}

export default function AdminCourses() {
    const [courses, setCourses] = useState<Course[]>([]);

    // Function to handle editing a course
    const handleEdit = (index: number) => {
        // Logic for editing a course, such as opening an edit dialog
        console.log(`Edit course at index: ${index}`);
    };

    // Function to handle deleting a course
    const handleDelete = (index: number) => {
        // Logic for deleting a course
        setCourses(courses.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            try {
                if (Object.entries(user).length === 0) throw new Error("User not found");
                const req = await fetch('/api/subject?userId=' + user.id);
                const res = await req.json();
                setCourses(res.body.content);
            } catch (error) {
                console.log(error);
            }
        };

        // Ensure the fetch only runs on the client
        if (typeof window !== 'undefined') {
            fetchCourses();
        }
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Courses</h2>
            {/* Add course management UI here */}
            <section>
                <CreateDialog />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {courses.length === 0 ? <p>No courses to show</p> : courses.map((course, index) => (
                        <CourseCard
                            key={course.id} // Use a unique identifier for the key
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
