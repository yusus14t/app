import { useContext, useEffect, useState } from 'react';
import AddNotification from '../Notification/AddNotification'
import useNotification from '../../../hooks/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import useToasty from '../../../hooks/toasty';
import Modal from '../Modal';

const Notification = () => {
    const notificationAPI = useNotification();
    const toasty = useToasty();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [notifications, setNotifications] = useState([])
    const [notification, setNotification] = useState({})
    const [viewModal, setViewModal] = useState(false)

    const PRIORITY_COLORS = {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger',
    }

    useEffect(() => {
        getNotifications()
    }, [])

    const getNotifications = async () => {
        try { 
            let { data } = await notificationAPI.get()
            setNotifications(data.notifications)
        } catch(error){ console.log(error) }
    }

    const handleDelete = async (notificationId) => {
        try{
            await notificationAPI.delete({_id: notificationId})
            setNotifications( prev => prev.filter( notify => notify._id !== notificationId ))
            toasty.success('Successfully delete ntification.')
        } catch(error) {
            console.log(error)
        }
    }

    const handleViewNotification = async (notificationObj) => {
        setNotification(notificationObj)
        setViewModal(true)
    }

    return(
        <div className='ms-content-wrapper'>
            <div className="row mr-0" >
                <div class="col-xl-12 col-md-12">
                    <div class="ms-panel mb-0 inner-content-height">
                        <div  class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                        <div>
                             <h6>Notification</h6>
                        </div>
                        {userInfo.userType === 'SA' && <div>
                            <button className=" btn btn-info btn-md" onClick={() => setIsModalOpen(true)}>Add Notification</button>
                        </div>}
                        </div>
                        <div class="ms-panel-body p-0" >
                        <div  class="table-responsive scrollbar-deep-purple ">
                            <div style={{position:"absolute", width:"99%", zIndex:"9"}}  className="row mx-0 ms-panel-header ">
                                <div className="col  ">
                                    <span className="text-light ml-4">S.No</span>
                                </div>
                                <div className="col  ">
                                    <span className="text-light ml-4">Title</span>
                                </div>
                                <div className="col ">
                                    <span className="text-light">Message</span>
                                </div>                                
                                {/* <div className="col ">
                                    <span className="text-light">Assignees Name</span>
                                </div>                                 */}
                                <div className="col ">
                                    <span className="text-light">Priority</span>
                                </div>                                
                                <div className="col ">
                                    <span className="text-light">View / Delete</span>
                                </div>
                                {/* <div className="col ">
                                    <span className="text-light">fghjk</span>
                                </div> */}
                            </div>
                            <div className="mx-2 mt-6 " style={{height:"65vh", marginTop:"50px"}}>

                                {notifications.map((notification, i) =>
                                    <div className="pt-2 d-flex">
                                        <div className="w-25">
                                            <span className="text-dark align-middle"> {i + 1} </span>
                                        </div>
                                        <div className="mx-2" style={{ minWidth: '6rem'}}>
                                            <p className="text-dark align-middle"> {notification.title.slice(0, 20)}{notification.title.length > 20 ? '...' : ''} </p>
                                        </div>
                                        <div className="mx-2" style={{ minWidth: '6rem'}}>
                                            <span className="text-dark">{notification.message.slice(0, 30)}{notification.message.length > 30 ? '...' : ''}</span>
                                        </div>

                                        {["SA", "MR", "DP", "CL", "HL"].includes(userInfo.userType) && <div className='w-25 mx-2 d-flex align-items-center'>
                                            <FontAwesomeIcon className='ms-text-dark cursor-pointer' icon={faTrash} onClick={() => handleDelete(notification._id)} />
                                            <FontAwesomeIcon className='ms-text-dark cursor-pointer mx-3' icon={faEye} onClick={() => handleViewNotification(notification)} />
                                        </div>}
                                    </div>)}
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            { userInfo.userType === 'SA' && isModalOpen &&
                <AddNotification
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    refresh={() => getNotifications()}
                />
            }
            {viewModal && 
                <Modal
                    isOpen={viewModal}
                    setIsOpen={setViewModal}
                    title='View Notification'
                    submitButton={false}
                >
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-10'>
                                    <h4 className='text-disable'>{notification.title}</h4>
                                </div>
                                <div className='col-2'>
                                    <span class={`badge badge-gradient-${PRIORITY_COLORS[notification.priority]}`}>{notification.priority}</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <p className='h6'><span className='text-dark'>Message : </span> {notification.message}</p>
                        </div>
                        {/* <div className='col-12'>
                            <h6 className='text-disable mt-4'>Assignees</h6>
                            {notification.assigneeIds.map( assignee => <span className="text-disable mx-2">{assignee.firstName} {assignee.lastName},</span> )}
                        </div> */}
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Notification;