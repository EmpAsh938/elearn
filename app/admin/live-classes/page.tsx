"use client";

import { useState } from "react";
import { CreateDialog } from "@/components/admin/live-classes/create";
import LiveExamCard from "@/components/admin/live-classes/card";

interface LiveExam {
    title: string;
    description: string;
    startTime: string;
    duration: number;
}

const initialLiveExams: LiveExam[] = [
    {
        title: "Mathematics Live",
        description: "An interactive live session covering algebra and geometry.",
        startTime: "2024-08-10T14:00:00",
        duration: 60,
    },
    {
        title: "Physics Live",
        description: "Discussing concepts of motion and energy with live examples.",
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
    const [liveExams, setLiveExams] = useState(initialLiveExams);

    const handleEdit = (index: number, updatedExam: LiveExam) => {
        setLiveExams((prevExams) =>
            prevExams.map((exam, i) => (i === index ? updatedExam : exam))
        );
    };

    const handleDelete = (index: number) => {
        setLiveExams((prevExams) => prevExams.filter((_, i) => i !== index));
    };

    const handleCreate = () => {

    }

    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Live Exams</h2>
            <section>
                <CreateDialog onCreate={handleCreate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {liveExams.map((exam, index) => (
                        <LiveExamCard
                            key={index}
                            title={exam.title}
                            description={exam.description}
                            startTime={new Date(exam.startTime).toLocaleString()}
                            duration={exam.duration}
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
