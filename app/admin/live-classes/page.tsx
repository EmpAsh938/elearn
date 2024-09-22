"use client";

import { useState } from "react";
import { CreateDialog } from "@/components/admin/live-classes/create";
import LiveClassCard from "@/components/admin/live-classes/card";

interface LiveClass {
    title: string;
    description: string;
    startTime: string;
    duration: number;
}

const initialLiveClass: LiveClass[] = [
    {
        title: "Mathematics Live",
        description: "An interactive live session covering algebra and geometry.",
        startTime: "2024-08-10T14:00:00",
        duration: 60,
    },
    {
        title: "Physics Live",
        description: "Discussing concepts of motion and energy with live Classples.",
        startTime: "2024-08-12T16:00:00",
        duration: 45,
    },
    {
        title: "Chemistry Live",
        description: "Live Q&A on organic chemistry topics.",
        startTime: "2024-08-15T10:00:00",
        duration: 30,
    },
];

export default function LiveClasses() {
    const [liveClass, setLiveClass] = useState(initialLiveClass);

    const handleEdit = (index: number, updatedClass: LiveClass) => {
        setLiveClass((prevClass) =>
            prevClass.map((Class, i) => (i === index ? updatedClass : Class))
        );
    };

    const handleDelete = (index: number) => {
        setLiveClass((prevClass) => prevClass.filter((_, i) => i !== index));
    };

    const handleCreate = (newClass: LiveClass) => {
        setLiveClass((prevClass) => [...prevClass, newClass]);
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Live Class</h2>
            <section>
                <CreateDialog onCreate={handleCreate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {liveClass.map((Class, index) => (
                        <LiveClassCard
                            key={index}
                            title={Class.title}
                            description={Class.description}
                            startTime={new Date(Class.startTime).toLocaleString()}
                            duration={Class.duration}
                            onEdit={(title, description, startTime, duration) =>
                                handleEdit(index, { title, description, startTime, duration })
                            }
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
