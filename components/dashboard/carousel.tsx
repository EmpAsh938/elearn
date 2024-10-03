import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';


const CourseCarousel = () => {
    const recentCourses = [
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
            description: "Management course is the best one"
        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
            description: "Management course is the best one"

        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
            description: "Management course is the best one"

        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
            description: "Management course is the best one"

        },
        {
            thumbnail: "/images/courses/course2.webp",
            title: "NEB 12 Management",
            description: "Management course is the best one"

        },
    ];

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
                            <Link href={"/dashboard/browse/" + (index + 1)}>
                                <Image src={course.thumbnail} alt={course.title} height={600} width={600} className="h-full w-full object-cover rounded" />
                                <p className="text-center py-2 font-medium text-lg">{course.title}</p>
                            </Link>
                        </Card>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>

    );
};

export default CourseCarousel;
