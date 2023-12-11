
import Modal from './Modal';
import { axiosInstance, dateFormat } from '../../constants/utils';
import { useEffect, useState } from 'react';
import useToasty from '../../hooks/toasty';
import { NO_PHOTO } from '../../constants/constant';


const UserModal = ({isOpen, setIsOpen, appointmentId, refresh = () => {}}) => {
    const [appointment, setAppointment] = useState({});
    const toasty = useToasty()
    useEffect(() => {
      getAppointmentById();
    },[])

    const getAppointmentById = async () => {
      try{
        let {data} = await axiosInstance.get('/doctor/appointment', { params: { appointmentId }})
        console.log( data)
        setAppointment(data?.appointment)
      } catch(error){
        console.error(error)
        toasty.error(error.message)
      }
    }

    const patientStatus = async ( status ) => {
      try{
        let { data } = await axiosInstance.post('/doctor/appointment-status', { _id: appointment._id, status })
        setIsOpen(false)
        refresh()
        toasty.success(data?.message)
      } catch(error){ 
        console.error(error)
        toasty.error(error?.message)
      }
    }

    const reAppointment = async () => {
      try{
        let { data } = await axiosInstance.post('/doctor/re-appointment', { _id: appointment._id })
        refresh()
        setIsOpen(false)
        toasty.success(data?.message)
      } catch(error){
        console.error(error)
        setIsOpen(false)
        toasty.error(error?.message)
      }
    }

    return (
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        closeButton={false}
        submitButton={false}
        title="Appointment Card">
        <div className="Appointment-header">
          <div>
            <h4 className="text-center mb-2 m-0 fw-800">{appointment?.departmentId?.name || ""}</h4>
            <div className="d-flex flex-row justify-content-between">
              
              <p className="mt-2 mb-0">Date : {dateFormat(new Date(appointment?.createdAt))}</p>
            </div>
            <hr />
            <div className="row">
              <div className="d-flex flex-row justify-content-between">
                <div className="user-profile-img-container">
                  <img className="user-profile-img" src={NO_PHOTO} alt="" />
                </div>
                <div className="user-details m-auto d-flex flex-column">
                  <h6 className="font-weight-bold">
                    <span className="m-0 text-dark">Name : </span>
                    { appointment?.userId?.name || ""}
                  </h6>

                  <h6 className="font-weight-bold">
                    <span className="m-0 text-dark">Age : </span>
                    {appointment?.userId?.age || " - "}
                  </h6>

                  <h6 className="font-weight-bold">
                    <span className="m-0 text-dark">Gender : </span>
                    {appointment?.userId?.gender || " - " }
                  </h6>
                </div>
                <div className="user-token m-auto ">
                  <h3 className="text-center ">{appointment?.token}</h3>
                </div>
              </div>

              <hr className="mt-2" />
            </div>
          </div>
          <div className="basic-details">
            <h2 className="font-weight-bold">Basic Details</h2>
            {appointment?.userId?.phone && <p className="mb-0 text-dark">Guardian Name : {appointment?.userId?.gardianName}</p>}
            <p className="mb-0 text-dark">Mobile Number : +91 {appointment?.userId?.phone || '-'}</p>
            <p className="mb-0 text-dark">Address : { appointment?.userId?.address || '-'}</p>
           
          </div>
          <hr />
          { appointment.status !== 'unreached' ? <div className='d-flex float-right' >
            <button type="button" className="btn btn-danger shadow-none mx-2"  onClick={() => patientStatus('unreached')}>Unreached</button>
            <button type="button" className="btn btn-primary shadow-none mx-2" onClick={() => patientStatus('reached')}>Reached</button>
          </div> : <button type="button" className="btn btn-primary shadow-none mx-2" onClick={() => reAppointment()}>Reached</button>
          }
        </div>
      </Modal>
    );
}
export default UserModal