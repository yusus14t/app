import React, { useEffect, useState } from "react";
import Container from "../../../layout/Container";
import events from "../../../events";
import useToasty from "../../../hooks/toasty";
import { axiosInstance, getAuthHeader } from "../../../constants/utils";
import UserModal from "../../common-components/UserModal";
import Appointment from "../../common-components/Appointment/Appointment";


export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [unreachedData, setUnreachedData] = useState([]);
    const [appointmentData, setAppointmentData] = useState({})
    const toasty = useToasty()
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
        getAppointments('waiting')
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

    const getAppointments = async (status) => {
        try {
            let { data } = await axiosInstance.get('/doctor/get-appointments', { params: { status }, ...getAuthHeader() })
            if (status === 'waiting') setAppointments(data?.appointments || [])
            else setUnreachedData(data?.appointments || [])
        } catch (error) { console.log(error) }
    }
    return (
        <Container>
            {/* <div class="col-xl-6 col-md-6">
                        <div class="ms-panel ms-widget">
                            <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                                <div>
                                    <h6>New Appointments</h6>
                                </div>
                                <div className="">
                                    <button className=" btn btn-info btn-md" onClick={() => setIsModalOpen(true)} >Add Appointment</button>
                                </div>
                            </div>
                            <div class="ms-panel-body p-0 h20 overflow-scroll">
                                <ul class={`ms-followers ms-list ms-scrollable ps ${appointments?.length == 0 && 'text-center'}`}>
                                    {appointments?.length > 0 ?
                                        appointments.map((appointment, i) => <li class="ms-list-item media">
                                            <img src={NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                            <div class="row media-body mt-1 cursor-pointer" onClick={() => { setAppointmentData(appointment); setIsUserModalOpen(true); }}>
                                                <div className='col'>
                                                    <h4>{appointment?.user.name || ""}</h4>
                                                    <span class="fs-12">XXXX-XXX-{appointment?.user.phone.slice(5, 10)}</span>
                                                </div>
                                                <div className='col'>
                                                    <span>{ appointment?.department}</span>
                                                </div>
                                            </div>
                                            <button type="button" class="ms-btn-icon btn-success" name="button">{appointment?.token} </button>
                                        </li>) : <span>No Data</span>
                                    }
                                </ul>
                            </div>
                        </div>
            </div>
            <div class="col-xl-6 col-md-6">
                <div class="ms-panel ms-widget">
                    <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                        <div>
                            <h6>Today Unreached Patients</h6>
                        </div>
                    </div>
                    <div class="ms-panel-body p-0 h20 overflow-scroll">
                        <ul class={`ms-followers ms-list ms-scrollable ps ${unreachedData?.length == 0 && 'text-center'}`}>
                            {unreachedData?.length > 0 ?
                                unreachedData.map((appointment, i) => <li class="ms-list-item media">
                                    <img src={NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                    <div class="row media-body mt-1 cursor-pointer" onClick={() => { setAppointmentData(appointment); setIsUserModalOpen(true); }}>
                                        <div className='col'>
                                            <h4>{appointment?.user.name || ""}</h4>
                                            <span class="fs-12">XXXX-XXX-{appointment?.user.phone.slice(5, 10)}</span>
                                        </div>
                                        <div className='col'>
                                            <span>{ appointment?.department}</span>
                                        </div>
                                    </div>
                                    <button type="button" class="ms-btn-icon btn-success" name="button">{appointment?.token} </button>
                                </li>) : <span className='text-centre'>No Data</span>
                            }
                        </ul>
                    </div>
                </div>
            </div> */}
            <section className="waiting-section">
                <div className="bg-primary d-flex justify-content-around align-items-center py-2 text-light">
                    <div className="text-center text-dark bg-light p-2 curved mx-1" style={{ minWidth: '4.5rem'}} >
                        <h4 className="">102</h4>
                        <p className="text-dark" >Token</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>102</h4>
                        <p className="text-light " >Appointments</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>102</h4>
                        <p className="text-light " >Reached</p>
                    </div>
                    <div className="text-center mx-1">
                        <h4>102</h4>
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

                <div className="overflow-auto bg-white" style={{ height: "70vh" }}>
                    {activeTab === 0 ? (
                        appointments.length ? (
                            appointments.map((list, key) => (
                                <div
                                    className={
                                        "d-flex align-items-center m-2 curved light-shadow " +
                                        (list.token === 5 ? "token-active-app" : "bg-light")
                                    }
                                    key={key}
                                >
                                    <div className="p-3 m-2 bg-white curved light-shadow">
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