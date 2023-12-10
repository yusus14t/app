import React, { useEffect, useState } from "react";
import { WEBSITE_IMAGE } from "../../constants/constant";
import { getFullPath, getImages } from "../../constants/utils";





const About = () => {
  const [ images, setImages ] = useState([])

  useEffect(() => {
    initailizer();
  },[])


  const initailizer = async () => {
    let imagesData = await getImages()
    setImages(imagesData.data.images)
  }

  const findImage = ( id ) => {
    return getFullPath(images.find( image => image.id === id )?.image)
  }

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <h3 className="text-center bg-success text-light p-2">About Us </h3>

      <div className="about-banner-conatiner">
        <img
          className="about-banner"
          src={findImage(WEBSITE_IMAGE.ABOUT_BANNER)}
          alt=""
        />
      </div>
      <div className="container">
        <div style={{ height: "auto" }} className="row ">
          <div className="col-sm-7 mt-3">
            <h3 className="text-center">WELCOME TO DOCTORTIME!</h3>
            <h5 style={{ textAlign: "justify" }}>
              {" "}
              At Doctortime, we are dedicated to simplifying the complex world
              of hospital management. Our software is designed to empower
              healthcare professionals and administrators by providing powerful
              tools to streamline operations, enhance patient care, and optimize
              administrative tasks.
            </h5>
            <h5 style={{ textAlign: "justify" }}>
              With years of experience in the healthcare industry, we understand
              the unique challenges faced by hospitals, clinics and medical
              facilities. Our team of experts has worked diligently to create a
              comprehensive solution that addresses these challenges head-on.
            </h5>
          </div>
          <div style={{ height: "300px" }} className="col-sm-5">
            <img
              className="about-banner2"
              style={{ height: "300px", width: "100%" }}
              src={findImage(WEBSITE_IMAGE.ABOUT_POSTER_1)}
              alt=""
            />
          </div>
        </div>
        <div className="about-banner-container mb-2">
          <img
            className=" about-banner"
            src={findImage(WEBSITE_IMAGE.ABOUT_POSTER_2)}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default About;
