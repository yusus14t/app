import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { axiosInstance, truncate } from "../../constants/utils";
import './specializationSlider.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import m from "../../assets/images/1920x1280-1.jpg"

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
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        modules={[Pagination,Autoplay]}
        className="mySwiper px-2"
      >
        
        {/* {specializations.map((specialisation)=> <SwiperSlide>
            <Link to={`/specialization/${specialisation?.id}`}>
              <div className="specialization-card">
                <div className="">
                  <div className="spe-circle mx-auto ">
                    
                    <img
                    className="specialZation-icon"
                      style={{ width: "85px", height: "85px", borderRadius:"50%" }}
                      src={specialisation?.icon}
                      alt=""
                    />
                  </div>
                  <h2 className="sixe m-0">{specialisation?.name}</h2>
                  <p className="m-0">{specialisation?.nickname}</p>
                </div>
              </div>
            </Link>
        </SwiperSlide>)} */}
        {specializations.map((specialisation)=> <SwiperSlide>
          <Link to={`/specialization/${specialisation?.id}`}>
          <div className='spicialization-card'>
            <div className='specialization-icon'>
              <img className='spe-icon' 
              
              src={specialisation?.icon || m}
              // src={m}
              />
            </div>
            {console.log(specialisation.name.slice(0,specialisation.name.indexOf("(")))}
            <div className='pb-2'>
                  <strong className='mb-1 fs-12 text-center'>{specialisation.name.slice(0,specialisation.name.indexOf("(") > 0 ? specialisation.name.indexOf("(") : specialisation.name.length )}</strong>
                  <p className='mb-0 fs-12 toh text-center'>{truncate(specialisation.name.slice(specialisation.name.indexOf("(") > 0 ?  specialisation.name.indexOf("(") : '' ),10)}</p>
            </div>

          </div>
          </Link>
        </SwiperSlide>)}
      </Swiper>
      <div className="w-100 d-flex justify-content-center" >
        <Link to={'/allspecialization'} className="view-all-btn" >
          view all specialization
      </Link ></div>
        
    </>
  );
}
