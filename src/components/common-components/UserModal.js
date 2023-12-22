
import Modal from './Modal';
import { axiosInstance, dateFormat, formatPhone } from '../../constants/utils';
import { useEffect, useState } from 'react';
import useToasty from '../../hooks/toasty';

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
        title="Appointment Card"
      >
        <div className='bg-primary p-2 mb-3 rounded '>
          <h4 className=' text-light text-center '> {appointment?.departmentId?.name || ""} </h4>
          <p className='text-light text-center '> {dateFormat(new Date(appointment?.createdAt))} </p>
        </div>
        <section className='d-flex align-items-start justify-content-between border-bottom py-3'>
            <div>
              <h3>{ appointment?.userId?.name || "Anonymous"}</h3>
              <h5>{ formatPhone(appointment?.userId?.phone) || '-'}</h5>
            </div>
            <div >
              <h3 className='bg-primary text-light p-3 curved text-center' style={{ minWidth: '4rem' }}>{appointment?.token}</h3>
            </div>
        </section>
        <section className=' border-bottom py-3'>
          <p> Age: {appointment?.userId?.age || " - "} </p>
          <p> Gender: {appointment?.userId?.gender || " - " } </p>
          <p> Address: { appointment?.userId?.address || '-'} </p>
        </section>

        <section className='my-3 pb-3 d-flex justify-content-between align-items-center'>
          {appointment.status !== 'unreached' ? <>
            <div className='bg-danger text-light text-center w-100 mx-2 p-2 rounded' onClick={() => patientStatus('unreached')} >
              <h5>Unreached</h5>
            </div>
            <div className='bg-primary text-light w-100 text-center mx-2 p-2 rounded' onClick={() => patientStatus('reached')}>
              <h5>Reached</h5>
            </div>
          </>
            :
            <div className='bg-primary text-light  w-100 text-center mx-2 p-2 rounded ' onClick={() => reAppointment()}>
              <h5>Reached</h5>
            </div>
          }
        </section>

      </Modal>
    );
}
export default UserModal