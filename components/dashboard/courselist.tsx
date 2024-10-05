import { TCourses } from "@/app/lib/types";
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";

const CoursesList = ({ courses }: { courses: TCourses[] }) => {

    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };

    return (
        <div className="space-y-6">
            {courses.map((course) => (
                <div
                    key={course.categoryId}
                    className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg shadow-sm"
                >
                    {/* Thumbnail */}
                    <div className="w-full md:w-1/4">
                        <Image
                            src={course.imageName || "/images/courses/default.png"}
                            alt={course.categoryTitle}
                            width={300}
                            height={200}
                            className="object-cover rounded w-full"
                        />
                    </div>

                    {/* Course Info */}
                    <div className="w-full md:w-3/4 space-y-2">
                        <h3 className="text-xl font-semibold">{course.categoryTitle}</h3>
                        <p className="text-sm text-gray-600 text-justify md:text-left">{sliceDescription(course.categoryDescription)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-medium text-blue-600">NRs.3000</span>
                            <Link href={"browse/" + course.categoryId} className="bg-blue text-white hover:bg-blue px-4 py-2 rounded">
                                View & Book
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesList;
