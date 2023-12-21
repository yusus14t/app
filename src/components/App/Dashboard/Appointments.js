import React, { useEffect, useState } from "react";
import Container from "../../../layout/Container";
import events from "../../../events";
import useToasty from "../../../hooks/toasty";
import { axiosInstance, getAuthHeader } from "../../../constants/utils";
import UserModal from "../../common-components/UserModal";
import Appointment from "../../common-components/Appointment/Appointment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";


export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [unreachedData, setUnreachedData] = useState([]);
    const [appointmentData, setAppointmentData] = useState({})
    const toasty = useToasty()
    const [activeTab, setActiveTab] = useState(0);
    const [analyticsData, setAnalyticsData] = useState({})



    useEffect(() => {
        getAppointments('waiting')
        analytics();
        getAppointments('unreached')

        events.addEventListener('new-appointment', (event) => eventHandler(event))
        events.addEventListener('re-appointment', (event) => eventHandler(event))
        events.addEventListener('status', (event) => eventHandler(event))
        return (() => {
            events.removeEventListener('new-appointment', () => { })
            events.removeEventListener('re-appointment', () => { })
            events.removeEventListener('status', () => { })
        })
    }, [])


    const eventHandler = (event) => {
        toasty.success('New appointment added')
        getAppointments('waiting')
    }

    const analytics = async () => {
        try{
            let { data } = await axiosInstance.get('/doctor/analytics')
            setAnalyticsData(data?.analytics)
        } catch(error){
            toasty.error(error?.message) 
            console.error(error) 
        }
    }

    const getAppointments = async (status) => {
        try {
            let { data } = await axiosInstance.get('/doctor/get-appointments', { params: { status }, ...getAuthHeader() })
            if (status === 'waiting') setAppointments(data?.appointments || [])
            else setUnreachedData(data?.appointments || [])

        } catch (error) { console.log(error) }
    }
    return (
        <Container>
            <section className="waiting-section">
                <div className="bg-primary d-flex justify-content-around align-items-center py-3 text-light">
                    <div className="text-center text-dark bg-light p-2 curved mx-1" style={{ minWidth: '4.5rem'}} >
                        <h4 className="">{ analyticsData?.token || 0 }</h4>
                        <p className="text-dark" >Token</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>{ analyticsData?.today || 0}</h4>
                        <p className="text-light " >Appointments</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>{ unreachedData?.length }</h4>
                        <p className="text-light " >Unreached</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>{ appointments?.length }</h4>
                        <p className="text-light" >Remaining</p>
                    </div>
                </div>
                <div className="d-flex bg-primary p-2 text-light">
                    <h6
                        onClick={() => setActiveTab(0)}
                        className={
                            "w-50 text-center py-2 curved " +
                            (activeTab === 0 && "waiting-list-active text-dark shadow")
                        }
                    >
                        Waiting List
                    </h6>
                    <h6
                        onClick={() => setActiveTab(1)}
                        className={
                            "w-50 text-center py-2 mb-0 curved " +
                            (activeTab === 1 && "waiting-list-active text-dark shadow")
                        }
                    >
                        Unreached List
                    </h6>
                </div>

                <div className="overflow-auto bg-white pb-5" style={{ height: "70vh" }}>
                    {activeTab === 0 ? (
                        appointments.length ? (
                            appointments.map((list, key) => (
                                <div
                                    onClick={() => { setAppointmentData(list); setIsUserModalOpen(true)}}
                                    className={
                                        "d-flex align-items-center m-2 curved light-shadow " +
                                        (list.token === analyticsData?.token ? "token-active-app" : "bg-light")
                                    }
                                    key={key}
                                    
                                >
                                    <div className="p-3 m-2 bg-white curved light-shadow text-center" style={{ minWidth: '4rem'}}>
                                        <h4 className="mb-0">{list?.token || 0}</h4>
                                    </div>
                                    <div className="ms-2">
                                        <h6>{list?.user.name}</h6>
                                        <p className="mb-0">
                                            {list?.user.phone && `xxx-xxx-${list?.user.phone.slice(-4)}`}
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
                    ) : unreachedData.length ? (
                        unreachedData.map((list, key) => (
                            <div
                                onClick={() => { setAppointmentData(list); setIsUserModalOpen(true)}}
                                className="bg-light d-flex align-items-center m-2 curved light-shadow"
                                key={key}
                            >
                                <div className="p-3 m-2 bg-white curved light-shadow">
                                    <h4 className="mb-0">{list?.token}</h4>
                                </div>
                                <div className="ms-2">
                                    <h6>{list?.user.name}</h6>
                                    <p className="mb-0">
                                        {list?.user.phone && `xxx-xxx-${list?.user.phone.slice(-4)}`}
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
                </div>
            </section>

            <section className="appointment bg-primary text-light" >
                <div className="d-flex align-items-center justify-content-center" onClick={() => setIsModalOpen(true)} >
                    <FontAwesomeIcon icon={faCalendarPlus} className="me-2" />
                    <h5 className="m-0"> Add Appointment </h5>
                </div>
            </section>

            {isModalOpen &&
                <Appointment
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    refresh={() => {
                        getAppointments('waiting')
                        getAppointments('unreached')
                    }}
                />
            }

            {isUserModalOpen &&
                <UserModal
                    isOpen={isUserModalOpen}
                    setIsOpen={setIsUserModalOpen}
                    appointmentId={appointmentData?._id}
                    refresh={() => {
                        getAppointments('waiting')
                        getAppointments('unreached')

                    }}
                />
            }
        </Container>
    )
}