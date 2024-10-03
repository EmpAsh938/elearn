"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Sample Course Data (replace with API calls in production)
const courseData = {
    title: "Physical Class CEE Repeater's Batch - 2082",
    bestseller: true,
    overview: "This course is designed for students who have previously taken the Common Entrance Examination (CEE) and are aiming to improve their scores. It helps them strengthen their understanding and strategies to achieve a higher rank and secure admission to top medical colleges.",
    curriculum: [
        "Introduction to CEE Exam Structure",
        "Daily Practice Sessions for MCQs",
        "Advanced Problem-Solving Techniques",
        "Mock Tests and Strategy Sessions",
        "Review Sessions with Experts"
    ],
    instructors: [
        { name: "Dr. John Doe", bio: "An experienced educator with over 15 years of teaching CEE courses.", image: "/images/profile/user.jpeg" },
        { name: "Prof. Jane Smith", bio: "Expert in Biology and Chemistry with a track record of producing top-ranked students.", image: "/images/profile/user.jpeg" }
    ],
    price: "Rs. 25000",
    features: [
        "Free Online Class Worth Rs.4499",
        "Live classes",
        "Ask Teachers any time",
        "Group Discussion",
        "Quality Content",
        "Curated Notes and Videos"
    ],
    image: "/images/courses/course1.png",
    isEnrolled: false,
};

const CourseDetails = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState('overview');  // Tab state
    const { id } = params;

    // Tab Data
    const tabs = ['Overview', 'Curriculum', 'Instructor'];

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="border-t border-gray-200 p-6 flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl md:text-3xl font-bold">{courseData.title}</h1>
                        {courseData.bestseller && (
                            <span className="px-3 py-1 bg-red-500 text-white text-sm rounded">Best Seller</span>
                        )}
                        <button className="ml-2 text-gray-500 hover:text-gray-700">
                            &#128279; {/* Icon representing share */}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-4 gap-4 flex-wrap">
                        {tabs.map((tab) => (
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
                                {courseData.overview}
                            </p>
                        )}
                        {activeTab === 'curriculum' && (
                            <ul className="list-disc ml-5 text-gray-700">
                                {courseData.curriculum.map((item, index) => (
                                    <li key={index} className="mb-2">{item}</li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'instructor' && (
                            <div className="space-y-6">
                                {courseData.instructors.map((instructor, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <Image
                                            src={instructor.image}
                                            alt={instructor.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold">{instructor.name}</h4>
                                            <p className="text-sm text-gray-600">{instructor.bio}</p>
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
                            src={courseData.image}
                            alt={courseData.title}
                            width={400}
                            height={200}
                            className="rounded-lg"
                        />
                        <h2 className="text-2xl font-semibold mt-4">{courseData.price}</h2>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            {courseData.features.map((feature, index) => (
                                <li key={index}>✓ {feature}</li>
                            ))}
                        </ul>

                        <Button className="mt-6 w-full bg-blue hover:bg-blue text-white">Book Now</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default CourseDetails;
