import React, { useEffect, useState } from 'react'
import { axiosInstance, formatPhone } from '../../../constants/utils'

const Patients = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getPatients()
    }, [])

    const getPatients = async () => {
        try {
            let { data } = await axiosInstance.get('/doctor/get-appointments')
            setAppointments(data?.appointments)
        } catch (error) { console.error(error) }
    }

    return (
        <div className="ms-content-wrapper ">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel inner-content-height">
                        <div className="ms-panel-header ms-panel-custome">
                            <h6>Patient List</h6>
                            <a href="add-patient.html" className="ms-text-primary">Add Patient</a>
                        </div>
                        <div className="ms-panel-body p-0 ">
                            <div style={{height:"576px", overflow:"scroll"}} className="table-responsive">
                                <div id="data-table-2_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                    <div className="row">
                                        <div className="col-sm-12 p-0 m-2">
                                            <table id="data-table-2" className="table table-striped thead-primary w-100 dataTable no-footer" role="grid" aria-describedby="data-table-2_info" style={{ width: '1160px' }}>
                                                <thead>
                                                    <tr role="row">
                                                        <th style={{ width: '20px', marginLeft:'1rem' }}>Token</th>
                                                        <th >Name</th>
                                                        <th >Phone</th>
                                                        <th >Age</th>
                                                        <th >gender</th>
                                                        <th >Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {appointments?.length > 0 && appointments.map( appointment => <tr role="row" className="odd">
                                                        <td>{appointment?.token}</td>
                                                        <td>
                                                            {appointment.user?.name}</td>
                                                        <td>{formatPhone(appointment?.user?.phone)}</td>
                                                        <td>{appointment?.age || '-'}</td>
                                                        <td>{appointment?.user?.gender || '-'}</td>
                                                        <td>{appointment?.status}</td>
                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients