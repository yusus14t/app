import React, {  useEffect, useState } from 'react';
import NewTcket from './NewTicket';
import { axiosInstance, formatDate, getAuthHeader } from '../../../constants/utils';

const Support = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        allTickets()
    }, [])

    const allTickets = async () => {
        try{
            let {data} = await axiosInstance.get('/common/tickets', {...getAuthHeader()}) 
            setTickets(data?.tickets)
        } catch(error){ console.log(error) }
    }

    return(
        <div className='ms-panel mb-0 inner-content-height'>
            <div className='ms-content-wrapper'>
                <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                    <div>
                        <h6 >Help Desk</h6>
                    </div>
                    { !['SA', 'AD'].includes(userInfo.userType ) && <div>
                        <button onClick={() => setIsModalOpen(true)} className=" btn btn-info btn-md" >New Ticket</button>
                    </div>}
                </div>
                    <div class="ms-panel-body p-0" >
                            <div  class="table-responsive scrollbar-deep-purple ">
                                <div style={{position:"absolute", width:"99%", zIndex:"1"}}  className="row mx-0 ms-panel-header ">
                                    <div className="col text-center ">
                                        <span className="text-light ml-4">S.No</span>
                                    </div>
                                    <div className="col text-center ">
                                        <span className="text-light ml-4">Issue</span>
                                    </div>
                                    <div className="col text-center">
                                        <span className="text-light">Description</span>
                                    </div>                                
                                    { userInfo.userType === 'SA' && <div className="col text-center">
                                        <span className="text-light">User</span>
                                    </div>}                                
                                    <div className="col text-center">
                                        <span className="text-light">Date</span>
                                    </div>                                
                                    <div className="col text-center">
                                        <span className="text-light">Status</span>
                                    </div>
                                </div>
                                <div className="mx-4 mt-10  " style={{height:"65vh", marginTop:"50px"}}>

                                {tickets.length > 0 && tickets.map( (ticket, i) =>
                                    <div className="row dropdown-menu-active py-1 ">
                                    <div className="col text-center " style={{ width: "150px"}}>
                                        { i+1 }
                                    </div>
                                    <div className="col text-center ">
                                        <span className="text-dark align-middle">{ticket.title}</span>
                                    </div>
                                    <div className="col text-center">
                                        <span className="text-dark">{ticket.description}</span>
                                    </div>                                
                                    {userInfo.userType === 'SA' && <div className="col text-center ">
                                        <span className="text-dark">{ticket.senderId?.name}</span>
                                        <br />
                                        <span className="text-dark">{ticket.senderId?.phone}</span>
                                    </div>}                                
                                    <div className="col text-center">
                                        <span className="text-dark">{new Date(ticket.createdAt).toLocaleString()}</span>
                                    </div>                                
                                    <div className="col text-center">
                                        <span className="text-dark">{['SA', 'AD'].includes(userInfo?.userType) ? 'Recieved' : 'Sent'}</span>
                                    </div>
                                </div>)}
                                </div>
                                
                            </div>
                            </div>
                { isModalOpen &&
                    <NewTcket
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        refresh={() => allTickets()}
                    />
                }
            </div>
        </div>
    )
}

export default Support;