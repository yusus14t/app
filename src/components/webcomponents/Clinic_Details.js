import background from "../../assets.app/img/user-profile-bg-1920x400.jpg";
import { axiosInstance, convertTo12HourFormat, formatPhone, getAuthHeader, getFullPath } from "../../constants/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Appointment from "../common-components/Appointment/Appointment";
import events from "../../events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faEnvelope, faMapMarker,  faPhone, } from "@fortawesome/free-solid-svg-icons";
import { FULLDAY } from "../../constants/constant";


function Detail() {
  const params = useParams();
  const [clinicDetail, setClinicDetail] = useState({});
  const [waitingList, setWaitingList] = useState([]);
  const [unreachedList, setUnreachedList] = useState([]);
  const [token, setToken] = useState('00')
  const [isOpen, setIsOpen] = useState(false);
  const [timing, setTiming] = useState([])
  const [ isBookingStatus, setIsBookingStatus ] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [notices, setNotices] = useState([])
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
 
  useEffect(() => {
    getWaitingList();
    getClinicDetail();
    getNotices();
    getUnreachedList();

    events.addEventListener('re-appointment', ( event ) => reAppointmentHandler( JSON.parse(event.data) )) 
    events.addEventListener('new-appointment', ( event ) => newAppointmentHandler( JSON.parse(event.data) ))
    events.addEventListener('status', ( event ) => statusEventHandler( JSON.parse(event.data) )) 
    events.addEventListener('booking-status', ( event ) => bookingEventHandler( JSON.parse(event.data) )) 

  }, []);

  let newAppointmentHandler = ( event ) => {
    getWaitingList()
  }

  let reAppointmentHandler = ( event ) => {
  }
  
  const statusEventHandler = ( event ) => {
    getClinicDetail()
    getWaitingList()
    getUnreachedList()
  }

  const bookingEventHandler = ( status ) => {
    setIsBookingStatus( status.bookingStatus )
  }


  const getClinicDetail = async () => {
    try {
      let { data } = await axiosInstance.get("/clinic-detail", {
        params: { _id: params.id },
        ...getAuthHeader(),
      });
      let detail = data?.detail
      setClinicDetail(detail);
      setTiming(detail?.timing)
      let token = '00'
      token = detail?.token < 10  ? 
              `0${detail?.token}` : 
              detail?.token || '000'

      setToken( token )

      setIsBookingStatus( data.detail?.bookingStatus )
    } catch (error) {
      console.error(error);
    }
  };

  const getWaitingList = async () => {
    try {
      let { data } = await axiosInstance.get(`/waiting-list/${params.id}`, getAuthHeader());

      setWaitingList(data?.appointment)
    } catch (error) {
      console.error(error);
    }
  };

  const getUnreachedList = async () => {
    try {
      let { data } = await axiosInstance.get(
        `/unreached-list/${params.id}`,
        getAuthHeader()
      );

      setUnreachedList(data?.unreached);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAppointmentModal = () => {
    if (!userInfo)
      navigate("/login", {
        state: { redirectTo: window.location.pathname },
      });
    setIsOpen(true);
  };


  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const getNotices = async () => {
    try {
      let { data } = await axiosInstance.get(`/notice/${params.id}`)
      setNotices(data?.notices)
    } catch (error) { console.error(error) }
  }

  const getTiming = ( short, full, source ) => {
    let day = timing.find( time => time.day === short )

    if( source === 'Clinic'  ){
      return(
        <tr>
          <td>{ full }</td>
          <td>{ convertTo12HourFormat(day?.morning?.open) }</td>
          <td>{ convertTo12HourFormat(day?.morning?.close) }</td>
          <td>{ convertTo12HourFormat(day?.evening?.open) }</td>
          <td>{ convertTo12HourFormat(day?.evening?.close) }</td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{ full }</td>
          <td>{ convertTo12HourFormat(day?.open) }</td>
          <td>{ convertTo12HourFormat(day?.close) }</td>
        </tr>
      )

    }
  }

  return (
    <>
      <div className="">
        <div className="box"></div>
        <div
          className="clinicbanner"
          style={{
            backgroundImage: `url(${
              clinicDetail?.photo
                ? getFullPath(clinicDetail?.photo)
                : background
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        >
          <h4 className="clinic-detail-name">
            {clinicDetail?.hospital?.name || clinicDetail.name}
          </h4>

          <div className="d-flex flex-row  clinic-detail-img-container ">
            <div className="d-flex flex-row  justify-content-between  ">
              {/* <img
                className="clinic-detail-img"
                src={
                  clinicDetail?.doctors
                    ? getFullPath(clinicDetail?.doctors[0]?.photo)
                    : NO_PHOTO
                }
                alt=""
              /> */}
              <div className="mt-5 clinic-detail-mobile">
                <h4 className="text-light clinic-detail-drName rounded mt-4">
                  {/* {clinicDetail?.doctor?.name}
                    {clinicDetail?.name} */}
                  {clinicDetail.doctor?.name}
                </h4>
                {clinicDetail.organizationType !== "Clinic" && (
                  <>
                    <h4 className="text-light clinic-detail-drName rounded">
                      Dept. {clinicDetail.name}{" "}
                    </h4>
                  </>
                )}

                <h6
                  style={{ display: "inline-block" }}
                  className="text-light clinic-detail-drName rounded"
                >
                  {clinicDetail?.specialization?.map((spe) => spe.name) ||
                    "Specialization"}
                </h6>
                {clinicDetail?.room && (
                  <h4 className="text-light clinic-detail-drName rounded">
                    {/* {clinicDetail?.doctor?.name} */}
                    Room No: {clinicDetail?.room}
                  </h4>
                )}
              </div>
            </div>
            <div
              className="current-clicnic-token ml-5 d-flex flex-row"
              style={{ position: "relative" }}
            >
              <h1 style={{ position: "absolute", left: "15%", top: "15%" }}>
                {token}
              </h1>
            </div>
          </div>
        </div>
        {(userInfo?.userType === "PT" || !userInfo) && (
          <div
            className="bookappoint cursor-pointer"
            onClick={() => (isBookingStatus ? handleAppointmentModal() : null)}
          >
            <FontAwesomeIcon
              className="bookappointment-icon"
              icon={faCalendarPlus}
            />

            <h5 className="p-2">
              {isBookingStatus ? "Book Appointment" : "Booking Closed"}
            </h5>
          </div>
        )}

        <div className="container-fluid">
          <div className="row clinic-details-row mt-5 mx-0">
            {/* WAITING LIST */}
            <div className="col-md-6 ">
              <div className="wating-area-clinic">
                <div className="d-flex justify-content-center waitinglistContainer">
                  <span className="text-center bg-success p-2">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={`btn position-inline p-2 btn-primary waitinglist  ${
                        activeTab === 0 ? "activeList" : ""
                      }`}
                    >
                      Waiting List
                    </button>
                  </span>
                  <span className="text-center bg-success p-2">
                    <button
                      onClick={() => handleTabClick(1)}
                      className={`btn position-inline p-2 btn-primary waitinglist ${
                        activeTab === 1 ? "activeList" : ""
                      }`}
                    >
                      Unreached List
                    </button>
                  </span>
                </div>
                {activeTab === 0 && (
                  <div className="token-list-container  rounded ">
                    {waitingList?.length ? (
                      <ul className={`token-list $`}>
                        {waitingList.map((list, key) => (
                          <li className=" p-2" key={key}>
                            <div className="mt-auto">
                              <div
                                className={`token-list-item d-flex flex-row justify-content-around ${
                                  list?.token == parseInt(token)
                                    ? "token-list-active"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`token ${
                                    list?.token == parseInt(token)
                                      ? "token-active"
                                      : ""
                                  }`}
                                >
                                  <h4 className="token-list-number">
                                    {list?.token}
                                  </h4>
                                </div>
                                <div className="token-list-detail">
                                  <h4 className="list-patient-name mb-1">
                                    {list?.name}
                                  </h4>
                                  <p className="mb-0 list-mobile-no">
                                    Mobile Number : +91{" "}
                                    {list?.phone
                                      ? `xxx-xxx-${list?.phone.slice(-4)}`
                                      : "----------"}
                                  </p>
                                  <p className="mb-0 list-address">
                                    Address : {list?.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Data</span>
                    )}
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="token-list-container ">
                    {unreachedList?.length ? (
                      <ul className={`token-list $`}>
                        {unreachedList.map((list, key) => (
                          <li className=" p-2" key={key}>
                            <div className="mt-auto">
                              <div
                                className={`token-list-item d-flex flex-row justify-content-around ${
                                  list?.token == parseInt(token)
                                    ? "token-list-active"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`token ${
                                    list?.token == parseInt(token)
                                      ? "token-active"
                                      : ""
                                  }`}
                                >
                                  <h4 className="token-list-number">
                                    {list?.token}
                                  </h4>
                                </div>
                                <div className="token-list-detail">
                                  <h4 className="list-patient-name mb-1">
                                    {list?.name}
                                  </h4>
                                  <p className="mb-0 list-mobile-no">
                                    Mobile Number : +91{" "}
                                    {list?.phone
                                      ? `xxx-xxx-${list?.phone.slice(-4)}`
                                      : "----------"}
                                  </p>
                                  <p className="mb-0 list-address">
                                    Address : {list?.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Data</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* INFO CARD */}
            <div className="col-md-6 ">
              <div className="clinic-info-details pb-3 mb-3">
                <h4 className="mb-3 pt-2  text-center text-light">Info</h4>

                <div className="bg-white m-2 rounded p-2">
                  <h6>
                    Consultation Fee{" "}
                    <span className="ms-4">₹{clinicDetail?.fee}</span>
                  </h6>
                </div>

                <div className="bg-white m-2 rounded p-2">
                  <h6 className="mx-1">Services</h6>
                  <div className="d-flex flex-wrap">
                    {clinicDetail?.services?.length > 0
                      ? clinicDetail?.services?.map((serv) => (
                          <div className="service-tube m-1">{serv?.name}</div>
                        ))
                      : clinicDetail?.hospital?.services?.map((serv) => (
                          <div className="service-tube m-1">{serv?.name}</div>
                        ))}
                  </div>
                </div>

                <div className="bg-white m-2 rounded p-2">
                  <h6>Important Notice</h6>
                  {notices?.length > 0 &&
                    notices.map((notice) => (
                      <div
                        style={{
                          borderLeft: "5px solid grey",
                          paddingLeft: "1rem",
                        }}
                      >
                        <h6 className="text-danger">{notice.title}</h6>
                        <p className="text-danger">{notice.description}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="text-center">
                <div className="pr-2 m-text">
                  <table className="table  table-bordered">
                    <thead className="thead-light">
                      {clinicDetail?.organizationType === "Clinic" ? (
                        <tr>
                          <th>Session</th>
                          <th>Morn Open</th>
                          <th>Morn Close</th>
                          <th>Even Open</th>
                          <th>Even Close</th>
                        </tr>
                      ) : (
                        <tr>
                          <th>Session</th>
                          <th>Open</th>
                          <th>Close</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {Object.entries(FULLDAY).map(([short, day]) =>
                        getTiming(short, day, clinicDetail?.organizationType)
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="contact-details-clinic pt-3">
            <div className="sigma_info style-26 d-flex">
              <div className="sigma_info-title">
                <span className="sigma_info-icon clinic-address-icon-container">
                  <FontAwesomeIcon
                    className="clinic-address-icon"
                    icon={faMapMarker}
                  />
                </span>
              </div>
              <div className="sigma_info-description">
                <div className="clinic-footer-address">
                  <p>Our Address</p>
                  <p className="secondary-color">
                    <b>{clinicDetail?.address}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="sigma_info style-26 d-flex">
              <div className="sigma_info-title d-flex">
                <span className="sigma_info-icon clinic-address-icon-container">
                  <FontAwesomeIcon
                    className="clinic-address-icon"
                    icon={faPhone}
                  />
                  <i className="fal fa-phone"></i>
                </span>
              </div>
              <div className="sigma_info-description">
                <p>Call Us</p>
                <p className="secondary-color">
                  <b>{formatPhone(clinicDetail?.phone)}</b>
                </p>
              </div>
            </div>
            <div className="sigma_info style-26 d-flex">
              <div className="sigma_info-title">
                <span className="sigma_info-icon clinic-address-icon-container">
                  <FontAwesomeIcon
                    className="clinic-address-icon"
                    icon={faEnvelope}
                  />
                </span>
              </div>
              <div className="sigma_info-description">
                <p>Our Mail</p>
                <p className="secondary-color">
                  <b>{clinicDetail?.email}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Appointment
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          departmentId={clinicDetail?._id}
          refresh={() => {}}
        />
      )}
    </>
  );
}

export default Detail;
