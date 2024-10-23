"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { TCourses, TPosts } from '@/app/lib/types';
import WheelSpin from '@/components/wheelspin';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'; // Importing react-markdown
import remarkGfm from 'remark-gfm';


const CourseDetails = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [courseData, setCourseData] = useState<TCourses | null>(null); // State to hold course data
    const [posts, setPosts] = useState<TPosts[]>([]); // State to hold posts within the course
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = params;

    // State to track which syllabus item is expanded
    const [expandedItems, setExpandedItems] = useState<string | null>(null);

    // Toggle function for expanding/collapsing syllabus items
    const toggleItem = (postId: string) => {
        setExpandedItems((prev) => (prev == postId ? null : postId));
    };

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
            <div className="overflow-x-hidden">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mx-auto mb-4"></div>
                        <p className="text-gray-700 text-lg font-semibold">Loading course details...</p>
                    </div>
                </div>
                <Footer />
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

    const isUpcoming = courseData?.categoryType.toLowerCase() === 'upcoming' || courseData?.categoryType === '' || courseData?.categoryType === null;

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            {courseData && (
                <div className="border-t border-gray-200 p-6 flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl md:text-3xl font-bold">{courseData.categoryTitle}</h1>
                            <Badge variant="default" className={isUpcoming ? "bg-green capitalize" : "bg-blue capitalize"}>{courseData.categoryType || "Upcoming"}</Badge>
                            <span className="px-3 py-1 bg-red-600 text-white text-sm rounded">Best Seller</span>
                            <button className="ml-2 text-gray-500 hover:text-gray-700">
                                &#128279; {/* Icon representing share */}
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex mt-4 gap-4 flex-wrap">
                            {isUpcoming
                                ? (
                                    <button
                                        key="Overview"
                                        onClick={() => setActiveTab('overview')}
                                        className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        Overview
                                    </button>
                                )
                                : ['Overview', 'Syllabus', 'Instructor'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`px-4 py-2 rounded ${activeTab === tab.toLowerCase() ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {tab}
                                    </button>
                                ))
                            }
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {activeTab === 'overview' && (
                                <p className="text-gray-700 leading-relaxed">
                                    {courseData.categoryDescription}
                                </p>
                            )}
                            {activeTab === 'syllabus' && (
                                <ul className="list-none ml-5 text-gray-700">
                                    {posts.length > 0 ? posts.map((item) => (
                                        <li key={item.postId} className="mb-2">
                                            {/* Dropdown Title */}
                                            <button
                                                onClick={() => toggleItem(item.postId)}
                                                className="flex justify-between w-full text-left bg-gray-100 px-4 py-2 text-gray-800 font-bold rounded-md hover:bg-gray-200"
                                            >
                                                {item.title}
                                                <span>{expandedItems == item.postId ? '↑' : '↓'}</span> {/* Toggle Icon */}
                                            </button>

                                            {/* Dropdown Content (visible when expanded) */}
                                            {expandedItems == item.postId && (
                                                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                                                    <ReactMarkdown className="prose prose-lg"
                                                        remarkPlugins={[remarkGfm]} // Adds support for GitHub Flavored Markdown
                                                    >{item.content}</ReactMarkdown> {/* Render markdown */}
                                                </div>
                                            )}
                                        </li>
                                    )) : <p>We will update the syllabus soon.</p>}
                                </ul>
                            )}
                            {activeTab === 'instructor' && (
                                <div className="space-y-6">
                                    {/* {posts.map((instructor) => (
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
                                    ))} */}
                                    <p className="text-sm text-gray-600">This section will be revealed soon</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="p-4 border rounded-lg shadow-lg">
                            <Image
                                src={courseData.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${courseData.imageName}` : "/images/courses/default.png"}
                                alt={courseData.categoryTitle}
                                width={400}
                                height={200}
                                className="rounded-lg"
                            />
                            {isUpcoming ? null : <h2 className="text-2xl font-semibold mt-4">NRs.{courseData.price || ""}</h2>}
                            {/* Hardcoded Features */}
                            <ul className="mt-4 space-y-2 text-gray-600">
                                <li>✓ Live classes</li>
                                <li>✓ Ask Teachers any time</li>
                                <li>✓ Access on mobile and web</li>
                                <li>✓ Quality Content</li>
                                <li>✓ Curated Notes and Videos</li>
                                <li>✓ 24/7 Support</li>
                            </ul>


                            <Button
                                className={`mt-6 w-full ${isUpcoming ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue hover:bg-blue-700'} text-white`}
                                disabled={isUpcoming}
                            >
                                {isUpcoming ? 'Upcoming' : <Link href="/login">Book Now</Link>}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {isUpcoming ? null : <WheelSpin />}
            <Footer />
        </div>
    );
};

export default CourseDetails;
