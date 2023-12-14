import React, { useEffect, useRef } from "react";
import "./Login.css";
import loginpaoster from "../../../assets/img/logo/logo.jpg";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHospitalUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  axiosInstance,
  getAuthHeader,
  getFullPath,
  getImages,
  NumberFormat,
} from "../../../constants/utils";
import useToasty from "../../../hooks/toasty";
import { Link, useLocation } from "react-router-dom";
import { userRoutes } from "../../../constants/constant";
import { useForm } from "react-hook-form";
import clinic from "../../../assets/menuIcons/clinic.png";
import Hospital from "../../../assets/menuIcons/hospital.png";
import Container from "../../../layout/Container";

const Login = () => {
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
  const [component, setComponent] = useState(COMPONENTS["1"]);
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    initailizer();
  }, []);

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
    inputRef.current.value = details.phone;
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
      formdata["phone"] = user.phone;
      if (["hospital", "clinic"].includes(formdata.source)) {
        formdata.isLogin = true;
        let { data } = await axiosInstance.post(
          "common/create-hospital",
          formdata,
          getAuthHeader()
        );
        if (data?.isActive) {
          localStorage.setItem("user", JSON.stringify(data?.organization));
          window.location.reload();
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
    let imagesData = await getImages();
    setImages(imagesData.data.images);
  };

  const findImage = (id) => {
    return getFullPath(images.find((image) => image.id === id)?.image);
  };

  return (
    <div className="bg-primary" style={{ height: "100vh" }}>
      <Container className="login-page mb-0 px-2">
        <div className="login-img-container">
          <img className="w-100 py-3" src={loginpaoster} />
        </div>
        {component === COMPONENTS["1"] && (
          <div className=" d-flex flex-column align-items-center bg-white curved w-100 p-4 parent-div ">
            <h4 className="m-0"> Login/SignUp</h4>
            {!otp ? (
              <div>
                <div className="mb-2 mt-4 d-flex flex-column">
                  <label className=" ">Enter Mobile Number</label>
                  <input
                    className="login-input rounded border-0 ls8 text-center bg-light p-2"
                    placeholder="8218397850"
                    type="text"
                    maxLength={10}
                    inputMode="numeric"
                    ref={inputRef}
                    onChange={NumberFormat}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <input className="checkbox" type="checkbox" />
                  <span className="mb-0 mx-2">
                    <Link to={"/terms"}>
                      {" "}
                      Agree to the{" "}
                      <span className="mb-0 text-primary">
                        terms and conditions
                      </span>
                    </Link>
                  </span>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-primary shadow-none mt-3"
                    onClick={() => userValidate(inputRef.current.value)}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mobile text-dark">
                  <p className="mb-1 text-dark ">Mobile Number</p>
                  <h4 className="text-muted rounded bg-light p-2">
                    +91 &nbsp;
                    {`${String(details?.phone || "").slice(0, 3)}-${String(
                      details?.phone || ""
                    ).slice(3, 6)}-${String(details?.phone || "").slice(
                      6,
                      10
                    )}`}
                    <span>
                      <FontAwesomeIcon
                        onClick={handleEdit}
                        className="cursor-pointer medit ml-1 text"
                        icon={faEdit}
                      />
                    </span>
                  </h4>
                </div>
                <div className="mb-2 mt-4 d-flex flex-column">
                  <label className=" ">Enter OTP</label>
                  <input
                    className="login-input text-center ls8 rounded border-0 bg-light p-2"
                    placeholder="XXXX"
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    ref={otpRef}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-primary mt-3"
                    onClick={ValidateOTP}
                  >
                    Validate OTP
                  </button>
                </div>
              </>
            )}
          </div>
        )}  

        {component === COMPONENTS["2"] && (
          <div className="d-flex flex-column align-items-center bg-white curved w-100 p-4 parent-div">
            <div
              className="patient text-center"
              onClick={() => handleTypes("patient")}
            >
              <FontAwesomeIcon
                className="text-dark "
                style={{ fontSize: "60px" }}
                icon={faHospitalUser}
              />

              <p className="mb-0 mt-1">
                <strong className="text-dark  fs-6 ">Patients</strong>
              </p>
              <p className="mb-0 text-muted  fs-12">To Book Appointment</p>
            </div>
            <div className="signup-items">
              <div
                className="signup-item text-center "
                onClick={() => handleTypes("clinic")}
              >
                <div className="signup-icons ">
                  <img className="w-100 h-100" src={clinic} />
                </div>
                <p className="mb-0 detail">
                  To register your <strong className="fs-6">Clinic</strong>
                </p>
              </div>
              <div
                style={{ marginLeft: "20px" }}
                className="signup-item text-center"
                onClick={() => handleTypes("hospital")}
              >
                <div className="signup-icons ">
                  <img className="w-100 h-100" src={Hospital} />
                </div>
                <p className="mb-0 detail">
                  To register your <strong className="fs-6">Hospitals</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        <from className="d-flex justify-content-center w-100" >
          {/* patient */}
          {component === COMPONENTS["3"] && (
            <div className=" d-flex flex-column align-items-center bg-white curved  p-4 parent-div "
            >
              <h4>Fill your datails</h4>
              <div className="mb-2 w-100">
                <label htmlFor="">Mobile Number</label>
                <h4 className="mb-2 text-disabled">
                  +91 {details?.phone?.slice(0, 3)}-
                  {details?.phone?.slice(3, 6)}-{details?.phone?.slice(-4)} 
                </h4>
              </div>
              <div>
              <input type="hidden" value={"patient"} {...register("source")} />
              <div className="w-100 mb-3">
                <label>
                  Full Name <span className="text-anger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter full name"
                  {...register("name", { required: "name is required", })}
                />
              </div>
              <div className="d-flex mb-3">
                <div className="" >
                  <label>
                    Age <span>*</span>
                  </label>{" "}
                  <br />
                  <input placeholder="Enter age" 
                  {...register("age", {required: "age is required",})}
                   className="login-input rounded border-0 w-100  bg-light p-2 " />
                </div>
                <div>
                  <label>
                    Gender <span>*</span>
                  </label>{" "}
                  <br />
                  <select className="login-input rounded border-0 ms-1 bg-light p-2 "
                  {...register("gender", { required: "Gender is required" })}
                  style={{width:"105px", height:"39px"}} >
                    <option value="Female">Female</option>
                    <option value=" Male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="w-100 mb-3">
                <label>
                  Father Name <span className="text-anger">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter father name."
                  {...register("fatherName")}
                />
              </div>
              <div className="w-100 mb-4">
                <label>
                  Address <span className="text-anger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter address"
                  {...register("address", { required: "address is required",})}
                />
              </div>
              <button className="btn btn-primary shadow-none  w-100 py-2" type="submit">Save</button>

              </div>
              
            </div>
          )}
          {/* orgaisation */}
          {component === COMPONENTS["4"] && (
            <div className="d-flex flex-column align-items-center bg-white curved w-100 p-4 parent-div2 ">
              <h4>Fill your datails</h4>
              <div className="mb-2 w-100">
                   <label htmlFor="">Mobile Number</label>
                   <h4 className="mb-2 text-disabled">
                     +91 {details?.phone?.slice(0, 3)}{details?.phone?.slice(3, 6)}
                     {details?.phone?.slice(-4)} 
                   </h4>
             </div>
             <div className="w-100 mb-3">
                <label>
                  Registration Number<span className="text-anger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter registration no."
                  {...register("registrationNo", { required: "Registration number is required", })}
                />
              </div>
              <div className="w-100 mb-3">
                <label>
                  Clinic / Hospital Name<span className="text-anger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter name"
                  {...register("name", { required: "name is required", })}
                />
              </div>
              <div className="w-100 mb-3">
                <label>
                  Email ID <span className="text-anger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className="login-input w-100 rounded border-0 bg-light p-2"
                  placeholder="Enter email ID"
                  {...register("email", { required: "Email is required", })}
                />
              </div>
              <div className="w-100">
                <button className="btn btn-primary py-2 shadow-none w-100">Save</button>
              </div>
            </div>
          )}
        </from>
      </Container>
    </div>
  );
};

export default Login;
