"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { TCourses, TPosts } from '@/app/lib/types';

const CourseDetails = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [courseData, setCourseData] = useState<TCourses | null>(null); // State to hold course data
    const [posts, setPosts] = useState<TPosts[]>([]); // State to hold posts within the course
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = params;

    // Fetch course data by ID and posts within that course
    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
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

    // Custom Loading Component
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
            <div className="flex items-center justify-center min-h-screen bg-red-50">
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

    return (
        <div className="ml-20 md:ml-52 mt-16 p-6 flex flex-col lg:flex-row gap-6">
            {courseData && (
                <div className="w-full flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl md:text-3xl font-bold">{courseData.categoryTitle}</h1>

                            <span className="px-3 py-1 bg-red-600 text-white text-sm rounded">Best Seller</span>
                            <button className="ml-2 text-gray-500 hover:text-gray-700">
                                &#128279; {/* Icon representing share */}
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex mt-4 gap-4 flex-wrap">
                            {['Overview', 'Syllabus', 'Instructor'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-4 py-2 rounded ${activeTab === tab.toLowerCase() ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {activeTab === 'overview' && (
                                <p className="text-gray-700 leading-relaxed">
                                    {courseData.categoryDescription}
                                </p>
                            )}
                            {activeTab === 'syllabus' && (
                                <ul className="list-disc ml-5 text-gray-700">
                                    {posts.map((item) => (
                                        <li key={item.postId} className="mb-2">{item.title}</li>
                                    ))}
                                </ul>
                            )}
                            {activeTab === 'instructor' && (
                                <div className="space-y-6">
                                    {posts.map((instructor) => (
                                        <div key={instructor.postId} className="flex items-center space-x-4">
                                            <Image
                                                src={"/images/profile/user.jpeg"}
                                                alt={instructor.mentor}
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h4 className="text-lg font-semibold">{instructor.mentor}</h4>
                                                <p className="text-sm text-gray-600">{"An experienced educator with over 5 years of experience"}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="p-4 border rounded-lg shadow-lg">
                            <Image
                                src={courseData.imageName || "/images/courses/default.png"}
                                alt={courseData.categoryTitle}
                                width={400}
                                height={200}
                                className="rounded-lg"
                            />
                            <h2 className="text-2xl font-semibold mt-4">{courseData.price || "NRs. 3000"}</h2>
                            {/* Hardcoded Features */}
                            <ul className="mt-4 space-y-2 text-gray-600">
                                <li>✓ Live classes</li>
                                <li>✓ Ask Teachers any time</li>
                                <li>✓ Access on mobile and web</li>
                                <li>✓ Quality Content</li>
                                <li>✓ Curated Notes and Videos</li>
                                <li>✓ 24/7 Support</li>
                            </ul>

                            <Button className="mt-6 w-full bg-blue hover:bg-blue text-white">Book Now</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
