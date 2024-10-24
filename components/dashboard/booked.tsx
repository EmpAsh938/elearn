"use client";

import { TCourses } from "@/app/lib/types";
import { Button } from "@/components/ui/button";  // ShadCN UI Button component
import { useGlobalContext } from "@/hooks/use-globalContext";
import useResponsiveSize from "@/hooks/use-responsiveSize";
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";
import { useEffect, useState } from "react";

interface IBookedCourse {
    bookedId: string;
    category: TCourses;
}

const Booked = () => {

    const { user } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<IBookedCourse[]>([]);

    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size


    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };



    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            if (!user.id) return;
            try {
                const req = await fetch(`/api/courses/booked?userId=${user.id}`);
                const res = await req.json();
                const courses = res.body;  // Ensure body is typed as Courses[]
                setCourses(courses);


            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();


    }, [user.id])
    // Custom Loading Component
    if (loading) {
        return (
            <div className="">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg font-semibold">Loading course details...</p>
                </div>
            </div>
        );
    }

    // Custom Error Component
    if (error) {
        return (
            <div className="">
                <div className="text-center">
                    <p className="text-red-500 text-2xl font-bold mb-4">Oops! Something went wrong.</p>
                    <p className="text-gray-700">{error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4 bg-red-500 hover:bg-red-700 text-white">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (!courses || courses.length === 0) return (
        <div className="">
            <div className="text-center">
                <p className="text-gray-700 text-lg font-semibold">Please purchase or book courses to view here</p>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {courses.map((course) => (
                <div
                    key={course.bookedId}
                    className="flex flex-col items-start border rounded-lg shadow-md overflow-hidden"
                >
                    {/* Thumbnail */}
                    <Image
                        src={course.category.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.category.imageName}` : "/images/courses/default.png"}
                        alt={course.category.categoryTitle}
                        width={imageSize.width}
                        height={imageSize.height}
                        className="object-cover rounded w-full"
                    />

                    {/* Course Info */}
                    <div className="px-4 py-4 w-full space-y-2">
                        <h3 className="text-lg font-semibold">{course.category.categoryTitle}</h3>
                        <p className="text-sm text-gray-600">{sliceDescription(course.category.categoryDescription)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            <Link href={`courses/${course.category.categoryId}`} className="text-lg font-medium text-blue-600 underline">
                                View Details
                            </Link>
                            <span className="bg-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                                Booked
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Booked;
