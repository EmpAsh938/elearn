"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { TCourses } from '@/app/lib/types';


const CourseCarousel = () => {
    const [recentCourses, setRecentCourses] = useState<TCourses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {

            try {
                const req = await fetch(`/api/courses/recent`);
                const res = await req.json();
                console.log(res)
                setRecentCourses(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [])
    return (
        <div className='w-full px-10'>

            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1440: {
                        slidesPerView: 4,
                    },
                }}
                className="w-full"
            >
                {recentCourses.map((course, index) => (
                    <SwiperSlide key={index}>
                        <Card className="transition-transform transform hover:scale-105">
                            <Link href={"courses/" + course.categoryId}>
                                <Image src={course.imageLink || "/images/courses/default.png"} alt={course.categoryTitle} height={600} width={600} className="h-full w-full object-cover rounded" />
                                <p className="text-center py-2 font-medium text-lg line-clamp-2 overflow-hidden text-ellipsis">{course.categoryTitle}</p>
                            </Link>
                        </Card>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    );
};

export default CourseCarousel;
