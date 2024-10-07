"use client";

import CourseCarousel from "@/components/dashboard/carousel";
import FreeCoursesSection from "@/components/dashboard/freecourse";
import RightSidebar from "@/components/dashboard/rightsidebar";
import WheelSpin from "@/components/dashboard/wheelspin";
import { useGlobalContext } from "@/hooks/use-globalContext";

export default function Dashboard() {
    const { user } = useGlobalContext();

    if (!user || !user.roles) {
        return <div className="w-full h-screen grid place-items-center">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    }

    const roles = user.roles[0];
    const discount = user.discount;
    return (
        <div className="mr-0 md:mr-64 ml-0 md:ml-52 mt-16 p-6">
            <RightSidebar />

            <section>
                <h2 className="text-left text-2xl font-semibold mb-4">Popular Courses</h2>

                <CourseCarousel />
            </section>

            <FreeCoursesSection />

            {(discount || roles.id == '503') ? null : <WheelSpin />}

        </div>
    )
}