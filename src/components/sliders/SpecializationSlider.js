import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { axiosInstance } from "../../constants/utils";
import './specializationSlider.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function SpecializationSlider() {
    const [ specializations, setSpecializations ] = useState([]);

  useEffect(() => {
    getSpecialization()
  }, [])

  const getSpecialization = async () => {
    let { data } = await axiosInstance.get("/get-specializations");
    setSpecializations(data?.specializations);
  };

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: false,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        
        {specializations.map((specialisation)=> <SwiperSlide>
            <Link to={`/specialization/${specialisation?.id}`}>
              <div className="specialization-card">
                <div className="">
                  <div className="spe-circle mx-auto ">
                    {/* <FontAwesomeIcon
                      style={{ fontSize: "50px", marginTop: "20%" }}
                      icon={faHeart}
                    /> */}
                    <img
                    className="specialZation-icon"
                      // style={{ width: "85px", height: "85px", borderRadius:"50%" }}
                      src={specialisation?.icon}
                      alt=""
                    />
                  </div>
                  <h2 className="sixe m-0">{specialisation?.name}</h2>
                  <p className="m-0">{specialisation?.nickname}</p>
                </div>
              </div>
            </Link>
        </SwiperSlide>)}
        
             
        
      </Swiper>
    </>
  );
}
