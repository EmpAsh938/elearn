import { Button } from "@/components/ui/button";  // ShadCN UI Button component
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";

const CoursesList = () => {
    const courses = [
        {
            thumbnail: "/images/courses/course1.png",
            title: "JavaScript Essentials",
            description: "This course covers all the essential JavaScript concepts you need to become proficient in front-end development. From variables to advanced topics like closures and asynchronous programming, this is the ultimate guide to mastering JavaScript.",
            price: "NRs.990"
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "React for Beginners",
            description: "A comprehensive guide to building interactive UIs using React. This course takes you from the very basics of React to more advanced features such as hooks and context.",
            price: "NRs.790"
        },
        {
            thumbnail: "/images/courses/course1.png",
            title: "CSS Mastery",
            description: "Learn how to style beautiful and responsive websites using CSS. This course covers everything from flexbox, grid, and CSS variables to advanced animations and transitions.",
            price: "NRs.490"
        }
    ];

    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };

    return (
        <div className="space-y-6">
            {courses.map((course, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg shadow-sm"
                >
                    {/* Thumbnail */}
                    <div className="w-full md:w-1/4">
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={300}
                            height={200}
                            className="object-cover rounded w-full"
                        />
                    </div>

                    {/* Course Info */}
                    <div className="w-full md:w-3/4 space-y-2">
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600 text-justify md:text-left">{sliceDescription(course.description)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-medium text-blue-600">{course.price}</span>
                            <Link href={"browse/" + (index + 1)} className="bg-blue text-white hover:bg-blue px-4 py-2 rounded">
                                Book
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesList;
