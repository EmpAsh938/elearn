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
import useResponsiveSize from '@/hooks/use-responsiveSize';


const CourseCarousel = () => {
    const [recentCourses, setRecentCourses] = useState<TCourses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const imageSize = useResponsiveSize();  // Use the custom hook to get dynamic size


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
                {(Array.isArray(recentCourses) && recentCourses.length > 0) ? recentCourses.map((course, index) => (
                    <SwiperSlide key={index}>
                        <Card className="transition-transform transform hover:scale-105">
                            <Link href={"courses/" + course.categoryId}>
                                <Image src={course.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${course.imageName}` : "/images/courses/default.png"}
                                    alt={course.categoryTitle} height={imageSize.height} width={imageSize.width} className="h-48 object-contain rounded mx-auto"
                                />
                                <p className="text-center py-2 font-medium text-lg line-clamp-1 overflow-hidden text-ellipsis">{course.categoryTitle}</p>
                            </Link>
                        </Card>
                    </SwiperSlide>
                )) : null}

            </Swiper>
        </div>

    );
};

export default CourseCarousel;
