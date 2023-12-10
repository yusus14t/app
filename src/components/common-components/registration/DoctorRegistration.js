import React, {  useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumberFormat, axiosInstance, getAuthHeader, getFullPath, userInfo } from '../../../constants/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import ImgUpload from '../Imgupload';
import Select from "react-select";
import useToasty from '../../../hooks/toasty';


const DoctorRegistration = ({ tab, setTab, organization = {}, source='', setModal = () => {}, refresh = () => {} }) => {
  const { register, handleSubmit, reset, formState: { errors }, control, watch } = useForm({ onChange: true })

  const [doctors, setDoctors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null)
  const [editImage, setEditImage] = useState(null)
  const [specialization, setSpecialization] = useState([])
  const [departments, setDepartments] = useState([]);
  const RID = JSON.parse(localStorage.getItem('RID'))

  const toasty = useToasty()

  useEffect(() => {

    getDoctorsInOrganization()
    getDepartments()

    if( ['modal'].includes(source) ){
      getAllSpecialization()
    } else {
      getClinicSpecialization()
    }
  }, [])

  const getClinicSpecialization = async () => {
    try{
      let { data } = await axiosInstance.get(`/hospital/clinic-specialization/${RID}`)
      setSpecialization(data?.specializations)
    } catch(error){ console.error(error) }
  }

  const getAllSpecialization = async () => {
    try{
        let {data} = await axiosInstance.get('/doctor/hospital-specialization')
        setSpecialization(data?.specialization)
    } catch(error){
        console.error(error)
    }
  }

  
  const getDepartments = async () => {
    try {
        let { data } = await axiosInstance.get('/doctor/departments', { params: { organizationId: RID }, ...getAuthHeader() })
        let dep = data?.organizations?.map( de => ({ name: de?.organizationId?.name, _id: de?.organizationId?._id, id: de?.organizationId?.specialization[0]?.id || null }))
        setDepartments(dep)

    } catch(error) { console.error(error) }
}


  const getDoctorsInOrganization = async () => {
    try {
      let { data } = await axiosInstance.get('/doctor/doctorsInOrganization', { params: { organizationId: RID }, ...getAuthHeader()})
      setDoctors(data?.doctors)
    } catch(error){ 
      console.error(error)
      toasty.error(error)
    }
  }

  const submit = async (values) => {
    try {      

      if(!values?._id){
        values['organizationId'] = source === 'Hospital' || userInfo.userType === 'HL'? values.department?._id : (RID || userInfo.organizationId)
        values['tab'] = tab
      }
      
      let formData = new FormData()
      formData.append('data', JSON.stringify(values))
      formData.append('image', selectedImage)
      
      let response = null
      if(values?._id){
        formData['source'] = 'organization'
        response = await axiosInstance.post('/doctor/edit-doctor', formData)

        setDoctors( prev => prev.map( old => {
          if( old._id.toString() === response?.data?.doctor?._id ) old = response?.data?.doctor
          return old
        }))

      } else {
        response = await axiosInstance.post('/doctor/create-doctor', formData )
        
        let data = response?.data
        let doctorObj = {
          name: data?.doctor?.name,
          email: data?.doctor?.email,
          phone: data?.doctor?.phone,
          qualification: data?.doctor?.qualification,
          experience: data?.doctor?.experience,
          specialization: data?.doctor?.specialization,
          address: data?.doctor?.address,
          photo: data?.doctor?.photo,
        }
        
        setDoctors([...doctors, doctorObj ])
        setModal(false)
        refresh()
      }

      setEditImage(null)
      reset({ name: null, email: null, qualification: null, experience: null, specialization: null, address: null, phone: null })
      toasty.success(response?.data?.message)
    } catch (error) { 
      console.log(error)
      toasty.error(error?.message)
    }

  }

  const handleDelete = async (_id) => {
    try {
      let { data } = await axiosInstance.post('/doctor/delete-doctor', {_id})
      setDoctors(old => old.filter(d => d._id !== _id))
      toasty.success(data?.message)
    } catch(error){
      console.error(error)
      toasty.error(error?.message)
    }
  }

  const handleNext = () => {
    if( !doctors.length ) {
      toasty.error('Atleast one doctor created')
      return
    }

    setTab('FINAL')
  }
const Finish = () => {
  localStorage.removeItem("RID");
  window.location.reload();
};
  const handleEdit = (doctor) => {
    setEditImage(getFullPath(doctor?.photo))
    reset(doctor)
  }


  return (
    <div className='row'>
      { !['modal'].includes(source)  && doctors.map(doc => <div className="col-md-4 col-sm-6 mb-3">
        <div class="ms-card card-gradient-dark ms-infographics-widget ms-widget">
          <div class="ms-card-body">
            <div class="media fs-14" style={{ marginBottom: "0" }}>

              <div class="me-2 align-self-center">
                <img src={getFullPath(doc.photo)} class="ms-img-curved" alt="people" />
              </div>
              <div class="media-body">
                <div className='d-flex justify-content-between'>
                  <div>
                    <h6>{doc.name}</h6>
                  </div>
                  <div>
                    <FontAwesomeIcon className='ms-text-ligth mx-3 cursor-pointer' icon={faPencil} onClick={() => handleEdit(doc)} />
                    <FontAwesomeIcon className='ms-text-ligth cursor-pointer' icon={faTrash} onClick={() => handleDelete(doc._id)} />
                  </div>
                </div>
                <span className='text-light' style={{ fontSize: 'x-small'}}>{doc?.specialization?.name || 'Specialization'}</span>
                <br />
                <span className='text-light' style={{ fontSize: 'x-small'}}>{doc?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <form className="ms-form-wizard style1-wizard wizard form-content" onSubmit={handleSubmit(submit)} role="application">
        <div >
          <ImgUpload source={"doctor"} file={(image) => setSelectedImage(image)} editImage={editImage} />
          <div className="row mt-2">
            <div className="col-6 mb-3">
              <label >Doctor Name</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.name ? 'border-danger' : ''}`}
                  placeholder="Enter Full Name"
                  {...register(`name`, {
                    required: 'First name is required'
                  })}
                />
              </div>
            </div>
            <div className="col-6 mb-3">
              <label className=''>Phone Number</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.phone ? 'border-danger' : ''}`}
                  placeholder="Enter Phone"
                  maxLength={10}
                  onInput={(e) => NumberFormat(e)}
                  {...register(`phone`, {
                    required: 'Phone is required'
                  })}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label >Email ID</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.email ? 'border-danger' : ''}`}
                  placeholder="Enter Email Address"
                  {...register(`email`, {
                    required: 'Email is required'
                  })}
                />
              </div>
            </div>
            
            <div className="col-6 mb-3">
              <label >Qualifications</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.qualification ? 'border-danger' : ''}`}
                  placeholder="Enter Qualifications"
                  {...register(`qualification`, {
                    required: 'Qualification is required'
                  })}
                />
              </div>
            </div>
            <div className="col-6 mb-3">
              <label >Experience</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.experience ? 'border-danger' : ''}`}
                  placeholder="Enter Experience"
                  {...register(`experience`, {
                    required: 'Experience is required'
                  })}
                />
              </div>
            </div>
            {(source === 'Hospital' || userInfo.userType === 'HL') &&
              <div className="col-6 mb-3">
                <label >Select Department</label>
                <div className="">
                  <Controller
                    control={control}
                    name="department"
                    rules={{ required: 'Query must be select' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti={false}
                        options={departments}
                        getOptionLabel={({ name }) => name}
                        getOptionValue={({ _id }) => _id}
                        className={`form-control p-0 ${errors.specialization ? 'border-danger' : ''}`}
                        classNamePrefix="select"
                      />
                    )}
                  />
                </div>
              </div>}
            <div className="col-md-6 mb-3">
              <label >Select Specialization</label>
              <div className="">
                <Controller
                  control={control}
                  name="specialization"
                  rules={{ required: 'Query must be select' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti={false}
                      options={source === 'Hospital' || userInfo.userType === 'HL' ? specialization.filter( a => a.id === watch('department')?.id ) : specialization}
                      getOptionLabel={({ name }) => name}
                      getOptionValue={({ id }) => id}
                      className={`form-control p-0 ${errors.specialization ? 'border-danger' : ''}`}
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
            </div>

        
            <div className="col-md-6 mb-3">
              <label className=''>Address</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${errors.address ? 'border-danger' : ''}`}
                  placeholder="Enter Address"
                  {...register(`address`, {
                    required: 'Address is required'
                  })}
                />
              </div>
            </div>
            <div className="actions btn-submit mb-2">
              <button type="submit" className="btn btn-primary shadow-none mx-2" >Save Doctor</button>
                          <button onClick={Finish} className="btn btn-primary btn-md">Finish</button>

            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default DoctorRegistration;