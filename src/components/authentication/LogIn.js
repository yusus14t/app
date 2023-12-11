import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  axiosInstance,
  getAuthHeader,
  getFullPath,
  getImages,
  NumberFormat,
} from "../../constants/utils";
import useToasty from "../../hooks/toasty";
import { useLocation } from "react-router-dom";
import { WEBSITE_IMAGE, userRoutes } from "../../constants/constant";
import { useForm } from "react-hook-form";
import background1 from '../../assets/img/backgrounds/department.jpg'
import Container from "../App/Layout/Container"
import Login from '../App/Pages/Login'

const LogIn = () => {
  const { state: LocationState } = useLocation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ onChange: true });
  const inputRef = useRef(null);
  const otpRef = useRef(null);
  const toasty = useToasty();
  const [otp, setOtp] = useState(false);
  const [user, setUser] = useState({});
  const [type, setType] = useState({});
  const COMPONENTS = {
    1: "SIGNUP_FORM",
    2: "USER_TYPES_FORM",
    3: "PATIENT_FORM",
    4: "ORGANIZATION_FORM",
  };
  const [component, setComponent] = useState(COMPONENTS["4"]);
  const [images, setImages] = useState([])
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    initailizer();
  }, [])

  const userValidate = async (value) => {
    try {
      if (!value) {
        toasty.error("Enter number");
        return;
      }

      let { data } = await axiosInstance.post("/signup", {
        ...details,
        phone: value,
      });
      setUser(data?.user);
      setDetails({ ...details, phone: value });
      setOtp(true);

      if (data?.status_code === 411) toasty.error(data?.message);
      else toasty.success(data?.message);
    } catch (error) {
      toasty.error(error?.message);
      console.error(error);
    }
  };
  const handleEdit = () => {
    setOtp(false);
  };

  const ValidateOTP = async () => {
    try {
      let { data } = await axiosInstance.post("/validate-otp", {
        otp: otpRef.current.value,
        userId: user?._id,
      });

      localStorage.setItem("user", JSON.stringify(data?.user));
      localStorage.setItem("token", JSON.stringify(data?.token));
      if (data?.user?.twoFactor?.isVerified && data?.user?.isActive) {
        if (LocationState?.redirectTo)
          window.location.replace(LocationState.redirectTo);
        else window.location.replace(userRoutes[data?.user?.userType]?.path);
      } else {
        setComponent(COMPONENTS["2"]);
      }

      toasty.success(data?.message);
    } catch (error) {
      toasty.error(error?.message);
      console.error(error);
    }
  };

  const handleTypes = async (type) => {
    try {
      let { data } = await axiosInstance.post(
        "/common/set-usertype",
        { type, userId: user._id, organizationId: user?.organizationId },
        getAuthHeader()
      );
      setType(type);
      localStorage.setItem("user", JSON.stringify(data?.user));

      if (type === "patient") setComponent(COMPONENTS["3"]);
      else if (["hospital", "clinic"].includes(type))
        setComponent(COMPONENTS["4"]);
      else window.location.replace(userRoutes[data?.user?.userType]?.path);
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async (formdata) => {
    try {
      formdata['phone'] = user.phone
      if (['hospital', 'clinic'].includes(formdata.source)) {
        formdata.isLogin = true
        let { data } = await axiosInstance.post('common/create-hospital', formdata, getAuthHeader())
        if (data?.isActive) {
          localStorage.setItem('user', JSON.stringify(data?.organization))
          window.location.reload()
        }
      } else if (formdata.source === "patient") {
        formdata["_id"] = user?._id;
        let { data } = await axiosInstance.post(
          "/patient/patient-details",
          formdata,
          getAuthHeader()
        );

        if (data?.isActive) {
          localStorage.setItem("user", JSON.stringify(data?.user));

          if (LocationState?.redirectTo)
            window.location.replace(LocationState.redirectTo);
          else window.location.replace("/patient");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  const initailizer = async () => {
    let imagesData = await getImages()
    setImages(imagesData.data.images)
  }

  const findImage = (id) => {
    return getFullPath(images.find(image => image.id === id)?.image)
  }

  return (

    
    // <Container className=" mb-0">
    //   <div className=" loginc" >
    //     <div className="w-100 h-25">
    //       <img className="w-100 h-100" src={background1} />
    //     </div>
    //     <div
          
    //     >
    //       {component === COMPONENTS["1"] && (
    //         <div className="loginform col-3 d-flex flex-column">
    //           <span className="h2 text-dark mb-3">LogIn / Sign Up</span>

    //           {otp ? (
    //             <>
    //               <div className="mobile text-dark">
    //                 <p className="mb-1 text-dark ">Mobile Number</p>
    //                 <h3>
    //                   +91{" "}
    //                   {`${String(details?.phone || "").slice(0, 2)}-${String(
    //                     details?.phone || ""
    //                   ).slice(2, 4)}-${String(details?.phone || "").slice(
    //                     4,
    //                     6
    //                   )}-${String(details?.phone || "").slice(6, 10)}`}
    //                   <span>
    //                     <FontAwesomeIcon
    //                       onClick={handleEdit}
    //                       className="cursor-pointer medit ml-1 text"
    //                       icon={faEdit}
    //                     />
    //                   </span>
    //                 </h3>
    //               </div>
    //               <div className="otp mt-2">
    //                 <label htmlFor="" className="text-disabled">
    //                   Enter the OTP
    //                 </label>
    //                 <input
    //                   className="form-control mt-2 letterSpcing"
    //                   type="text"
    //                   maxLength={10}
    //                   name="OTP"
    //                   id=""
    //                   placeholder="X X X X"
    //                   ref={otpRef}
    //                 />
    //                 <button
    //                   onClick={ValidateOTP}
    //                   className="btn btn-dark btn1 mt-4"
    //                 >
    //                   Log In
    //                 </button>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <label className="mb-2 text-dark" htmlFor="Phone">
    //                 Mobile Number
    //               </label>
    //               <input
    //                 id="Phone"
    //                 className="form-control mb-2 letterSpcing"
    //                 type="text"
    //                 maxLength={10}
    //                 pattern="###-###-####"
    //                 placeholder="822992255"
    //                 ref={inputRef}
    //                 onChange={NumberFormat}
    //               />
    //               <div className="d-flex mr-1">
    //                 <input type="checkbox" /> <span>Agree to the tems ans conditions</span>
    //               </div>

    //               <span>
    //                 <button
    //                   onClick={() => userValidate(inputRef.current.value)}
    //                   className="btn btn-light btn1"
    //                 >
    //                   Submit
    //                 </button>
    //               </span>
    //             </>
    //           )}
    //         </div>
    //       )}

    //       {component === COMPONENTS["2"] && (
    //         <div className="loginform mt-0 user-details ">
    //           <h4 className="py-3">Select Anyone </h4>
    //           <div className="col-3 d-flex flex-column justify-content-center">
    //             <div
    //               className="col mb-3 p-3 text-center cursor-pointer"
    //               style={{
    //                 fontSize: "15px",
    //                 border: "1px solid white",
    //                 width: "300px",
    //                 borderRadius: "5px",
    //               }}
    //               onClick={() => handleTypes("patient")}
    //             >
    //               <span>To Book Appointments</span>
    //               <br />
    //               Patient
    //             </div>
    //             <div
    //               className="col text-center p-3 cursor-pointer"
    //               style={{
    //                 fontSize: "15px",
    //                 border: "1px solid white",
    //                 width: "300px",
    //                 borderRadius: "5px",
    //               }}
    //               onClick={() => handleTypes("hospital")}
    //             >
    //               <span>Only for &nbsp;</span>
    //               &nbsp;Hospitals
    //             </div>
    //             <div
    //               className="col p-3 text-center my-3 cursor-pointer"
    //               style={{
    //                 fontSize: "15px",
    //                 border: "1px solid white",
    //                 width: "300px",
    //                 borderRadius: "5px",
    //               }}
    //               onClick={() => handleTypes("clinic")}
    //             >
    //               <span>Only for&nbsp;</span>
    //               &nbsp;Clinics
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       <form onSubmit={handleSubmit(submit)}>
    //         {/* Patient form */}
    //         {component === COMPONENTS["3"] && (
    //           <div className="loginform mt-0 user-details col-3 d-flex flex-column">
    //             <h3 className="mb-3">Fill your Details</h3>
    //             <div className="mb-2">
    //               <label htmlFor="">Mobile Number</label>
    //               <h4 className="mb-2 text-disabled">
    //                 +91 {details?.phone?.slice(0, 3)}-{details?.phone?.slice(3, 6)}-
    //                 {details?.phone?.slice(-4)}
    //               </h4>
    //             </div>
    //             <div className="col-12">
    //               <input type="hidden" value={"patient"} {...register("source")} />
    //               <div>
    //                 <label htmlFor="" className="mb-2">
    //                   Full Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className={`form-control mb-2 ${errors?.name ? "border-danger" : ""
    //                     }`}
    //                   placeholder="Enter Full name"
    //                   {...register("name", {
    //                     required: "name is required",
    //                   })}
    //                 />
    //               </div>
    //             </div>
    //             <div className="col-12 d-flex flex-row">
    //               <div className="col-6 me-2">
    //                 <label htmlFor="" className="mb-2">
    //                   Age
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className={`form-control mb-2 ${errors?.age ? "border-danger" : ""
    //                     }`}
    //                   placeholder="Enter age"
    //                   {...register("age", {
    //                     required: "age is required",
    //                   })}
    //                 />
    //               </div>

    //               <div className="">
    //                 <label htmlFor="" className="mb-2">
    //                   Gender
    //                 </label>
    //                 <select
    //                   style={{ padding: ".475rem .75rem" }}
    //                   className={`form-control mb-2 col-2 w-100  ${errors?.age ? "border-danger" : ""
    //                     }`}
    //                   {...register("gender", { required: "Gender is required" })}
    //                 >
    //                   <option value="male">Male</option>
    //                   <option value="female">Female</option>
    //                   <option value="other">Other</option>
    //                 </select>
    //               </div>
    //             </div>
    //             <div className="mb-3">
    //               <label className="mb-2" htmlFor="">
    //                 Father name
    //               </label>
    //               <input
    //                 type="text"
    //                 className={`form-control mb-2 `}
    //                 placeholder="Enter Father name"
    //                 {...register("fatherName")}
    //               />
    //             </div>
    //             <div className=" mb-3">
    //               <label className="mb-2" htmlFor="">
    //                 Address
    //               </label>
    //               <input
    //                 type="text"
    //                 className={`form-control mb-2 ${errors?.address ? "border-danger" : ""
    //                   }`}
    //                 placeholder="Enter Address"
    //                 {...register("address", {
    //                   required: "address is required",
    //                 })}
    //               />
    //             </div>
    //             <button className="btn btn1 btn-info" type="submit">
    //               Save
    //             </button>
    //           </div>
    //         )}

    //         {/* Organization form */}
    //         {component === COMPONENTS["4"] && (
    //           <div className="loginform mt-0 user-details col-3 d-flex flex-column">
    //             <h3 className="mb-3">Fill your details</h3>
    //             <div className="mb-2">
    //               <label htmlFor="">Mobile Number</label>
    //               <h4 className="mb-2 text-disabled">
    //                 +91 {details?.phone?.slice(0, 3)}-{details?.phone?.slice(3, 6)}-
    //                 {details?.phone?.slice(-4)}
    //               </h4>
    //             </div>
    //             <div className="col-12">
    //               <div>
    //                 <input
    //                   type="hidden"
    //                   value={type}
    //                   placeholder="Enter Registration No."
    //                   {...register("source")}
    //                 />
    //               </div>
    //               <div>
    //                 <label className="mb-2">Registration No.</label>
    //                 <input
    //                   type="text"
    //                   name="registration no"
    //                   className={`form-control mb-2 ${errors?.registrationNo ? "border-danger" : ""
    //                     }`}
    //                   placeholder="Enter Registration No."
    //                   {...register("registrationNo", {
    //                     required: "Email is required",
    //                   })}
    //                 />
    //               </div>

    //               <div>
    //                 <label className="mb-2">Name</label>
    //                 <input
    //                   type="text"
    //                   name="name"
    //                   className={`form-control mb-2 ${errors?.name ? "border-danger" : ""
    //                     }`}
    //                   placeholder="Enter Full name"
    //                   {...register("name", {
    //                     required: "Email is required",
    //                   })}
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="" className="mb-2">
    //                   Email
    //                 </label>
    //                 <input
    //                   type="email"
    //                   name="email"
    //                   className={`form-control mb-2 ${errors?.email ? "border-danger" : ""
    //                     }`}
    //                   placeholder="Enter Email"
    //                   {...register("email", {
    //                     required: "Email is required",
    //                   })}
    //                 />
    //               </div>
    //               <button
    //                 className="btn btn-primary btn-md shadow-none"
    //                 type="submit"
    //               >
    //                 Save
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </form>
    //     </div>
    //   </div>

    // </Container>

    <Login/>
  );
};

export default LogIn;
