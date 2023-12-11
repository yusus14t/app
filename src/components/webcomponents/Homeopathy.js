import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosInstance, getAuthHeader, getImages } from '../../constants/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { getFullPath } from "../../constants/utils";
import clinicPhoto2 from "../../assets/img/backgrounds/hos.jpg";
import Homeopath from "../../assets/img/logo/homeopathy.jpg";
import DoctorsList from './doctor/Doctors';
import { WEBSITE_IMAGE } from '../../constants/constant';




function Homeopathy() {
  const [clinics, setClinics] = useState([]);
  const [ images, setImages ] = useState([])

  useEffect(() => {
    initailizer()
    getAllClinics();
  }, []);



  const initailizer = async () => {
    let imagesData = await getImages()
    setImages(imagesData.data.images)
  }

  const findImage = ( id ) => {
    return getFullPath(images.find( image => image.id === id )?.image)
  }


  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", { params: { filter: { specialization: 'Homeopathy' }}, ...getAuthHeader()});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="box"></div>

      <div className="p-2">
        <div
          className="hero-banner"
          style={{
            backgroundImage: `url(${findImage(WEBSITE_IMAGE.HOMEOPATHY_BANNER)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
        </div>
      </div>
      <div  className=" ">
        <DoctorsList source={"homepage"} filter={{ specialization: 'Homeopathy' }} />
      </div>
      <div className="container">
        <div className="partner row">
          
          <div className="row px-0 m-auto">
            <div className="container ">
              <h3 className="text-center underline">
                <span className="under">Clinics</span>
              </h3>
            </div>

            {clinics.length > 0 &&
              clinics
                .filter((e, i) => i < 3)
                .map((clinic, key) => (
                  <div className="col-lg-4 mb-4 col-md-6  mcard mt-4" key={key}>
                    <div
                      style={{ background: "#ffffff" }}
                      className="clinic-card "
                    >
                      <div className="inner-card-border"></div>
                      <div style={{ marginBottom: "-22px" }}>
                        <img
                          className="clinic-img"
                          src={
                            clinic?.photo
                              ? getFullPath(clinic?.photo)
                              : clinicPhoto2
                          }
                          alt=""
                        />
                        <span className=" p-2 clinic-title">
                          {clinic?.name} 
                        </span>
                        <span style={{marginLeft:"10px", fontSize:"10px"}} className="ml-2 p-2 clinic-title">
                          &#8377;{clinic?.fee}
                        </span>
                      </div>
                      <div className="clinic-details d-flex flex-row justify-content-between">
                        <div className="mt-2">
                          <h6 className="clinic-specialization text-disabled">
                            {"Homeopathy"}
                          </h6>
                          <div className="contact-info">
                            <h6 className="text-disabled mt-1">
                              Contact Info :
                            </h6>
                            <div>
                              <FontAwesomeIcon
                                className="clinic-icon"
                                icon={faPhone}
                              />
                              <p className="d-inline-block ml-2 mb-0">
                                {clinic?.phone ? "+91" + clinic?.phone : ""}
                              </p>
                            </div>
                            <div>
                              <p className="ml-2 adjust hospital-address  ">
                                <FontAwesomeIcon
                                  className="clinic-icon address-icon"
                                  icon={faLocationDot}
                                />
                                {clinic?.address}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <h6 className="text-disabled">Timming</h6>
                          <div className="d-flex flex-column justify-contant-between">
                            <div className="">
                              <p className="clinic-timming mb-0">
                                Morning : 08 AM to 11 PM
                              </p>
                              <p className="clinic-timming mb-0">
                                Evening : 05 PM to 11 PM
                              </p>
                            </div>
                            <Link
                              className="text-light clinic-btn  btn btn1 btn-primary shadow-none"
                              to={`/clinic-detail/${clinic?._id}`}
                            >
                              View More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homeopathy
