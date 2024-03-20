import { Controller, useForm } from 'react-hook-form';
import Select from "react-select"
import ImgUpload from '../Imgupload';
import { useEffect, useState } from 'react';
import { axiosInstance, getAuthHeader } from '../../../constants/utils';
import useToasty from '../../../hooks/toasty';
import { DAYS } from '../../../constants/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const CLiniRegistration2 = ({ source, tab,setTab, organization = {} }) => {
    const { register, handleSubmit, control, formState: { errors }, setError, getValues, setValue, clearErrors } = useForm({ onChange: true })
    const [selectedFile, setSelectedFile] = useState(null);
    const [specializations, setSpecializations] = useState([])
    const [ timing, setTiming ] = useState([]);
    const [ days, setDays ] = useState(DAYS)
    const [services,setServices] =useState([])

    const toasty = useToasty();

    useEffect(() => {
        getAllSpecialization()
        getServices()
    }, [tab])

    const getAllSpecialization = async () => {
        try{
            let {data} = await axiosInstance.get('/common/specializations')
            setSpecializations(data?.specializations)
        } catch(error){
            console.error(error)
        }
    }
    const getServices = async () => {
      try {
        let { data } = await axiosInstance.get("/services");
        setServices(data?.services);
      } catch (error) {
        console.error(error);
      }
    };
    const submit = async ( values ) => {
        try{
            values['_id'] = organization?._id || JSON.parse(localStorage.getItem('RID'))
            values['tab'] = tab
            values['timing'] =  timing

            let formData = new FormData()
            formData.append('data', JSON.stringify(values))
            formData.append('image', selectedFile )

            let header = getAuthHeader()
            header.headers['Content-Type'] = 'multipart/form-data'            
            let { data } = await axiosInstance.post('/common/organization-details', formData, header)

            toasty.success(data?.message)
            setTab('STEP3')
        } catch(error){ console.error(error) }
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

    const handleDelete = (time) => {
        setTiming( old => old.filter( t => t.day !== time.day ))
        setDays( old => ([ DAYS.find( d => d.value === time.day ), ...old].sort((a, b) => a.value - b.value )))
    }  


    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 ">
              <ImgUpload
                source={"clinic"}
                file={(image) => {
                  setSelectedFile(image);
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6 mb-3">
              <label>Specialization of { source === 'Clinic' ? 'Clinic' : 'Hospital'}</label>
              <div className="">
                <Controller
                  control={control}
                  name="specialization"
                  rules={{ required: "Query must be select" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti={true}
                      options={specializations}
                      getOptionLabel={({ name }) => name}
                      getOptionValue={({ id }) => id}
                      className={`form-control p-0 ${
                        errors.specialization ? "border-danger" : ""
                      }`}
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Consultant Fee</label>
              <div className="input-group">
                <input
                  {...register("fee", {
                    required: "Consultation fee is required",
                  })}
                  type="number"
                  className={`form-control ${
                    errors.fee ? "border-danger" : ""
                  }`}
                  placeholder="Ex: 200"
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="">Address</label>
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control ${
                    errors.address ? "border-danger" : ""
                  }`}
                  placeholder="Enter Full Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Services</label>
              <div className="">
                <Controller
                  control={control}
                  name="services"
                  rules={{ required: "Query must be select" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti={true}
                      options={services}
                      getOptionLabel={({ name }) => name}
                      getOptionValue={({ id }) => id}
                      className={`form-control p-0 ${
                        errors.services ? "border-danger" : ""
                      }`}
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
            </div>
            {days?.length > 0 && (
              <div className="row px-2">
                <div className="col-md-12 mb-3">
                  <label className="">Timming</label>
                  {source === "Clinic" ? (
                    <div className="row" style={{ paddingRight: 0 }}>
                      <div className="col-6">
                        <label htmlFor="">Days</label>
                        <select
                          name="days"
                          className={`form-control ${
                            errors?.timing?.day ? "border-danger" : ""
                          }`}
                          {...register("timing.day")}
                        >
                          {days.map((day) => (
                            <option value={day.value}>{day.day}</option>
                          ))}
                        </select>
                      </div>
                      <div className="row">
                        <div className="evening row">
                          <label htmlFor="">Morning</label>
                          <div className="col-sm-3">
                            <label htmlFor="#open">Open</label>
                            <input
                              type="time"
                              id="open"
                              className={`form-control ${
                                errors?.timing?.morning?.open ? "border-danger" : ""
                              }`}
                              placeholder="morning 10am to 12pm"
                              {...register("timing.morning.open")}
                            />
                          </div>
                          <div className="col-sm-3">
                            <label className="">Close</label>
                            <input
                              type="time"
                              className={`form-control ${
                                errors?.timing?.morning?.close ? "border-danger" : ""
                              }`}
                              placeholder="morning 10am to 12pm"
                              {...register("timing.morning.close")}
                            />
                          </div>
                        </div>
                        <div className="evening row">
                          <label htmlFor="">Evening</label>
                          <div className="col-sm-3">
                            <label htmlFor="#open">Open</label>
                            <input
                              type="time"
                              id="open"
                              className={`form-control ${
                                errors?.timing?.evening?.open ? "border-danger" : ""
                              }`}
                              placeholder="morning 10am to 12pm"
                              {...register("timing.evening.open")}
                            />
                          </div>
                          <div className="col-sm-3">
                            <label className="">Close</label>
                            <input
                              type="time"
                              className={`form-control ${
                                errors?.timing?.evening?.close ? "border-danger" : ""
                              }`}
                              placeholder="morning 10am to 12pm"
                              {...register("timing.evening.close")}
                            />
                          </div>
                        </div>
                        <div className="col-1">
                          <button
                            type="button"
                            style={{ minWidth: "60px" }}
                            className="btn btn-1 btn-primary mt-4 p-1 px-1 shadow-none"
                            onClick={() => handleClinicTime()}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row" style={{ paddingRight: 0 }}>
                      <div className="col">
                        <label htmlFor="">Days</label>
                        <select
                          name="days"
                          className={`form-control ${
                            errors?.timing?.day ? "border-danger" : ""
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
                          className={`form-control ${
                            errors?.timing?.open ? "border-danger" : ""
                          }`}
                          placeholder="morning 10am to 12pm"
                          {...register("timing.open")}
                        />
                      </div>
                      <div className="col ">
                        <label className="">Close</label>
                        <input
                          type="time"
                          className={`form-control ${
                            errors?.timing?.close ? "border-danger" : ""
                          }`}
                          placeholder="morning 10am to 12pm"
                          {...register("timing.close")}
                        />
                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          style={{ minWidth: "60px" }}
                          className="btn btn-1 btn-primary mt-4 p-1 px-1 shadow-none"
                          onClick={() => handleTime()}
                        >
                          {" "}
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="px-2">
              {source !== "Clinic" ? <div className="alert alert-danger border-0 p-2 mb-2 mt-4">
                <div className="d-flex justify-content-around">
                  <div>Day</div>
                  <div>Open</div>
                  <div>Close</div>
                  <div>Action</div>
                </div>
              </div> 
              :
              <div className="alert alert-danger border-0 p-2 mb-2 mt-4">
                <div className="d-flex justify-content-around">
                  <div>Day</div>
                    <div>Mor Open</div>
                    <div>Mor close</div>
                    <div>Eve Open</div>
                    <div>Eve Close</div>
                  <div>Action</div>
                </div>
              </div>
              }
              {timing?.length > 0 && source === "Clinic" && 
                timing.map((time) => (
                  <div className="alert alert-secondary border-0 p-2">
                    <div className="d-flex justify-content-around">
                      <div>{time.day}</div>
                      <div>{time.morning.open}</div>
                      <div>{time.morning.close}</div>
                      <div>{time.evening.open}</div>
                      <div>{time.evening.close}</div>
                      <div>
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faTrash}
                          onClick={() =>
                            handleDelete(time)
                          }
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                ))}
                {timing?.length > 0 && source !== "Clinic" && 
                timing.map((time) => (
                  <div className="alert alert-secondary border-0 p-2">
                    <div className="d-flex justify-content-around">
                      <div>{time.day}</div>
                      <div>{time.open}</div>
                      <div>{time.close}</div>
                      <div>
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faTrash}
                          onClick={() =>
                            handleDelete(time)
                          }
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary shadow-none mx-2">
            Save
          </button>
        </div>
      </form>
    );
}
export default CLiniRegistration2;