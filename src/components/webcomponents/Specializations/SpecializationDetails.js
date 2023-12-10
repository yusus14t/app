import React, { useEffect, useState } from "react";
import "../../../assets.app/css/specialzation.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { getAuthHeader, getFullPath,axiosInstance, convertTo12HourFormat,  } from "../../../constants/utils";
import clinicPhoto2 from "../../../assets.web/img/home-1/1920x1280-1.jpg";
import { NUMBER_TO_DAY } from "../../../constants/constant";
import NO_PHOTO from "../../../assets.app/images/no_images/no_clinic.jpg";



const SpecializationDetails = () => {
  const params = useParams()
  const [clinics, setClinics] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [specialization, setSpecialization] = useState([]);

  useEffect(() => {
    getSpecialization();
  }, [ params.id, ]);

  useEffect(() => {
    getAllClinics();
    getAllHospitals();
  },[specialization])

  const getSpecialization = async () => {
    try{
      let { data } = await axiosInstance.get(`/specialization/${params.id}`);
      setSpecialization(data?.specializations);
    } catch(error){ console.error(error) }
  };
   
  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", { params: { filter: {specialization: specialization?.id }, isClinic: true }, ...getAuthHeader()});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals", { params: { filter: {specialization: specialization?.id }}, ...getAuthHeader()});
      setHospitals( data?.organization );
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
            <div>
              <span>Open: { convertTo12HourFormat(time?.open) } </span>
              <br />
              <span>Close: { convertTo12HourFormat(time?.close) } </span>
            </div>
          </div>
          <div>
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
    <>
      <div style={{ height: "65px" }}></div>
      <div className="">
        <div className=" banner text-center">
          <h3 className="title pt-0">{specialization?.name}</h3>
        </div>
      </div>
      {
        <div className="splz-deatial container mt-3">
          <div style={{display:"flex",flexWrap:"wrap", justifyContent:"space-between"}} >
            <div className="mb-0">
              <img
                className="specialization-image"
                src={specialization?.image}
                alt=""
              />
            </div>
            <div className="deatil  m-0 ">
              <p className="details-text">{specialization?.description}</p>
            </div>
          </div>

          <div className="">
            <h2 className="text-center">Hospitals</h2>
            <div className="row">
              {hospitals?.length > 0 &&
                hospitals.map((hospital) => {
                  return (
                    <div
                      className="ml-2 col-lg-4 mb-4 col-md-6 mcard mt-2"
                      //   key={key}
                    >
                      <div className="hospitalCard ">
                        <span className=" hospital-title">{hospital.name}</span>
                        <div className="hospitalCard-background-img">
                          <img
                            className="hospitalCard-background-img"
                            src={
                              hospital?.photo
                                ? getFullPath(hospital.photo)
                                : clinicPhoto2
                            }
                            alt=""
                          />
                          <span style={{marginLeft:"10px", fontSize:"10px"}} className="ml-2 p-2 clinic-title">
                              &#8377;{hospital?.fee}
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
                                  {hospital.address || "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 hospital-card-timing">
                            Timing
                            <div className="d-flex flex-column justify-contant-between">
                              {getTodayTiming(hospital.timing)}
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
                  );
                })}
            </div>
          </div>
          <div className="">
            <h2 className="text-center">Clinics</h2>
            <div className="row">
              {clinics.length > 0 &&
                clinics
                  .filter((e, i) => i < 3)
                  .map((clinic, key) => {
                    return (
                      // <div
                      //   className="col-lg-4 mb-4 col-md-4 mcard mt-4"
                      //   key={key}
                      // >
                      //   <div
                      //     style={{ background: "#ffffff" }}
                      //     className="clinic-card "
                      //   >
                      //     <div className="inner-card-border"></div>
                      //     <div style={{ marginBottom: "-22px" }}>
                      //       <img
                      //         className="clinic-img"
                      //         src={
                      //           clinic?.photo
                      //             ? getFullPath(clinic?.photo)
                      //             : clinicPhoto2
                      //         }
                      //         alt=""
                      //       />
                      //       <span className=" p-2 clinic-title">
                      //         {clinic?.name}
                      //       </span>
                      //       <span style={{marginLeft:"10px", fontSize:"10px"}} className="ml-2 p-2 clinic-title">
                      //         &#8377;{clinic?.fee}
                      //       </span>
                      //     </div>
                      //     <div className="clinic-details d-flex flex-row justify-content-between">
                      //       <div className="mt-2">
                      //         <h6 className="clinic-specialization text-disabled">
                      //         {clinic?.specialization.length ? clinic.specialization[0].name : "-"}
                      //         </h6>
                      //         <div className="contact-info">
                      //           <h6 className="text-disabled mt-1">
                      //             Contact Info :
                      //           </h6>
                      //           <div>
                      //             <p className="ml-2 adjust hospital-address  ">
                      //               <FontAwesomeIcon
                      //                 className="clinic-icon address-icon"
                      //                 icon={faLocationDot}
                      //               />
                      //               {clinic?.address || "-"}
                      //             </p>
                      //           </div>
                      //         </div>
                      //       </div>
                      //       <div className="">
                      //         <h6 className="text-disabled">Timming</h6>
                      //         <div className="d-flex flex-column justify-contant-between">
                      //           <div className="">
                      //             <p className="clinic-timming mb-0">
                      //               Morning : 08 AM to 11 PM
                      //             </p>
                      //             <p className="clinic-timming mb-0">
                      //               Evening : 05 PM to 11 PM
                      //             </p>
                      //           </div>
                      //           <Link
                      //             className="text-light clinic-btn  btn btn1 btn-primary shadow-none"
                      //             to={`/clinic-detail/${clinic?._id}`}
                      //           >
                      //             View More
                      //           </Link>
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                      <div
                        className="col-lg-4 mb-4 col-md-6 mcard mt-4"
                        key={key}
                      >
                        <div
                          style={{ background: "#ffffff" }}
                          className="clinic-card "
                        >
                          <div className="inner-card-border"></div>
                          <div style={{ marginBottom: "-22px" }}>
                            <img
                              className="clinic-img"
                              src={
                                clinic?.photo
                                  ? getFullPath(clinic?.photo)
                                  : NO_PHOTO
                              }
                              alt=""
                            />
                            <span className=" p-2 clinic-title">
                              {clinic?.name}
                            </span>
                            <span
                              style={{ marginLeft: "10px", fontSize: "15px" }}
                              className="ml-2 p-2 clinic-title"
                            >
                              &#8377;{clinic?.fee}
                            </span>
                          </div>
                          <div className="clinic-details d-flex flex-row justify-content-between">
                            <div className="mt-2">
                              <h6 className="clinic-specialization text-disabled">
                                {clinic.specialization.length > 1
                                  ? "Multi speciality"
                                  : clinic.specialization[0]?.name || "-"}
                              </h6>
                              <div className="contact-info">
                                <h6 className="text-disabled mt-1 clinic-cont">
                                  Contact Info :
                                </h6>
                                <div>
                                  <FontAwesomeIcon
                                    className="clinic-icon"
                                    icon={faPhone}
                                  />
                                  <p className="d-inline-block ml-2 mb-0 clinic-phne">
                                    {clinic?.phone ? "+91" + clinic?.phone : ""}
                                  </p>
                                </div>
                                <div>
                                  <p className="ml-2 adjust hospital-address  ">
                                    <FontAwesomeIcon
                                      className="clinic-icon address-icon"
                                      icon={faLocationDot}
                                    />
                                    {clinic?.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <h6 className="text-disabled">Timming</h6>
                              <div className="d-flex flex-column justify-contant-around">
                                {getTodayTiming(clinic?.timing)}
                                <Link
                                  className="text-light clinic-btn  btn btn1 btn-primary shadow-none"
                                  to={`/clinic-detail/${clinic?._id}`}
                                >
                                  View More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SpecializationDetails;
