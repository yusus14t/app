import React, { useEffect, useState } from "react";
import background from "../../../assets.app/img/user-profile-bg-1920x400.jpg";
import DepartmentCard from "./DepartmentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance, convertTo12HourFormat, formatPhone, getFullPath, userInfo } from "../../../constants/utils";
import { useParams } from "react-router-dom";
import { FULLDAY } from "../../../constants/constant";

const HospitalDetails = () => {
  const [ hospital, setHospital] = useState({});
  const [ departments, setDepartments] = useState([]);
  const [notices, setNotices] = useState([])


  const params = useParams();

  useEffect(() => {
    getHospital();
    getNotices();
  }, [params.id, ])

  const getNotices = async () => {
    try {
      let { data } = await axiosInstance.get(`/notice/${params.id}`)
      setNotices(data?.notices)
    } catch (error) { console.error(error) }
  }

  const getHospital = async () => {
    try{
      let { data } = await axiosInstance.get(`/hospital-details/${params.id}`)
      console.log(data?.details)
      setHospital(data?.details)
      setDepartments(data?.departments)
    } catch(error) { console.error(error) }
  }

  const getTiming = ( short, fullday ) => {
    let day = hospital?.timing?.find( time => time.day === short )
    return (
      <tr>
        <td>{fullday}</td>
        <td>{ convertTo12HourFormat(day?.open) }</td>
        <td>{ convertTo12HourFormat(day?.close) }</td>
      </tr>
    )
  }

  return (
    <>
      <div className="box"></div>
      <div className="hospital-banner">
        <h4 className="clinic-detail-name">{hospital?.name}</h4>
        <img className="hopsiptal-banner-img" src={hospital?.photo ? getFullPath(hospital?.photo) : background} alt="" />
      </div>
      <div className="p-4">
          {/* <DepartmentCard /> */}
          <div className="row">
            <div className="col-md-8">
              {departments.length > 0 && <DepartmentCard departments={departments} />}
            </div>
            <div className="col-md-4">
            <div className="">
              <div className="clinic-info-details pb-3">
                <h4 className="mb-3 pt-2  text-center text-light">Info</h4>
                <div className="bg-white m-2 rounded p-2">
                  <h6>Consultation Fee <span className="ms-4">₹{ hospital?.fee}</span></h6>
                </div>
                { userInfo?.userType !== 'DP' && <div className="bg-white m-2 rounded p-2">
                  <h6 className="mx-1">Services</h6>
                  <div className="d-flex flex-wrap">
                    {hospital.services?.length > 0
                      ? hospital.services?.map((serv) => 
                          <div className="service-tube m-1">
                            {serv?.name}
                          </div>
                        )
                      : "-"
                    }
                  </div>
                </div>}

                <div className="bg-white m-2 rounded p-2">
                  <h6>Important Notice</h6>
                  {notices?.length > 0 ? notices.map(notice => <div style={{ borderLeft: '5px solid grey', paddingLeft: "1rem" }}>
                    <h6 className="text-danger">{notice.title}</h6>
                    <p className="text-danger">{notice.description}</p>
                  </div>)
                    :
                    <div className="bg-white m-2 rounded p-2">No Data</div>
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="pr-2 ">
                  <table className="table  table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Session</th>
                        <th>Open</th>
                        <th>Close</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(FULLDAY).map(([short, day]) => (
                        getTiming(short, day)
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </div>
          </div>

        {/* contact card */}
        <div class="contact-details-clinic">
          <div class="sigma_info style-26 d-flex">
            <div class="sigma_info-title">
              <span class="sigma_info-icon clinic-address-icon-container">
                <FontAwesomeIcon
                  className="clinic-address-icon"
                  icon={faLocationDot}
                />
              </span>
            </div>
            <div class="sigma_info-description">
              <p>Our Address</p>
              <p class="secondary-color">{ hospital?.address }</p>
            </div>
          </div>
          <div class="sigma_info style-26 d-flex">
            <div class="sigma_info-title d-flex">
              <span class="sigma_info-icon clinic-address-icon-container">
                <FontAwesomeIcon
                  className="clinic-address-icon"
                  icon={faPhone}
                />
                <i class="fal fa-phone"></i>
              </span>
            </div>
            <div class="sigma_info-description">
              <p>Call Us</p>
              <p class="secondary-color">{formatPhone(hospital?.phone)}</p>
            </div>
          </div>
          <div class="sigma_info style-26 d-flex">
            <div class="sigma_info-title">
              <span class="sigma_info-icon clinic-address-icon-container">
                <FontAwesomeIcon
                  className="clinic-address-icon"
                  icon={faEnvelope}
                />
              </span>
            </div>
            <div class="sigma_info-description">
              <p>Our Mail</p>
              <p class="secondary-color">{ hospital?.email }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDetails;
