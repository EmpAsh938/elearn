"use client";

import { TBookedCourse } from "@/app/lib/types";
import { BookingTable } from "@/components/admin/booking/booking-table";
import { useEffect, useState } from "react";

export default function AdminBooking() {
    const [courses, setCourses] = useState<TBookedCourse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const req = await fetch(`/api/courses/booked/all`);
                const res = await req.json();
                setCourses(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Booked Courses</h2>
            <section className="">

                <BookingTable courses={courses} loading={isLoading} />
            </section>
        </div>
    );
}
