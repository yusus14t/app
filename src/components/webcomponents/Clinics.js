import React, { useEffect, useState } from "react";
import { axiosInstance, convertTo12HourFormat } from "../../constants/utils";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFullPath } from "../../constants/utils";
import { NUMBER_TO_DAY } from "../../constants/constant";
import NO_PHOTO from "../../assets/images/no_images/no_clinic.jpg";
import ClinicCard from "../App/cards/ClinicCard";


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
    // <div>
    //   <div className="box d-flex align-items-center">
    //     <h3 className="text-center underline">
    //       <span className="under">Clinics</span>
    //     </h3>
    //   </div>

    //   {/* <Banner2 title={'Clinic List'} /> */}

    //   <div
    //     style={{ background: "#f1f5fc" }}
    //     className="section section-padding aaside"
    //   >
    //     <div className="asidebox"></div>
    //     <div className="container">
    //       <div className="row mt-2 mb-2">
    //         <div className="col-12">
    //           <div className="row ">
    //             {/* <ClinicListCard clinics={clinics} /> */}
    //             {clinics.length > 0 &&
    //               clinics
    //                 .filter(
    //                   (clinic, index) =>
    //                     (source === "homepage" && index <= 5) ||
    //                     source !== "homepage"
    //                 )
    //                 .map((clinic, key) => (
    //                   <div
    //                     className="col-lg-4 mb-4 col-md-6 mcard mt-4"
    //                     key={key}
    //                   >
    //                     <div
    //                       style={{ background: "#ffffff" }}
    //                       className="clinic-card "
    //                     >
    //                       <div className="inner-card-border"></div>
    //                       <div style={{ marginBottom: "-22px" }}>
    //                         <img
    //                           className="clinic-img"
    //                           src={
    //                             clinic?.photo
    //                               ? getFullPath(clinic?.photo)
    //                               : NO_PHOTO
    //                           }
    //                           alt=""
    //                         />
    //                         <span className=" p-2 clinic-title">
    //                           {clinic?.name}
                              
    //                         </span>
    //                         <span style={{marginLeft:"10px", fontSize:"15px"}} className="ml-2 p-2 clinic-title">
    //                           &#8377;{clinic?.fee}
    //                         </span>
    //                       </div>
    //                       <div className="clinic-details d-flex flex-row justify-content-between">
    //                         <div className="mt-2">
    //                           <h6 className="clinic-specialization text-disabled">
    //                           {clinic.specialization.length > 1
    //                             ? "Multi speciality"
    //                             : clinic.specialization[0]?.name || "-"}
    //                           </h6>
    //                           <div className="contact-info">
    //                             <h6 className="text-disabled mt-1 clinic-cont">
    //                               Contact Info :
    //                             </h6>
    //                             <div>
    //                               <FontAwesomeIcon
    //                                 className="clinic-icon"
    //                                 icon={faPhone}
    //                               />
    //                               <p className="d-inline-block ml-2 mb-0 clinic-phne">
    //                                 {clinic?.phone ? "+91" + clinic?.phone : ""}
    //                               </p>
    //                             </div>
    //                             <div>
    //                               <p className="ml-2 adjust hospital-address  ">
    //                                 <FontAwesomeIcon
    //                                   className="clinic-icon address-icon"
    //                                   icon={faLocationDot}
    //                                 />
    //                                 {clinic?.address}
    //                               </p>
    //                             </div>
    //                           </div>
    //                         </div>
    //                         <div className="">
    //                           <h6 className="text-disabled">Timming</h6>
    //                           <div className="d-flex flex-column justify-contant-around">
    //                             {getTodayTiming(clinic?.timing)}
    //                             <Link
    //                               className="text-light clinic-btn  btn btn1 btn-primary shadow-none"
    //                               to={`/clinic-detail/${clinic?._id}`}
    //                             >
    //                               View More
    //                             </Link>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="row mx-0 px-0">
      {clinics.length && clinics.map((clinic, key)=> {

      return <ClinicCard clinic={clinic} key={key}/>
      })}
    </div>
  );
}

export default Clinics;
