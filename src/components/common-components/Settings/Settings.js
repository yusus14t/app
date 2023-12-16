import React, { useEffect, useRef, useState } from "react";
import { axiosInstance, getAuthHeader, getFullPath } from "../../../constants/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import Profile from "./Profile";
import CreatableSelect from 'react-select/creatable';
import useToasty from "../../../hooks/toasty";
import Website from "./Website";
import { SERVICES } from "../../../constants/constant";
import logo from '../../../assets/img/logo/logo.jpg'
import { toPng } from 'html-to-image'
import phone from "../../../assets/img/icons/icons8-phonecall-96.png";
import whatsapp from "../../../assets/img/icons/icons8-whatsapp-96.png";
import email from "../../../assets/img/icons/icons8-email-96.png";
import twitter from "../../../assets/img/icons/icons8-twitter-100.png";
import Payment from "./Payment";
import { SETTING_TABS } from "../../../constants/constant";

const Settings = () => {
  const  userInfo = JSON.parse(localStorage.getItem('user'))
  const [tab, setTab] = useState(['HL', 'CL'].includes(userInfo.userType) ? 'SPECIALIZATION' : (['SA', 'AD'].includes(userInfo.userType) ? 'WEBSITE'  : 'PROFILE' ))
  const [isOpen, setIsOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isTimming,setTimming] = useState(false)
  const [specialization, setSpecialization] = useState({ name: null, error: null })
  const [specializations, setSpecializations] = useState([])
  const [allSpecializations, setAllSpecializations] = useState([])

  const [services, setServices] = useState([]);
  const [organizationServices, setOrganizationServices] = useState([]);
  const [isEdit, setIsEdit ] = useState({ open: false, type: null, value: null })
  const [hospitalName, setHospitalName] = useState('')
  const [ contact, setContact ] = useState({})
  const [ customSpecialization, setCustomSpecialization ] = useState(null);
  const [customServices, setCustomServices] = useState(null);

  const QRCodeRef = useRef(null)
  const inputRef = useRef(null)
  const toasty = useToasty()

  useEffect(() => {
    if (['SPECIALIZATION', "CUSTOM_SPECIALIZATION"].includes(tab)) getAllSpecialization()
    else if( tab === 'CONTACT' ) getContact()
    else if( ['SERVICES', 'CUSTOM_SERVICES'].includes(tab) ){
      if( ['SA', 'AD'].includes(userInfo.userType)) getAllServices()
      else getServices()
    }

    if( userInfo.userType === 'DP' ) getHospitalName()
    
  }, [tab,])

  useEffect(() => {
    getAllCommonSpecialization()
  }, [isOpen])

  const getHospitalName = async () => {
    try{
      let { data } = await axiosInstance.get('/hospital/hospital-name')
      setHospitalName(data?.hospitalName)
    }catch(error){ console.error(error) }
  }

   const getAllServices = async () => {
     try {
       let { data } = await axiosInstance.get("/services");
       setOrganizationServices(data?.services);
     } catch (error) {
       console.error(error);
     }
   };
  const getServices = async () => {
    try{ 
      let { data } = await axiosInstance.get('/hospital/services')
      setOrganizationServices(data?.services)
    }catch(error){ console.error(error) }
  }


  const getAllSpecialization = async () => {
    try {
      let { data } = await axiosInstance.get('/doctor/hospital-specialization', { params: { source: 'setting' }, ...getAuthHeader()})
      setSpecializations(data?.specialization)
    } catch (error) {
      console.error(error)
    }
  }

  const getAllCommonSpecialization = async () => {
    try {
      let { data } = await axiosInstance.get('/common/specializations')
      setAllSpecializations(data?.specializations.map(sp => ({ label: sp.name, value: sp.id })))
    } catch (error) {
      console.error(error)
    }
  }


  const submitSpecialization = async (value) => {
    try {
      if (!value.length) {
        setSpecialization({ ...specialization, error: 'Specialization name is required.' })
        return
      }
      let { data } = await axiosInstance.post('/doctor/specialization', { specializations: value }, getAuthHeader())

      if (!data.specializations?.length) {
        toasty.error('Oops! They have already in your list')
        setIsOpen(false)
        return
      }

      setSpecializations([...specializations, ...data?.specializations])
      setIsOpen(false)
      toasty.success(data?.message)

    } catch (error) { console.error(error) }
  }

  const download = () => {
    toPng( QRCodeRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "QRCode.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const submitServices = async (value) => {
    try {
      if (!value.length) return

      let { data } = await axiosInstance.post('/hospital/services', { services: value }, getAuthHeader())

      if (!data.services?.length) {
        toasty.error('Oops! They have already in your list')
        setIsServiceOpen(false)
        return
      }

      setOrganizationServices( old => [...old, ...data?.services])
      setIsServiceOpen(false)
      toasty.success(data?.message)

    } catch (error) { console.error(error) }
  }

  const deleteService = async ( id ) => {
    try {
      await axiosInstance.delete(`/hospital/service/${ id }`)
      setOrganizationServices( old => old.filter( service => service.id !== id))
      toasty.success('Successfully service deleted')
    } catch(error){ console.error(error) }
  }

  const deleteSpecialization = async ( id ) => {
    try {
      await axiosInstance.delete(`/hospital/specialization/${ id }`)
      setSpecializations( old => old.filter( specialization => specialization.id !== id))
      toasty.success('Successfully specialization deleted')
    } catch(error){ console.error(error) }
  }

  const edit = ( type, old_value ) => {
    setIsEdit({ ...isEdit, open: true, type })
    setTimeout(() => {
      inputRef.current.value = old_value
    }, 500)
  }
  
  const save = async () => {
    try{
      await axiosInstance.post(`/super-admin/website/CONTACT_INFO`, isEdit, getAuthHeader())
      getContact()
      setIsEdit({ open: false })
    }catch(error){ console.error(error) }
  }

  const getContact = async () => {
    try{
      let {data} = await axiosInstance.get('/website/CONTACT_INFO')
      setContact(data?.contact?.data)
    } catch(error){ console.error(error) }
  }

  const createCustomSpecialization = async () => {
    try{
      await axiosInstance.post('/super-admin/create-specialization', { customSpecialization }, getAuthHeader())
      toasty.success('Sucessfully created')
      setCustomSpecialization('')
      setSpecializations( old => [...old, { id: customSpecialization.toUpperCase(), name: customSpecialization }])
    }catch(error){ console.log(error) }
  }

  const deleteCustomSpecialization = async ( id ) => {
    try{
      await axiosInstance.delete(`/super-admin/specialization/${id}`, getAuthHeader())
      setSpecializations( old => old.filter( spe => spe.id !== id ))
      toasty.success('Successfully deleted')
    }catch(error){ console.log(error) }
  }

  const createCustomService = async () => {
    try{
      await axiosInstance.post('/super-admin/create-service', { customServices }, getAuthHeader())
      toasty.success('Sucessfully created')
      setCustomServices('')
      setOrganizationServices( old => [...old, { id: customServices.toUpperCase(), name: customServices }])
    }catch(error){ console.log(error) }
  }

   const deleteCustomService = async ( id ) => {
    try{
      await axiosInstance.delete(`/super-admin/service/${id}`, getAuthHeader())
      setOrganizationServices((old) => old.filter((ser) => ser.id !== id));
      toasty.success('Successfully deleted')
    }catch(error){ console.log(error) }
  }


  return (
    <div className="ms-content-wrapper">
      <div className="row mr-0">
        <div className="col-xl-12 col-md-12">
          <div className="ms-panel mb-0 pb-2">
            <div className="ms-panel-header ms-panel-custome">
              <div style={{ display: "flex", overflow: "auto"}}>
                {SETTING_TABS.filter( tab => tab.access.includes(userInfo.userType)).map(( stab, key ) => <span className={`btn btn-md mx-3 ${ tab === stab.id ? 'btn-light' : 'btn-info' }`} key={key} onClick={() => setTab(stab.id)}>{ stab.name }</span> )}
              </div>
            </div>
            <div className="ms-panel-body p-0 overflow-auto" style={{ height: '78vh' }}>
              {tab === "SPECIALIZATION" && (
                <>
                  <div className="d-flex justify-content-between p-3">
                    <div>
                      <h4>Specialization</h4>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-md shadow-none"
                        onClick={() => setIsOpen(true)}
                      >
                        Add Specialization
                      </button>
                    </div>
                  </div>
                  <div className="ms-panel-body py-0 ">
                    <div className="table-responsive">
                      <table className="table table-hover  thead-primary">
                        <thead style={{ backgroundColor: "#A2A2A252" }}>
                          <tr>
                            <th scope="col" style={{ color: "#000" }}>
                              Id
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Name
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {specializations?.length > 0 &&
                            specializations.map((specialization) => (
                              <tr>
                                <td className="ms-table-f-w">
                                  {specialization.id}
                                </td>
                                <td>{specialization.name}</td>
                                <td>
                                  <FontAwesomeIcon
                                    style={{ marginLeft: "8px" }}
                                    className="cursor-pointer"
                                    icon={faTrash}
                                    onClick={() =>
                                      deleteSpecialization(specialization.id)
                                    }
                                  ></FontAwesomeIcon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {tab === "SERVICES" && (
                <>
                  <div className="d-flex justify-content-between p-3">
                    <div>
                      <h4>Services</h4>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-md shadow-none"
                        onClick={() => setIsServiceOpen(true)}
                      >
                        Add Services
                      </button>
                    </div>
                  </div>
                  <div class="ms-panel-body py-0 ">
                    <div class="table-responsive">
                      <table class="table table-hover  thead-primary">
                        <thead style={{ backgroundColor: "#A2A2A252" }}>
                          <tr>
                            <th scope="col" style={{ color: "#000" }}>
                              Id
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Name
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {organizationServices?.length > 0 &&
                            organizationServices.map((service) => (
                              <tr>
                                <td class="ms-table-f-w">{service.id}</td>
                                <td>{service.name}</td>
                                <td>
                                  <FontAwesomeIcon
                                    style={{ marginLeft: "8px" }}
                                    className="cursor-pointer"
                                    onClick={() => deleteService(service.id)}
                                    icon={faTrash}
                                  ></FontAwesomeIcon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {tab === "PROFILE" && <Profile />}
              {tab === "WEBSITE" && <Website />}
              {tab === "QRCODE" && (
                <div>
                  <div style={{ marginLeft: "auto", display:'flex', justifyContent:'center' }} className=""  >
                    <div style={{ display:'flex', flexDirection:'column'}}>
                      <div style={{ width: "500px", border: "2px solid black",  background:'#fff', marginTop:"20px" }} ref={QRCodeRef}>
                        <div style={{ display: "flex", marginTop:'10px', alignItems:'center' }}>
                          <img
                            style={{ width: "200px", padding: "0px 20px 0 50px" }}
                            src={logo}
                            alt=""
                          />
                          <h4 style={{ textAlign: "center" }}>{hospitalName ? hospitalName : userInfo?.organizationId?.name }</h4>
                        </div>
                        {hospitalName && <p className="text-center">({ userInfo?.organizationId?.name})</p>}
                        <hr />
                        <div style={{ margin: "auto", width: "430px", height: "400px" }}>
                          <h5 style={{ textAlign: "center" }}>
                            Scan QR code to book Appointment
                          </h5>
                          <img
                            src={ getFullPath(userInfo?.organizationId?.qrCode) }
                            style={{ width: "400px", height: "400px" }}
                            alt=""
                          />
                        </div>
                        <p style={{textAlign: "center"}}>Or visit Doctortime.in</p>
                        <div style={{ marginTop: "30px", marginBottom:"30px" }}>
                          <p style={{ textAlign: "center"}}>
                            Don't Waste Your Time Be Samart.
                            <br />
                            Come Here Just Before Your Turn.
                            <br />
                            Book Appointment from Doctor Time and Track Live Appointment
                            Number
                          </p>
                        </div>
                      </div>
                      <div style={{ display:'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: "3rem"}}>
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              download()
                            }
                          >
                            Download QR Code
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tab === "CONTACT" && (
                <>
                  <div className="d-flex justify-content-between p-3">
                    <div>
                      <h4>Contact Info</h4>
                    </div>
                  </div>
                  <div className="">
                    { isEdit.open && <div className="col-md-6 m-3">
                      <label className=''>{ isEdit.type }</label>
                      <div className="input-group">
                        <input type="text"
                          ref={inputRef}
                          className={`form-control w-100 my-1`}
                          placeholder={isEdit.type}
                          onChange={(e) => setIsEdit({ ...isEdit, value: e.target.value })}
                        />
                        <button className="btn btn-primary btn-sm shadow-none mx-2 py-3 my-1 rounded" onClick={() => save()}> Save </button>
                        <button className="btn btn-light btn-sm shadow-none py-3 my-1 rounded" onClick={() => setIsEdit({ })}> Cancel </button>
                      </div>
                    </div>}
                    <div className="d-flex flex-wrap">
                          <div className="col-md-3 contact-list-item mx-2 mb-3 d-flex flex-row justify-content-around align-items-center w-100">
                            <div className="contact-icon-container contact-kk ">
                              <img className="contact-icons" src={phone} alt="" />
                            </div>
                            {contact?.phone}
                            <FontAwesomeIcon className=' cursor-pointer' icon={faEdit} onClick={() => edit('phone', contact?.phone)} />

                          </div>
                          <div className=" col-md-3 contact-list-item mx-2 mb-3 d-flex flex-row justify-content-around align-items-center w-100">
                            <div className="contact-icon-container contact-kk">
                              <img className="contact-icons" src={whatsapp} alt=""  />
                            </div>
                            {contact?.whatsapp}
                            <FontAwesomeIcon className=' cursor-pointer' icon={faEdit} onClick={() => edit('whatsapp', contact?.whatsapp)}  />

                          </div>
                          <div className="col-md-3 contact-list-item mx-2 mb-3 d-flex flex-row justify-content-around align-items-center w-100">
                            <div className="contact-icon-container contact-kk">
                              <img className="contact-icons " src={email} alt="" />
                            </div>
                            {contact?.email}
                            <FontAwesomeIcon className=' cursor-pointer' icon={faEdit} onClick={() => edit('email', contact?.email)} />

                          </div>
                          <div className="col-md-3 contact-list-item mx-2 mb-3 d-flex flex-row justify-content-around ml-5 align-items-center w-100">
                            <div className="contact-icon-container contact-kk">
                              <img src={twitter} className="contact-icons" alt="" />
                            </div>
                            @{contact?.twitter}
                            <FontAwesomeIcon className=' cursor-pointer' icon={faEdit} onClick={() => edit('twitter', contact?.twitter)} />

                          </div>
                    </div>
                  </div>
                </>
              )}
              {tab === "PAYMENT" && <Payment />}
              { tab === "CUSTOM_SPECIALIZATION" &&    <>
                  <div className="row m-2">
                    <div className="col-md-8 col-sm-12">
                      <h4>Specialization</h4>
                    </div>
                    <div className="col-md-4 col-sm-8">
                      <div className="d-flex">
                        <input className="form-control" placeholder="Custom Specialization" value={customSpecialization} onChange={(e) => setCustomSpecialization(e.target.value)} />
                        <button className="btn btn-primary shadow-none btn-md mx-3" onClick={() => createCustomSpecialization()}>Save</button>
                      </div>
                    </div>
                  </div>
                  <div className="ms-panel-body py-0 ">
                    <div className="table-responsive">
                      <table className="table table-hover  thead-primary">
                        <thead style={{ backgroundColor: "#A2A2A252" }}>
                          <tr>
                            <th scope="col" style={{ color: "#000" }}>
                              Id
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Name
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {specializations?.length > 0 &&
                            specializations.map((specialization) => (
                              <tr>
                                <td className="ms-table-f-w">
                                  {specialization.id}
                                </td>
                                <td>{specialization.name}</td>
                                <td>
                                  <FontAwesomeIcon
                                    style={{ marginLeft: "8px" }}
                                    className="cursor-pointer"
                                    icon={faTrash}
                                    onClick={() =>
                                      deleteCustomSpecialization(specialization.id)
                                    }
                                  ></FontAwesomeIcon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>}
              { tab === "CUSTOM_SERVICES" &&    <>
                  <div className="row m-2">
                    <div className="col-md-8 col-sm-12">
                      <h4>Service</h4>
                    </div>
                    <div className="col-md-4 col-sm-8">
                      <div className="d-flex">
                        <input className="form-control" placeholder="Custom Service" value={customServices} onChange={(e) => setCustomServices(e.target.value)} />
                        <button className="btn btn-primary shadow-none btn-md mx-3" onClick={() => createCustomService()}>Save</button>
                      </div>
                    </div>
                  </div>
                  <div className="ms-panel-body py-0 ">
                    <div className="table-responsive">
                      <table className="table table-hover  thead-primary">
                        <thead style={{ backgroundColor: "#A2A2A252" }}>
                          <tr>
                            <th scope="col" style={{ color: "#000" }}>
                              Id
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Name
                            </th>
                            <th scope="col" style={{ color: "#000" }}>
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {organizationServices?.length > 0 &&
                            organizationServices.map((service) => (
                              <tr>
                                <td className="ms-table-f-w">
                                  {service.id}
                                </td>
                                <td>{service.name}</td>
                                <td>
                                  <FontAwesomeIcon
                                    style={{ marginLeft: "8px" }}
                                    className="cursor-pointer"
                                    icon={faTrash}
                                    onClick={() =>
                                      deleteCustomService(service.id)
                                    }
                                  ></FontAwesomeIcon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Add Specialization"}
          data={specialization}
          callback={(data) => {
            submitSpecialization(data);
          }}
        >
          <div className="row">
            <div className="col-12">
              <label>Name of Specialization</label>
              <div className="">
                <CreatableSelect
                  isMulti={true}
                  options={allSpecializations}
                  onChange={(e) => {
                    setSpecialization(e);
                  }}
                  className={`form-control p-0`}
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isServiceOpen && (
        <Modal
          isOpen={isServiceOpen}
          setIsOpen={setIsServiceOpen}
          title={"Add Services"}
          data={services}
          callback={(data) => {
            submitServices(data);
          }}
        >
          <div className="row">
            <div className="col-12">
              <label>Name of Services</label>
              <div className="">
                <CreatableSelect
                  isMulti={true}
                  getOptionLabel={({ name }) => name}
                  getOptionValue={({ id }) => id}
                  options={SERVICES}
                  onChange={(e) => {
                    setServices(e);
                    return e;
                  }}
                  className={`form-control p-0`}
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isTimming && (
        <Modal
          isOpen={isTimming}
          setIsOpen={setTimming}
          title={"Add Timming"}
         
        >
          <span>lkhbkhblkljk</span>
        </Modal>
      )}
    </div>
  );
}

export default Settings