import React, { useEffect, useState } from 'react';
import Dashboard from '../../assets.app/images/Dashboard.jpg'
import { PLAN } from '../../constants/constant';
import { axiosInstance, getAuthHeader } from '../../constants/utils';
import { userInfo } from '../../constants/utils';

const Expire = () => {
    const [plan, setPlan ] = useState(null)
    const [plans, setPlans ] = useState([])

    useEffect(() => {
        getPlans()
    }, [])

    const  getPlans  = async () => {
        try {
            let { data } = await axiosInstance.get('/plans', getAuthHeader())
            let allPlans = data.paymentSetting.filter( plan => (plan.data.organization === 'clinic' && userInfo.userType === 'CL') || (plan.data.organization === 'hospital' && userInfo.userType === 'HL') )
            setPlans(allPlans)
        } catch(error) { console.log(error) }
    }

    const submit = async () => {
        try {
            let { data } = await axiosInstance.post('/payment', { plan, _id: userInfo.organizationId._id }, getAuthHeader())
            if( data.redirectUrl ) window.location.href = data.redirectUrl
        } catch(error) { console.log(error) }
    }

    return (
        <>
            <div className="">
                <img src={Dashboard} className='w-100' />
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ background: "#000000d4", position: "absolute", top: "0", right: "0", width: "100%", height: "100vh" }}>
                <div>
                    <div style={{ minWidth: "390px" }} className="modal-content m-auto ">
                        <div className="modal-header">
                            <h5 className="modal-title has-icon ms-icon-round ">
                                {userInfo.organizationId?.billing?.isNewPlan ? 'Select Plan' : 'Plan Expire'}
                            </h5>
                        </div>
                        <div className="modal-body">
                            { userInfo.userType !== 'DP' ? <div className="notice-max-height">
                                { plans.length > 0 && plans.map( ( { data : singleplan }, i) => ( i++, <div className={`p-3 my-2 renew-plan-card ${ plan === PLAN[singleplan.type] && 'renew-plan-active' }`} onClick={() => setPlan(PLAN[singleplan.type])}>
                                    <h5>{ singleplan.type }</h5>
                                    <div className='d-flex justify-content-between'>
                                        <div>Plan { i }</div>
                                        <div>₹{singleplan.price - singleplan.discount} { singleplan.discount > 0 &&  `- discount ₹ ${singleplan.discount}`}</div>
                                    </div>
                                </div>))}
                                <div className="my-3 d-flex justify-content-center">
                                    <button className=" btn btn-primary btn-md shadow-none" onClick={() => submit()}>Pay Now</button>
                                </div>
                            </div>
                             :
                             <div>
                                Please contact to your hospital
                             </div>   
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Expire