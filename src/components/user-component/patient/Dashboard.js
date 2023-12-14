import React, { useEffect, useState, useRef } from "react";
import NO_PHOTO from "../../../assets/images/no-photo.png";
import { NumberFormat, axiosInstance, formatPhone, getAuthHeader, getFullPath, updateUser } from "../../../constants/utils";
import Modal from "../../common-components/Modal";
import { useForm } from "react-hook-form";
import ImgUpload from "../../common-components/Imgupload";
import useToasty from '../../../hooks/toasty';
import { toPng, toBlob } from 'html-to-image'
import logo from "../../../assets/img/logo/logo.jpg"
import Container from "../../../layout/Container";
const Dashbaord = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [appointments, setAppointments] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ onChangr: true })
  const toasty = useToasty()
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false)
  const appointmentCarRef = useRef(null)
  const [ appointment, setAppointment ] = useState({});
  const [isLinkCopy, setIsLinkCopy ] = useState(false)

  useEffect(() => {
    getAllAppointments()
    reset({ ...userInfo })
  }, [])

  const getAllAppointments = async () => {
    try {
      let { data } = await axiosInstance.get('/common/patient-appointments', { params: { isToday: true }, ...getAuthHeader()})
      setAppointments(data?.appointments)
    } catch (error) { console.error(error) }
  }

  const submit = async ( values ) => {
    try {
      let formData = new FormData()
      formData.append('data', JSON.stringify(values))
      formData.append('image', selectedFile)

      let header = getAuthHeader()
      header.headers['Content-Type'] = 'multipart/form-data'

      let response = await axiosInstance.post('/hospital/edit-profile', formData, header)

      await updateUser()
      toasty.success(response?.data?.message)
      setIsOpen(false)
    } catch (error) { console.error(error) }
  }

  const share = async ( appointment ) => {
    try{
      let blobData = await toBlob(appointmentCarRef.current, { cacheBust: false })

      let file = new File( [blobData], 'appointment-card.png', {type: "image/png"})
      let formData = new FormData()
      formData.append( 'file', file )
      let { data } = await axiosInstance.post('/common/upload-file', formData, { _id: appointment._id }, getAuthHeader())

      navigator.clipboard.writeText(getFullPath(data.pathname))
        .then(()=> {
         toasty.success('Link Copied.')
         setIsLinkCopy(true)
        })
        .catch((error) => console.log(error))

      await navigator.share({
        file,
        title: 'Appointment Card',
        text: `Your appointment scheduled on ${ appointment?.departmentId?.name }. The appointment will check on the https://doctortime.in .`
      })
    

    } catch(error){ console.error(error) }
  }

  const htmlToImageConvert = () => {
    toPng(appointmentCarRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "appointment-card.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const payment = async ( _id ) => {
    try{
      let { data } = await axiosInstance.post('/payment', { _id, type: 'appointment' }, getAuthHeader())
      if( data.redirectUrl ) window.location.href = data.redirectUrl
      
    } catch(error){ console.log(error)}
  }

  return (
    <Container>
      <div style={{ background: "#f2f2f2" }} className="">
      <div className="pdash">
        <div className="pdash-left d-flex justify-content-center">
          <div className="patient-profile-container ">
            <div style={{ width: "100%" }} className="mt-3 p-2 ">
              <img className="patient-profile-pic " src={userInfo?.photo ? getFullPath( userInfo?.photo ) :  NO_PHOTO} alt="" />
              <div className="mt-3 ">
                <h6 className="p-2 m-0">
                  <h6 className="m-0 text-secondary">
                    Full Name : <span className="text-dark m-0 d-inline-block pb-2"> {userInfo?.name} </span>
                  </h6>
                </h6>
                <h6 className="p-2 mb-0 text-secondary">
                  Guardian Name : <span className="text-dark m-0 d-inline-block pb-2"> {userInfo?.gardianName || '-'} </span>
                </h6>
                <h6 className="p-2 m-0 text-secondary">
                  Mobile No : <span className="text-dark m-0 d-inline-block pb-2"> +91{formatPhone(userInfo.phone)} </span>
                </h6>
                <h6 className="p-2 m-0 text-secondary">
                  Email : <span className="text-dark m-0 d-inline-block pb-2"> { userInfo?.email || '-'} </span>
                </h6>
                <h6 className="p-2 m-0 text-secondary">
                  Age : <span className="text-dark m-0 d-inline-block pb-2">{userInfo?.age || '-'} </span>
                </h6>
                <h6 className="p-2 m-0 text-secondary">
                  Gender : <span className="text-dark m-0 d-inline-block pb-2">{userInfo?.gender || '-'} </span>
                </h6>
                <h6 className="p-2 m-0 text-secondary">
                  Address :  <span className="text-dark m-0 d-inline-block pb-2">{userInfo?.address || '-'} </span>
                </h6>
              </div>
              <button className="btn btn-primary w-100 mt-1 rounded shadow-none" onClick={() => setIsOpen(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="pdash-right ">
          <div className="">
            <h5 className="position-fix bg-primary w-100 text-light p-2 mb-0">
              Appoinment List
            </h5>
          </div>
          <div className="pdash-appointment-list ">
            <div className="apt-card d-flex p-2 justify-content-around " >
              <div className="d-flex align-items-center">
                <h6>Token</h6>
              </div>
              <div className="col mx-4 d-flex align-items-center">
                <h6>Appointment Name</h6>
              </div>
              <div className="col mx-4 d-flex align-items-center">
                <h6>Clinic Name</h6>
              </div>
              {/* <div className="col d-flex align-items-center">
                <h6>Address</h6>
              </div> */}
            </div>
            {appointments.length > 0 && appointments.map((appointment, key) => {
              return (
                <div className="apt-card d-flex p-2 justify-content-around " key={key}>
                  <div className="bg-success apt-token border text-white rounded">
                    <div>
                      <h6>{appointment?.token}</h6>
                    </div>
                  </div>
                  <div className="col mx-4 d-flex align-items-center">
                    <h6> {appointment?.userId?.name}</h6>
                  </div>
                  <div className="col mx-4 d-flex align-items-center">
                    <h6> {appointment?.departmentId?.name}</h6>
                  </div>
                  
                  <div className="col d-flex align-items-center">
                    { appointment?.isPaid 
                      ? <button className="btn btn-primary mt-1 rounded shadow-none" onClick={() => { setAppointment(appointment); setOpenAppointmentModal(true) }}>View</button>
                      : <button className="btn btn-primary mt-1 rounded shadow-none" onClick={() => payment(appointment._id)}>Pay Now</button>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isOpen && <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton={false}
        submitButton={false}
        title="Edit Profile"
      >
        <div className={`ms-panel-body p-0 `}>
          <div className="content ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 ">< ImgUpload source={'doctor'} file={(image) => { setSelectedFile(image) }} /></div>
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
                <div className="col-md-6 mb-3">
                  <label className=''>Gardian Name (optional) </label>
                  <div className="input-group">
                    <input type="text"
                      className={`form-control`}
                      placeholder={`Enter Name`}
                      {...register('gardianName')}
                    />
                  </div>
                </div>
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
              <button className='btn btn-light btn-md mx-2' onClick={() => setIsOpen(false)}>Cancel</button>
              <button className='btn btn-primary btn-md shadow-none' type='submit'>Save</button>
            </form>
          </div>
        </div>
      </Modal>}

      { openAppointmentModal && <Modal
        isOpen={openAppointmentModal}
        setIsOpen={setOpenAppointmentModal}
        closeButton={false}
        submitButton={false}
        title=""
      >
        <div
          style={{background: "#ffff", width: "100%", border: "1px solid black"}}
          class="p-2 rounded mb-3"
          ref={appointmentCarRef}
        >
          <img style={{width:"100px"}} src={logo} alt="" />
          <span className="d-inline-block ml-4"><h4 style={{ marginLeft: "20px" }} class="">Appointment Card</h4></span>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{  }}>{appointment?.departmentId?.name || 'Hospital Name'}</h2>
              <h6 style={{ marginLeft: "10px" }}>{new Date(appointment?.createdAt).toLocaleString()}</h6>
              <div className="col mk-address d-flex align-items-center">
                    <h6>{appointment?.departmentId?.address || '----'}</h6>
              </div>
            </div>
            <div style={{ width: "60px", height: "60px", borderRadius: "6px", backgroundColor: "#8df7c4" }}>
              <h3 style={{ textAlign: "center", margin: "5px 0 0 0", marginTop: "20%" }}>{appointment?.token}</h3>
            </div>
          </div>
          <hr />
          <div  >
            <div style={{display: "flex", justifyContent: "space-between", }}>
              <div>
                <img
                className="app-ing"
                  src={ appointment?.userId?.photo ? getFullPath(appointment?.userId?.photo) : NO_PHOTO }
                  alt=""
                />
              </div>
              <div>
                <div className="user-de" style={{display: "flex", flexDirection: "column",  }}>
                  <h4 style={{fontWeight: "bold", fontSize:"17px", margin: "0"}}>
                    <span style={{margin: "0", color: "black"}}>Name : </span>{ appointment?.userId?.name || 'Patient Name'}
                  </h4>

                  <h4 style={{ fontWeight: "bold", fontSize:"17px", margin: "5px 0 0 0"}}>
                    <span style={{margin: "0", color: "black"}}>Age : </span>{ appointment?.userId?.age || 'Age'}
                  </h4>
                  <h4 style={{fontWeight: "bold", fontSize:"17px", margin: "5px 0 0 0"}}>
                    <span style={{color: "black", fontSize:"17px", margin: "0"}} class="m-0 text-dark">Gender : </span>{appointment?.userId?.gender || 'Gender'}
                  </h4> 
                </div>
              </div>
            </div>
            
          </div>
          <hr />
          <div style={{paddingLeft: "40px"}}>
            <h2 style={{ fontWeight: "bold"}}>Basic Details</h2>
            <p style={{ margin: "5px 0 0 0", color: "black"}}>Guardian Name : {appointment?.userId?.gardianName || 'Gardian Name'}</p>
            <p style={{ margin: "5px 0 0 0", color: "black"}}>Mobile Number : { formatPhone(appointment?.userId?.phone) }</p>
            <p style={{margin: "5px 0 10px 0", color: "black"}}>
              Address : {appointment?.userId?.address || 'Address'}
            </p>
          </div>
        </div>

        { isLinkCopy && <span className="text-success">Link Copied.</span>}
        <br />
        <button className='btn btn-primary btn-md shadow-none mt-2' onClick={() => htmlToImageConvert() }>Download Card</button>
        <button className="btn btn-primary mt-1 rounded shadow-none mx-2" onClick={() => share(appointment)}>Share</button>
      </Modal>}
    </div>
    </Container>
  );
};
export default Dashbaord;
