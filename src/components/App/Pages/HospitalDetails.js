import React, {  useEffect,  useState } from "react";
import DepartmentCard from "../cards/DepartmentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance, convertTo12HourFormat, formatPhone, getFullPath, userInfo } from "../../../constants/utils";
import { useParams } from "react-router-dom";
import { FULLDAY, NO_PHOTO } from "../../../constants/constant";
import './ClinicDetails.css'
import Container from "../../../layout/Container";

const HospitalDetails = () => {
    const [hospital, setHospital] = useState({});
    const [departments, setDepartments] = useState([]);
    const [notices, setNotices] = useState([])
    const params = useParams();

    useEffect(() => {
        getHospital();
        getNotices();
    }, [params.id,])

    const getNotices = async () => {
        try {
            let { data } = await axiosInstance.get(`/notice/${params.id}`)
            setNotices(data?.notices)
        } catch (error) { console.error(error) }
    }

    const getHospital = async () => {
        try {
            let { data } = await axiosInstance.get(`/hospital-details/${params.id}`)
            setHospital(data?.details)
            setDepartments(data?.departments)
        } catch (error) { console.error(error) }
    }

    const getTiming =  (short, fullday, key) => {
        let day = hospital?.timing?.find(time => time.day === short)
        return (
            <tr key={key}>
                <td>{fullday}</td>
                <td>{convertTo12HourFormat(day?.open)}</td>
                <td>{convertTo12HourFormat(day?.close)}</td>
            </tr>
        )
    }

    return (
        <Container className={'mt-35vh bg-white curved-top '}>
            <div className='clinic-image w-100' >
                <img src={hospital?.photo ? getFullPath(hospital?.photo) : NO_PHOTO} width={'100%'} height={'100%'} />
            </div>

            <section className='clinic-info-card '>
                <h4 className='my-3'>{hospital?.name}</h4>
                <div className='bg-light p-3 curved light-shadow'>
                    <h6 className="my-3">Consultation Fee: <span className='text-success'>&nbsp;&nbsp;₹{hospital?.fee}</span></h6>
                    <h6 className="my-3">Specialization</h6>
                    <div className='bg-white curved light-shadow mb-3'>
                        <div className="d-flex flex-wrap p-2">

                            {hospital?.specialization?.map((spe, key) => <div className="service-tube m-1 text-success bg-light" key={key}>{spe.name}</div>) || "Specialization"}
                        </div>
                    </div>

                    <h6 className="my-3">Services</h6>
                    <div className='bg-white curved light-shadow mb-3 p-3'>
                        <div className="d-flex flex-wrap ">
                            {hospital?.services?.length > 0
                                ? hospital?.services?.map((serv, key) => (
                                    <div className="service-tube m-1 bg-white" key={key}>{serv?.name}</div>
                                ))
                                : <div><h6 className='text-muted'>No Services</h6></div>

                            }
                        </div>
                    </div>
                    <h6 className='my-3'>Important Notice</h6>
                    <div className='bg-white curved light-shadow p-3'>
                        {notices?.length > 0 ?
                            notices.map((notice, key) => (
                                <div className='notice my-2' key={key}>
                                    <h6>{notice.title}</h6>
                                    <p className='mb-0 text-danger'>{notice.description}</p>
                                </div>
                            ))
                            : <div><h6 className='text-muted'>No Data</h6></div>
                        }
                    </div>
                </div>
            </section>

            <section className="row mx-0 my-3">
                <h4 className='my-3 text-muted'>Departments</h4>
                <div className="col-md-8 px-0">
                    {departments.length > 0 && <DepartmentCard departments={departments} />}
                </div>
            </section>

            <section className="text-center m-2">
                <div className="pr-2 m-text">
                    <table className="table  table-bordered">
                        <thead className="thead-light">

                            <tr>
                                <th>Session</th>
                                <th>Open</th>
                                <th>Close</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(FULLDAY).map(([short, day], key) => (
                                getTiming(short, day, key)
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className=' bg-primary curved p-2 m-2 '>
                <div className='d-flex my-2 bg-white p-2 curved align-items-center'>
                    <FontAwesomeIcon className='mx-3' icon={faLocationDot} />
                    <div>
                        <p className='mb-0'>Our Address</p>
                        <p className='mb-0'>{hospital?.address}</p>
                    </div>
                </div>
                <div className='d-flex my-2 bg-white p-2 curved align-items-center'>
                    <FontAwesomeIcon className='mx-3' icon={faPhone} />
                    <div>
                        <p className='mb-0'>Our Phone</p>
                        <p className='mb-0'>{formatPhone(hospital?.phone)}</p>
                    </div>
                </div>
                <div className='d-flex my-2 bg-white p-2 curved align-items-center'>
                    <FontAwesomeIcon className='mx-3' icon={faEnvelope} />
                    <div>
                        <p className='mb-0'>Our Email</p>
                        <p className='mb-0'>{hospital?.email}</p>
                    </div>
                </div>
            </section>

        </Container>
    )
}

export default HospitalDetails