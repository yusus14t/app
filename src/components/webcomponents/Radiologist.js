import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  axiosInstance,
  getAuthHeader,
  getFullPath,
  getImages,
} from "../../constants/utils";
import NO_PHOTO from "../../assets/images/no-photo.png";
import {
  RADIOLOGIST_DEPARTMENT,
  WEBSITE_IMAGE,
} from "../../constants/constant";

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
    <>
      <div className="box bg-light"></div>
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
      {/* <div className="px-2 pt-0 ">
        <div
          className="hero-banner"
          style={{
            backgroundColor: "blue",
            backgroundImage: `url(${findImage(
              WEBSITE_IMAGE.ULTRASOUND_BANNER
            )})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div> */}
      <div className="container mt-5">
        <div className="row">
          {clinics?.length > 0 &&
            clinics.map((clinic, key) => (
              <div className="col-lg-4 col-md-6  mcard" key={key}>
                {console.log(clinic)}
                <Link
                  to={
                    clinic.organizationType === "Clinic"
                      ? `/clinic-detail/${clinic._id}`
                      : `/department-detail/${clinic._id}`
                  }
                >
                  <div
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

                      {/* <p className="dr-qualifiction mb-1">
                        {clinic?.qualification || "-"}
                      </p> */}
                      <p className="dr-address">{clinic?.address || "-"}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Ultrasound;
