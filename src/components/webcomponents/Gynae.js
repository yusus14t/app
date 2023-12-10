import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, } from "@fortawesome/free-solid-svg-icons";
import ivf from "../../assets.app/images/ivf.jpg";
import TEST from "../../assets.app/images/TEST-TUBE-BABY.jpg";
import surrogacy from "../../assets.app/images/surrogacy.jpg";
import Gynaecology from "../../assets.app/images/Gynaecology.jpg";
import NO_PHOTO from "../../assets.app/images/no-photo.png";
import { NUMBER_TO_DAY } from "../../constants/constant";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { axiosInstance, convertTo12HourFormat, getAuthHeader, getImages } from "../../constants/utils";
import { getFullPath } from "../../constants/utils";
import Modal from "../common-components/Modal";
import { WEBSITE_IMAGE } from "../../constants/constant";



const Gynae = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [ images, setImages ] = useState([])

  const [clinics, setClinics] = useState([]);
  const [hospitals, setHospitals] = useState([]);


  useEffect(() => {
    initailizer()
    getAllClinics();
    getHospitals()
  }, []);

  const initailizer = async () => {
    let imagesData = await getImages()
    setImages(imagesData.data.images)
  }

  const findImage = ( id ) => {
    return getFullPath(images.find( image => image.id === id )?.image)
  }

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get('/hospitals', { params: { filter: { specialization: 'GYNECOLOGIST' },  }, ...getAuthHeader() })
      setHospitals(data?.organization)
      console.log(data.organization)
    } catch(error){ console.error(error) }
  }


  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", { params: { isClinic: true, filter: {specialization: 'GYNECOLOGIST'} }, ...getAuthHeader() });
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodayTiming = ( timing ) => {

    let time = timing?.find( t => t.day === NUMBER_TO_DAY[2] )

    if( time ){
      return (
        <>
          <div>
            <div>
              <span>Open: { convertTo12HourFormat(time?.open) } </span>
              <br />
              <span>Close: { convertTo12HourFormat(time?.close) } </span>
            </div>
          </div>
          <div>
        </div>
        </>
      );
    } else {
      return(<>
        Today Not Available
      </>)
    }
  }

  return (
    <>
      <div className="box"></div>
      <div className=" ">
        <div className="">
          <Carousel
            dynamicHeight={500}
            autoPlay={true}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            onChange={true}
            interval={50}
          >
            {
              [
                WEBSITE_IMAGE.GYNAE_SLIDER_1,
                WEBSITE_IMAGE.GYNAE_SLIDER_2,
                WEBSITE_IMAGE.GYNAE_SLIDER_3,
                WEBSITE_IMAGE.GYNAE_SLIDER_4
              ].map(slide => <div className="slide1">
                <img
                  src={findImage(slide)}
                  className="gynae-slide"
                  alt={slide}
                />
              </div>)
            }
        
          </Carousel>
        </div>
        <div className="p-2">
          <div
            className="hero-banner"
            style={{
              backgroundImage: `url(${findImage(WEBSITE_IMAGE.GYNAE_BANNER)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        {/*------services-------  */}
        <div className="gynae-services ">
          <div className="container">
            <h3 className="text-center underline">
              <span className="under">Health Care Services</span>
            </h3>
          </div>
          <div className="gynae-services-cards-container justify-content-center">
            <div className="gynae-services-card text-center gynae-pink-layer">
              <span className="gynae-circle mt-2">
                <img
                  style={{ width: "83px", height: "83px", borderRadius: "50%" }}
                  src={Gynaecology}
                  alt="Gynaecology"
                />
              </span>
              <h3>Gynaecology Process</h3>
              <p className="p-2">
                A gynecologist plays a crucial role in the care of pregnant
                women.
              </p>
              <span
                onClick={() => setIsOpen3(true)}
                className="btn btn1 btn-gynae"
              >
                <p className="mb-0">Check It</p>
              </span>
            </div>
            <div className="gynae-services-card text-center gynae-pink-layer">
              <span className="gynae-circle mt-2">
                <img
                  style={{ width: "85px", height: "85px", borderRadius: "50%" }}
                  src={surrogacy}
                  alt=""
                />
              </span>
              <h3>Surrogacy</h3>
              <p className="p-2">
                Surrogacy is a complex and sensitive topic that raises many
                ethical and legal questions.
              </p>
              <span
                onClick={() => setIsOpen(true)}
                className="btn btn1 btn-gynae"
              >
                <p className="mb-0">Check It</p>
              </span>
            </div>

            <div className="gynae-services-card text-center gynae-pink-layer">
              <span className="gynae-circle mt-2">
                {/* <FontAwesomeIcon
                  className="gynae-services-icon"
                  icon={faStethoscope}
                /> */}
                <img
                  style={{ width: "85px", height: "85px", borderRadius: "50%" }}
                  src={TEST}
                  alt=""
                />
              </span>
              <h3>Test Tube</h3>
              <p className="p-2">
                Test tube baby, also known as in vitro fertilization (IVF),
              </p>
              <span
                onClick={() => setIsOpen1(true)}
                className="btn btn1 btn-gynae"
              >
                <Link>Check It</Link>
              </span>
            </div>

            <div className="gynae-services-card text-center gynae-pink-layer">
              <span className="gynae-circle mt-2">
                {/* <FontAwesomeIcon
                  className="gynae-services-icon"
                  icon={faStethoscope}
                /> */}
                <img
                  style={{ width: "85px", height: "85px", borderRadius: "50%" }}
                  src={ivf}
                  alt=""
                />
              </span>
              <h3>IVF</h3>
              <p className="p-2">
                In vitro fertilization (IVF) is a type of assisted reproductive
                technology
              </p>
              <span
                onClick={() => setIsOpen2(true)}
                className="btn btn1 btn-gynae"
              >
                <p className="mb-0">Check It</p>
              </span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div
            className="hero-banner"
            style={{
              backgroundImage: `url(${findImage(
                WEBSITE_IMAGE.GYNAE_BOTTOM_BANNER
              )})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <span className="btn btn-primary  gynae-button-hero">
              <Link className="text-light">Test Now</Link>
            </span>
          </div>
        </div>
        {/* <h3>Our Partners</h3> */}

        <div className="partner ">
          <div className="row m-auto">
            <div className="container">
              <h3 className="text-center underline">
                <span className="under">Hospitals</span>
              </h3>
            </div>
            { hospitals?.length >  0 && hospitals.map((Hospital) => {
              return (
                <div
                  className="ml-2 col-lg-4 mb-4 col-md-6 mcard mt-2 "
                  // key={key}
                >
                  <div
                    className="hospitalCard  "
                    style={{ backgroundColor: "#ffc1d44d" }}
                  >
                    <span
                      className=" hospital-title text-dark"
                      style={{ backgroundColor: "#ffc1d44d" }}
                    >
                      {Hospital.name}
                    </span>
                    <div className="hospitalCard-background-img">
                      <img
                        className="hospitalCard-background-img"
                        src={Hospital?.photo ? getFullPath(Hospital?.photo) : NO_PHOTO }
                        alt=""
                      />
                      <span style={{marginLeft:"10px", fontSize:"15px"}} className="ml-2 p-2 clinic-title">
                        &#8377; {Hospital.fee}
                      </span>
                    </div>
                    <div className="clinic-details d-flex flex-row justify-content-between">
                      <div className="mt-3">
                        <h6 className="hospital-specialization text-disabled">
                          { Hospital?.specialization?.length > 1 ? 'Multi Specialist' : Hospital?.specialization[0].name }
                        </h6>
                        <div className="contact-info mt-3">
                          <div>
                            <p className="ml-2 adjust hospital-address  ">
                              <FontAwesomeIcon
                                className="clinic-icon address-icon"
                                icon={faLocationDot}
                              />
                             { Hospital.address }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 hospital-card-timing">
                        <h6 className="hospital-timming-card">Timming</h6>
                        <div className="d-flex flex-column justify-contant-between">
                          { getTodayTiming(Hospital?.timing) }
                          <div className="">
                            <button className="hospital-btn  btn btn1 btn-primary">
                              <Link
                                className="text-light"
                                to={`/hospital-detail/${ Hospital._id }`}
                              >
                                View More
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-sm-5"></div>
          </div>
          <div className="row m-auto">
            <div className="container">
              <h3 className="text-center underline">
                <span className="under">Clinics</span>
              </h3>
            </div>

            {clinics.length > 0 &&
              clinics
                .filter((e, i) => i < 3)
                .map((clinic, key) => (
                  <div className="col-lg-4 mb-4 col-md-6 mcard mt-4" key={key}>
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
                              : NO_PHOTO
                          }
                          alt=""
                        />
                        <span className=" p-2 clinic-title">
                          {clinic?.name}
                        </span>
                        <span
                          style={{ marginLeft: "10px", fontSize: "15px" }}
                          className="ml-2 p-2 clinic-title"
                        >
                          &#8377;{clinic?.fee}
                        </span>
                      </div>
                      <div className="clinic-details d-flex flex-row justify-content-between">
                        <div className="mt-2">
                          <h6 className="clinic-specialization text-disabled">
                          <h6 className="clinic-specialization text-disabled">
                              {clinic.specialization.length > 1
                                ? "Multi speciality"
                                : clinic.specialization[0]?.name || "-"}
                              </h6>
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
                          <div className="d-flex flex-column justify-contant-around">
                            {getTodayTiming(clinic?.timing)}
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
        <div className="container"></div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeButton={false}
            submitButton={false}
            title="Surrogacy"
          >
            <div style={{ textAlign: "justify" }} className="">
              Surrogacy is a complex and sensitive topic that raises many
              ethical and legal questions. While it can be a viable option for
              those who cannot conceive or carry a pregnancy, it is important to
              fully understand the process before pursuing it. There are two
              types of surrogacy: traditional and gestational. Traditional
              surrogacy involves using the surrogate's egg, making her the
              biological mother of the child. Gestational surrogacy involves
              using an embryo created through IVF using the intended parents' or
              donors' egg and sperm, with no genetic connection between the
              surrogate and the child. It is crucial to work with a reputable
              surrogacy agency and legal counsel to ensure that all parties
              involved have their rights protected and that the process is
              carried out ethically and responsibly. Surrogacy laws vary by
              country, so it is important to research the legal implications of
              surrogacy in your area before pursuing this option. While
              surrogacy can be a complicated and emotional process, it can also
              be a rewarding way to start or grow a family.
            </div>
          </Modal>
        )}
        {isOpen1 && (
          <Modal
            isOpen={isOpen1}
            setIsOpen={setIsOpen1}
            closeButton={false}
            submitButton={false}
            title="TEST TUBE"
          >
            <div style={{ textAlign: "justify" }} className="">
              Test tube baby, also known as in vitro fertilization (IVF), is a
              fertility treatment where eggs are removed from a woman's ovaries
              and combined with sperm in a laboratory culture dish. The
              fertilized eggs, or embryos, are then transferred back into the
              woman's uterus for implantation and pregnancy. IVF is typically
              recommended for couples who have been trying to conceive for a
              year or more without success, or for women with certain medical
              conditions that make natural conception difficult or impossible.
              It is also an option for same-sex couples or single individuals
              who want to have a biological child. Despite some controversy
              surrounding IVF, it has helped millions of couples worldwide to
              achieve their dream of having a child. The success rates of IVF
              have improved over the years, thanks to advancements in technology
              and medical research. However, it is important to note that IVF is
              not always successful and can be a costly and emotionally
              challenging process. It is important for couples considering IVF
              to weigh the pros and cons carefully and to consult with their
              healthcare provider to determine if it is the right option for
              them.
            </div>
          </Modal>
        )}
        {isOpen2 && (
          <Modal
            isOpen={isOpen2}
            setIsOpen={setIsOpen2}
            closeButton={false}
            submitButton={false}
            title="IVF"
          >
            <div style={{ textAlign: "justify" }} className="">
              In vitro fertilization (IVF) is a type of assisted reproductive
              technology (ART) that helps couples who are struggling with
              infertility to conceive a child. IVF involves the removal of eggs
              from a woman's ovaries and fertilizing them with sperm in a
              laboratory dish. The fertilized eggs are then implanted back into
              the woman's uterus where they can grow and develop into a baby.
              IVF can be a complex and expensive process, but it has helped many
              couples to conceive who may not have been able to do so otherwise.
              Some common reasons for using IVF include blocked or damaged
              fallopian tubes, male factor infertility, ovulation disorders, and
              unexplained infertility. There are also different types of IVF
              procedures, such as traditional IVF, intracytoplasmic sperm
              injection (ICSI), and preimplantation genetic testing (PGT), which
              may be recommended depending on the couple's specific situation.
              It's important to discuss all options with a fertility specialist
              to determine the best course of action for individual
              circumstances.
            </div>
          </Modal>
        )}

        {isOpen3 && (
          <Modal
            isOpen={isOpen3}
            setIsOpen={setIsOpen3}
            closeButton={false}
            submitButton={false}
            title="Gynaecology Process"
          >
            <div style={{ textAlign: "justify" }} className="">
              A gynecologist plays a crucial role in the care of pregnant women.
              The process of caring for a pregnant woman usually involves
              several steps. Firstly, the gynecologist will conduct a thorough
              medical history and physical examination of the woman. This helps
              to identify any pre-existing health conditions that may affect the
              pregnancy. The gynecologist will also perform routine tests, such
              as blood tests and ultrasounds, to monitor the health of the
              mother and the developing fetus. Once the pregnancy progresses,
              the gynecologist will monitor the growth and development of the
              fetus. This involves regular check-ups to ensure that the baby is
              developing normally and that there are no complications. The
              gynecologist will also provide advice on proper nutrition,
              exercise, and other lifestyle factors that can affect the health
              of the mother and baby. As the due date approaches, the
              gynecologist will provide guidance on labor and delivery. This
              includes discussing pain management options, monitoring the
              progress of labor, and ensuring that both mother and baby are safe
              and healthy. The gynecologist will also be present during the
              delivery to ensure that everything goes smoothly. Overall, the
              process of caring for a pregnant woman involves a comprehensive
              approach that focuses on the health and well-being of both the
              mother and the developing fetus. The gynecologist plays a critical
              role in this process, providing expert medical care and guidance
              every step of the way.
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Gynae;
