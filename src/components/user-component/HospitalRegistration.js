import React, { useEffect, useState } from 'react';
import DoctorRegistration from '../common-components/registration/DoctorRegistration';
import ClinicRegistartion2 from '../common-components/registration/ClinicRegistration2';
import DealRegistration from '../common-components/registration/DealRegistration';
import DepartmentRegistration from '../common-components/registration/DepartmentRegistration';
import useToasty from '../../hooks/toasty';
import { NumberFormat, axiosInstance, getAuthHeader, userInfo } from '../../constants/utils';
import { useForm } from 'react-hook-form';

const HospitalRegistartion = () => {
  const [tab, setTab] = useState("STEP1")
  const [organization, setOrganization] = useState({})
  const RID = JSON.parse(localStorage.getItem('RID')) || null

  const { register, handleSubmit, formState: { errors }, reset, } = useForm({ onChange: true })
  const toasty = useToasty()

  useEffect(() => {
    if (RID) getOrganization()
  }, [])

  const getOrganization = async () => {
    try {
      let { data } = await axiosInstance.get('/common/organization', { params: { RID }, ...getAuthHeader() })

      setOrganization(data?.organization)
      let tabData = data?.organization?.tab

      if (data?.organization?.organizationType !== 'Hospital') return

      if (tabData?.step === 'STEP1' && tabData?.isComplete) setTab('STEP2')
      else if (tabData?.step === 'STEP2' && tabData?.isComplete) setTab('STEP3')
      else setTab(tabData?.step || 'FINAL')

    } catch (error) {
      console.error(error)
      toasty.error(error?.message)
    }
  }


  const submit = async (formData) => {
    try {
      formData['tab'] = tab

      let { data } = await axiosInstance.post('/common/create-hospital', formData)
      if (data?.organization) {
        reset({})
        setTab('STEP2')
        localStorage.setItem('RID', JSON.stringify(data?.organization?._id))
        toasty.success(data?.message)
      } else {
        toasty.error(data.message)
      }
    } catch (error) {
      toasty.error(error?.message)
      console.log(error)
    }
  }

  const exit = () => {
    localStorage.removeItem('RID')
    setTab('STEP1')
  }


  return (
    <div>
      <div className="ms-panel-body">
        <div className="ms-form-wizard style1-wizard wizard form-content" role="application">
          <div className="steps  " >
            <ul role="tablist" >
              <li style={{ marginTop: "15px" }} role="tab" className={`${tab === "STEP1" ? "current" : "disabled"} cursor-pointer`} aria-disabled="false" aria-selected="False"><span className="current-info audible tabName ">Registration </span></li>
              <li style={{ marginTop: "15px" }} role="tab" className={`${tab === "STEP2" ? "current" : "disabled"} cursor-pointer`} aria-disabled="true"> <span className='tabName'>Details</span> </li>
              <li style={{ marginTop: "15px" }} role="tab" className={`${tab === "STEP3" ? "current" : "disabled"} cursor-pointer`} aria-disabled="true"><span className='tabName'>Deartments</span></li>
              <li style={{ marginTop: "15px" }} role="tab" className={`${tab === "STEP4" ? "current" : "disabled"} cursor-pointer`} aria-disabled="true"><span className='tabName'>Doctors</span></li>
              {/* <li style={{ marginTop: "15px" }} role="tab" className={`${tab === "FINAL" ? "current" : "disabled"} cursor-pointer`} aria-disabled="true"><span className='tabName'>Final</span></li> */}
            </ul>
          </div>
          { tab !== 'STEP1' && <div className='d-flex justify-content-end mb-2'>
            <div>
              <button className='btn btn-primary btn-md shadow-none' onClick={() => exit()}>Exit</button>
            </div>
          </div>}
          <div className="content ">
            <h3 id="default-wizard-h-0" tabIndex={-1} className="title current">Registration</h3>
            {tab === "STEP1" && <>
              <form onSubmit={handleSubmit(submit)}>
                <div className="ms-wizard-step body current" id="default-wizard-p-0" role="tabpanel" aria-labelledby="default-wizard-h-0" aria-hidden="false">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className=''>Hospital Name</label>
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
                      <label className=''>Hospital Registration No.</label>
                      <div className="input-group">
                        <input type="text"
                          className={`form-control ${errors?.registration ? 'border-danger' : ''}`}
                          placeholder="Enter registration number"
                          {...register('registration', {
                            required: 'Registration number is required'
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className=''>Phone Number</label>
                      <div className="input-group">
                        <input type="text"
                          maxLength={10}
                          name='phone number'
                          className={`form-control ${errors?.phone ? 'border-danger' : ''}`}
                          placeholder="Enter Phone Number"
                          onInput={(e) => NumberFormat(e)}
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
                  </div>
                </div>
                <button className='btn btn-primary btn-md shadow-none' type='submit'>Save</button>
              </form>
            </>}
            {tab === "STEP2" && <ClinicRegistartion2 source={'Hospital'} tab={tab} setTab={setTab} />}
            {tab === "STEP3" && <DepartmentRegistration source={'Hospital'} tab={tab} setTab={setTab} />}
            {tab === "STEP4" && <DoctorRegistration source={'Hospital'} tab={tab} setTab={setTab} organization={organization} />}
            {/* {tab === "FINAL" && <DealRegistration source={'Hospital'} tab={tab} setTab={setTab} />} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalRegistartion;