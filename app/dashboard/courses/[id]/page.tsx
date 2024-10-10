"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TCourses, TPosts } from '@/app/lib/types';
import ReactMarkdown from 'react-markdown'; // Importing react-markdown
import remarkGfm from 'remark-gfm';


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

    // State to track which syllabus item is expanded
    const [expandedItems, setExpandedItems] = useState<string | null>(null);

    // Toggle function for expanding/collapsing syllabus items
    const toggleItem = (postId: string) => {
        setExpandedItems((prev) => (prev == postId ? null : postId));
    };


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

    if (loading) return (
        <div className="relative md:ml-52 mt-16 p-6">
            <p>Loading...</p>
        </div>
    )
    if (error) return (
        <div className="relative md:ml-52 mt-16 p-6">
            <p>{error}</p>
        </div>)

    if (!courseData) return (
        <div className="relative md:ml-52 mt-16 p-6">
            <p>Courses could not be found</p>
        </div>)
    return (
        <div className="relative md:ml-52 mt-16 p-6">
            {/* Course Image */}
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
                {/* Course Image */}
                <Image
                    src={courseData.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${courseData.imageName}` : "/images/courses/default.png"}
                    alt={courseData.categoryTitle}
                    width={600}
                    height={600}
                    className="rounded-lg shadow-lg w-full lg:w-96 object-cover"
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
                <p className='text-gray-400 text-sm'>Note: We have sample contents for now, we will update the actual contents real soon.</p>
                {posts ? posts.map((topic, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            <h2 className="text-lg font-medium text-gray-600">{(index + 1) + ". " + topic.title}</h2>
                        </AccordionTrigger>
                        <AccordionContent>


                            {/* Dropdown Content (visible when expanded) */}
                            <div className="mt-2 pl-4 border-l-2 border-gray-300">
                                <ReactMarkdown className="prose prose-lg"
                                    remarkPlugins={[remarkGfm]} // Adds support for GitHub Flavored Markdown
                                >{topic.content}</ReactMarkdown> {/* Render markdown */}
                            </div>

                            {/* Display Video Player if course is active */}
                            <div className="mt-2">
                                {false ? (
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={topic.videoLink}
                                        title="Video Player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <p className="text-gray-600 italic">
                                        We will update the video once the course is active.
                                    </p>
                                )}
                            </div>

                            {/* Notes Button */}
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Notes</h3>
                                {false ? (
                                    <Button
                                        className="mt-2 bg-blue text-white px-4 py-2 rounded-lg"
                                        onClick={() => setPdfUrl("topic.noteLink")}
                                    >
                                        View PDF Notes
                                    </Button>
                                ) : (
                                    <p className="text-gray-600 italic">
                                        Notes will be provided once the course is active.
                                    </p>
                                )}
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
