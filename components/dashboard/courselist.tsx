"use client";

import { TCourses } from "@/app/lib/types";
import Image from "next/image";                  // Next.js Image component
import Link from "next/link";
import { Badge } from "../ui/badge";
import useResponsiveSize from "@/hooks/use-responsiveSize";
import { Button } from "../ui/button";
import { useCartContext } from "@/hooks/use-cartContext";

const CoursesList = ({ courses }: { courses: TCourses[] }) => {

    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size
    const { addToCart } = useCartContext();

    // Helper function to slice descriptions
    const sliceDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };

    // const courseButton = (type: string) => {
    //     switch (type.toLowerCase()) {
    //         case "upcoming":
    //             return "View";
    //         case "pre-booking" || "prebooking":
    //             return "Book";
    //         case "ongoing":
    //             return "Purchase";
    //         default:
    //             return "View";
    //     }

    // }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {courses.map((course) => (
                <div
                    key={course.categoryId}
                    className="relative flex flex-col space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg shadow-sm"
                >
                    {/* Thumbnail */}
                    <div className="">
                        <Image
                            src={course.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.imageName}` : "/images/courses/default.png"}
                            alt={course.categoryTitle}
                            width={imageSize.width}
                            height={imageSize.height}
                            className="object-cover rounded w-full"
                        />
                    </div>

                    {/* Course Info */}
                    <div className="w-full pr-2 space-y-2">
                        <h3 className="text-xl font-semibold">{course.categoryTitle}</h3>
                        <p className="text-sm text-gray-600 text-justify md:text-left">{sliceDescription(course.categoryDescription)}</p>

                        {/* Price and Enroll Button in a row */}
                        <div className="flex justify-between items-center mt-4">
                            {(!course.categoryType || course.categoryType.toLowerCase() == "upcoming") ? null : <h2 className="text-2xl font-semibold mt-4">NRs.{course.price}</h2>}
                            <Link href={"browse/" + course.categoryId} className="bg-blue text-white hover:bg-blue px-4 py-2 rounded">
                                {/* {courseButton(course.categoryType)} */}
                                Explore
                            </Link>
                        </div>

                        {/* Add to Cart Button for Ongoing Courses */}
                        {course.categoryType && course.categoryType.toLowerCase() === "ongoing" && (
                            <Button
                                onClick={() => addToCart(course)}
                                className="absolute top-0 right-0 w-fit h-fit bg-green text-white px-4 py-2 rounded hover:bg-green"
                            >
                                Add to Cart
                            </Button>
                        )}

                        <Badge variant="default" className={(!course.categoryType || course.categoryType.toLowerCase() == "upcoming") ? "bg-green capitalize" : "bg-blue capitalize"}>{course.categoryType || "Upcoming"}</Badge>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesList;
