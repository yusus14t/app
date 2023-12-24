import "./ClinicDetails.css";

import {
  axiosInstance,
  convertTo12HourFormat,
  formatPhone,
  getAuthHeader,
  getFullPath,
  userInfo,
} from "../../../constants/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Appointment from "../../common-components/Appointment";
import events from "../../../events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faEnvelope,
  faLocationDot,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FULLDAY, NO_PHOTO } from "../../../constants/constant";
import DoctorCard from "../cards/DoctorCard";
import Container from "../../../layout/Container";
import ErahamBanner from '../../../assets/images/promo/erahamtech.png'

export default () => {
  const params = useParams();
  const [clinicDetail, setClinicDetail] = useState({});
  const [waitingList, setWaitingList] = useState([]);
  const [unreachedList, setUnreachedList] = useState([]);
  const [token, setToken] = useState("00");
  const [isOpen, setIsOpen] = useState(false);
  const [timing, setTiming] = useState([]);
  const [isBookingStatus, setIsBookingStatus] = useState(false);
  const jwt_token = JSON.parse(localStorage.getItem("token"));
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getWaitingList();
    getClinicDetail();
    getNotices();
    getUnreachedList();

    events.addEventListener("new-appointment", (event) =>
      newAppointmentHandler(JSON.parse(event.data))
    );
    events.addEventListener("status", (event) =>
      statusEventHandler(JSON.parse(event.data))
    );
    events.addEventListener("booking-status", (event) =>
      bookingEventHandler(JSON.parse(event.data))
    );
  }, []);

  let newAppointmentHandler = (event) => {
    getWaitingList();
  };

  const statusEventHandler = (event) => {
    getClinicDetail();
    getWaitingList();
    getUnreachedList();
  };

  const bookingEventHandler = (status) => {
    setIsBookingStatus(status.bookingStatus);
  };

  const getClinicDetail = async () => {
    try {
      let { data } = await axiosInstance.get("/clinic-detail", {
        params: { _id: params.id },
        ...getAuthHeader(),
      });

      let detail = data?.detail;
      setClinicDetail(detail);
      setTiming(detail?.timing);

      let token = "00";
      token = detail?.token < 10 ? `0${detail?.token}` : detail?.token || "0";

      setToken(token);
      setIsBookingStatus(data.detail?.bookingStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const getWaitingList = async () => {
    try {
      let { data } = await axiosInstance.get(
        `/waiting-list/${params.id}`,
        getAuthHeader()
      );
      setWaitingList(data?.appointment);
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
      let { data } = await axiosInstance.get(`/notice/${params.id}`);
      setNotices(data?.notices);
    } catch (error) {
      console.error(error);
    }
  };

  const getTiming = (short, full, source, key ) => {
    let day = timing.find((time) => time.day === short);
    if (source === "Clinic") {
      return (
        <tr key={key}>
          <td>{full}</td>
          <td>{convertTo12HourFormat(day?.morning?.open)}</td>
          <td>{convertTo12HourFormat(day?.morning?.close)}</td>
          <td>{convertTo12HourFormat(day?.evening?.open)}</td>
          <td>{convertTo12HourFormat(day?.evening?.close)}</td>
        </tr>
      );
    } else {
      return (
        <tr key={key}>
          <td>{full}</td>
          <td>{convertTo12HourFormat(day?.open)}</td>
          <td>{convertTo12HourFormat(day?.close)}</td>
        </tr>
      );
    }
  };

  return (
    <Container className={"mt-35vh bg-white curved-top "}>
      <div className="clinic-image w-100">
        <img
          src={
            clinicDetail?.photo ? getFullPath(clinicDetail?.photo) : NO_PHOTO
          }
          width={"100%"}
          height={"100%"}
        />
      </div>

      <section className="clinic-info-card">
        <h4 className="my-3">
          {clinicDetail?.hospital?.name || clinicDetail.name}
        </h4>

        <div className="bg-light p-3 curved light-shadow">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5>{clinicDetail.doctor?.name || "Dept: " + clinicDetail.name}</h5>
              
            </div>
            <div className="clinic-token">
              <h4 className="my-1">{ jwt_token ? token : <FontAwesomeIcon icon={faLock} /> }</h4>
            </div>
          </div>
          <h6 className="my-3">
            Consultation Fee:{" "}
            <span className="text-success">
              &nbsp;&nbsp;₹{clinicDetail?.fee}
            </span>
          </h6>
          <h6 className="my-3">Specialization</h6>
          <div  className="curved bg-white p-3 light-shadow">
            <div className="d-flex flex-wrap mb-2">
              {clinicDetail?.specialization?.map(( spe, key ) => (
                <div className="service-tube m-1 text-success bg-light " key={key}>
                  {spe.name}
                </div>
              )) || "Specialization"}
            </div>

          </div>
          
          <h6 className="my-3">Services</h6>
          <div  className="curved bg-white p-3 light-shadow">
            <div className="d-flex flex-wrap">
              {clinicDetail?.services?.length > 0
                ? clinicDetail?.services?.map((serv, key) => (
                    <div className="service-tube m-1 bg-light " key={key}>{serv?.name}</div>
                  ))
                : clinicDetail?.hospital?.services?.map((serv, key) => (
                    <div className="service-tube m-1 bg-light " key={key}>{serv?.name}</div>
                  ))}
            </div>
          </div>
          <h6 className="mt-3">Important Notice</h6>
          <div className="bg-white light-shadow curved p-3 mt-2">
            {notices?.length > 0 ? (
              notices.map(( notice, key ) => (
                <div className="notice my-2" key={key}>
                  <h6>{notice.title}</h6>
                  <p className="mb-0 text-danger">{notice.description}</p>
                </div>
              ))
            ) : (
              <div>
                <h6 className="text-muted">No Data</h6>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='my-4' >
        <Link to={'https://wa.me/+919557897890'}>
          <img src={ErahamBanner} width={'100%'} height={'100%'} alt='section-image' />
        </Link>
      </section>

      <section className="waiting-section">
        <div className="bg-primary text-light">
          <h5 className="p-2 mx-3">Appointments</h5>
          <div className="d-flex  p-2 text-light">
            <h6
              onClick={() => handleTabClick(0)}
              className={
                "w-50 text-center py-2 mb-0 curved " +
                (activeTab === 0 && "waiting-list-active shadow text-dark")
              }
            >
              Waiting List
            </h6>
            <h6
              onClick={() => handleTabClick(1)}
              className={
                "w-50 text-center py-2 mb-0 curved " +
                (activeTab === 1 && "waiting-list-active text-dark")
              }
            >
              Unreached List
            </h6>
          </div>
        </div>
        <div className="overflow-auto mx-2" style={{ height: "60vh" }}>
          { jwt_token ? 
          <>
            {activeTab === 0 ? (
              waitingList.length ? (
                waitingList.map((list, key) => (
                  <div
                    className={
                      "d-flex align-items-center m-2 curved light-shadow " +
                      (list.token === token ? "token-active-app" : "bg-light")
                    }
                    key={key}
                  >
                    <div className="p-3 m-2 bg-white curved text-center light-shadow" style={{ width: '4rem' }}>
                      <h4 className="mb-0">{list?.token}</h4>
                    </div>
                    <div className="ms-2">
                      <h6>{list?.name}</h6>
                      <p className="mb-0">
                        {list?.phone && `xxx-xxx-${list?.phone.slice(-4)}`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  {" "}
                  <h6 className="text-muted">No Appointments </h6>
                </div>
              )
            ) : unreachedList.length ? (
              unreachedList.map((list, key) => (
                <div
                  className="bg-light d-flex align-items-center light-shadow m-2 curved"
                  key={key}
                >
                  <div className="p-3 m-2 c-token bg-white curved">
                    <h4 className="mb-0">{list?.token}</h4>
                  </div>
                  <div className="ms-2">
                    <h6>{list?.name}</h6>
                    <p className="mb-0">
                      {list?.phone && `xxx-xxx-${list?.phone.slice(-4)}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100">
                {" "}
                <h6 className="text-muted">No Appointments </h6>
              </div>
            )}
          </>
          :   
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
              <h4 className="text-muted">
                <FontAwesomeIcon icon={faLock} /> Not Authenticated
              </h4>
              <p className="my-2">Login first to check all the appointments. </p>
              <Link to={'/login'} className="bg-primary text-light rounded w-50 m-3 py-2 text-center">
                  LogIn
              </Link>
          </div>
          }
        </div>
      </section>
      {clinicDetail?.doctors?.length > 0 && <section className="mx-2 my-3">
        <h5>Doctors</h5>
        { clinicDetail?.doctors.map(( doc ) => (
            <DoctorCard doctor={ doc }/>
        ))}
         
      </section>}
      <section className="text-center m-2">
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
              {Object.entries(FULLDAY).map(([short, day], key ) =>
                getTiming(short, day, clinicDetail?.organizationType, key )
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className=" bg-primary curved p-2 m-2 mb-5 ">
        <div className="d-flex my-2 bg-white curved align-items-center">
          <FontAwesomeIcon className="mx-3" icon={faLocationDot} />
          <div>
            <p className="mb-0">Our Address</p>
            <p className="mb-0">{clinicDetail?.address}</p>
          </div>
        </div>
        <div className="d-flex my-2 bg-white p-2 curved align-items-center">
          <FontAwesomeIcon className="mx-3" icon={faPhone} />
          <div>
            <p className="mb-0">Our Phone</p>
            <p className="mb-0">{formatPhone(clinicDetail?.phone)}</p>
          </div>
        </div>
        <div className="d-flex my-2 bg-white p-2 curved align-items-center">
          <FontAwesomeIcon className="mx-3" icon={faEnvelope} />
          <div>
            <p className="mb-0">Our Email</p>
            <p className="mb-0">{clinicDetail?.email}</p>
          </div>
        </div>
      </section>

      {/* Book Appointment */}
      {(userInfo?.userType === "PT" || !userInfo) && (
        <section
          className="appointment bg-primary text-light"
          onClick={() => (isBookingStatus ? handleAppointmentModal() : null)}
        >
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faCalendarPlus} className="me-2" />
            <h5 className="m-0">
              {isBookingStatus ? "Book Appointment" : "Appointments Closed"}
            </h5>
          </div>
        </section>
      )}

      {isOpen && (
        <Appointment
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          departmentId={clinicDetail?._id}
        />
      )}
    </Container>
  );
};
