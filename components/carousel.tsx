import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles

import { Autoplay, Navigation, Pagination } from 'swiper/modules';


const Carousel = () => {
    const images = [
        {
            src: "/images/carousel/carousel1.png",
            alt: "Dashain Offer"
        },
        {
            src: "/images/carousel/carousel2.png",
            alt: "Offer"
        },
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
            src: "/images/carousel/carousel6.png",
            alt: "Offer"
        },
    ];

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-full w-full"
        >
            {images.map((image, index) => (

                <SwiperSlide key={index}>
                    <Image src={image.src} alt={image.alt} width={900} height={900} className="object-fill w-full" />
                </SwiperSlide>
            ))}


        </Swiper>

    );
};

export default Carousel;
