import React, { useEffect, useState } from "react";
import "./Gynaeclogist.css";
import HospitaCard from "../cards/HospitaCard";
import ClinicCard from "../cards/ClinicCard";
import ivf from "../../../assets/images/ivf.jpg";
import TEST from "../../../assets/images/TEST-TUBE-BABY.jpg";
import surrogacy from "../../../assets/images/surrogacy.jpg";
import Gynaecology from "../../../assets/images/Gynaecology.jpg";
import Homeimg1 from '../../../assets/images/1920x1280-1.jpg'
import Homeimg2 from '../../../assets/images/1920x1280-2.jpg'
import Homeimg3 from '../../../assets/images/1920x1280-3.jpg'
import {
  axiosInstance,
  getAuthHeader,
  getFullPath,
  getImages,
} from "../../../constants/utils";
import { Link } from "react-router-dom";
import Modal from "../../common-components/Modal";
import Slider from "../../sliders/Slider";
import Container from "../../../layout/Container";

const Gynaeclogist = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [images, setImages] = useState([]);

  const [clinics, setClinics] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    initailizer();
    getAllClinics();
    getHospitals();
  }, []);

  const initailizer = async () => {
    let imagesData = await getImages();
    setImages(imagesData.data.images);
  };

  const findImage = (id) => {
    return getFullPath(images.find((image) => image.id === id)?.image);
  };

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals", {
        params: { filter: { specialization: "GYNECOLOGIST" } },
        ...getAuthHeader(),
      });
      setHospitals(data?.organization);
      console.log(data.organization);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {
        params: { isClinic: true, filter: { specialization: "GYNECOLOGIST" } },
        ...getAuthHeader(),
      });
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container className={{backgroundColor:"#f28bc2"}}>
      <Slider
        slides={[
          <div className="w-100" style={{ height: "30vh" }}>
            <img src={Homeimg1} width={"100%"} height={"100%"} />
          </div>,

          <div className="w-100" style={{ height: "30vh" }}>
            <img src={Homeimg2} width={"100%"} height={"100%"} />
          </div>,

          <div className="w-100" style={{ height: "30vh" }}>
            <img src={Homeimg3} width={"100%"} height={"100%"} />
          </div>,
        ]}
      />
      <div className="row mx-0">
        <div className="col-6 p-1 mx-0 my-1">
          <div className="gynae-services-cards ">
            <div className=" gynae-services-icon">
              <img className="gynae-services-icon-img " src={Gynaecology} />
            </div>
            <strong className="fs-12 pb-0">Gynaecology Process</strong>
            <p className=" mb-0 pb-0 fs-12 text-center">
              A gynecologist plays a crucial role in the care of pregnant women.
            </p>
            <span
              onClick={() => setIsOpen3(true)}
              className="gynae-button  bg-light"
            >
              <p className="mb-0">Check It</p>
            </span>
          </div>
        </div>
        <div className="col-6 p-1  mx-0 my-1">
          <div className="gynae-services-cards ">
            <div className=" gynae-services-icon">
              <img className="gynae-services-icon-img " src={surrogacy} />
            </div>
            <strong className="fs-12 pb-0">Surrogacy</strong>
            <p className=" mb-0 pb-0 fs-12 text-center">
              Surrogacy is a complex and sensitive topic that raises many
              ethical and legal questions.
            </p>
            <span
              onClick={() => setIsOpen(true)}
              className="gynae-button  bg-light"
            >
              <p className="mb-0">Check It</p>
            </span>
          </div>
        </div>
        <div className="col-6 p-1 mx-0 my-1">
          <div className="gynae-services-cards ">
            <div className=" gynae-services-icon">
              <img className="gynae-services-icon-img " src={TEST} />
            </div>
            <strong className="fs-12 pb-0">Text Tube</strong>
            <p className=" mb-0 pb-0 fs-12 text-center">
              Test tube baby, also known as in vitro fertilization (IVF).
            </p>
            <span
              onClick={() => setIsOpen1(true)}
              className="gynae-button  bg-light"
            >
              <p className="mb-0">Check It</p>
            </span>
          </div>
        </div>
        <div className="col-6 p-1  mx-0 my-1">
          <div className="gynae-services-cards ">
            <div className=" gynae-services-icon">
              <img className="gynae-services-icon-img " src={ivf} />
            </div>
            <strong className="fs-12 pb-0">IVF</strong>
            <p className=" mb-0 pb-0 fs-12 text-center">
              In vitro fertilization (IVF) is a type of assisted reproductive
              technology
            </p>
            <span
              onClick={() => setIsOpen2(true)}
              className="gynae-button  bg-light"
            >
              <p className="mb-0">Check It</p>
            </span>
          </div>
        </div>
      </div>

      <section className="waiting-section  mt-3 py-3">
        <div className="d-flex mt-3 bg-light p-2 rounded text-light">
          <h6
            onClick={() => handleTabClick(0)}
            className={
              "w-50 text-center py-2 mb-0 curved text-dark " +
              (activeTab === 0 && "waiting-list-active  shadow text-dark")
            }
          >
            Clinics
          </h6>
          <h6
            onClick={() => handleTabClick(1)}
            className={
              "w-50 text-center text-dark py-2 mb-0 curved " +
              (activeTab === 1 && "waiting-list-active shadow text-dark")
            }
          >
            Hospitals
          </h6>
        </div>
      </section>
      {activeTab === 1 && (
        <div className="row  mx-0">
          {hospitals?.length > 0 ? (
            hospitals.map((hospital) => {
              return <HospitaCard hospital={hospital} />;
            })
          ) : (
            <div
              style={{
                height: "200px",
                width: " 100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
              className="fs-1"
            >
              {" "}
              No Data{" "}
            </div>
          )}
        </div>
      )}

      {activeTab === 0 && (
        <div className="row mx-0">
          {clinics.length > 0 ? (
            clinics
              .filter((e, i) => i < 3)
              .map((clinic, key) => {
                return <ClinicCard clinic={clinic} />;
              })
          ) : (
            <div
              style={{
                height: "200px",
                width: " 100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
              className="fs-1"
            >
              {" "}
              No Data{" "}
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeButton={false}
          submitButton={false}
          title="Surrogacy"
        >
          <div style={{ textAlign: "justify" }} className="">
            Surrogacy is a complex and sensitive topic that raises many ethical
            and legal questions. While it can be a viable option for those who
            cannot conceive or carry a pregnancy, it is important to fully
            understand the process before pursuing it. There are two types of
            surrogacy: traditional and gestational. Traditional surrogacy
            involves using the surrogate's egg, making her the biological mother
            of the child. Gestational surrogacy involves using an embryo created
            through IVF using the intended parents' or donors' egg and sperm,
            with no genetic connection between the surrogate and the child. It
            is crucial to work with a reputable surrogacy agency and legal
            counsel to ensure that all parties involved have their rights
            protected and that the process is carried out ethically and
            responsibly. Surrogacy laws vary by country, so it is important to
            research the legal implications of surrogacy in your area before
            pursuing this option. While surrogacy can be a complicated and
            emotional process, it can also be a rewarding way to start or grow a
            family.
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
            and combined with sperm in a laboratory culture dish. The fertilized
            eggs, or embryos, are then transferred back into the woman's uterus
            for implantation and pregnancy. IVF is typically recommended for
            couples who have been trying to conceive for a year or more without
            success, or for women with certain medical conditions that make
            natural conception difficult or impossible. It is also an option for
            same-sex couples or single individuals who want to have a biological
            child. Despite some controversy surrounding IVF, it has helped
            millions of couples worldwide to achieve their dream of having a
            child. The success rates of IVF have improved over the years, thanks
            to advancements in technology and medical research. However, it is
            important to note that IVF is not always successful and can be a
            costly and emotionally challenging process. It is important for
            couples considering IVF to weigh the pros and cons carefully and to
            consult with their healthcare provider to determine if it is the
            right option for them.
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
            the woman's uterus where they can grow and develop into a baby. IVF
            can be a complex and expensive process, but it has helped many
            couples to conceive who may not have been able to do so otherwise.
            Some common reasons for using IVF include blocked or damaged
            fallopian tubes, male factor infertility, ovulation disorders, and
            unexplained infertility. There are also different types of IVF
            procedures, such as traditional IVF, intracytoplasmic sperm
            injection (ICSI), and preimplantation genetic testing (PGT), which
            may be recommended depending on the couple's specific situation.
            It's important to discuss all options with a fertility specialist to
            determine the best course of action for individual circumstances.
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
            The process of caring for a pregnant woman usually involves several
            steps. Firstly, the gynecologist will conduct a thorough medical
            history and physical examination of the woman. This helps to
            identify any pre-existing health conditions that may affect the
            pregnancy. The gynecologist will also perform routine tests, such as
            blood tests and ultrasounds, to monitor the health of the mother and
            the developing fetus. Once the pregnancy progresses, the
            gynecologist will monitor the growth and development of the fetus.
            This involves regular check-ups to ensure that the baby is
            developing normally and that there are no complications. The
            gynecologist will also provide advice on proper nutrition, exercise,
            and other lifestyle factors that can affect the health of the mother
            and baby. As the due date approaches, the gynecologist will provide
            guidance on labor and delivery. This includes discussing pain
            management options, monitoring the progress of labor, and ensuring
            that both mother and baby are safe and healthy. The gynecologist
            will also be present during the delivery to ensure that everything
            goes smoothly. Overall, the process of caring for a pregnant woman
            involves a comprehensive approach that focuses on the health and
            well-being of both the mother and the developing fetus. The
            gynecologist plays a critical role in this process, providing expert
            medical care and guidance every step of the way.
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default Gynaeclogist;
