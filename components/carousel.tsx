import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles

import { Autoplay, Navigation, Pagination } from 'swiper/modules';


const Carousel = () => {
    const images = [
        {
            src: "/images/notice.jpg",
            alt: "Offer"
        },
        {
            src: "/images/notice.jpg",
            alt: "Offer"
        },
        {
            src: "/images/notice.jpg",
            alt: "Offer"
        },
    ];

    return (
        // <Swiper
        //     spaceBetween={10}
        //     centeredSlides={true}
        //     autoplay={{
        //         delay: 2500,
        //         disableOnInteraction: false,
        //     }}
        //     pagination={{
        //         clickable: true,
        //     }}
        //     modules={[Autoplay, Pagination]}
        // >
        //     {images.map((image, index) => (
        //         <SwiperSlide key={index}>
        //             <div className="">
        //                 <Image
        //                     src={image.src}
        //                     alt={image.alt}
        //                     height={900} width={900} className="h-10 w-10 object-cover rounded"
        //                 />
        //             </div>
        //         </SwiperSlide>
        //     ))}
        // </Swiper>

        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {images.map((image, index) => (

                <SwiperSlide key={index}>
                    <Image src={image.src} alt={image.alt} width={900} height={900} className="object-cover w-full" />
                </SwiperSlide>
            ))}


        </Swiper>

    );
};

export default Carousel;
