"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LucideFile, LucideVideo } from "lucide-react"; // Icons

export default function Materials() {
    const [searchTerm, setSearchTerm] = useState("");

    // Sample list of materials (this can be dynamic)
    const materials = [
        {
            title: "Introduction to React",
            description: "Learn the basics of React.js with this comprehensive guide.",
            type: "PDF",
            link: "/files/react-guide.pdf",
        },
        {
            title: "Advanced JavaScript Concepts",
            description: "A deep dive into advanced topics in JavaScript.",
            type: "Video",
            link: "/videos/js-advanced.mp4",
        },
        {
            title: "CSS Flexbox and Grid",
            description: "Master CSS layouts with Flexbox and Grid.",
            type: "PDF",
            link: "/files/css-layouts.pdf",
        },
        {
            title: "Building Web Apps with Next.js",
            description: "Step-by-step guide to building modern web applications with Next.js.",
            type: "Video",
            link: "/videos/nextjs-tutorial.mp4",
        },
    ];

    // Filter materials based on the search term
    const filteredMaterials = materials.filter((material) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Materials</h1>
                <p className="text-gray-600">Browse and download course materials, including guides, videos, and more.</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <Input
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2"
                />
            </div>

            {/* Material Cards */}
            <div className="flex gap-4 flex-wrap">
                {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    {material.type === "PDF" ? (
                                        <LucideFile className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <LucideVideo className="w-5 h-5 text-red-500" />
                                    )}
                                    <span>{material.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{material.description}</p>
                                <a
                                    href={material.link}
                                    download
                                    className="block mt-4 text-blue-500 hover:underline"
                                >
                                    {material.type === "PDF" ? "Download PDF" : "Watch Video"}
                                </a>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No materials found.</p>
                )}
            </div>
        </div>
    );
}
