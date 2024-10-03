"use client";

import CoursesList from "@/components/dashboard/courselist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const tags = ['All', 'JavaScript', 'React', 'CSS', 'Next.js', 'Node.js', 'TypeScript'];
export default function Courses() {
    const [selectedTag, setSelectedTag] = useState(tags[0]);
    return (
        <div className="ml-20 md:ml-52 mt-16 p-6">
            <section>
                <h2 className="text-left text-2xl font-semibold mb-4">Browse Courses</h2>

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


                </div>
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

                <CoursesList />
            </section>
        </div>
    )
}