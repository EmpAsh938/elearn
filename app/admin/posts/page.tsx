"use client";

import { useEffect, useState } from "react";
import { CreateDialog } from "@/components/admin/courses/create";
import { CourseCard } from "@/components/admin/courses/card";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

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
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");


    const [courses, setCourses] = useState<ICourse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Function to handle editing a course
    const handleEdit = async (updateData: ICourse) => {
        try {
            const request = await fetch('/api/subject', {
                method: 'PUT',
                body: JSON.stringify({ categoryId: updateData.category.categoryId, content: updateData.content, title: updateData.title, postId: updateData.postId, videoLink: updateData.videoLink })
            })
            const response = await request.json();
            if (response.status !== 200) throw Error(response.error);
            toast({ description: "Course Updated Successfully" });
            window.location.href = "/admin/posts?categoryId=" + categoryId;
        } catch (error: any) {
            toast({ variant: "destructive", title: "Updating Course Failed", description: error.toString() });
            console.error(error);
        }
    };


    // Function to handle deleting a course
    const handleDelete = async (postId: string) => {
        try {
            const request = await fetch('/api/subject?postId=' + postId, {
                method: 'DELETE',
            })
            const response = await request.json();
            if (response.status !== 200) throw Error(response.error);
            toast({ description: "Course Deleted Successfully" });
            window.location.href = "/admin/posts?categoryId=" + categoryId;
        } catch (error: any) {
            toast({ variant: "destructive", title: "Deleting Course Failed", description: error.toString() });
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {

            try {
                const req = await fetch(`/api/posts/category?categoryId=${categoryId}`);
                const res = await req.json();
                setCourses(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, [categoryId]);

    if (!categoryId) {
        window.location.href = "/admin/packages";
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Subject</h2>
            <section>
                <CreateDialog categoryId={categoryId || ""} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {isLoading ? <p>Loading...</p> : courses.length === 0 ? (
                        <p>No subject to show</p>
                    ) : (
                        courses.map((course, index) => (
                            <CourseCard
                                key={course.postId} // Use a unique identifier for the key
                                course={course}
                                onEdit={handleEdit}
                                onDelete={() => handleDelete(course.postId)}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}