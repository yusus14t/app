import React, { useEffect, useState, useRef } from "react";
import NO_PHOTO from "../../../assets/images/no-photo.png";
import { axiosInstance, formatPhone, getAuthHeader, getFullPath } from "../../../constants/utils";
import Modal from "../../common-components/Modal";
import useToasty from '../../../hooks/toasty';
import { toPng, toBlob } from 'html-to-image'
import logo from "../../../assets/img/logo/logo.jpg"
import Container from "../../../layout/Container";
import AppHeader from "../../../layout/AppHeader";


const Dashbaord = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [appointments, setAppointments] = useState([])
  const toasty = useToasty()
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false)
  const appointmentCarRef = useRef(null)
  const [appointment, setAppointment] = useState({});
  const [isLinkCopy, setIsLinkCopy] = useState(false)

  useEffect(() => {
    getAllAppointments()
  }, [])

  const getAllAppointments = async () => {
    try {
      let { data } = await axiosInstance.get('/common/patient-appointments', { params: { isToday: true }, ...getAuthHeader() })
      setAppointments(data?.appointments)
    } catch (error) { console.error(error) }
  }


  const share = async (appointment) => {
    try {
      let blobData = await toBlob(appointmentCarRef.current, { cacheBust: false })

      let file = new File([blobData], 'appointment-card.png', { type: "image/png" })
      let formData = new FormData()
      formData.append('file', file)
      let { data } = await axiosInstance.post('/common/upload-file', formData, { _id: appointment._id }, getAuthHeader())

      navigator.clipboard.writeText(getFullPath(data.pathname))
        .then(() => {
          toasty.success('Link Copied.')
          setIsLinkCopy(true)
        })
        .catch((error) => console.log(error))

      await navigator.share({
        file,
        title: 'Appointment Card',
        text: `Your appointment scheduled on ${appointment?.departmentId?.name}. The appointment will check on the https://doctortime.in .`
      })


    } catch (error) { console.error(error) }
  }

  const htmlToImageConvert = () => {
    toPng(appointmentCarRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "appointment-card.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const payment = async (_id) => {
    try {
      let { data } = await axiosInstance.post('/payment', { _id, type: 'appointment' }, getAuthHeader())
      if (data.redirectUrl) window.location.href = data.redirectUrl

    } catch (error) { console.log(error) }
  }

  return (
    <Container>
      <AppHeader />

      <section className="bg-white light-shadow curved mx-2 p-3 mt-3">
        <div className="d-flex justify-content-start align-items-center">
          <div className="border rounded-circle me-4 light-shadow" style={{ width: '100px', height: '100px' }}>
            <img className="w-100 h-100 rounded-circle" src={userInfo?.photo ? getFullPath(userInfo?.photo) : NO_PHOTO} alt="" />
          </div>
          <div className="">
            <h3> {userInfo?.name} </h3>
            <h6 className="my-1">+91{formatPhone(userInfo?.phone)}</h6>
          </div>
        </div>
        <hr />
        <h6 className="my-1">Age : {userInfo?.age || '-'} </h6>
        <h6 className="my-1" >Gender : {userInfo?.gender || '-'} </h6>
        <h6 className="my-1" >Address : {userInfo?.address || '-'} </h6>
      </section>

      <section className="my-3">
        <div className="bg-primary d-flex  align-items-center text-light p-3">
          <h5>Appointments</h5>
        </div>
        <div className="bg-white overflow-auto mx-2" style={{ height: '40vh' }}>
          {appointments.length > 0 && Array(10).fill(appointments[0]).map((appointment, key) =>
            <div className="light-shadow rounded d-flex  align-items-center p-3 m-2">
              <div className="">
                <h5 className="bg-primary text-light me-3 p-2 rounded light-shadow mb-2 text-center"> {appointment?.token || 0} </h5>
                <h6>{appointment?.userId?.name}</h6>
              </div>
              <div className="col text-center">
                <h5>{appointment?.departmentId?.name}</h5>
              </div>
              <div className=" text-center">
                {appointment?.isPaid
                  ? <button className="btn btn-primary mt-1 rounded shadow-none" onClick={() => { setAppointment(appointment); setOpenAppointmentModal(true) }}>View</button>
                  : <button className="btn btn-primary mt-1 rounded shadow-none" onClick={() => payment(appointment._id)}>Pay Now</button>
                }
              </div>
            </div>
          )}
        </div>
      </section>

      {openAppointmentModal && <Modal
        isOpen={openAppointmentModal}
        setIsOpen={setOpenAppointmentModal}
        closeButton={false}
        submitButton={false}
        title=""
      >
        <div
          style={{ background: "#ffff", width: "100%", border: "1px solid black" }}
          class="p-2 rounded mb-3"
          ref={appointmentCarRef}
        >
          <img style={{ width: "100px" }} src={logo} alt="" />
          <span className="d-inline-block ml-4"><h4 style={{ marginLeft: "20px" }} class="">Appointment Card</h4></span>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{}}>{appointment?.departmentId?.name || 'Hospital Name'}</h2>
              <h6 style={{ marginLeft: "10px" }}>{new Date(appointment?.createdAt).toLocaleString()}</h6>
              <div className="col mk-address d-flex align-items-center">
                <h6>{appointment?.departmentId?.address || '----'}</h6>
              </div>
            </div>
            <div style={{ width: "60px", height: "60px", borderRadius: "6px", backgroundColor: "#8df7c4" }}>
              <h3 style={{ textAlign: "center", margin: "5px 0 0 0", marginTop: "20%" }}>{appointment?.token}</h3>
            </div>
          </div>
          <hr />
          <div  >
            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <div>
                <img
                  className="app-ing"
                  src={appointment?.userId?.photo ? getFullPath(appointment?.userId?.photo) : NO_PHOTO}
                  alt=""
                />
              </div>
              <div>
                <div className="user-de" style={{ display: "flex", flexDirection: "column", }}>
                  <h4 style={{ fontWeight: "bold", fontSize: "17px", margin: "0" }}>
                    <span style={{ margin: "0", color: "black" }}>Name : </span>{appointment?.userId?.name || 'Patient Name'}
                  </h4>

                  <h4 style={{ fontWeight: "bold", fontSize: "17px", margin: "5px 0 0 0" }}>
                    <span style={{ margin: "0", color: "black" }}>Age : </span>{appointment?.userId?.age || 'Age'}
                  </h4>
                  <h4 style={{ fontWeight: "bold", fontSize: "17px", margin: "5px 0 0 0" }}>
                    <span style={{ color: "black", fontSize: "17px", margin: "0" }} class="m-0 text-dark">Gender : </span>{appointment?.userId?.gender || 'Gender'}
                  </h4>
                </div>
              </div>
            </div>

          </div>
          <hr />
          <div style={{ paddingLeft: "40px" }}>
            <h2 style={{ fontWeight: "bold" }}>Basic Details</h2>
            <p style={{ margin: "5px 0 0 0", color: "black" }}>Guardian Name : {appointment?.userId?.gardianName || 'Gardian Name'}</p>
            <p style={{ margin: "5px 0 0 0", color: "black" }}>Mobile Number : {formatPhone(appointment?.userId?.phone)}</p>
            <p style={{ margin: "5px 0 10px 0", color: "black" }}>
              Address : {appointment?.userId?.address || 'Address'}
            </p>
          </div>
        </div>

        {isLinkCopy && <span className="text-success">Link Copied.</span>}
        <br />
        <button className='btn btn-primary btn-md shadow-none mt-2' onClick={() => htmlToImageConvert()}>Download Card</button>
        <button className="btn btn-primary mt-1 rounded shadow-none mx-2" onClick={() => share(appointment)}>Share</button>
      </Modal>}

    </Container>
  );
};
export default Dashbaord;
