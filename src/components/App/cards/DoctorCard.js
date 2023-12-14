import './doctors.css'
import React from 'react'
import { getFullPath, truncate } from '../../../constants/utils'
import { Link } from 'react-router-dom'
import { DOCTOR_DEFAUL_IMG } from '../../../constants/constant'

export default ({doctor = {}}) => {
    return (
        <div className="col-lg-4 mxil col-md-6 px-0" >
            <Link to={`/clinic-detail/${doctor?.organizationId}`}>
                <div className=" doctor-card">
                    <div className="doctor-img-container">
                        <img src={doctor?.photo
                            ? getFullPath(doctor?.photo)
                            : DOCTOR_DEFAUL_IMG} className="doctor-img" />

                    </div>
                    <div className="dr-info">

                        <div className="mb-0 fs-5 font-weight-bold dr-name px-1">{truncate(doctor?.name, 20)}</div>
                        <div className="mb-1 fs-8 px-2 specialization">{truncate(doctor?.specialization?.name ||
                            (doctor?.specialization?.length ? doctor?.specialization[0]?.name : '-'), 21)} </div>
                        <div className="mb-1 address fs-12"> {truncate(doctor?.address || '-', 50)}</div>

                    </div>
                </div>
            </Link>
        </div>
    )
}

