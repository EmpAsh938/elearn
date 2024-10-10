import { TCourses } from "@/app/lib/types";
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";
import { Badge } from "../ui/badge";

const CoursesList = ({ courses }: { courses: TCourses[] }) => {

    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };



    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {courses.map((course) => (
                <div
                    key={course.categoryId}
                    className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg shadow-sm"
                >
                    {/* Thumbnail */}
                    <div className="">
                        <Image
                            src={course.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.imageName}` : "/images/courses/default.png"}
                            alt={course.categoryTitle}
                            width={600}
                            height={600}
                            className="object-cover rounded w-full"
                        />
                    </div>

                    {/* Course Info */}
                    <div className="w-full pr-2 space-y-2">
                        <h3 className="text-xl font-semibold">{course.categoryTitle}</h3>
                        <p className="text-sm text-gray-600 text-justify md:text-left">{sliceDescription(course.categoryDescription)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            {(!course.courseType || course.courseType.toLowerCase() == "upcoming") ? null : <h2 className="text-2xl font-semibold mt-4">NRs.{course.price}</h2>}
                            <Link href={"browse/" + course.categoryId} className="bg-blue text-white hover:bg-blue px-4 py-2 rounded">
                                {(!course.courseType || course.courseType.toLowerCase() == "upcoming") ? "View" : "View & Book"}
                            </Link>
                        </div>

                        <Badge variant="default" className={(!course.courseType || course.courseType.toLowerCase() == "upcoming") ? "bg-green capitalize" : "bg-blue capitalize"}>{course.courseType || "Upcoming"}</Badge>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesList;
