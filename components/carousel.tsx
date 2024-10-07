import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles

import { Autoplay, Navigation, Pagination } from 'swiper/modules';


const Carousel = () => {
    const images = [
        {
            src: "/images/resized/carousel1.png",
            alt: "Dashain Offer"
        },
        {
            src: "/images/resized/carousel2.png",
            alt: "Dashain Offer"
        },

        {
            src: "/images/resized/carousel3.png",
            alt: "Dashain Offer"
        },
        {
            src: "/images/resized/carousel4.png",
            alt: "Offer"
        },
        {
            src: "/images/resized/carousel5.png",
            alt: "Dashain Offer"
        },


        {
            src: "/images/resized/carousel6.png",
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
        >
            {images.map((image, index) => (

                <SwiperSlide key={index}>
                    <Image src={image.src} alt={image.alt} width={900} height={900} className="w-full object-contain" />
                </SwiperSlide>
            ))}


        </Swiper>

    );
};

export default Carousel;
