import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import { axiosInstance } from "../../../constants/utils";

function Slider() {
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
      <div
        style={{ background: "#29", marginBottom: "200px" }}
        className="mb-2"
      >
        <div
          style={{ background: "tr" }}
          className="d-flex flex-row justify-content-between container mb-0  pt-3 px-4"
        >
          <div style={{ fontSize: "30px" }}>Specialization </div>
          {/* <div>
            <button className="btn-slider btn-primary">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>{" "}
            <button className="btn-slider  btn-primary">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div> */}
        </div>
        <Carousel
          dynamicHeight={false}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          onChange={true}
          interval={50}
        >
          <div className="slide">
            <div className="d-flex justify-center">
              <div className="specialization-card-container container">
                <Card source={"slider1"} specializations={specializations} />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="d-flex justify-center">
              <div className="specialization-card-container container">
                <Card source={"slider2"} specializations={specializations} />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="d-flex justify-center">
              <div className="specialization-card-container container">
                <Card source={"slider3"} specializations={specializations} />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="d-flex justify-center">
              <div className="specialization-card-container container">
                <Card source={"slider4"} specializations={specializations} />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="d-flex justify-center">
              <div className="specialization-card-container container">
                <Card source={"slider5"} specializations={specializations} />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Slider;
