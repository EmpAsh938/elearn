"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define interfaces for Course and SyllabusItem
interface SyllabusItem {
    topic: string;
    videoPath: string;
    notes: string;
}

interface Course {
    id: number;
    title: string;
    description: string;
    syllabus: SyllabusItem[];
}

// Mock course data with proper typing
const courseData: Course[] = [
    {
        id: 1,
        title: "JavaScript Essentials",
        description: "Master JavaScript, from variables to closures and async programming.",
        syllabus: [
            { topic: "Introduction to JavaScript", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
            { topic: "JavaScript Variables", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
            { topic: "JavaScript Functions", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" }
        ],
    },
    {
        id: 2,
        title: "React for Beginners",
        description: "Comprehensive guide to React from basics to hooks and context.",
        syllabus: [
            { topic: "Introduction to React", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
            { topic: "React Components", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" },
            { topic: "React Hooks", videoPath: "/videos/landing-bg.mp4", notes: "/notes/pdf-sample.pdf" }
        ],
    },
];

// Define props for the component
interface CourseDetailsProps {
    params: {
        id: string;
    };
}

const CourseDetails = ({ params }: CourseDetailsProps) => {
    const { id } = params;
    const [course, setCourse] = useState<Course | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);  // For PDF modal handling


    useEffect(() => {
        if (id) {
            const courseDetail = courseData.find(course => course.id === parseInt(id));
            if (courseDetail) {
                setCourse(courseDetail);  // If found, set the entire course object
            } else {
                console.error('Course not found');
            }
        }
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className="relative ml-20 md:ml-52 mt-16 p-6">
            <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
            <p className="mb-6 text-gray-700">{course.description}</p>

            <div className="space-y-4">
                {course.syllabus.map((topic, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{topic.topic}</h2>

                        {/* Video Player */}
                        <div className="mt-2">
                            <video width="100%" height="315" controls>
                                <source src={topic.videoPath} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Notes Button */}
                        <div className="mt-4">
                            <h3 className="text-lg font-medium">Notes</h3>
                            <Button
                                className="mt-2 bg-blue text-white px-4 py-2 rounded-lg"
                                onClick={() => setPdfUrl(topic.notes)
                                }
                            >
                                View PDF Notes
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/" className="text-blue-600 underline mt-6 inline-block">Back to Courses</Link>

            {/* Modal to display PDF */}
            {pdfUrl ? (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl">
                        <button
                            className="mb-4 text-red-500 "
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
