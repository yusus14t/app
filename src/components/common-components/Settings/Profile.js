import { useForm } from 'react-hook-form';
import { NumberFormat, axiosInstance, getAuthHeader, updateUser } from '../../../constants/utils';
import ImgUpload from '../Imgupload';
import  useToasty  from '../../../hooks/toasty';
import { useEffect, useState } from 'react';
import { DAYS } from '../../../constants/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ source, setIsOpen = () => {}, refresh = () => {} }) => {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors, getValues, setValue } = useForm({ onchange: true })
    const [ selectedFile, setSelectedFile ] = useState({})
    const toasty =  useToasty()
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [ days, setDays ] = useState(DAYS)
    const [ timing, setTiming ] = useState([]);
    const [ isTiming, setIsTiming ] = useState(false)

    useEffect(() => {

        let obj = {}
        if( ['HL', 'CL', 'DP'].includes(userInfo.userType)){
            obj = {
                name: userInfo.organizationId.name,
                phone: userInfo.phone,
                email: userInfo.organizationId.email,
                fee: userInfo.organizationId.fee,
                address: userInfo.organizationId.address,
            }

            if( !userInfo.organizationId.timing?.length || userInfo.organizationId.timing?.length < 7 ) setIsTiming(true)
            setTiming(userInfo.organizationId.timing)

        } else { obj = { ...userInfo }}

        if( source !== 'addMR' ) reset(obj)
    }, [])

    const submit = async (values) => {
        values['timing'] = timing
        let formData = new FormData()

        formData.append('data', JSON.stringify(values))
        formData.append('image', selectedFile )

        let header = getAuthHeader()
        header.headers['Content-Type'] = 'multipart/form-data'  
        
        
        let response = null
        if( source === 'addMR' ){
            response = await axiosInstance.post('/super-admin/mr', formData, header) 
            refresh()
        } else {
            response = await axiosInstance.post('/hospital/edit-profile', formData, header)
        }

        await updateUser()
        toasty.success(response?.data?.message)
        setIsOpen(false)
    }


    const handleTime = () => {
        let time = getValues('timing')

        if( !time?.day ){ setError('timing.day', { message: 'Day is required'}); return }
        if( !time?.open ){ setError('timing.open', { message: 'Open time is required'}); return }
        if( !time?.close ){ setError('timing.close', { message: 'Close time is required'}); return }

        let day = timing.find( t => t.day === time.day )
        if( !day ){
            setTiming([ ...timing, JSON.parse(JSON.stringify(time)) ])
            setDays( old => old.filter( d => d.value !== time.day ))
            setValue('timing', { day: '', open: '', close: ''})
            clearErrors('timing')
        }
    }


    const handleClinicTime = () => {
        let time = getValues('timing')

        if (!time?.day) { setError('timing.day', { message: 'Day is required' }); return }
        if (!time?.morning?.open) { setError('timing.morning.open', { message: 'Open time is required' }); return }
        if (!time?.morning?.close) { setError('timing.morning.close', { message: 'Close time is required' }); return }

        if (!time?.evening?.open) { setError('timing.evening.open', { message: 'Open time is required' }); return }
        if (!time?.evening?.close) { setError('timing.evening.close', { message: 'Close time is required' }); return }

        let day = timing.find(t => t.day === time.day)

        if (!day) {
            setTiming([...timing, JSON.parse(JSON.stringify(time))])
            setDays(old => old.filter(d => d.value !== time.day))
            setValue('timing', { day: '', morning: { open: '', close: '' }, evening: { open: '', close: '' } })
            clearErrors('timing')
        }
    }

    const handleEditOrDelete = ( time, isDelete ) => {
        if( isDelete ){
            setDays( old => ([ DAYS.find( d => d.value === time.day ), ...old].sort((a, b) => a.value - b.value )))
        } else {
            setIsTiming(true)
            setValue('timing', time)
        }
        setTiming( old => old.filter( t => t.day !== time.day ))
    }  

    const getTiming = ( time ) => {
        if(   userInfo?.organizationId?.organizationType === 'Clinic' ){
            return(
                <>
                    <div>{time.day}</div>
                    <div>{time.morning.open}</div>
                    <div>{time.morning.close}</div>
                    <div>{time.evening.open}</div>
                    <div>{time.evening.close}</div>
                </>
            )
        } else {
            return(
                <>
                    <div>{time.day}</div>
                    <div>{time.open}</div>
                    <div>{time.close}</div>
                </>
            )
        }
    }

    return(
        <div className={`ms-panel-body ${ source === 'addMR' ? 'p-0' : 'content-height' }`}>
            <div className="content ">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 ">< ImgUpload source={'clinic'} file={(image) => { setSelectedFile(image) }} /></div>
                </div>
                <form onSubmit={handleSubmit(submit)} >
                    <div className="row my-3 ">
                        <div className="col-md-6 mb-3">
                            <label className=''>Name</label>
                            <div className="input-group">
                                <input type="text"
                                    className={`form-control ${errors?.name ? 'border-danger' : ''}`}
                                    placeholder={`Enter Name`}
                                    {...register('name', {
                                        required: 'Name is required'
                                    })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className=''>Phone Number</label>
                            <div className="input-group">
                                <input type="text"
                                    className={`form-control ${errors?.phone ? 'border-danger' : ''}`}
                                    placeholder="Enter Phone Number"
                                    onInput={(e) => NumberFormat(e)}
                                    maxLength={10}
                                    {...register('phone', {
                                        required: 'Phone number is required'
                                    })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className=''>Email</label>
                            <div className="input-group">
                                <input type="email"
                                    className={`form-control ${errors?.email ? 'border-danger' : ''}`}
                                    placeholder="Enter Email"
                                    {...register('email', {
                                        required: 'Email is required'
                                    })}
                                />
                            </div>
                        </div>
                        { source !== 'addMR' && ['HL', 'CL', 'DP' ].includes(userInfo.userType) && <div className="col-md-6 mb-3">
                            <label >Consultant Fee</label>
                            <div className="input-group">
                                <input 
                                    {...register('fee', {
                                        required: 'Consultation fee is required'
                                    })}
                                    type="number"
                                    className={`form-control ${errors.fee ? 'border-danger' : ''}`}
                                    placeholder="Ex: 200"
                                />
                            </div>
                        </div>}
                        {source === 'addMR' &&
                            <>
                                <div className="col-md-6 mb-3">
                                    <label >Age</label>
                                    <div className="input-group">
                                        <input
                                            {...register('age', {
                                                required: 'Age is required'
                                            })}
                                            type="number"
                                            className={`form-control ${errors.age ? 'border-danger' : ''}`}
                                            placeholder="Enter Age"
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label >Gender</label>
                                    <select style={{ padding: '.475rem .75rem' }} className={`form-control mb-2 col-2 w-100  ${errors?.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required' })}>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </select>
                                </div>
                            </>
                        }
                        <div className="col-md-6 mb-3">
                            <label className=''>Address</label>
                            <div className="input-group">
                                <input type="text"
                                    className={`form-control ${errors.address ? 'border-danger' : ''}`}
                                    placeholder="Enter Full Address"
                                    {...register('address', {
                                        required: 'Address is required'
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    { ['HL', 'CL'].includes(userInfo.userType) && <div className="alert alert-danger border-0 p-2">
                        <div className="d-flex justify-content-around">
                            { userInfo?.organizationId?.organizationType === 'Clinic' 
                            ? 
                                <>
                                    <div>Day</div>
                                    <div>Morn. Open</div>
                                    <div>Morn. Close</div>
                                    <div>Even. Open</div>
                                    <div>Even. Close</div>
                                    <div>Actions</div>
                                </>
                            : 
                                <>
                                    <div>Day</div>
                                    <div>Open</div>
                                    <div>Close</div>
                                    <div>Actions</div>
                                </>
                            }
                        </div>
                    </div>}
                    {timing?.length > 0 && ['HL', 'CL'].includes(userInfo.userType) &&
                        timing.map((time) => (
                            <div className="alert alert-secondary border-0 p-2">
                                <div className="d-flex justify-content-around">
                                    {getTiming( time )}
                                    <div>
                                        <FontAwesomeIcon
                                            className="cursor-pointer mx-3"
                                            icon={faEdit}
                                            onClick={() =>
                                                handleEditOrDelete(time, false)
                                            }
                                        ></FontAwesomeIcon>
                                        <FontAwesomeIcon
                                            className="cursor-pointer"
                                            icon={faTrash}
                                            onClick={() =>
                                                handleEditOrDelete(time, true)
                                            }
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {[ 'HL', 'CL' ].includes(userInfo.userType) && isTiming && <div className="row mb-3" style={{ paddingRight: 0 }}>
                      
                        {userInfo?.organizationId?.organizationType === 'Clinic' ? <div className="row">
                            <div className="col-6">
                                <label htmlFor="">Days</label>
                                <select
                                    name="days"
                                    className={`form-control ${errors?.timing?.day ? "border-danger" : ""
                                        }`}
                                    {...register("timing.day")}
                                >
                                    {days.map((day) => (
                                        <option value={day.value}>{day.day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="evening row mt-3">
                                <div className='d-flex flex-column col-md-6 my-2'>
                                    <div>Morning</div>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div className="col-sm-6 mx-2">
                                            <label htmlFor="#open">Open</label>
                                            <input
                                                type="time"
                                                className={`form-control ${errors?.timing?.morning?.open ? "border-danger" : ""
                                                    }`}
                                                placeholder="morning 10am to 12pm"
                                                {...register("timing.morning.open")}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="">Close</label>
                                            <input
                                                type="time"
                                                className={`form-control ${errors?.timing?.morning?.close ? "border-danger" : ""
                                                    }`}
                                                placeholder="morning 10am to 12pm"
                                                {...register("timing.morning.close")}
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* <label htmlFor="">Evening</label> */}
                                <div className='d-flex flex-column col-md-6 my-2 '>
                                    <div>Evening</div>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div className="col-sm-6 mx-2">
                                            <label htmlFor="#open">Open</label>
                                            <input
                                                type="time"
                                                id="open"
                                                className={`form-control ${errors?.timing?.evening?.open ? "border-danger" : ""
                                                    }`}
                                                placeholder="morning 10am to 12pm"
                                                {...register("timing.evening.open")}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="">Close</label>
                                            <input
                                                type="time"
                                                className={`form-control ${errors?.timing?.evening?.close ? "border-danger" : ""
                                                    }`}
                                                placeholder="morning 10am to 12pm"
                                                {...register("timing.evening.close")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <button
                                    type="button"
                                    style={{ minWidth: "120px" }}
                                    className="btn btn-1 btn-primary mt-4 p-1 px-1 shadow-none"
                                    onClick={() => { userInfo?.organizationId?.organizationType === 'Clinic' ? handleClinicTime() : handleTime() }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                            :
                            <div className="row" style={{ paddingRight: 0 }}>
                                <div className="col">
                                    <label htmlFor="">Days</label>
                                    <select
                                        name="days"
                                        className={`form-control ${errors?.timing?.day ? "border-danger" : ""
                                            }`}
                                        {...register("timing.day")}
                                    >
                                        {days.map((day) => (
                                            <option value={day.value}>{day.day}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col ">
                                    <label htmlFor="#open">Open</label>
                                    <input
                                        type="time"
                                        id="open"
                                        className={`form-control ${errors?.timing?.open ? "border-danger" : ""
                                            }`}
                                        placeholder="morning 10am to 12pm"
                                        {...register("timing.open")}
                                    />
                                </div>
                                <div className="col ">
                                    <label className="">Close</label>
                                    <input
                                        type="time"
                                        className={`form-control ${errors?.timing?.close ? "border-danger" : ""
                                            }`}
                                        placeholder="morning 10am to 12pm"
                                        {...register("timing.close")}
                                    />
                                </div>
                                <div className="col-3">
                                    <button
                                        type="button"
                                        style={{ minWidth: "60px" }}
                                        className="btn btn-1 btn-primary mt-4 p-1 px-1 shadow-none"
                                        onClick={() => handleTime()}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        }
                    </div>}
                    { source === 'addMR' && <button className='btn btn-light btn-md mx-2' onClick={() => setIsOpen(false) }>Cancel</button>}
                    <button className='btn btn-primary btn-md shadow-none' type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}
export default Profile;