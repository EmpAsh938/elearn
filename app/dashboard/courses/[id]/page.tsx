"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { format } from 'date-fns';

// Define Post type
interface Post {
    postId: number;
    title: string;
    content: string;
    imageName: string;
    videoLink: string;
    addedDate: string;
}

// Dummy data for posts
const dummyPosts: Post[] = [
    {
        postId: 1,
        title: "Introduction to Algebra",
        content: "This post covers the basics of algebra including equations and inequalities.",
        imageName: "/images/math.jpeg",
        videoLink: "https://www.example.com/video/algebra.mp4",
        addedDate: "2024-07-01T10:00:00"
    },
    {
        postId: 2,
        title: "Chemical Reactions Overview",
        content: "Learn about different types of chemical reactions and their applications.",
        imageName: "/images/math.jpeg",
        videoLink: "",
        addedDate: "2024-07-15T10:00:00"
    },
    {
        postId: 3,
        title: "Basics of Computer Programming",
        content: "An introductory post on computer programming concepts and languages.",
        imageName: "/images/math.jpeg",
        videoLink: "https://www.example.com/video/programming.mp4",
        addedDate: "2024-07-20T10:00:00"
    }
];

export default function SubjectPage({ params }: { params: { id: string } }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const { id } = params;

    useEffect(() => {
        // Simulate fetching data
        if (id) {
            // In a real scenario, replace this with fetch or other data fetching logic
            setPosts(dummyPosts);
        }
    }, [id]);

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Posts for Subject {id}</h1>
                <p className="text-lg text-darkNavy mb-4">
                    Browse the latest posts related to this subject.
                </p>
            </section>

            <section className="space-y-6">
                {posts.map(post => (
                    <Card key={post.postId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-start">
                            {post.imageName && (
                                <div className="relative w-1/3 h-48">
                                    <Image src={post.imageName} alt={post.title} layout="fill" objectFit="cover" className="rounded-l-lg" />
                                </div>
                            )}
                            <div className="w-2/3">
                                <CardHeader className="mb-2">
                                    <CardTitle className="text-xl font-bold text-darkNavy">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg text-darkNavy mb-4">{post.content}</p>
                                    {post.videoLink && (
                                        <div className="mb-4">
                                            <video controls className="w-full h-48 bg-black rounded-lg">
                                                <source src={post.videoLink} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500">Added on {format(new Date(post.addedDate), 'MMMM d, yyyy')}</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
            </section>
        </div>
    );
}
