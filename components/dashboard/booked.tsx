import { Button } from "@/components/ui/button";  // ShadCN UI Button component
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";

const Booked = () => {
    const courses = [
        {
            thumbnail: "/images/courses/course1.png",
            title: "JavaScript Essentials",
            description: "This course covers all the essential JavaScript concepts you need to become proficient in front-end development. From variables to advanced topics like closures and asynchronous programming, this is the ultimate guide to mastering JavaScript.",
            price: "NRs.990",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "React for Beginners",
            description: "A comprehensive guide to building interactive UIs using React. This course takes you from the very basics of React to more advanced features such as hooks and context.",
            price: "NRs.790",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course1.png",
            title: "CSS Mastery",
            description: "Learn how to style beautiful and responsive websites using CSS. This course covers everything from flexbox, grid, and CSS variables to advanced animations and transitions.",
            price: "NRs.490",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "React for Beginners",
            description: "A comprehensive guide to building interactive UIs using React. This course takes you from the very basics of React to more advanced features such as hooks and context.",
            price: "NRs.790",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course1.png",
            title: "CSS Mastery",
            description: "Learn how to style beautiful and responsive websites using CSS. This course covers everything from flexbox, grid, and CSS variables to advanced animations and transitions.",
            price: "NRs.490",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "React for Beginners",
            description: "A comprehensive guide to building interactive UIs using React. This course takes you from the very basics of React to more advanced features such as hooks and context.",
            price: "NRs.790",
            status: "Booked",
        },
        {
            thumbnail: "/images/courses/course1.png",
            title: "CSS Mastery",
            description: "Learn how to style beautiful and responsive websites using CSS. This course covers everything from flexbox, grid, and CSS variables to advanced animations and transitions.",
            price: "NRs.490",
            status: "Booked",
        }
    ];

    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {courses.map((course, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start border rounded-lg shadow-md overflow-hidden"
                >
                    {/* Thumbnail */}
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={900}
                        height={900}
                        className="object-cover w-full"
                    />

                    {/* Course Info */}
                    <div className="px-4 py-4 w-full space-y-2">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{sliceDescription(course.description)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            <Link href={`courses/${index + 1}`} className="text-lg font-medium text-blue-600 underline">
                                View Details
                            </Link>
                            <span className="bg-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                                {course.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Booked;
