"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const liveClasses = [
    {
        id: 1,
        title: "Mathematics Live Class",
        description: "Join our interactive mathematics live class for Grade 10 students.",
        thumbnail: "/images/courses/course2.webp",
        date: "July 28, 2024",
        time: "10:00 AM - 12:00 PM",
        tags: ["Grade 10", "Mathematics"]
    },
    {
        id: 2,
        title: "Physics Live Class",
        description: "Advanced physics live class for Grade 12 students.",
        thumbnail: "/images/courses/course2.webp",
        date: "July 29, 2024",
        time: "2:00 PM - 4:00 PM",
        tags: ["Grade 12", "Physics"]
    },
    {
        id: 3,
        title: "Chemistry Live Class",
        description: "Detailed chemistry live class for Grade 11 students.",
        thumbnail: "/images/courses/course1.png",
        date: "July 30, 2024",
        time: "11:00 AM - 1:00 PM",
        tags: ["Grade 11", "Chemistry"]
    },
    // Add more live classes as needed
];

const tags = ["All", "Grade 10", "Grade 11", "Grade 12"];

export default function LiveClass() {
    const [selectedTag, setSelectedTag] = useState("All");

    const filteredClasses = selectedTag === "All"
        ? liveClasses
        : liveClasses.filter(liveClass => liveClass.tags.includes(selectedTag));

    return (
        <>
            {/* Navbar positioned fixed */}
            <Navbar />
            <main className="pt-24 px-4">
                <section className="text-center py-8">
                    <h1 className="text-4xl font-bold mb-4">Upcoming Live Classes</h1>
                    <p className="text-lg mb-6">Join our live classes and interact with expert instructors in real-time.</p>
                </section>

                {/* Tags for selecting live classes */}
                <section className="flex justify-center mb-8">
                    <div className="flex space-x-4">
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
                </section>

                {/* Display all live classes */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    {filteredClasses.map(liveClass => (
                        <div key={liveClass.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <Image
                                src={liveClass.thumbnail}
                                alt={liveClass.title}
                                width={400}
                                height={250}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2">{liveClass.title}</h2>
                                <p className="text-gray-700 mb-4">{liveClass.description}</p>
                                <p className="text-lg font-semibold mb-2">Date: {liveClass.date}</p>
                                <p className="text-lg font-semibold mb-4">Time: {liveClass.time}</p>
                                <Button className="w-full bg-red">Join Now</Button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}
