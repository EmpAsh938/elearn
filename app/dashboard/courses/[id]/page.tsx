"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TCourses, TPosts } from '@/app/lib/types';

// Define interfaces for Course and SyllabusItem
// interface SyllabusItem {
//     topic: string;
//     videoPath: string;
//     notes: string;
// }

// interface Course {
//     id: number;
//     title: string;
//     description: string;
//     imageUrl: string;
//     syllabus: SyllabusItem[];
// }

// Mock course data with proper typing
// const courseData: Course[] = [
//     {
//         id: 1,
//         title: "JavaScript Essentials",
//         description: "Master JavaScript, from variables to closures and async programming.",
//         imageUrl: "/images/courses/course1.png", // Added image URL
//         syllabus: [
//             { topic: "Introduction to JavaScript", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
//             { topic: "JavaScript Variables", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
//             { topic: "JavaScript Functions", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" }
//         ],
//     },
//     {
//         id: 2,
//         title: "React for Beginners",
//         description: "Comprehensive guide to React from basics to hooks and context.",
//         imageUrl: "/images/courses/course2.webp", // Added image URL
//         syllabus: [
//             { topic: "Introduction to React", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
//             { topic: "React Components", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
//             { topic: "React Hooks", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" }
//         ],
//     },
// ];

// Define props for the component
interface CourseDetailsProps {
    params: {
        id: string;
    };
}

const CourseDetails = ({ params }: CourseDetailsProps) => {
    const { id } = params;
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);  // For PDF modal handling

    const [courseData, setCourseData] = useState<TCourses | null>(null); // State to hold course data
    const [posts, setPosts] = useState<TPosts[]>([]); // State to hold posts within the course
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch course data by ID and posts within that course
    useEffect(() => {
        const fetchCourseData = async () => {
            setError(null);

            try {
                // Fetch course by ID
                const courseRes = await fetch(`/api/courses/single/?categoryId=${id}`);
                const courseData = await courseRes.json();

                // Fetch posts within the course
                const postsRes = await fetch(`/api/posts/category/?categoryId=${id}`);
                const postsData = await postsRes.json();

                // Set the fetched data
                setCourseData(courseData.body);
                setPosts(postsData.body);
            } catch (error) {
                console.error("Error fetching course or posts:", error);
                setError("Failed to load course data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id]);

    if (!loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    if (!courseData) return <p>Courses were not found</p>

    return (
        <div className="relative md:ml-52 mt-16 p-6">
            {/* Course Image */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                {/* Course Image */}
                <Image
                    src={courseData.imageName || "/images/courses/default.png"}
                    alt={courseData.categoryTitle}
                    width={600}
                    height={600}
                    className="rounded-lg shadow-lg w-64 h-64 object-cover"
                />

                {/* Course Title and Description */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-semibold mb-4">{courseData.categoryTitle}</h1>
                    <p className="text-gray-700">{courseData.categoryDescription}</p>
                </div>
            </div>


            {/* Collapsible Syllabus List */}
            <Accordion type="single" collapsible className="space-y-4">
                <h2 className="text-2xl font-semibold">Table of Contents</h2>
                {posts ? posts.map((topic, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            <h2 className="text-lg font-medium text-gray-600">{(index + 1) + ". " + topic.title}</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            {/* Video Player */}
                            <div className="mt-2">
                                <video width="100%" height="315" controls>
                                    <source src={topic.videoLink || "/videos/landing-bg.mp4"} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Notes Button */}
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Notes</h3>
                                {/* <Button
                                    className="mt-2 bg-blue text-white px-4 py-2 rounded-lg"
                                    onClick={() => setPdfUrl(topic.)}
                                >
                                    View PDF Notes
                                </Button> */}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )) : <p>Posts could not be loaded</p>}
            </Accordion>

            {/* Back to Courses Link */}
            <Link href="/dashboard/courses" className="text-blue underline mt-6 inline-block">Back to Courses</Link>

            {/* Modal to display PDF */}
            {pdfUrl ? (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl">
                        <button
                            className="mb-4 text-red"
                            onClick={() => setPdfUrl(null)}
                        >
                            Close
                        </button>
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="600px"
                            title="PDF Notes"
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CourseDetails;