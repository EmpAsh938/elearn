"use client";

import { useEffect, useState } from "react";
import { CreateDialog } from "@/components/admin/courses/create";
import { CourseCard } from "@/components/admin/courses/card";
import { toast } from "@/hooks/use-toast";

interface ICat {
    categoryId: string;
    categoryTitle: string;
}

interface ICourse {
    postId: string;
    title: string;
    content: string;
    videoLink: string;
    category: ICat;
}

export default function Courses() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Function to handle editing a course
    const handleEdit = async (updateData: ICourse) => {
        try {
            const request = await fetch('/api/subject', {
                method: 'PUT',
                body: JSON.stringify({ categoryId: updateData.category.categoryId, content: updateData.content, title: updateData.title, postId: updateData.postId })
            })
            const response = await request.json();
            if (response.status !== 200) throw Error(response.error);
            toast({ description: "Course Updated Successfully" });
            window.location.href = "/admin/course";
        } catch (error: any) {
            toast({ variant: "destructive", title: "Updating Course Failed", description: error.toString() });
            console.error(error);
        }
    };


    // Function to handle deleting a course
    const handleDelete = (index: number) => {
        // Logic for deleting a course
        setCourses(courses.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchCourses = async () => {
            if (typeof window !== "undefined") {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                try {
                    if (Object.entries(user).length === 0) throw Error("User not found");
                    const req = await fetch(`/api/subject?userId=${user.id}`);
                    const res = await req.json();
                    setCourses(res.body.content);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Courses</h2>
            <section>
                <CreateDialog />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {isLoading ? <p>Loading...</p> : courses.length === 0 ? (
                        <p>No courses to show</p>
                    ) : (
                        courses.map((course, index) => (
                            <CourseCard
                                key={course.postId} // Use a unique identifier for the key
                                course={course}
                                onEdit={handleEdit}
                                onDelete={() => handleDelete(index)}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}