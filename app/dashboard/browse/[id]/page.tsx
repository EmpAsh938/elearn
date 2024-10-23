"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { TCourses, TPosts } from '@/app/lib/types';
import { toast } from '@/hooks/use-toast';
import { useGlobalContext } from '@/hooks/use-globalContext';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown'; // Importing react-markdown
import remarkGfm from 'remark-gfm';
import useResponsiveSize from '@/hooks/use-responsiveSize';
import Cart from '../cart';
import { useCartContext } from '@/hooks/use-cartContext';


const CourseDetails = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [courseData, setCourseData] = useState<TCourses | null>(null); // State to hold course data
    const [posts, setPosts] = useState<TPosts[]>([]); // State to hold posts within the course
    const [loading, setLoading] = useState<boolean>(true);
    const [booking, setBooking] = useState<boolean>(false);
    const [alreadyBooked, setAlreadyBooked] = useState<boolean>(false); // New state for checking booking status
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = params;
    const { user } = useGlobalContext();
    const { addToCart } = useCartContext();
    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    // State to track which syllabus item is expanded
    const [expandedItems, setExpandedItems] = useState<string | null>(null);

    // Toggle function for expanding/collapsing syllabus items
    const toggleItem = (postId: string) => {
        setExpandedItems((prev) => (prev == postId ? null : postId));
    };


    // Function to check if the course is already booked
    const checkIfBooked = useCallback(async () => {
        if (!user) return;
        try {
            const response = await fetch(`/api/courses/booked/check?userId=${user.id}&categoryId=${id}`);
            const data = await response.json();

            // If the course is already booked, update the state
            if (data.status === 200 && data.body) {
                setAlreadyBooked(true);
            }
        } catch (err) {
            console.error("Error checking booking status:", err);
        }
    }, [id, user]);

    // Function to handle booking
    const handleBookNow = async (categoryId: string) => {
        if (courseData?.categoryType.toLowerCase() === 'upcoming') return;
        if (!user || alreadyBooked) return;

        const userConfirmed = window.confirm("Are you sure you want to book this course?");
        if (!userConfirmed) return;

        setBooking(true);

        try {
            const response = await fetch('/api/courses/booked', {
                method: 'POST',
                body: JSON.stringify({ userId: user.id, categoryId }),
            });

            const data = await response.json();
            if (data.status !== 201) throw Error("Booking was already done or some other issues occurred");
            toast({ description: 'Course booked successfully! We will contact you soon.' });
            setAlreadyBooked(true); // Mark as booked

        } catch (err) {
            console.error("Booking error:", err);
            toast({ variant: 'destructive', description: "Booking was already done or some other issues occurred" });
        } finally {
            setBooking(false);
        }
    };

    const fetchCourseData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch course by ID
            const courseRes = await fetch(`/api/courses/single/?categoryId=${id}`);
            if (!courseRes.ok) throw new Error('Failed to fetch course data.');
            const courseData = await courseRes.json();

            // Fetch posts within the course
            const postsRes = await fetch(`/api/posts/category/?categoryId=${id}`);
            if (!postsRes.ok) throw new Error('Failed to fetch posts data.');
            const postsData = await postsRes.json();

            setCourseData(courseData.body);
            setPosts(postsData.body);
        } catch (error: any) {
            console.error("Error fetching course or posts:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCourseData();
        checkIfBooked(); // Check if the course is already booked on component mount
    }, [fetchCourseData, checkIfBooked]);

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

    const isUpcoming = courseData?.categoryType.toLowerCase() === 'upcoming' || courseData?.categoryType === '' || courseData?.categoryType === null;

    return (
        <div className="md:ml-52 mt-16 p-6 flex flex-col lg:flex-row gap-6">
            {courseData && (
                <div className="w-full flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl md:text-3xl font-bold">{courseData.categoryTitle}</h1>

                            <Badge variant="default" className={isUpcoming ? "bg-green capitalize" : "bg-blue capitalize"}>{courseData.categoryType || "Upcoming"}</Badge>
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
                                // <div className="space-y-6">
                                //     {posts.length > 0 ? posts.map((instructor) => (
                                //         <div key={instructor.postId} className="flex items-center space-x-4">
                                //             <Image
                                //                 src={"/images/profile/user.jpeg"}
                                //                 alt={instructor.mentor}
                                //                 width={50}
                                //                 height={50}
                                //                 className="rounded-full"
                                //             />
                                //             <div>
                                //                 <h4 className="text-lg font-semibold">{instructor.mentor}</h4>
                                //                 <p className="text-sm text-gray-600">{"An experienced educator with over 5 years of experience"}</p>
                                //             </div>
                                //         </div>
                                //     )) : <p>We will update the instructor details soon.</p>}
                                // </div>
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
                        <div className="relative p-4 border rounded-lg shadow-lg">
                            <Image
                                src={courseData.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${courseData.imageName}` : "/images/courses/default.png"}
                                alt={courseData.categoryTitle}
                                width={imageSize.width}
                                height={imageSize.height}
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

                            {/* Add to Cart Button for Ongoing Courses */}
                            {courseData.categoryType && courseData.categoryType.toLowerCase() === "ongoing" && (
                                <Button
                                    onClick={() => addToCart(courseData)}
                                    className="absolute top-0 right-0 w-fit h-fit bg-green text-white px-4 py-2 rounded hover:bg-green"
                                >
                                    Add to Cart
                                </Button>
                            )}

                            {courseData.categoryType.toLowerCase() === "ongoing" ? null : <Button
                                onClick={() => handleBookNow(courseData.categoryId)}
                                className={`mt-6 w-full ${booking ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue hover:bg-blue-700'} text-white`}
                                disabled={booking || alreadyBooked || isUpcoming}
                            >
                                {alreadyBooked ? 'Already Booked' : booking ? 'Booking...' : isUpcoming ? 'Upcoming' : 'Book Now'}
                            </Button>}
                        </div>
                    </div>

                    <Cart isModalOpen={isModalOpen} toggleModal={toggleModal} />
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
