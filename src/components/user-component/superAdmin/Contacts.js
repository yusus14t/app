import React, { useEffect, useState } from 'react';
import { axiosInstance, formatDate, formatPhone } from '../../../constants/utils';

const Contacts = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getContacts()
    }, [])

    const getContacts = async () => {
        try {
            let { data } = await axiosInstance.get('/super-admin/website/CONTACT_QUERY')
            setContacts(data?.contacts)
        } catch (error) { console.log(error) }
    }

    return (
        <div className='ms-panel mb-0 inner-content-height'>
            <div className='ms-content-wrapper'>
                <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                    <div>
                        <h6 >Contacts</h6>
                    </div>
                </div>
                <div class="ms-panel-body p-0" >
                    <div class="table-responsive scrollbar-deep-purple ">
                        <div style={{ position: "absolute", width: "99%", zIndex: "9" }} className="row mx-0 ms-panel-header ">
                            <div className="col text-center ">
                                <span className="text-light ml-4">S.No</span>
                            </div>
                            <div className="col text-center ">
                                <span className="text-light ml-4">Name</span>
                            </div>
                            <div className="col text-center">
                                <span className="text-light">Email</span>
                            </div>
                            <div className="col text-center">
                                <span className="text-light">Phone</span>
                            </div>
                            <div className="col text-center">
                                <span className="text-light">Topic</span>
                            </div>
                            <div className="col text-center">
                                <span className="text-light">Message</span>
                            </div>
                        </div>
                        <div className="mx-4 mt-10  " style={{ height: "65vh", marginTop: "50px" }}>

                            {contacts.length > 0 && contacts.map((contact, index) =>
                                <div className="row dropdown-menu-active py-1 ">
                                    <div className="col text-center ">
                                        <span className="text-dark align-middle">{index +1}</span>
                                    </div>
                                    <div className="col text-center ">
                                        <span className="text-dark align-middle">{contact.data.name}</span>
                                    </div>
                                    <div className="col text-center">
                                        <span className="text-dark">{contact.data.email}</span>
                                    </div>
                                     <div className="col text-center ">
                                        <span className="text-dark">{formatPhone(contact.data.mobile)}</span>
                                    </div>
                                    <div className="col text-center">
                                        <span className="text-dark">{contact.data.topic}</span>
                                    </div>
                                    <div className="col text-center">
                                        <span className="text-dark">{contact.data.message}</span>
                                    </div>
                                </div>)}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts;