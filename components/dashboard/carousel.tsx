"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { TCourses } from '@/app/lib/types';
import useResponsiveSize from '@/hooks/use-responsiveSize';


const CourseCarousel = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [browseCourses, setBrowseCourses] = useState<TCourses[]>([]);
    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size


    useEffect(() => {
        const fetchCourses = async () => {

            try {
                const req = await fetch(`/api/courses/recent`);
                const res = await req.json();
                setBrowseCourses(res.body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [])

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (!browseCourses || browseCourses.length === 0) return (
        <div>
            <p>Courses could not be loaded</p>
        </div>
    )

    return (
        <div className='w-full'>

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
                    1200: {
                        slidesPerView: 3,
                    },
                    1440: {
                        slidesPerView: 4,
                    },
                }}
                className="w-full"
            >
                {browseCourses.map((course) => (
                    <SwiperSlide key={course.categoryId}>
                        <Card className="transition-transform transform hover:scale-105">
                            <Link href={"/dashboard/browse/" + course.categoryId}>
                                <Image
                                    src={course.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.imageName}` : "/images/courses/default.png"}
                                    alt={course.categoryTitle} height={imageSize.height} width={imageSize.width} className="h-full w-full object-cover rounded" />
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
