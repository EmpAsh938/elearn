"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TCourses } from "../lib/types";
import { Badge } from "@/components/ui/badge";

export default function Courses() {
    const [tags, setTags] = useState<string[]>([]);
    const [courses, setCourses] = useState<TCourses[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const req = await fetch(`/api/courses/all`);
                const res = await req.json();
                const courses: TCourses[] = res.body;  // Ensure body is typed as Courses[]
                setCourses(courses);

                // Filter out empty or invalid categories
                const validCategories = courses
                    .map(item => item.mainCategory)
                    .filter(category => category && category.trim() !== "");

                // Convert to a Set and add "All" as the default option
                setTags(() => ["All", ...new Set<string>(validCategories)]);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    return (
        <div className="overflow-x-hidden">
            {/* Navbar positioned fixed */}
            <Navbar />
            <main className="p-6">
                <section className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
                    <p className="text-lg mb-6 text-gray-500">
                        Explore our comprehensive courses designed to boost your knowledge and career from our diverse range of topics.
                    </p>
                </section>

                {/* Tags for selecting grade packages */}
                <section className="flex justify-center flex-wrap gap-2 mb-8">
                    {tags.map(tag => (
                        <Button
                            key={tag}
                            className={`px-4 py-2 ${selectedTag === tag ? 'bg-blue text-white' : 'bg-lightBlue text-textDarkNavy'} hover:${selectedTag === tag ? 'bg-blue' : 'bg-lightBlue'}`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                </section>

                {/* Display loading indicator, error, or courses */}
                {loading ? (
                    <div className="flex justify-center">
                        <p className="text-xl text-gray-500">Loading courses...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                ) : (
                    <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 px-4">
                        {courses.map(pkg => (
                            <Link key={pkg.categoryId} href={`/courses/${pkg.categoryId}`} className="block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                    <Image
                                        src={pkg.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${pkg.imageName}` : "/images/courses/default.png"}
                                        alt={pkg.categoryTitle}
                                        width={400}
                                        height={250}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        {/* Limit the title to 2 lines and add ellipsis for overflow */}
                                        <h2 className="text-2xl font-bold mb-2 line-clamp-2 overflow-hidden text-ellipsis">
                                            {pkg.categoryTitle}
                                        </h2>

                                        {/* Description can remain as is */}
                                        <p className="text-textDarkNavy line-clamp-2 overflow-hidden text-ellipsis">
                                            {pkg.categoryDescription}
                                        </p>

                                        <Badge variant="default" className={(!pkg.courseType || pkg.courseType.toLowerCase() == "upcoming") ? "bg-green" : "bg-blue"}>{pkg.courseType || "Upcoming"}</Badge>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
