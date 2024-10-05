"use client";

import { TCourses } from "@/app/lib/types";
import CoursesList from "@/components/dashboard/courselist";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
        <div className="md:ml-52 mt-16 p-6">
            <section>
                <h2 className="text-left text-2xl font-semibold mb-4">Browse Courses</h2>
                {/* 
                <div className="flex items-center justify-end ">
                    <div className="flex items-center border border-gray-300 rounded px-2">

                        <Search className="h-4 w-4" />
                        <Input
                            type="text"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for courses..."
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 border-none outline-none"
                        />
                    </div>


                </div> */}
                {/* Tags for selecting grade packages */}
                <div className="flex items-center flex-wrap gap-2 my-4">
                    {tags.map(tag => (
                        <Button
                            key={tag}
                            className={`px-4 py-2 ${selectedTag === tag ? 'bg-blue text-white' : 'bg-lightBlue text-textDarkNavy'} hover:${selectedTag === tag ? 'bg-blue' : 'bg-lightBlue'}`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                </div>

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
                    <CoursesList courses={courses} />
                )}
            </section>
        </div>
    )
}