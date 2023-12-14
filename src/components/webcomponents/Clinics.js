import React, { useEffect, useState } from "react";
import { axiosInstance, convertTo12HourFormat } from "../../constants/utils";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFullPath } from "../../constants/utils";
import { NUMBER_TO_DAY } from "../../constants/constant";
import NO_PHOTO from "../../assets/images/no_images/no_clinic.jpg";
import ClinicCard from "../App/cards/ClinicCard";
import Container from "../App/Layout/Container";


function Clinics({ source }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    getAllClinics();
  }, []);

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {params: { isClinic: true }});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodayTiming = ( timing ) => {

    let time = timing?.find( t => t.day === NUMBER_TO_DAY[2] )
    if( time ){
      return (
        <>
          <div>
            <p className="pb-0  cli-time">Morning</p>
            <div>
              <span>Open: { convertTo12HourFormat(time?.morning?.open) } </span>
              <br />
              <span>Close: { convertTo12HourFormat(time?.morning?.close) } </span>
            </div>
          </div>
          <div>
          {/* <p className="pb-0">Evening</p>
          <div>
            <span>Open: { convertTo12HourFormat(time?.evening?.open) } </span>
            <br />
            <span>Close: { convertTo12HourFormat(time?.evening?.close) } </span>
          </div> */}
        </div>
        </>
      );
    } else {
      return(<>
        Today Not Available
      </>)
    }
  }

  return (
    <Container>

    <div className="row mx-0 px-0">
      {clinics.length && clinics.map((clinic, key)=> {

      return <ClinicCard clinic={clinic} key={key}/>
      })}
    </div>
    </Container>
  );
}

export default Clinics;
