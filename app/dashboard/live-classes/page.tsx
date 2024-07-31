// pages/live-classes.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

// Sample data for subscribed plans and their live classes
const liveClassesData = {
    planName: "Grade 10 (Basic)",
    classes: [
        {
            id: 1,
            name: "Mathematics Live Session",
            description: "Join our expert instructors for a live session on advanced mathematical concepts.",
            schedule: "Every Monday at 3:00 PM",
            thumbnail: "/images/live-session.jpg"
        },
        {
            id: 2,
            name: "Science Q&A",
            description: "Get your science questions answered in real-time.",
            schedule: "Every Wednesday at 4:00 PM",
            thumbnail: "/images/live-session.jpg"
        },
        {
            id: 3,
            name: "Computer Science Workshop",
            description: "Participate in interactive workshops on various computer science topics.",
            schedule: "Every Friday at 2:00 PM",
            thumbnail: "/images/live-session.jpg"
        }
    ]
};

export default function LiveClasses() {
    const [plan, setPlan] = useState(liveClassesData);

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
                            <Image src={liveClass.thumbnail} alt={liveClass.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
                        </div>
                        <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                            <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                                <Video className="mr-2 text-green" /> {liveClass.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-darkNavy mb-4">{liveClass.description}</p>
                            <p className="text-lg text-darkNavy mb-4"><strong>Schedule:</strong> {liveClass.schedule}</p>
                            <Link href={`/dashboard/live-classes/${liveClass.id}`}>
                                <Button className="bg-red text-white w-full">Join Live Class</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
