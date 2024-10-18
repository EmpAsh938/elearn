
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, differenceInSeconds } from "date-fns";
import { TExam } from "@/app/lib/types";
import { formatTime } from "@/app/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useGlobalContext } from "@/hooks/use-globalContext";
import { PDFViewer } from "@/components/pdfviewer";

import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function JoinExam({ params }: { params: { id: string } }) {
    const [exam, setExam] = useState<TExam | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null); // state for image file

    const examId = params.id;
    const { user } = useGlobalContext();

    const fetchExamDetails = useCallback(async () => {
        try {
            // You can fetch your exam data here using the `examId`
            const response = await fetch(`/api/exam`);
            const res = await response.json();
            const singleExam = res.body.filter((item: TExam) => item.examId == examId)[0];
            setExam(singleExam);

            // Calculate remaining time till the deadline
            const now = new Date();
            const deadline = new Date(singleExam.deadline);
            const timeLeftSeconds = differenceInSeconds(now, deadline);
            setTimeLeft(timeLeftSeconds);
        } catch (error) {
            console.error("Error fetching exam details:", error);
        } finally {
            setLoading(false);
        }
    }, [examId]);


    const handleAnswerSubmit = async () => {
        if (!content || !uploadFile) {
            return toast({ variant: 'destructive', description: "Please fill the content" });
        }
        setIsSubmitting(true);
        let answerId = '';

        try {
            const req = await fetch('/api/answer', {
                method: 'POST',
                body: JSON.stringify({ content, userId: user.id, examId: examId })
            })
            const res = await req.json();
            if (res.status !== 201) throw Error(res.error);

            answerId = res.body.id;
        } catch (error: any) {
            setIsSubmitting(false);

            return toast({ variant: 'destructive', description: error.toString() })
        }

        if (answerId) {
            const formData = new FormData();
            formData.append("file", uploadFile);
            formData.append("userId", user.id);
            formData.append("answerId", answerId);
            try {
                const imageResponse = await fetch('/api/upload/answer', {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await imageResponse.json();

                if (imageResponse.status !== 200) {
                    throw new Error(imageData.error || "Error uploading File");
                }
                toast({ description: 'File uploaded successfully!' });

            } catch (error: any) {
                setIsSubmitting(false);

                return toast({ variant: 'destructive', description: "Failed to upload File: " + error.toString() });
            }
        }


        setUploadFile(null);
        setContent("");
        setIsSubmitting(false);
    }

    useEffect(() => {
        if (examId) {
            fetchExamDetails();
        }
    }, [examId, fetchExamDetails]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("File uploaded:", file.name);
            // Logic to upload file to backend
        }
    };


    if (loading) {
        return (
            <div className="md:ml-52 mt-16 p-6">
                <p>Loading exam details...</p>
            </div>)
    }


    if (!exam) {
        return (
            <div className="md:ml-52 mt-16 p-6">
                <p>Nothing to show</p>
            </div>
        )
    }

    if (timeLeft <= 0) {
        return (
            <div className="md:ml-52 mt-16 p-6">
                <p>Exam has been completed</p>
            </div>)
    }

    // Determine whether the image is a valid image or a PDF
    const isImage = (filename: string) => {
        return /\.(jpg|jpeg|png|gif)$/.test(filename);
    };

    const imageUrl = exam.imageName
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}exam/file/${exam.imageName}`
        : '/images/courses/default.png';


    return (
        <div className="md:ml-52 mt-16 p-6">

            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">{exam.title}</h1>
                <p className="text-lg text-darkNavy mb-4">{exam.category.categoryTitle}</p>
            </section>

            <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <CardHeader className="py-4 px-4 border-b border-gray-200">
                    <CardTitle className="text-2xl font-bold text-darkNavy">Exam Instructions</CardTitle>
                </CardHeader>
                <CardContent className="py-4 px-4">
                    <p className="text-lg text-darkNavy mb-4">
                        Please read the instructions carefully before starting the exam.
                    </p>
                    <ul className="list-disc list-inside text-darkNavy">
                        <li className="mb-2">Make sure you have a stable internet connection throughout the exam.</li>
                        <li className="mb-2">You are allowed only one attempt. Once you submit your answers, you cannot reattempt the exam.</li>
                        <li className="mb-2">Ensure that your answers are saved before submitting the exam.</li>
                        <li className="mb-2">You must upload your answers in PDF format only. No other file formats will be accepted.</li>
                        <li className="mb-2">You cannot submit the exam after the deadline. Late submissions will not be accepted.</li>
                        <li className="mb-2">If the exam requires external resources (e.g., calculators, reference material), ensure you have them ready beforehand.</li>
                        <li className="mb-2">You are required to complete the exam within the given time limit. Time management is key.</li>
                        <li className="mb-2">Any attempt to cheat or violate the exam rules will result in disqualification.</li>
                    </ul>
                    <h3 className="font-bold text-xl">Exam Question Paper</h3>
                    <div className="mb-4">
                        {isImage(exam.imageName) ? (
                            <Image
                                src={imageUrl}
                                alt={exam.title}
                                width={300}
                                height={200}
                                className="rounded-md mb-4"
                            />
                        ) : (
                            // <PdfViewer url={imageUrl} />
                            // <PdfViewer url="https://example.com/sample.pdf" />
                            <PDFViewer fileUrl={imageUrl} />


                        )}
                    </div>
                    <p className="text-lg text-darkNavy mb-4">
                        <strong>Deadline:</strong> {format(new Date(exam.deadline), "MMMM d, yyyy h:mm a")}
                    </p>
                    <p className="text-lg text-darkNavy mb-4">
                        <strong>Time Left:</strong> {formatTime(timeLeft)}
                    </p>

                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* <CardHeader className="py-4 px-4 border-b border-gray-200">
                    <CardTitle className="text-2xl font-bold text-darkNavy">Exam Questions</CardTitle>
                </CardHeader> */}
                <CardContent className="py-4 px-4">
                    <label className="block text-sm text-darkNavy mb-2 font-semibold">Answer Description</label>
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Answer Description/Summary" />
                    <label className="block text-sm text-darkNavy my-2 font-semibold">Upload Your Answer (PDF)</label>
                    <Input
                        id="image"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            setUploadFile(file);
                        }}
                    />

                    <Button onClick={handleAnswerSubmit} disabled={isSubmitting} className="bg-green text-white w-fit mt-4">Submit Answers</Button>
                </CardContent>
            </Card>
        </div>
    );
}
