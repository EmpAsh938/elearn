"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TCourses, TPosts } from "@/app/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useResponsiveSize from "@/hooks/use-responsiveSize";
import { PDFViewer } from "@/components/pdfviewer";

interface CourseDetailsProps {
    params: {
        id: string;
    };
}

const CourseDetails = ({ params }: CourseDetailsProps) => {
    const { id } = params;
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("overview"); // Active tab state

    const [courseData, setCourseData] = useState<TCourses | null>(null);
    const [posts, setPosts] = useState<TPosts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);


    const imageSize = useResponsiveSize();

    // Filter posts by type (notes, videos, syllabus)
    const syllabusPosts = posts.filter((post) => post.content);
    const notePosts = posts.filter((post) => post.imageName);
    const videoPosts = posts.filter((post) => post.videoLink);

    // Fetch course data by ID and posts within the course
    useEffect(() => {
        const fetchCourseData = async () => {
            setError(null);

            try {
                const courseRes = await fetch(`/api/courses/single/?categoryId=${id}`);
                const courseData = await courseRes.json();

                const postsRes = await fetch(`/api/posts/category/?categoryId=${id}`);
                const postsData = await postsRes.json();

                setCourseData(courseData.body);
                setPosts(postsData.body);

                // Automatically select the first video in the list
                if (postsData.body.length > 0) {
                    const firstVideo = postsData.body.find((post: TPosts) => post.videoLink);
                    setSelectedVideo(firstVideo ? firstVideo.videoLink : null);
                }
            } catch (error) {
                console.error("Error fetching course or posts:", error);
                setError("Failed to load course data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id]);

    if (loading)
        return (
            <div className="relative md:ml-52 mt-16 p-6">
                <p>Loading...</p>
            </div>
        );
    if (error)
        return (
            <div className="relative md:ml-52 mt-16 p-6">
                <p>{error}</p>
            </div>
        );

    if (!courseData)
        return (
            <div className="relative md:ml-52 mt-16 p-6">
                <p>Courses could not be found</p>
            </div>
        );

    return (
        <div className="relative md:ml-52 mt-16 p-6">
            {/* Course Header */}
            <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
                <Image
                    src={
                        courseData.imageName
                            ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${courseData.imageName}`
                            : "/images/courses/default.png"
                    }
                    alt={courseData.categoryTitle}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="rounded-lg shadow-lg w-full lg:w-80 object-cover"
                />

                <div className="flex flex-col justify-center w-full lg:w-auto">
                    <h1 className="text-4xl font-bold mb-4 text-blue-900">
                        {courseData.categoryTitle}
                    </h1>
                    <p className="text-gray-600 text-lg">{courseData.categoryDescription}</p>
                    <Button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700">
                        Enroll Now
                    </Button>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                    {/* <h2 className="text-2xl font-semibold mb-4">Course Overview</h2> */}
                    <p>{courseData.categoryDescription}</p>
                </TabsContent>

                {/* Syllabus Tab */}
                <TabsContent value="syllabus">
                    {/* <h2 className="text-2xl font-semibold mb-4">Course Syllabus</h2> */}
                    {syllabusPosts.length > 0 ? (
                        syllabusPosts.map((topic, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-medium">{topic.title}</h3>
                                <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                                    {topic.content}
                                </ReactMarkdown>
                            </div>
                        ))
                    ) : (
                        <p>No syllabus available</p>
                    )}
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes">
                    {/* <h2 className="text-2xl font-semibold mb-4">Course Notes</h2> */}
                    {courseData.courseType.toLowerCase() !== "ongoing" ? <p>Notes available only for ongoing courses</p> : notePosts.length > 0 ? (
                        notePosts.map((note, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-medium">{note.title}</h3>
                                {note.imageName ? (
                                    <Button onClick={() => setPdfUrl(note.imageName)}>View PDF</Button>
                                ) : (
                                    <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                                        {note.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No notes available</p>
                    )}
                </TabsContent>

                {/* Videos Tab */}
                {/* <TabsContent value="videos">
                    <h2 className="text-2xl font-semibold mb-4">Course Videos</h2>
                    {videoPosts.length > 0 ? (
                        videoPosts.map((video, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-medium">{video.title}</h3>
                                {video.videoLink ? (
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={video.videoLink}
                                        title="Video Player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <p>No video available</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No videos available</p>
                    )}
                </TabsContent> */}

                {/* Videos Tab */}
                <TabsContent value="videos">
                    {/* <h2 className="text-2xl font-semibold mb-4">Course Videos</h2> */}
                    {courseData.courseType.toLowerCase() !== "ongoing" ? <p>Video available only for ongoing courses</p> : videoPosts.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Video Player */}
                            <div className="lg:col-span-2">
                                {selectedVideo ? (
                                    <iframe
                                        width="100%"
                                        height="400px"
                                        src={selectedVideo}
                                        title="Video Player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <p>No video available</p>
                                )}
                            </div>

                            {/* Video List */}
                            <div className="flex flex-col space-y-4">
                                {videoPosts.map((video, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100"
                                        onClick={() => setSelectedVideo(video.videoLink)}
                                    >
                                        <h3 className="text-lg font-medium">{video.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No videos available</p>
                    )}
                </TabsContent>
            </Tabs>

            {/* Modal to display PDF */}
            {pdfUrl && (
                <div className="fixed inset-0 z-50 max-h-screen overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl">
                        <button className="mb-4 text-red" onClick={() => setPdfUrl(null)}>
                            Close
                        </button>
                        <PDFViewer fileUrl={pdfUrl} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
