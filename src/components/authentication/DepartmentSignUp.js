import React, { useRef, useState } from 'react'
import background from "../../assets/img/backgrounds/department.jpg";
import { NumberFormat, axiosInstance } from '../../constants/utils';
import useToasty from '../../hooks/toasty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { userRoutes } from '../../constants/constant';


const DepartmentSignUp = () => {
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [user, setUser] = useState({})
  const phoneRef = useRef(null);
  const otpRef = useRef(null);
  const toasty = useToasty()

  const sentOtp = async (phone) => {
    try{
      if(!phone) {
        toasty.error('Enter phone number')
        return
      }

      let { data } = await axiosInstance.post('/signup', { phone, source: 'department' })
      setIsOtpSent(true)
      setUser(data?.user)
      toasty.success(data?.message)
    } catch(error){ 
      console.error(error) 
      toasty.error(error?.message)
    }
  }

  const handleSignup = async () => {
    try{
      let { data } = await axiosInstance.post('/validate-otp', { otp: otpRef.current.value, userId: user._id })

      localStorage.setItem('user', JSON.stringify(data?.user))
      localStorage.setItem('token', JSON.stringify(data?.token))

      if (data?.user?.twoFactor?.isVerified) {
        let route = userRoutes[data?.user?.userType]?.path
        window.location.replace(route)
      } else if( data?.user?.userType === 'DR' ) {
        // window.location.replace('/after')
      } 
      
      toasty.success(data?.message)
    } catch(error){ 
      console.error(error) 
      toasty.error(error?.message)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="loginContainer align-center"
    >
      <div className="w-25 m-auto hc-signup-container d-flex flex-column align-items-center">
        <span className=" h4 hos-singup-heading p-1 text-light"> Sign Up</span>
        <span className="h2 text-light text-center  mb-3 hos-singup-heading">
          Hospital / Clinic
        </span>
        {!isOtpSent && <div className="w-100">
          <p className="mb-1 text-light">Mobile Number</p>
          <input
            type="text"
            className="form-control letterSpcing"
            placeholder='8218692122'
            onChange={NumberFormat}
            ref={phoneRef}
          />
          <span className="text-center">
            <button className="btn btn1 btn-primary mt-3 shadow-none" onClick={() => sentOtp(phoneRef.current.value)}>Sent OTP</button>
          </span>
        </div>}
        {isOtpSent &&
          <div className="mobile">
            <p className='mb-1 text-light'>Mobile Number</p>
            <h3 className='text-light'>+91 {`${String(user?.phone || "").slice(0, 3)}-${String(user?.phone || "").slice(3, 6)}-${String(user?.phone || "").slice(6, 10)}`} <span><FontAwesomeIcon onClick={() => setIsOtpSent(false)} className='cursor-pointer medit ml-1 text' icon={faEdit} /></span></h3>
          </div>
        }
        {isOtpSent && <div className="w-100 d-flex flex-column justify-content-start">
          <div className="otp w-75 mt-2 ">
            <label htmlFor="" className="text-light">
              Enter the OTP
            </label>
            <input
              className="form-control mt-2 letterSpcing"
              type="text"
              name="OTP"
              placeholder="X X X X"
              maxLength={4}
              ref={otpRef}
            />
            <button className="btn btn-primary btn1 mt-4" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default DepartmentSignUp