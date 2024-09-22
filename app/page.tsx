import Image from "next/image";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Faq from "@/components/faq";
import Link from "next/link";


export default function Home() {
    const recentCourses = [
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
        },
    ];

    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {/* Landing Section */}
                <section className="relative h-screen flex items-center justify-center text-center">
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-80 z-10"
                        autoPlay
                        loop
                        muted
                    >
                        <source src="/videos/landing-bg.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-0">
                        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-green">Enhance Your Skills with Our E-Learning Platform</h1>
                        <p className="text-lg sm:text-xl mb-8 text-textLightGreen">Join our community and access a wide range of courses, live classes, and resources to boost your knowledge and career.</p>
                        <Link href="/dashboard">
                            <Button className="bg-blue hover:bg-blue">Get Started</Button>
                        </Link>
                    </div>
                </section>
                {/* Recent Courses */}
                <section className="px-5 py-10">
                    <h1 className="font-bold text-2xl mb-6 text-center">Recent Courses</h1>
                    <Carousel className="w-full max-w-screen-lg mx-auto overflow-x-hidden">
                        <CarouselContent className="">
                            {recentCourses.map((course, index) => (
                                <CarouselItem className="basis-1/2 md:basis-1/3" key={index}>
                                    <Card className="transition-transform transform hover:scale-105">
                                        <Image src={course.thumbnail} alt={course.title} height={300} width={300} className="h-full w-full object-cover rounded" />
                                        <p className="text-center py-2 font-medium text-lg">{course.title}</p>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section>

                {/* Recent Activities */}
                <section className="bg-white p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Recent Activities</h2>
                    <div className="space-y-6">
                        <div className="bg-lightBlue p-6 rounded transition-shadow hover:shadow-lg flex flex-col sm:flex-row gap-2 items-center">
                            <div className="flex-1 flex items-center">

                                <div className="text-red mr-4">
                                    <Video size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Upcoming Live Class: Mathematics</h3>
                                    <p className="text-gray-600">Date: July 28, 2024</p>
                                </div>
                            </div>

                            <Button className="bg-darkNavy hover:bg-darkNavy">Join Now</Button>
                        </div>
                        <div className="bg-lightBlue p-6 rounded transition-shadow hover:shadow-lg flex flex-col sm:flex-row gap-2 items-center">
                            <div className="flex-1 flex items-center">

                                <div className="text-green mr-4">
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">New Exam: Physics Assignment</h3>
                                    <p className="text-gray-600">Date: July 28, 2024</p>
                                </div>
                            </div>

                            <Button className="bg-darkNavy hover:bg-darkNavy">Join Now</Button>
                        </div>
                        <div className="bg-lightBlue p-6 rounded transition-shadow hover:shadow-lg flex flex-col sm:flex-row gap-2 items-center">
                            <div className="flex-1 flex items-center">

                                <div className="text-purple-600 mr-4">
                                    <Calendar size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">New Material: Chemistry Lecture Notes</h3>
                                    <p className="text-gray-600">Date: July 28, 2024</p>
                                </div>
                            </div>

                            <Button className="bg-darkNavy hover:bg-darkNavy">Join Now</Button>
                        </div>

                    </div>
                </section>

                {/* Why Students Love Us */}
                <section className="px-5 py-10 bg-blue-100">
                    <h2 className="font-bold text-2xl mb-6 text-center">Why Students Love Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/quality.png" alt="Quality Education" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Quality Education</h3>
                            <p>We provide top-notch educational resources to ensure you get the best learning experience.</p>
                        </div>
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/accessibility.svg" alt="Accessible Anywhere" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Accessible Anywhere</h3>
                            <p>Learn from the comfort of your home or on the go. Our platform is accessible on all devices.</p>
                        </div>
                        <div className="bg-white border border-lightGreen shadow-lg p-6 rounded-lg text-center">
                            <Image src="/images/icons/interactive.png" alt="Interactive Learning" width={64} height={64} className="mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Interactive Learning</h3>
                            <p>Engage with interactive lessons, quizzes, and live classes for a better understanding of concepts.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="px-5 py-10">
                    <h2 className="font-bold text-2xl mb-6 text-center">Frequently Asked Questions</h2>
                    <Faq />
                </section>
            </main>

            <Footer />
        </>
    );
}
