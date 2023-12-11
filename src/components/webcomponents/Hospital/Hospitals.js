import React, { useEffect, useState } from 'react'
import { axiosInstance, convertTo12HourFormat } from '../../../constants/utils'

import { Link } from "react-router-dom";
import NO_PHOTO from "../../../assets/images/no_images/no_hospital.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFullPath } from "../../../constants/utils";
import { NUMBER_TO_DAY } from '../../../constants/constant';
const HospitalGrid = ({source}) => {
  const [ hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getHospitals()
  }, [])

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get('/hospitals')
      setHospitals(data?.organization)
    } catch(error){ console.error(error) }
  }

  const getTodayTiming = ( timing ) => {

    let time = timing?.find( t => t.day === NUMBER_TO_DAY[new Date().getDay()] )
    if( time ){
      return(
        <div>
          <span>Open: { convertTo12HourFormat(time.open) } </span>
          <br />
          <span>Close: { convertTo12HourFormat(time.close) } </span>
        </div>
      )
    } else {
      return(<>
        Today Not Available
      </>)
    }
  }
  
  return (
    <div>
      <div className="box d-flex align-items-center">
        <h3 className="text-center underline">
          <span className="under">Hospitals</span>
        </h3>
      </div>
      <div className="section section-padding aaside">
        <div className="container">
          <div className="row mt-2 mb-2">
            <div className="col-12">
              <div className="row ">
                {hospitals
                  .filter(
                    (hospital, index) =>
                      (source === "homepage" && index <= 5) ||
                      source !== "homepage"
                  )
                  .map((hospital, key) => (
                    <div
                      className="ml-2 col-lg-4 mb-4 col-md-6 mcard mt-2"
                      key={key}
                    >
                      <div className="hospitalCard ">
                        <span className=" hospital-title">{hospital.name}</span>
                        <div className="hospitalCard-background-img">
                          <img
                            className="hospitalCard-background-img"
                            src={
                              hospital?.photo
                                ? getFullPath(hospital.photo)
                                : NO_PHOTO
                            }
                            alt=""
                          />
                           <span style={{marginLeft:"10px", fontSize:"15px"}} className="ml-2 p-2 clinic-title">
                              &#8377; {hospital.fee}
                            </span>
                        </div>
                        <div className="clinic-details d-flex flex-row justify-content-between">
                          <div className="mt-3">
                            <h6 className="hospital-specialization text-disabled">
                              {hospital.specialization.length > 1
                                ? "Multi speciality"
                                : hospital.specialization[0]?.name || "-"}
                            </h6>
                            <div className="contact-info mt-3">
                              <div>
                                <p className="ml-2 adjust hospital-address  ">
                                  <FontAwesomeIcon
                                    className="clinic-icon address-icon"
                                    icon={faLocationDot}
                                  />
                                  {hospital.address}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 hospital-card-timing">
                            <span>Timing</span>
                            <div className="d-flex flex-column justify-contant-between">
                              {getTodayTiming(hospital?.timing)}
                              <div className="">
                                <Link
                                  className="text-light hospital-btn  btn btn1 btn-primary shadow-none"
                                  to={`/hospital-detail/${hospital._id}`}
                                >
                                  View More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalGrid