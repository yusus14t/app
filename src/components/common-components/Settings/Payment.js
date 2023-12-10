import { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../../constants/utils";
import { useForm } from "react-hook-form";
import useToasty from "../../../hooks/toasty";
import Modal from "../Modal";

const Payment = () => {
    const toasty = useToasty();
    const [ price, setPrice ] = useState([])
    const [ newPlanModal, setNewPlanModal ] = useState(false)
    const [ newPlan, setNewPlan ] = useState({ days: null, price: null, organization: null })
    const { register, reset, handleSubmit, watch } = useForm({ onChange: true })
    const [ plans, setPlans ] = useState({})

    useEffect(() => {
        getPaymentSetting()
    }, [])

    useEffect(() => {
        if( !newPlanModal ){
            setNewPlan({
                days: null,
                price: null,
                organization: null
            })
        }
    }, [ newPlanModal ])

    const getPaymentSetting = async () => {
        try{
            let { data } = await axiosInstance.get('/plans', getAuthHeader())

            let patientPayment = data.paymentSetting.find( ({data}) => data.organization === 'patient' )
            setPrice(patientPayment.data.price)

            let payment = { clinic: {}, hospital: {} }
            data.paymentSetting.map( ({ data, _id }) => {
                if( data.organization === 'clinic' ){
                    payment.clinic[data.type] = { ...data, _id }
                }
                else if( data.organization === 'hospital' ){
                    payment.hospital[data.type] = { ...data, _id }
                }
            })
            setPlans(payment)
            reset(payment)
        } catch(error){ console.error(error) }
    }

    const submit = async ( values ) => {
        try{
            await axiosInstance.post('/super-admin/organization-price', values, getAuthHeader())
            toasty.success('Price update successfully.')
        } catch(error){ 
            console.log(error) 
            toasty.error('Something went wrong.')
        }
    }

    const savePatientPrice = async () => {
        try{
            let { data } = await axiosInstance.post('/super-admin/patient-price', { price }, getAuthHeader())
            toasty.success( data.message )
        } catch(error){ 
            console.log(error) 
            toasty.error('Something went wrong.')
        }
    }

    const addNewPlan = async () => {
        try{
            await axiosInstance.post('/super-admin/new-plan', newPlan, getAuthHeader() )
            await getPaymentSetting()
            setNewPlanModal(false)
        } catch(error){ console.log(error) }
    }

    const deletePlan = async ( _id ) => {
        try{
            await axiosInstance.delete(`/super-admin/plan/${_id}`, getAuthHeader())
            await getPaymentSetting()
        } catch(error){ console.log(error) }
    }

    return(
        <div>
            <div className="user-payment-card mb-3 ">
                <div className="">
                    <h4>Patient</h4>
                </div>
                <div className="row my-2 align-items-end py-2" >
                    <div className="col-md-3">
                        <h6>Fee</h6>
                    </div>
                    <div className="col-md-3">
                        <label>Price</label>
                        <input className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-info shadow-none" onClick={() => savePatientPrice()}>Save</button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="user-payment-card mb-3 ">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>Clinic</h4>
                        </div>
                        <div>
                            <button type="button" className="btn btn-info shadow-none" onClick={() => {setNewPlanModal(true); setNewPlan({ ...newPlan, organization: 'clinic' })}}>New Plan</button>
                        </div>
                    </div>
                    { plans?.clinic && Object.entries(plans?.clinic).map( ([type, values], i) => (
                        <div className="row my-2 align-items-center py-2" key={i}>
                            <div className="col-md-3">
                                <h6>{ type }</h6>
                            </div>
                            <div className="col-md-3">
                                <label>Price</label>
                                <input 
                                    className="form-control"
                                    {...register(`clinic.${type}.price`, {
                                        required: 'Price must be required'
                                    })} 
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Discount</label>
                                <input 
                                    className="form-control"
                                    {...register(`clinic.${type}.discount`, {
                                        required: 'Discount must be required'
                                    })} 
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Total</label>
                                <h5>₹{ +watch(`clinic.${type}.price`) - +watch(`clinic.${type}.discount`) }
                                { !JSON.parse(values.isDefault) && <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => deletePlan(values._id)}><span aria-hidden="true">&times;</span></button>}
                                </h5>
                            </div>
                        </div>
                    ))}

                    <div className="mt-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-info shadow-none">Save</button>
                    </div>
                </div>
                <div className="user-payment-card mb-3 ">
                <div className="d-flex justify-content-between">
                        <div>
                            <h4>Hospital</h4>
                        </div>
                        <div>
                            <button type="button" className="btn btn-info shadow-none" onClick={() => {setNewPlanModal(true); setNewPlan({ ...newPlan, organization: 'hospital' })}}>New Plan</button>
                        </div>
                    </div>
                    {  plans?.hospital && Object.entries(plans?.hospital).map( ([type, values], i) => (
                        <div className="row my-2 align-items-center py-2" key={i}>
                            <div className="col-md-3">
                                <h6>{ type }</h6>
                            </div>
                            <div className="col-md-3">
                                <label>Price</label>
                                <input 
                                    className="form-control"
                                    {...register(`hospital.${type}.price`, {
                                        required: 'Price must be required'
                                    })} 
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Discount</label>
                                <input 
                                    className="form-control"
                                    {...register(`hospital.${type}.discount`, {
                                        required: 'Discount must be required'
                                    })} 
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Total</label>
                                <h5>₹{ +watch(`hospital.${type}.price`) - +watch(`hospital.${type}.discount`) }
                                    { !JSON.parse(values.isDefault) && <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => deletePlan(values._id)} ><span aria-hidden="true">&times;</span></button>}
                                </h5>
                            </div>
                        </div>
                    ))}

                    <div className="mt-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-info shadow-none">Save</button>
                    </div>
                </div>
            </form>
            <Modal
                isOpen={newPlanModal}
                setIsOpen={setNewPlanModal}
                title="Add New Plan"
                closeButton={false}
                submitButton={false}
            >   
                    <div className="row my-2 align-items-center py-2" >
                        <div className="col-md-6">
                            <label>Days</label>
                            <input 
                                className="form-control"
                                placeholder="Enter Days ex: 15"
                                required
                                onChange={(e) => setNewPlan({ ...newPlan, days: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Price</label>
                            <input 
                                className="form-control"
                                placeholder="Enter price"
                                required
                                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-info shadow-none" onClick={() => addNewPlan() }>Save</button>
                    </div>
            </Modal>
        </div>
    )
}

export default Payment;