import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

export default ({ slides = [], view = 1 }) => {
    return (
        slides.length &&
        <Swiper
            slidesPerView={ view }
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
        >
            {
                slides.map((slide, key) =>
                    <SwiperSlide key={key}> {slide} </SwiperSlide>
                )
            }
        </Swiper>
    )
}