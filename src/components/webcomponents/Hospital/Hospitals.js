import React, { useEffect, useState } from "react";
import { axiosInstance, convertTo12HourFormat } from "../../../constants/utils";

import { Link } from "react-router-dom";
import NO_PHOTO from "../../../assets/images/no_images/no_hospital.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFullPath } from "../../../constants/utils";
import { NUMBER_TO_DAY } from "../../../constants/constant";
import HospitaCard from "../../App/cards/HospitaCard";
import Container from "../../App/Layout/Container";
const HospitalGrid = ({ source }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals");
      setHospitals(data?.organization);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodayTiming = (timing) => {
    let time = timing?.find(
      (t) => t.day === NUMBER_TO_DAY[new Date().getDay()]
    );
    if (time) {
      return (
        <div>
          <span>Open: {convertTo12HourFormat(time.open)} </span>
          <br />
          <span>Close: {convertTo12HourFormat(time.close)} </span>
        </div>
      );
    } else {
      return <>Today Not Available</>;
    }
  };

  return (
    <Container>
      <div className="row mx-0 ">
        {hospitals.length &&
          hospitals.map((hospital) => <HospitaCard hospital={hospital} />)}
      </div>
    </Container>
  );
};

export default HospitalGrid;
