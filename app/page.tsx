"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import CourseCarousel from "@/components/courseCarousel";
import { TCourses } from "./lib/types";


export default function Home() {
    const [showPopup, setShowPopup] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [browseCourses, setBrowseCourses] = useState<TCourses[]>([]);


    useEffect(() => {
        const fetchCourses = async () => {

            try {
                const req = await fetch(`/api/courses/all`);
                const res = await req.json();
                setBrowseCourses(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [])

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="flex flex-col gap-8">
                <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] border-y border-gray-300">
                    {/* Left: Vertically Scrollable Courses Links */}
                    <div className="hidden md:block overflow-y-auto max-h-[calc(100vh-80px)] border-r border-gray-300 px-3 py-5 pl-10">
                        {/* Sticky title */}
                        <h1 className="absolute top-[81px] bg-white font-bold text-3xl pt-3 z-10">
                            Browse Courses
                        </h1>
                        {/* Scrollable list of courses */}
                        <ul className="space-y-4 pt-10">
                            {browseCourses.map((course) => (
                                <li key={course.categoryId}>
                                    <Link href={`/courses/${course.categoryId}`}>
                                        <span className="text-md text-darkBlue hover:underline tracking-wide">{course.categoryTitle}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Carousel of Images */}
                    <div className="relative w-screen md:w-[calc(100vw-300px)] h-[calc(100vh-80px)] p-4 pr-6 overflow-hidden">
                        {/* Ensure the height is properly defined */}
                        <Carousel />
                    </div>
                </section>

                <section>
                    <h2 className="text-center text-2xl font-semibold py-4">Popular Courses</h2>
                    <p className="max-w-lg w-full px-4 lg:px-0 mx-auto mb-8 text-gray-600 tracking-wide text-justify">Our most popular and top quality courses are designed to enhance and build the lacking knowledge of students by top quality instructors</p>
                    <CourseCarousel />
                </section>

                {/* Why Students Love Us */}
                <section className="px-5 py-10 bg-blue-100">
                    <h2 className="font-bold text-2xl text-center mb-6">Why Students Love Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/quality.png" alt="Quality Education" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Quality Education</h3>
                            <p>We provide top-notch educational resources to ensure you get the best learning experience.</p>
                        </div>
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/accessibility.svg" alt="Accessible Anywhere" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Accessible Anywhere</h3>
                            <p>Learn from the comfort of your home or on the go. Our platform is accessible on all devices.</p>
                        </div>
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/interactive.png" alt="Interactive Learning" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Interactive Learning</h3>
                            <p>Engage with interactive lessons, quizzes, and live classes for a better understanding of concepts.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {/* <section className="px-5 py-10 mb-8">
                    <h2 className="font-bold text-2xl mb-6 text-center">Frequently Asked Questions</h2>
                    <Faq />
                </section> */}
            </main>



            <Footer />

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-6">
                    <div className="relative bg-white overflow-hidden rounded shadow-lg max-w-4xl w-full"> {/* Increased max width */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <Image
                            src="/images/notice.png" // Replace with your notice image path
                            alt="Notice"
                            width={1000} // Increased width
                            height={800} // Increased height
                            className="w-full object-contain"
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
