// pages/live-classes.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";

// Sample data for subscribed plans and their live classes
const liveClassesData = {
    planName: "Grade 10 (Basic)",
    classes: [
        {
            id: 1,
            title: "Mathematics Live",
            description: "An interactive live session covering algebra and geometry.",
            startTime: "2024-08-10T14:00:00",
            duration: 60,
            thumbnail: "/images/live-session.jpg",
        },
        {
            id: 10,
            title: "Physics Live",
            description: "Discussing concepts of motion and energy with live Classples.",
            startTime: "2024-08-12T16:00:00",
            duration: 45,
            thumbnail: "/images/live-session.jpg",
        },
        {
            id: 100,
            title: "Chemistry Live",
            description: "Live Q&A on organic chemistry topics.",
            startTime: "2024-08-15T10:00:00",
            duration: 30,
            thumbnail: "/images/live-session.jpg",
        },
    ]
};

export default function LiveClasses() {
    const [plan, setPlan] = useState(liveClassesData);
    const router = useRouter();

    const handleJoinLiveClass = (liveClass: any) => {
        router.push(`/dashboard/live-classes/${liveClass.id}`);
    };
    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Live Classes</h1>
                <p className="text-lg text-darkNavy mb-4">
                    Here are the live classes available for your <span className="text-blue font-medium">{plan.planName} plan</span>.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plan.classes.map(liveClass => (
                    <Card key={liveClass.id} className="bg-white shadow-lg">
                        <div className="relative w-full h-40">
                            <Image src={liveClass.thumbnail} alt={liveClass.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
                        </div>
                        <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                            <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                                <Video className="mr-2 text-green" /> {liveClass.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-darkNavy mb-4">{liveClass.description}</p>
                            <p className="text-lg text-darkNavy mb-4"><strong>Starts At:</strong> {liveClass.startTime}</p>
                            <Link href={`/dashboard/live-classes/${liveClass.id}`}>
                                <Button className="bg-red text-white w-full" onClick={() => handleJoinLiveClass(liveClass)}>Join Live Class</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
