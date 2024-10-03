"use client";

import CourseCarousel from "@/components/dashboard/carousel";
import FreeCoursesSection from "@/components/dashboard/freecourse";
import RightSidebar from "@/components/dashboard/rightsidebar";

export default function Dashboard() {
    return (
        <div className="mr-0 md:mr-64 ml-20 md:ml-52 mt-16 p-6">
            <RightSidebar />

            <section>
                <h2 className="text-left text-2xl font-semibold mb-4">Popular Courses</h2>

                <CourseCarousel />
            </section>

            <FreeCoursesSection />
        </div>
    )
}