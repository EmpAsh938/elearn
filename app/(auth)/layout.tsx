"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import Swiper styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const images = [
        {
            src: "/images/notice.jpg",
            alt: "Special Offer 1"
        },
        {
            src: "/images/notice.jpg",
            alt: "Special Offer 2"
        },
        {
            src: "/images/notice.jpg",
            alt: "Special Offer 3"
        },
    ];

    return (
        <main>
            <section className="min-h-screen overflow-x-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Main Content */}
                <div className="order-2 md:order-1 flex flex-col gap-4 items-center py-4 px-10 md:px-16">
                    {children}
                </div>

                {/* Carousel Section */}
                <aside className="order-1 md:order-2 h-64 md:h-full">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="h-full w-full"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </aside>
            </section>
        </main>
    );
}
