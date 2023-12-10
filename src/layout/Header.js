import { memo, useEffect, useState } from "react"
import Logo from '../assets.app/img/logo/logo.png'
import Sidebar from "./Sidebar"
import { Dropdown, Item } from '../components/common-components/Dropdown';
import Appointment from "../components/common-components/Appointment/Appointment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBell, faCalendarDays, faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons'
import useNotification from '../hooks/Notification';
import { Link } from "react-router-dom";
import { userRoutes } from "../constants/constant";
import Modal from "../components/common-components/Modal";
import { axiosInstance, getAuthHeader } from "../constants/utils";
import useToasty from "../hooks/toasty";


const Header = () => {
    const toasty = useToasty()
    const notificationAPI = useNotification();
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCustomMessage, setCustomMessage] = useState(false)
    const [isMessage, setIsMessage] = useState(true)
    const [notifications, setNotifications] = useState([])
    const [unseenNotificationCount, setUnseenNotificationCount] = useState(0)
    const mobileView = window.screen.availWidth <= 767
    const [isSidebarOpen, setIsSidebarOpen] = useState(mobileView ? false : true)
    const [ notice, setNotice ] = useState({ title: null, description: null, error: false })
    const [notices, setNotices] = useState([])
    const PRIORITY_COLORS = {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger',
    }

    const getUserPath = () =>  userRoutes[userInfo.userType]?.path

    useEffect(() => {
        getNotifications()
        window.addEventListener('resize', () => {
            const mobileView = window.screen.availWidth <= 767
            setIsSidebarOpen(mobileView ? false : true)
        })
        return () => window.removeEventListener('resize', () => { }, false)
    }, [])

    useEffect(() => {
        if( ['CL', 'HL', 'DP'].includes(userInfo.userType))
        getNotices()
    }, [isCustomMessage])

    const Logout = () => {
        localStorage.clear()
        window.location.replace('/login')
    }

    const getNotifications = async () => {
        try { 
            let { data } = await notificationAPI.get()
            setNotifications(data.notifications)
            setUnseenNotificationCount(data?.unseenNotificationCount)
        } catch(error){ console.log(error) }
    }
    
    const submitNotice = async () => { 
        try{
            if( !notice.title || !notice.description ){
                setNotice({ ...notice, error: true })
                return
            }

            let { data } = await axiosInstance.post('/common/notice', notice , getAuthHeader()) 
            setNotices(( old ) => [ ...old, data?.notice ])
            setIsMessage(true)
            toasty.success(data?.message)
        } catch(error){ console.error(error) }
    }

    const getNotices = async () => {
        try{
            let { data } = await axiosInstance.get(`/notice/${ userInfo?.organizationId._id }`)
            setNotices(data?.notices)
        } catch(error){ console.error(error) }
    }

    const deleteNotice =  async ( id ) => {
        try{
            await axiosInstance.delete(`/common/notice/${id}`)
            setNotices( old => old.filter( notice => notice._id !== id))
            toasty.success('Successfully deleted')
        } catch(error){ console.log(error) }
    }
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} mobileView={mobileView} />
            <nav className="navbar ms-navbar">
                <div className="ms-aside-toggler ms-toggler ps-0" data-bs-target="#ms-side-nav" data-bs-toggle="slideLeft">
                    <span className="ms-toggler-bar bg-white"></span>
                    <span className="ms-toggler-bar bg-white"></span>
                    <span className="ms-toggler-bar bg-white"></span>
                </div>
                <div className="docfind-logo">
                    <a className="sigma_logo" href="/">
                        <img src={Logo} alt="logo" />
                    </a>
                </div>
                <ul className="d-flex mbgl">
                        {['DP', 'CL', 'HL'].includes(userInfo.userType)  && <>
                        <li className="ms-nav-item ms-d-none mx-2">
                            <div className="text-white cursor-pointer " onClick={() => setIsModalOpen(true) }><FontAwesomeIcon className="Header-icon1" icon={faCalendarDays} /></div>
                        </li>
                        <li className="ms-nav-item ms-d-none mx-3">
                            <div className="text-white cursor-pointer" onClick={() => setCustomMessage(true) }><FontAwesomeIcon className="Header-icon1" icon={faClipboard} /></div>
                        </li>
                    </>}
                </ul>
                

                <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
                    {['DP', 'CL', 'HL'].includes(userInfo.userType)  && <>
                       {( userInfo?.organizationId?.billing?.isPaid || !userInfo?.organizationId?.billing?.hasExpire ) && <li className="ms-nav-item ms-d-none mx-2">
                            <div className="text-white cursor-pointer " onClick={() => setIsModalOpen(true) }><FontAwesomeIcon className="Header-icon" icon={faCalendarDays} />Make an appointment</div>
                        </li>}
                        <li className="ms-nav-item ms-d-none mx-3">
                            <div className="text-white cursor-pointer" onClick={() => setCustomMessage(true) }><FontAwesomeIcon className="Header-icon" icon={faClipboard} />Noticeboard</div>
                        </li>
                    </>}
                    
                    <li className="ms-nav-item ms-d-none mx-2">
                        <div className="text-white" >
                        <Dropdown
                            toggle={<> <FontAwesomeIcon className="Header-icon cursor-pointer" icon={faBell} />{ unseenNotificationCount > 0 && <span class="badge rounded-pill badge-outline-light bell-badge ">{unseenNotificationCount}</span>} </>}
                        >
                            <li className="dropdown-menu-header">
                                <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Notifications</span></h6>
                            </li>
                            <li className="dropdown-divider m-0 fs-12"></li>
                            <Link to={`${getUserPath()}/notification`}>
                            
                            {notifications.length ? 
                                notifications.map( notification => 
                                    <Item>
                                        <div className="row cursor-pointer">
                                            <div className="col-2">
                                                <span class={`badge badge-gradient-${PRIORITY_COLORS[notification.priority]}`} style={{ fontSize:"9px"}}>{notification.priority}</span>
                                            </div>
                                            <div className="col-10">
                                                <span className="fs-12 mx-3">{notification.title}</span>
                                            </div>
                                        </div>
                                    </Item>
                                ) : <Item><span>No Data</span></Item>

                            }
                            </Link>
                            <li className="dropdown-divider m-0 fs-12"></li>

                            <Link to={`${getUserPath()}/notification`} className=" dropdown-menu-header">
                                {/* <li className=""> */}
                                    <h6 className="dropdown-header ms-inline m-0 fs-12"><span className="text-disabled">View All </span></h6>
                                {/* </li> */}
                            </Link>
    
                        </Dropdown>
                        </div>
                    </li>
                    <li className="ms-nav-item ms-nav-user dropdown">
                        <button className="btn  btn-light btn-md" onClick={() => Logout()}>Logout</button>
                    </li>
                </ul>
                <div className="ms-toggler ms-d-block-sm pe-0 ms-nav-toggler" onClick={() => setIsSidebarOpen((old) => !old)}>
                    <span className="ms-toggler-bar bg-white"></span>
                    <span className="ms-toggler-bar bg-white"></span>
                    <span className="ms-toggler-bar bg-white"></span>
                </div>
                {isModalOpen && 
                    <Appointment 
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                }
                {isCustomMessage && 
                    <Modal
                        isOpen={isCustomMessage}
                        setIsOpen={setCustomMessage}
                        closeButton={false}
                        submitButton={false}
                        title='Noticeboard'
                    >
                        { !isMessage ? <><div className="row">
                            <div className="mb-3 d-flex justify-content-end">
                                <button className=" btn btn-primary btn-sm p-2 shadow-none" onClick={() => { setIsMessage(!isMessage); setNotice({}) }}>List</button>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className=''>Title</label>
                                <div className="input-group">
                                    <input type="text"
                                        className="form-control "
                                        placeholder="Title"
                                        onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                                    />
                                </div>
                                {notice.error && <div className="text-danger ">{'Title is required'}</div>}
                            </div>
                            <div className="col-md-3 mb-3"></div>
                            <div className="col-md-3 mb-3"></div>

                            <div className="col-md-12 mb-3">
                                <label className=''>Description</label>
                                <div className="input-group">
                                    <textarea type="text" rows={10}
                                        className="form-control "
                                        placeholder="Description"
                                        onChange={(e) => setNotice({ ...notice, description: e.target.value })}
                                    />
                                </div>
                                {notice.error && <div className="text-danger ">{'Description is required'}</div>}
                            </div>
                        </div>
                        <button className="btn btn-primary btn-md" onClick={() => submitNotice() }>Save</button>
                        </>
                        :
                        <div className="notice-max-height">
                            <div className="mb-3" style={{ display: 'flex', justifyContent:'end'}}>
                                <button className=" btn btn-primary btn-sm p-2 shadow-none" onClick={() => setIsMessage(false)}>Add Notice</button>
                            </div>
                            { notices?.length > 0 ? notices.map( notice => <div className="mb-3 ps-3" style={{ borderLeft: '5px solid grey' }}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h6>{ notice.title }</h6>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className="cursor-pointer" icon={faTrash} onClick={() => deleteNotice( notice._id )} />
                                    </div>
                                </div>
                                <p>{ notice.description }</p>
                            </div>)
                            :
                            <div>
                                No Data
                            </div>    
                        }
                        </div>
                        }
                    </Modal>
                }
            </nav>
        </>
    )
}
export default memo(Header);