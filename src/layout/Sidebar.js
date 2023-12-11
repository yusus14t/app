import React, { useEffect, useRef, useState } from 'react';
import NO_PHOTO from '../assets/images/no-photo.png'
import { Link, useLocation } from 'react-router-dom';
import { MODULES, userRoutes } from '../constants/constant';
import { axiosInstance, getAuthHeader, getFullPath } from '../constants/utils';
import Modal from '../components/common-components/Modal';

function Sidebar({ isOpen, setIsOpen, mobileView }) {
    const location = useLocation();
    const pathname = location.pathname.split("/")
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [activeNav, setActiveNav] = useState(null)
    const [ expirePlanModal, setExpirePlanModal ] = useState(false)
    const [ isChecked, setIsChecked ] = useState(userInfo.organizationId?.bookingStatus || false)
    const planMessageRef = useRef(null)
    const [ organizations, setOrganizations ] = useState([])

    useEffect(() => {
        setActiveNav(pathname[2])
    }, [pathname,])

    useEffect(() => {
        if( expirePlanModal ){
            getExpireOrganizations()
        }
    }, [ expirePlanModal ])

    const Logout = () => {
        localStorage.clear();
        window.location.replace("/login");
    };

    const bookingStatus = async ( status ) => {
        try{
            await axiosInstance.post('/doctor/booking-status', { bookingStatus: status }, getAuthHeader() )
        } catch(error){ console.log(error) }
    }

    const getExpireOrganizations = async () => {
        try{
            let { data } =  await axiosInstance.get('/super-admin/expire-organizations', getAuthHeader())
            console.log('getExpireOrganizations', data)
            setOrganizations( data.organizations )
        }catch(error){ console.log(error) }
    }

    const sendPlanMessage = async () => {
        try{
            await axiosInstance.post('/super-admin/plan-message', { mesage: planMessageRef.current.value, phones: organizations.map( org => org?.phone ) }, getAuthHeader())
            setExpirePlanModal(false)
        }catch(error){ console.log(error) }
    }

    return (
        <>
            <aside className={`side-nav fixed ms-aside-scrollable ms-aside ps ps--active-y ${!isOpen ? 'ms-aside-left' : ''} `} style={{ paddingBottom: '6rem' }}>
                <div className="logo-sn ms-d-block-lg">
                    <div className="d-flex flex-row justify-content-around align-items-baseline sidebar-image">
                        <div className="">
                            <a href="/" className="text-center "> <img className="profile-image" src={ userInfo.photo || userInfo?.organizationId?.photo ? getFullPath(userInfo.photo || userInfo?.organizationId?.photo) : NO_PHOTO} alt="logo" /></a>
                        </div>
                        <div className="">
                            <h5 className="text-center text-white mt-2">{['SA', 'MR', 'PT', 'AD'].includes(userInfo.userType) ? userInfo?.name : userInfo?.organizationId?.name}</h5>
                            <h6 className="text-center text-white mb-3">{userInfo?.userType !== 'DR' ? userRoutes[userInfo?.userType].title : userInfo?.organizationId?.organizationType?.toUpperCase()}</h6>
                        </div>
                        
                    </div>
                    
                </div>
            { ['CL', 'DP'].includes(userInfo.userType) &&  <div className='d-flex justify-content-around my-3'>
                    <h5 className='text-light'>Online Booking </h5>
                    <label class="ms-switch">
                        <input type="checkbox" checked={isChecked} onChange={(e) => {bookingStatus(e.target.checked); setIsChecked(e.target.checked)}} />
                        <span class="ms-switch-slider round"></span>
                    </label>
                </div>}

                <ul className="accordion ms-main-aside fs-14 overflow-auto">
                    {MODULES.filter((m) => m.access.includes(userInfo?.userType)).map((module, key) => <li className={`menu-item ${activeNav === module.id && 'nav-link-active'}`} onClick={() => { mobileView && setIsOpen(false) }} key={key}>
                        <Link to={`/${pathname[1]}${module.pathname}`} className="has-chevron"  >
                            <span>{module.title}</span>
                        </Link>
                    </li>)}
                    <li className={`menu-item cursor-pointer ${activeNav === 'plan-expire' && 'nav-link-active'}`} onClick={() => { (mobileView && setIsOpen(false));  setExpirePlanModal(true)  }}>
                        <a className="has-chevron"  >
                            <span>Plan Expire</span>
                        </a>
                    </li>
                    
                </ul>
                
                <button className="btn  btn-dark btn-md" onClick={() => Logout()}>Logout</button>
                
            </aside>
            { expirePlanModal && <Modal
                isOpen={expirePlanModal}
                setIsOpen={setExpirePlanModal}
                title='Expire PLans Modal'
                closeButton={false}
                submitButton={false}
            >
                <div style={{ maxHeight: '60vh', overflow: 'auto'}}>
                    { organizations.length && organizations?.map( org => <div className='m-3 p-3 rounded' style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >
                        <h5>{ org.name }</h5>
                        <div className='d-flex  align-items-center' >
                            <p className='mb-0 me-4'>Plan: { org.billing?.plan }</p>
                            <p>Expire: { new Date( org.billing?.expire )?.toLocaleDateString() }</p>
                        </div>
                    </div>)}
                </div>

                <div className='mt-3'  >
                    <textarea className='w-100 rounded p-2' ref={planMessageRef}>Your Doctortime subscription is expiring soon. Renew now to continue uninterrupted access to our valuable healthcare services and appointments</textarea>
                    <button className='btn btn-primary  shadow-none' onClick={() => sendPlanMessage()}>Send Message</button>
                </div> 
            </Modal>}
        </>
    );
}

export default Sidebar;