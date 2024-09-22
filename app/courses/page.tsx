"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const gradePackages = [
    {
        id: 1,
        title: "Grade 8 Package",
        description: "Comprehensive courses for Grade 8 students, including Mathematics and Science.",
        thumbnail: "/images/courses/course2.webp",
        courses: ["Mathematics", "Science"],
        price: "700"
    },
    {
        id: 2,
        title: "Grade 9 Package",
        description: "All-in-one package for Grade 9, covering Science and Social Studies.",
        thumbnail: "/images/courses/course2.webp",
        courses: ["Science", "Social Studies"],
        price: "800"
    },
    {
        id: 3,
        title: "Grade 10 Package",
        description: "Full course package for Grade 10, including Physics, Chemistry, and Mathematics.",
        thumbnail: "/images/courses/course2.webp",
        courses: ["Physics", "Chemistry", "Mathematics"],
        price: "900"
    },
    {
        id: 4,
        title: "Grade 11 Package",
        description: "Extensive course package for Grade 11 students, with Geography and Biology.",
        thumbnail: "/images/courses/course2.webp",
        courses: ["Geography", "Biology"],
        price: "850"
    },
    {
        id: 5,
        title: "Grade 12 Package",
        description: "Advanced courses for Grade 12, focusing on Accounting and Economics.",
        thumbnail: "/images/courses/course2.webp",
        courses: ["Accounting", "Economics"],
        price: "950"
    },
];

const tags = ["All", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export default function Courses() {
    const [selectedTag, setSelectedTag] = useState("All");

    const filteredPackages = selectedTag === "All"
        ? gradePackages
        : gradePackages.filter(pkg => pkg.title.includes(selectedTag));

    return (
        <>
            {/* Navbar positioned fixed */}
            <Navbar />
            <main className="pt-24 px-4">
                <section className="text-center py-8">
                    <h1 className="text-4xl font-bold mb-4">Grade Packages</h1>
                    <p className="text-lg mb-6">Explore our comprehensive grade packages designed to boost your knowledge and career.</p>
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

                {/* Display all grade packages */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    {filteredPackages.map(pkg => (
                        <Link key={pkg.id} href={`/courses/${pkg.id}`} className="block">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <Image
                                    src={pkg.thumbnail}
                                    alt={pkg.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
                                    <p className="text-textDarkNavy mb-4">{pkg.description}</p>
                                    <p className="text-lg font-semibold mb-2">Courses included:</p>
                                    <ul className="list-disc list-inside mb-4">
                                        {pkg.courses.map((course, index) => (
                                            <li key={index}>{course}</li>
                                        ))}
                                    </ul>
                                    <p className="text-red text-lg font-semibold mb-4">NRS.{pkg.price}</p>
                                    <Button className="w-full bg-green">View Package</Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}
