"use client";

import RightSidebar from "@/components/dashboard/rightsidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import useResponsiveSize from "@/hooks/use-responsiveSize";
import Link from "next/link";

type Course = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    status: string;
};

const courses: Course[] = [
    {
        id: 1,
        title: "Mathematics 101",
        description: "An introductory course to Mathematics",
        thumbnail: "/images/courses/course1.png",
        status: "Ongoing"
    },
    {
        id: 2,
        title: "Physics Basics",
        description: "Fundamentals of Physics covering key principles",
        thumbnail: "/images/courses/course1.png",
        status: "Upcoming"
    },
    {
        id: 3,
        title: "History of Art",
        description: "A deep dive into the history of art",
        thumbnail: "/images/courses/course1.png",
        status: "Completed"
    }
];

export default function Classes() {
    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size

    return (
        <div className="mr-0 md:mr-64 ml-0 md:ml-52 mt-16 p-6">
            <RightSidebar />

            {/* Display classes/courses in cards */}
            <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="relative w-full h-48 overflow-hidden">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                width={imageSize.width}
                                height={imageSize.height}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <CardContent className="flex flex-col justify-between">
                            <div>
                                <CardHeader className="">
                                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-500">{course.description}</CardDescription>
                                </CardHeader>
                                <Badge
                                    className={`mt-2 px-2 py-1 text-sm rounded-full ${course.status === "Ongoing"
                                        ? "bg-green text-white"
                                        : course.status === "Upcoming"
                                            ? "bg-blue text-white"
                                            : "bg-gray-500 text-white"
                                        }`}
                                >
                                    {course.status}
                                </Badge>
                            </div>
                            <Link
                                href={`/console/classes/${course.id}`}
                                className="mt-6 w-full bg-gray-800 py-2 rounded-sm text-white hover:bg-gray-700 flex items-center justify-center"
                            >
                                View Details
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
