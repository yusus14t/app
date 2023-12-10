import { useEffect, useState } from "react";
import {  Controller, useForm } from "react-hook-form"
import { DAYS, RADIOLOGIST_DEPARTMENT } from "../../../constants/constant";
import { NumberFormat, axiosInstance, getAuthHeader, getFullPath } from "../../../constants/utils";
import useToasty from '../../../hooks/toasty';
import Select from 'react-select';
import NO_PHOTO from '../../../assets.app/images/no-photo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import ImgUpload from "../Imgupload";


const DepartmentRegistration = ({tab, setTab, source='', id, setIsOpen=() => {}, refresh = () => {}}) => {
    const { register, handleSubmit,  formState: { errors, }, setError, getValues, setValue, reset, control } = useForm({ onChange: true })
    const [ specialization, setSpecialization ] = useState([]);
    const [ departments, setDepartments ] = useState([]);
    const [ timing, setTiming ] = useState([]);
    const [ days, setDays ] = useState(DAYS)
    const RID = JSON.parse(localStorage.getItem('RID')) || id
    const toasty = useToasty();
    const [selectedImage, setSelectedImage] = useState(null)
    const [editImage, setEditImage] = useState(null)

    useEffect(() => {
        getDepartments()
        getHospitalSpecialization()
    }, [tab])

    const getDepartments = async () => {
        try {
            let { data } = await axiosInstance.get('/doctor/departments', { params: { organizationId: RID }, ...getAuthHeader() })
            setDepartments(data?.organizations)
        } catch(error) { console.error(error) }
    }

    const getHospitalSpecialization = async () => {
        try {
            let { data } = await axiosInstance.get('/doctor/hospital-specialization', { params: { organizationId: RID }})
            if( data.specialization.find( spe => spe.id === 'RADIOLOGIST' )){
                data.specialization = data.specialization?.filter( spe => spe.id !== 'RADIOLOGIST' )
                data.specialization = [ ...data.specialization, ...RADIOLOGIST_DEPARTMENT ]
            }
            setSpecialization(data?.specialization)
        } catch(error){ console.error(error) }
    }

    const handleTime = () => {
        let time = getValues('timing')

        if( !time?.day ) setError('timing.day', { message: 'Day is required'})
        if( !time?.open ) setError('timing.open', { message: 'Open time is required'})
        if( !time?.close ) setError('timing.close', { message: 'Close time is required'})

        let day = timing.find( t => t.day === time.day )
        if( !day && time?.day && time?.open && time?.close ){
            setTiming([ ...timing, JSON.parse(JSON.stringify(time)) ])
            setDays( old => old.filter( d => d.value !== time.day ))
            setValue('timing', { day: '', open: '', close: ''})
        }
    }

    const handleDelete = (time) => {
        setTiming( old => old.filter( t => t.day !== time.day ))
        setDays( old => ([ DAYS.find( d => d.value === time.day ), ...old].sort((a, b) => a.value - b.value )))
    }   

    const submit = async (formValues) => {
        try{    
  
            formValues['timing'] = timing
            formValues['organizationId'] = RID

            let formData = new FormData()
            formData.append('data', JSON.stringify(formValues))
            formData.append('image', selectedImage)


            let { data } = await axiosInstance.post('/doctor/create-department', formData , getAuthHeader())
            reset({ name: '', room: '', email: '', phone: '', specialization: '' })
            setTiming([])
            setDays(DAYS)
            toasty.success(data?.message)

            if( source === 'modal' ) setIsOpen(false)
            else getDepartments()
            refresh()
        } catch(error){ 
            console.error(error) 
            toasty.error(error.message)
        }
    }

    const deleteDepartment = async ( _id ) => {
        try {
            let { data } = await axiosInstance.post('/doctor/delete-department', { _id })
            setDepartments( old => old.filter( department => String(department.organizationId._id) !== String(_id)) )
            toasty.success(data?.message)
        } catch(error) { console.error(error) }
    }

    const handleEdit = (department) => {
        setEditImage(getFullPath(department?.photo))
        reset(department)
    }
      
      
    return (
        <>
            {source !== 'modal' && <div className="row">
                {departments?.length > 0 && departments.map(department => <div className="col-md-4 col-sm-6 mb-3">
                    <div class="ms-card card-gradient-dark ms-infographics-widget ms-widget">
                        <div class="ms-card-body">
                            <div class="media fs-14" style={{ marginBottom: "0" }}>
                                <div class="me-2 align-self-center">
                                    <img src={department?.organizationId.photo ? getFullPath(department?.organizationId.photo) : NO_PHOTO} class="ms-img-curved" alt="people" />
                                </div>
                                <div class="media-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h6>{department?.organizationId?.name}</h6>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon className='ms-text-ligth mx-3 cursor-pointer' icon={faPencil} onClick={() => handleEdit(department.organizationId)} />
                                            <FontAwesomeIcon className='ms-text-ligth cursor-pointer' icon={faTrash} onClick={() => deleteDepartment(department.organizationId._id)} />
                                        </div>
                                    </div>
                                    <span className='text-light' style={{ fontSize: 'x-small' }}>{department?.organizationId?.specialization[0 ]?.name || 'Specialization'}</span>
                                    <br />
                                    <span className='text-light' style={{ fontSize: 'x-small' }}>{department?.organizationId?.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
            }

            <form onSubmit={handleSubmit(submit)}>
                <ImgUpload source={"doctor"} file={(image) => setSelectedImage(image)} editImage={editImage} />
                <div className='row mt-3'>
                    <div className="col-md-6 mb-3">
                        <label >Name of Department</label>
                        <div className="input-group">
                            <input type="text"
                                className={`form-control ${errors?.name ? 'border-danger' : ''}`} 
                                placeholder="Cardio"
                                {...register('name', {
                                    required: 'Department is required'
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label >Phone</label>
                        <div className="input-group">
                            <input type="text"
                                maxLength={10}
                                className={`form-control ${errors?.phone ? 'border-danger' : ''}`} 
                                placeholder="Enter Phone"
                                onInput={(e) => NumberFormat(e)}
                                {...register('phone', {
                                    required: 'Phone is required'
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label >Email</label>
                        <div className="input-group">
                            <input type="text"
                                className={`form-control ${errors?.email ? 'border-danger' : ''}`} 
                                placeholder="Enter Email"
                                {...register('email', {
                                    required: 'Email is required'
                                })}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className=''>Room No.</label>
                        <div className="input-group">
                            <input type="number"
                                    className={`form-control ${errors?.room ? 'border-danger' : ''}`} 
                                placeholder="Eg: 45"
                                {...register('room', {
                                    required: 'Room is required'
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-3">
                        <label >Specialization of Department</label>
                        <div className="">
                            <Controller
                                control={control}
                                name="specialization"
                                rules={{ required: 'Specialization must be select' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isMulti={false}
                                        options={specialization}
                                        getOptionLabel={({ name }) => name}
                                        getOptionValue={({ id }) => id}
                                        className={`form-control p-0 ${errors.specialization ? 'border-danger' : ''}`}
                                        classNamePrefix="select"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {days?.length > 0 && <div className="row px-2">
                        <div className="col-md-12 mb-3">
                            <label className=''>Timming</label>
                            <div className='row' style={{ paddingRight: 0 }}>
                                <div className="col">
                                    <label htmlFor="">Days</label>
                                    <select name="days" 
                                        className={`form-control ${errors?.timing?.day ? 'border-danger' : ''}`} 
                                        {...register('timing.day')} >
                                        {days.map((day) => <option value={day.value} >{day.day}</option>)}
                                    </select>
                                </div>
                                <div className='col '>
                                    <label htmlFor="#open">Open</label>
                                    <input type="time"
                                        id='open'
                                        className={`form-control ${errors?.timing?.open ? 'border-danger' : ''}`} 
                                        placeholder="morning 10am to 12pm"
                                        {...register('timing.open')}
                                    />
                                </div>
                                <div className='col '>
                                    <label className=''>Close</label>
                                    <input type="time"
                                        className={`form-control ${errors?.timing?.close ? 'border-danger' : ''}`} 
                                        placeholder="morning 10am to 12pm"
                                        {...register('timing.close')}
                                    />
                                </div>
                                <div className=''>
                                    <button type='button' style={{ minWidth: "60px" }} className='btn btn-1 btn-primary mt-4 p-1 px-1 shadow-none' onClick={() => handleTime()}> Add</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="px-2">
                        <div className="alert alert-danger border-0  p-2 mb-2 mt-4">
                            <div className="d-flex justify-content-around">
                                <div>Day</div>
                                <div>Open</div>
                                <div>Close</div>
                                <div>Action</div>
                            </div>
                        </div>
                        { timing?.length > 0 && 
                            timing.map( time => <div className="alert alert-secondary border-0 p-2">
                            <div className="d-flex justify-content-around">
                                <div>{ time.day }</div>
                                <div>{ time.open }</div>
                                <div>{ time.close }</div>
                                <div>
                                    <FontAwesomeIcon className=' mx-3 cursor-pointer' icon={faTrash} onClick={() => handleDelete(time)} />
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className="mt-3">
                    { source === 'modal' && <button type="submit" className="btn btn1 btn-light mx-3" onClick={() =>  setIsOpen(false)}>Cancel</button>}
                    <button type="submit" className="btn btn1 btn-primary shadow-none">Save</button>
                    { source !== 'modal' && <button type="submit" className="btn btn1 btn-primary mx-3" onClick={() => setTab('STEP4')} disabled={!Boolean(departments?.length)}>Next</button>}
                </div>
            </form>
        </>
    )
}
export default DepartmentRegistration;