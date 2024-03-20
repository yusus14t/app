import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  axiosInstance,
  formatPhone,
  getAuthHeader,
  getFullPath,
  getImages,
  truncate,
} from "../../../constants/utils";
import NO_PHOTO from "../../../assets/images/no-photo.png";
import {
  RADIOLOGIST_DEPARTMENT,
  WEBSITE_IMAGE,
} from "../../../constants/constant";
import Container from "../../../layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faLocationDot, faSquarePhone } from "@fortawesome/free-solid-svg-icons";

const Ultrasound = () => {
  const [clinics, setClinics] = useState([]);
  const [images, setImages] = useState([]);
  const [specialization, setSpecialization] = useState(null)
 


useEffect(()=>{
getAllClinics()
},[specialization])

  useEffect(() => {
    initailizer();


    getAllClinics();
  }, []);

  const initailizer = async () => {
    let imagesData = await getImages();
    setImages(imagesData.data.images);
  };

  const findImage = (id) => {
    return getFullPath(images.find((image) => image.id === id)?.image);
  };

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {
        params: { filter: { specialization: specialization || RADIOLOGIST_DEPARTMENT.map(radiologist=> radiologist.name) }, isClinic: false },
        ...getAuthHeader(),
      });
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mb-0">
      <div
        
        className=" mini-menu  w-100 bg-light  "
      >
        {console.log("clini", clinics)}
        <ul className="d-flex mb-0 p-2 overflow-auto">
          {RADIOLOGIST_DEPARTMENT.map(({ id, name }) => (
            <li
              className={`bgh py-1 px-3 cursor-pointer rounded mt-1 mx-1  ${specialization ===
                name && "ultraActive"}`}
              onClick={() => {
                setSpecialization(name);
              }}
              key={id}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

        <div className="row mx-0 px-0 mt-5">
          {clinics?.length > 0 &&
            clinics.map((clinic, key) => (
              <div className="col-lg-4 col-md-6 mxil col-sm-6 mx-0 px-1  mcard" key={key}>
                <Link
                  to={
                    clinic.organizationType === "Clinic"
                      ? `/clinic-detail/${clinic._id}`
                      : `/department-detail/${clinic._id}`
                  }
                >
                  {/* <div
                    style={{ background: "#edede9", border: "none" }}
                    className="Dr-container mb-3 d-flex p-3"
                  >
                    <div className="ml-3">
                      <img
                        className="dr-profile-img"
                        src={
                          clinic?.photo ? getFullPath(clinic?.photo) : NO_PHOTO
                        }
                        alt=""
                      />
                      <div
                        style={{
                          fontSize: "10px",
                          height: "30px",
                          marginTop: "10px",
                          marginLeft: "",
                          width: "60px",
                        }}
                        className="ml-2 p-2 clinic-title"
                      >
                        <h6 style={{ fontSize: "12px" }}>
                          &#8377; {clinic.fee}
                        </h6>
                      </div>
                    </div>

                    <div className="dr-details">
                      <h2 className="text-center">{clinic?.name}</h2>

                      <p
                        style={{ background: "#00afb9" }}
                        className="mb-1 dr-spelialization"
                      >
                        { specialization || clinic.specialization[0]?.name }
                        
                      </p>
                      <p className="mb-0">{clinic?.doctor?.name}</p>
                      <p className="mb-1 experience-dr">
                        Experience: {clinic?.doctor?.experience || "-"}
                      </p>

                    
                      <p className="dr-address">{clinic?.address || "-"}</p>
                    </div>
                  </div> */}
                  <div style={{height:"150px"}} className=" clinic-app-card bg-white ">
          {/* <p className="head-clinic  text-dark">CLINIC</p> */}
          <div className="d-flex overflow-hidden">
            <div className="clinic-img-container">
              <img
                src={
                  clinic?.photo ? getFullPath(clinic?.photo) : NO_PHOTO
                }
                className="clinic-app-img"
              />
            </div>
            <div className="clinic-info">
              <div className="px-1 truncate1">
                <p className="mb-0 fs-5 font-weight-bold dr-name">
                  {clinic?.name}
                </p>
              </div>
              <div className="mb-1 fs-8 px-2 specialization">
                {/* {truncate(
                  clinic.specialization?.name ||
                    (clinic?.specialization?.length
                      ? "Multispecialist"
                      : "-"),
                  22
                )} */}
                { specialization || clinic.specialization[0]?.name }
              </div>
              <div className="fs-12 mt-2">
                {" "}
                <FontAwesomeIcon className="me-2 " icon={faSquarePhone} />{" "}
                {formatPhone(clinic.phone)}
              </div>
              <div className="d-flex fs-12">
                <div>
                  <FontAwesomeIcon icon={faIndianRupeeSign} /> &nbsp;&nbsp;{" "}
                  {clinic.fee} &nbsp; |
                </div>
                &nbsp;&nbsp;{" "}
                {clinic.bookingStatus ? (
                  <div className="text-success">Booking Open</div>
                ) : (
                  <div className="text-danger">Booking Closed</div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <FontAwesomeIcon className="mx-2" icon={faLocationDot} />
            </div>
            <div className="mb-1 address fs-12">
              {" "}
              {truncate(clinic.address || "-", 50)}
            </div>
          </div>
         
        </div>
                </Link>
              </div>
            ))}
        </div>
    </Container>
  );
};

export default Ultrasound;
