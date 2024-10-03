import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Target, Lightbulb, Users, Book, GraduationCap } from "lucide-react";

export default function Aboutus() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="p-6 px-16 flex flex-col gap-14">
                {/* Intro Section */}
                <section className="flex flex-col md:flex-row items-center gap-4">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">
                        Catering best quality education services to students and educators
                    </h1>
                    <p className="text-lg mb-6 text-gray-500 tracking-wide">
                        Utkrista Shiksha is a top ed-tech platform that produces high-quality courses on a diverse range of topics. We have experienced teachers and mentors who design, teach, and guide students to excel in their knowledge and skills.
                    </p>
                </section>

                {/* Image Section */}
                <section>
                    <Image
                        src="/images/notice.jpg"
                        alt="Background"
                        height={900}
                        width={900}
                        className="w-full h-[80vh] object-cover rounded-lg"
                    />
                </section>

                {/* Mission Section with Lucide Icon */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-3xl font-semibold flex items-center justify-center">
                        <Target className="mr-2 text-blue-500" /> Our Mission
                    </h2>
                    <p className="text-lg text-gray-500">
                        At Utkrista Shiksha, our mission is to make quality education accessible to every student, regardless of their background. We strive to create an inclusive learning environment that empowers students to reach their full potential and prepare them for real-world challenges.
                    </p>
                </section>

                {/* Values Section with Lucide Icons */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-3xl font-semibold text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                            <Lightbulb className="text-green-500 w-10 h-10" />
                            <div>
                                <h3 className="text-lg font-semibold">Commitment to Excellence</h3>
                                <p className="text-gray-500">Delivering the highest quality education possible.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                            <Users className="text-blue-500 w-10 h-10" />
                            <div>
                                <h3 className="text-lg font-semibold">Inclusivity</h3>
                                <p className="text-gray-500">Ensuring access to education for everyone.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                            <Lightbulb className="text-yellow-500 w-10 h-10" />
                            <div>
                                <h3 className="text-lg font-semibold">Innovation</h3>
                                <p className="text-gray-500">Embracing new technologies and teaching methods to enhance learning.</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                            <Users className="text-purple-500 w-10 h-10" />
                            <div>
                                <h3 className="text-lg font-semibold">Collaboration</h3>
                                <p className="text-gray-500">Fostering a community of learners and educators.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* What We Provide Section with Lucide Icon */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-3xl font-semibold flex items-center justify-center">
                        What We Provide
                        {/* <Book className="mr-2 text-teal-500" />  */}
                    </h2>
                    <p className="text-lg text-gray-500 text-center">
                        Utkrista Shiksha offers a wide range of services to support students and educators, including:
                    </p>

                    {/* List with Icons */}
                    <ul className="space-y-4 text-lg text-gray-500 max-w-lg mx-auto">
                        <li className="flex items-center">
                            <Book className="mr-2 text-teal-500 w-6 h-6" />
                            Comprehensive video courses on various subjects.
                        </li>
                        <li className="flex items-center">
                            <Book className="mr-2 text-teal-500 w-6 h-6" />
                            Interactive live classes with expert instructors.
                        </li>
                        <li className="flex items-center">
                            <Book className="mr-2 text-teal-500 w-6 h-6" />
                            Customizable learning paths tailored to individual needs.
                        </li>
                        <li className="flex items-center">
                            <Book className="mr-2 text-teal-500 w-6 h-6" />
                            Mentorship programs to guide students throughout their academic journey.
                        </li>
                        <li className="flex items-center">
                            <Book className="mr-2 text-teal-500 w-6 h-6" />
                            Access to study materials and resources developed by industry professionals.
                        </li>
                    </ul>
                </section>


                {/* Our Team Section with Images */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-3xl font-semibold flex items-center justify-center">
                        <Users className="mr-2 text-pink-500" /> Meet Our Team
                    </h2>
                    <p className="text-lg text-gray-500 text-center">
                        Our team consists of experienced educators, content creators, and technologists who are passionate about delivering the best possible learning experience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Team Member 1 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Team Member 1"
                                width={200}
                                height={200}
                                className="w-28 h-28 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">John Doe</h3>
                            <p className="text-gray-500">Senior Educator</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Team Member 1"
                                width={200}
                                height={200}
                                className="w-28 h-28 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Jane Smith</h3>
                            <p className="text-gray-500">Content Creator</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src="/images/profile/user.jpeg"
                                alt="Team Member 1"
                                width={200}
                                height={200}
                                className="w-28 h-28 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold mt-4">Mark Johnson</h3>
                            <p className="text-gray-500">Mentor & Technologist</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
