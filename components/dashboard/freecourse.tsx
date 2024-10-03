import Link from 'next/link';
import Image from 'next/image';

const FreeCoursesSection = () => {
    // Array of free courses with YouTube video links
    const freeCourses = [
        {
            thumbnail: "/images/courses/course1.png",
            title: "Course 1: Introduction to Web Development",
            youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "Course 2: Learn JavaScript Basics",
            youtubeLink: "https://www.youtube.com/watch?v=xyz123"
        },
        {
            thumbnail: "/images/courses/course1.png",
            title: "Course 3: Understanding CSS",
            youtubeLink: "https://www.youtube.com/watch?v=abc456"
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "Course 4: React for Beginners",
            youtubeLink: "https://www.youtube.com/watch?v=def789"
        }
    ];

    return (
        <section>
            <h2 className="text-left text-2xl font-semibold my-4">Free Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeCourses.map((course, index) => (
                    <Link href={course.youtubeLink} key={index} target="_blank">
                        <div>
                            <div className="transition-transform transform hover:scale-105">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover rounded"
                                />
                                <p className="text-center py-2 font-medium text-lg">{course.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FreeCoursesSection;
