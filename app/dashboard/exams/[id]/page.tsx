// pages/exams/[examId]/join.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, differenceInSeconds } from 'date-fns';

interface Exam {
    examId: number;
    title: string;
    description: string;
    imageName: string;
    addedDate: string;
    deadline: string;
}

interface Question {
    questionId: number;
    text: string;
}

const dummyExamData: Exam[] = [
    {
        examId: 1,
        title: "Mathematics Midterm Exam",
        description: "This exam covers algebra, geometry, and basic trigonometry.",
        imageName: "/images/exam.avif",
        addedDate: "2024-07-01T10:00:00",
        deadline: "2024-08-01T23:59:59"
    },
    {
        examId: 2,
        title: "Science Final Exam",
        description: "This exam includes topics from physics, chemistry, and biology.",
        imageName: "/images/exam.avif",
        addedDate: "2024-07-15T10:00:00",
        deadline: "2024-08-15T23:59:59"
    },
    {
        examId: 3,
        title: "Computer Science Practical",
        description: "This practical exam will test your knowledge on basic programming and algorithms.",
        imageName: "/images/exam.avif",
        addedDate: "2024-07-20T10:00:00",
        deadline: "2024-08-20T23:59:59"
    }
];

const dummyQuestions: Question[] = [
    { questionId: 1, text: "What is the solution to the equation x^2 - 4x + 4 = 0?" },
    { questionId: 2, text: "Describe the process of photosynthesis." },
    { questionId: 3, text: "Write a program to reverse a string in any programming language." }
];

export default function JoinExam({ params }: { params: { id: string } }) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isExamStarted, setIsExamStarted] = useState(false);
    const examId = params.id;

    useEffect(() => {
        if (examId) {
            const foundExam = dummyExamData.find(exam => exam.examId === Number(examId));
            if (foundExam) {
                setExam(foundExam);
                const now = new Date();
                const deadline = new Date(foundExam.deadline);
                const timeLeftSeconds = differenceInSeconds(deadline, now);
                setTimeLeft(timeLeftSeconds);
                setQuestions(dummyQuestions); // Simulate fetching questions
            }
        }
    }, [examId]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startExam = () => {
        setIsExamStarted(true);
        // Additional logic to start the exam
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('File uploaded:', file.name);
            // Add logic to handle file upload to backend
        }
    };

    if (!exam) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">{exam.title}</h1>
                <p className="text-lg text-darkNavy mb-4">{exam.description}</p>
            </section>

            <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <CardHeader className="py-4 px-4 border-b border-gray-200">
                    <CardTitle className="text-2xl font-bold text-darkNavy">
                        Exam Instructions
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-4 px-4">
                    <p className="text-lg text-darkNavy mb-4">
                        Please read the following instructions carefully before starting the exam.
                        Make sure you have a stable internet connection and a quiet environment.
                    </p>
                    <div className="mb-4">
                        <Image src={exam.imageName} alt={exam.title} width={600} height={400} className="h-40 object-cover rounded-lg" />
                    </div>
                    <p className="text-lg text-darkNavy mb-4"><strong>Added Date:</strong> {format(new Date(exam.addedDate), 'MMMM d, yyyy h:mm a')}</p>
                    <p className="text-lg text-darkNavy mb-4"><strong>Deadline:</strong> {format(new Date(exam.deadline), 'MMMM d, yyyy h:mm a')}</p>
                    <p className="text-lg text-darkNavy mb-4"><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
                    {!isExamStarted ? (
                        <Button className="bg-blue text-white w-full" onClick={startExam}>Start Exam</Button>
                    ) : (
                        <p className="text-lg text-darkNavy">Exam has started. Good luck!</p>
                    )}
                </CardContent>
            </Card>

            {isExamStarted && (
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="py-4 px-4 border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-darkNavy">
                            Exam Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                        {questions.map((question) => (
                            <div key={question.questionId} className="mb-4">
                                <p className="text-lg text-darkNavy mb-2">{question.questionId + ". " + question.text}</p>
                                <div className="mb-4 ml-4">
                                    <label className="block text-sm text-darkNavy mb-2">Upload Your Answer</label>
                                    <input type="file" onChange={handleFileUpload} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                                </div>
                            </div>

                        ))}

                        <Button className="bg-green text-white w-fit">Submit Answers</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
