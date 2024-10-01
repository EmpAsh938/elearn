"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Import ShadCN modal components
import ReactMarkdown from "react-markdown"; // Import markdown parser

interface Course {
    postId: string;
    title: string;
    content: string;
    videoLink: string;
}

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isForbidden, setIsForbidden] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // State for the selected course
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (Object.entries(user).length === 0) throw Error("User not found");
                const req = await fetch('/api/subject/user?userId=' + user.id);
                const res = await req.json();
                if (res.status == 403) {
                    return setIsForbidden(true);
                }
                setCourses(res.body);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCourses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openModal = (course: Course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null); // Clear the selected course
    };

    if (isForbidden) {
        return <div className="p-6 h-screen">
            <p>You are forbidden to access the resource/content with this current plan.</p>
        </div>;
    }

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Your Courses</h1>
                <p className="text-lg text-darkNavy mb-4">
                    Manage and track your progress in the subjects under your <span className="text-blue font-medium">{user.faculty} plan </span>.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(subject => (
                    <Card key={subject.postId} className="bg-white shadow-lg">
                        <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                            <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                                <BookOpen className="mr-2 text-blue" /> {subject.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Image src="/images/math.jpeg" height={200} width={300} alt="Math Subject" />
                            <Button
                                className="bg-blue text-white w-full"
                                onClick={() => openModal(subject)} // Open modal on click
                            >
                                View Course Content
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Modal for displaying course content in markdown */}
            <Dialog open={isModalOpen} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        {selectedCourse && (
                            <>
                                <DialogTitle className="text-2xl font-bold mb-4">{selectedCourse.title}</DialogTitle>

                                {/* Video Section */}
                                <div className="mb-4">
                                    {/* If the videoLink is a direct video link (mp4, etc.) */}
                                    {selectedCourse.videoLink.endsWith('.mp4') ? (
                                        <video
                                            className="w-full h-auto"
                                            controls
                                            src={selectedCourse.videoLink}
                                        // alt={`Video for ${selectedCourse.title}`}
                                        />
                                    ) : (
                                        /* Assuming the videoLink is a YouTube or external link */
                                        <iframe
                                            className="w-full h-64 md:h-96"
                                            src={selectedCourse.videoLink}
                                            title={`Video for ${selectedCourse.title}`}
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>

                                {/* Course Content (Markdown) */}
                                <div className="mb-4">
                                    <h3 className="font-semibold">Course Content</h3>
                                    <ReactMarkdown className="prose">
                                        {selectedCourse.content}
                                    </ReactMarkdown>
                                </div>

                                <Button onClick={closeModal} className="mt-4">
                                    Close
                                </Button>
                            </>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}
