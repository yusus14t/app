import React from 'react'

import './ClinicCard.css'
import { HOSPITAL_DEFAUL_IMG } from '../../../constants/constant'
import { formatPhone, getFullPath, truncate } from '../../../constants/utils'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faLocationDot, faSquarePhone } from '@fortawesome/free-solid-svg-icons'

const HospitaCard = ( { hospital = {}}) => {
  return (
    <div className="col-lg-3 col-md-6 mx-0 px-0 " >
            <Link to={`/hospital-detail/${hospital?._id}`}>
                <div className=" clinic-app-card bg-white ">
                    <p className='head-hos  text-dark'>HOSPITAL</p>
                    <div className='d-flex overflow-hidden'>
                        <div className="clinic-img-container">
                            <img src={ hospital?.photo ? getFullPath(hospital?.photo): HOSPITAL_DEFAUL_IMG } className="clinic-app-img" />
                        </div>
                        <div className="clinic-info">
                            <div className="px-1 truncate1"><p className='mb-0 fs-5 font-weight-bold dr-name'>{hospital?.name}</p></div>
                            <div className="mb-1 fs-8 px-2 specialization">{truncate(hospital.specialization?.name ||
                                (hospital?.specialization?.length ? "Multispecialist" : '-'), 22)}
                            </div>
                            <div className='fs-12 mt-2'> <FontAwesomeIcon className='me-2 ' icon={faSquarePhone} /> {formatPhone(hospital.phone)}</div>
                            <div className='d-flex fs-12'>
                                <div><FontAwesomeIcon icon={faIndianRupeeSign}/> &nbsp;&nbsp; {hospital.fee} &nbsp; |</div>
                                 &nbsp;&nbsp;  {hospital.bookingStatus ? <div className='text-success'>Booking Open</div> : <div className='text-danger'>Booking Closed</div>}
                            </div>

                        </div>
                    </div>
                    <div className='d-flex'>
                        <div><FontAwesomeIcon className='mx-2' icon={faLocationDot} /></div>
                        <div className="mb-1 address fs-12">  {truncate(hospital.address || '-', 70)}</div>
                    </div>
                    {/* <div className='services-clinic d-flex'>
                       {hospital?.services.map((service)=> <div className='mb-0 service-cap'>{hospital?.name}</div>)} 
                        
                    </div> */}
                </div>
            </Link>
        </div>
  )
}

export default HospitaCard