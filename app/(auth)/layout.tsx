"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import Swiper styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Navbar from "@/components/navbar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const images = [
        {
            src: "/images/carousel/carousel3.png",
            alt: "Dashain Offer"
        },
        {
            src: "/images/carousel/carousel4.png",
            alt: "Dashain Offer"
        },

        {
            src: "/images/carousel/carousel5.png",
            alt: "Dashain Offer"
        },
        {
            src: "/images/carousel/carousel2.png",
            alt: "Offer"
        },
        {
            src: "/images/carousel/carousel1.png",
            alt: "Dashain Offer"
        },


        {
            src: "/images/carousel/carousel6.png",
            alt: "Offer"
        },
    ];


    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="min-h-[calc(100vh-80px)] bg-[#f4f6fa] flex items-center justify-center px-4 md:px-0">
                <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
                    {/* Left: Main Content (Login Form) */}
                    <div className="flex flex-col justify-center items-center bg-white py-8 px-10 md:px-16">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>

                    {/* Right: Carousel Section */}
                    <aside className="hidden bg-gray-400 md:flex justify-center items-center">
                        <div className="w-full px-4">
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                // pagination={{
                                //     clickable: true,
                                // }}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="w-[350px] h-[200px] rounded-lg"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            layout="fill"
                                            className="object-contain w-full h-full"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </aside>
                </section>
            </main>
        </div>
    );
}
