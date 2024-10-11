"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link"; // Assuming you'll link to full articles
import { articles } from "../lib/blog";
import useResponsiveSize from "@/hooks/use-responsiveSize";

export default function Articles() {
    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="border-t border-gray-300 p-6 px-16">
                <h1 className="text-3xl font-bold mb-8 text-center">Articles & Blog</h1>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 pb-10">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <Image
                                src={article.image}
                                alt={article.title}
                                height={imageSize.height}
                                width={imageSize.width}
                                className="w-full object-contain"
                            />
                            <div className="p-3">

                                <h2 className="text-2xl font-semibold my-2">{article.title}</h2>
                                <p className="text-gray-500 mb-4">{article.sections[0]['paragraph'].slice(0, 40) + "..."}</p>
                                <Link href={article.link}>
                                    <span className="text-blue-500 font-medium">Read more</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    )
}
