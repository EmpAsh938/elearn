import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Target, Lightbulb, Users, Book, CheckCircle, Activity, Layout } from "lucide-react";

export default function Aboutus() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="border-t border-gray-300 p-6 px-16 flex flex-col gap-14">
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center py-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Quality Education at an Affordable Price
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl">
                        Welcome to Utkrista Shikshya, a leading online learning platform committed to providing accessible and high-quality education for all. Our mission is to break down barriers to education and empower learners everywhere with knowledge that is both affordable and effective.
                    </p>
                </section>

                {/* Image Section */}
                <section className="w-full h-[60vh] mb-12">
                    <Image
                        src="/images/notice.jpg"
                        alt="Team or education banner"
                        height={900}
                        width={1600}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </section>

                {/* Mission, Vision, Values Section */}
                <section className="flex flex-col items-center text-center gap-6 py-8">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col items-center">
                            <Target className="text-blue w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold">Mission</h3>
                            <p className="text-gray-500 max-w-md">
                                We strive to offer quality education with easy and seamless access. We believe that everyone deserves the opportunity to learn, and we are dedicated to making education accessible for all.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Lightbulb className="text-yellow-500 w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold">Vision</h3>
                            <p className="text-gray-500 max-w-md">
                                We envision a world where education is universally accessible, empowering individuals to achieve their full potential. Through innovative teaching methods and a supportive learning environment, we aim to inspire lifelong learning and growth.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Users className="text-green w-12 h-12 mb-4" />
                            <h3 className="text-xl font-semibold">Values</h3>
                            <p className="text-gray-500 max-w-md">
                                Inclusivity, affordability, creativity, and focus on individual needs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="text-center py-12">
                    <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <CheckCircle className="text-purple-500 w-10 h-10 mb-4" />
                            <h3 className="text-lg font-semibold">Best Courses Available</h3>
                            <p className="text-gray-500">
                                We offer a wide range of courses designed to meet the needs of every learner.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <Activity className="text-blue w-10 h-10 mb-4" />
                            <h3 className="text-lg font-semibold">Safe Learning Environment</h3>
                            <p className="text-gray-500">
                                Our platform is designed to ensure a secure and supportive learning experience.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <Layout className="text-teal-500 w-10 h-10 mb-4" />
                            <h3 className="text-lg font-semibold">Personalized Experience</h3>
                            <p className="text-gray-500">
                                We tailor our educational offerings to suit individual learning styles and preferences.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="text-center py-12">
                    <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Kabita Nepal"
                                width={150}
                                height={150}
                                className="rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Kabita Nepal</h3>
                            <p className="text-gray-500">Founder</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Chetan Chamlagain"
                                width={150}
                                height={150}
                                className="rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Chetan Chamlagain</h3>
                            <p className="text-gray-500">Co-Founder & CEO</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Tikaram Chamlagain"
                                width={150}
                                height={150}
                                className="rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Tikaram Chamlagain</h3>
                            <p className="text-gray-500">Finance Manager</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Shantiram Subedi"
                                width={150}
                                height={150}
                                className="rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Shantiram Subedi</h3>
                            <p className="text-gray-500">HR Manager</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Bhuwan Nepal"
                                width={150}
                                height={150}
                                className="rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Bhuwan Nepal</h3>
                            <p className="text-gray-500">Market Representative</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
