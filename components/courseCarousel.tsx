import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel"
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
        <div className='px-10'>

            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
            >
                {recentCourses.map((course, index) => (
                    <SwiperSlide key={index}>
                        <Card className="transition-transform transform hover:scale-105">
                            <Image src={course.thumbnail} alt={course.title} height={600} width={600} className="h-full w-full object-cover rounded" />
                            <p className="text-center py-2 font-medium text-lg">{course.title}</p>
                        </Card>
                    </SwiperSlide>
                ))}

            </Swiper>

            {/* <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper> */}
        </div>

    );
};

export default CourseCarousel;
