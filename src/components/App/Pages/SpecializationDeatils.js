import React, { useEffect, useState } from "react";
import "./SpecializationDetails.css";
import {  useParams } from "react-router-dom";
import { getAuthHeader, axiosInstance } from "../../../constants/utils";
import HospitaCard from "../cards/HospitaCard";
import ClinicCard from "../cards/ClinicCard";
import Container from "../../../layout/Container";

const SpecializationDetails = () => {
  const params = useParams();
  const [clinics, setClinics] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [specialization, setSpecialization] = useState([]);

  useEffect(() => {
    getSpecialization();
  }, [params.id]);

  useEffect(() => {
    getAllClinics();
    getAllHospitals();
  }, [specialization]);

  const getSpecialization = async () => {
    try {
      let { data } = await axiosInstance.get(`/specialization/${params.id}`);
      setSpecialization(data?.specializations);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {
        params: {
          filter: { specialization: specialization?.id },
          isClinic: true,
        },
        ...getAuthHeader(),
      });
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals", {
        params: { filter: { specialization: specialization?.id } },
        ...getAuthHeader(),
      });
      setHospitals(data?.organization);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Container>
        {
          <div className="splz-deatial  ">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div className="mb-3 col-12  specialization-image-container w-100 ">
                <img
                  className="specialization-image"
                  src={specialization?.image}
                  alt=""
                />
              </div>
              
            </div>
            <div className=" text-center mt-2">
            <h4 className="text-center bg-light p-2 text-success">
              {specialization?.name}
            </h4>
        </div>
              <div className="mb-3 overflow-auto m-3 " style={{ height: '15rem'}}>
                <p className="details-text">{specialization?.description}</p>
              </div>

            <section className="waiting-section  mt-3 py-3">
              <div className="d-flex mt-3 bg-light p-2 rounded text-light">
                <h6
                  onClick={() => handleTabClick(0)}
                  className={
                    "w-50 text-center py-2 mb-0 curved text-dark " +
                    (activeTab === 0 && "waiting-list-active text-dark")
                  }
                >
                  Clinics
                </h6>
                <h6
                  onClick={() => handleTabClick(1)}
                  className={
                    "w-50 text-center text-dark py-2 mb-0 curved " +
                    (activeTab === 1 && "waiting-list-active text-dark")
                  }
                >
                  Hospitals
                </h6>
              </div>
            </section>
            {activeTab === 1 && (
              
                <div className="row mx-0">
                  {hospitals?.length > 0 ?
                    hospitals.map((hospital) => {
                      return <HospitaCard hospital={hospital} />;
                    }) : (<div style={{height:"200px",width:" 100%", display:"flex", alignItems:"center" , justifyContent:"center" ,textAlign:"center"}} className="fs-1"> No Data </div>)}
                </div>
            ) }

            {activeTab === 0 && (
                <div className="row mx-0">
                  {clinics.length > 0 ?
                    clinics
                      .filter((e, i) => i < 3)
                      .map((clinic, key) => {
                        return <ClinicCard clinic={clinic} />;
                      }) :(<div style={{height:"200px",width:" 100%", display:"flex", alignItems:"center" , justifyContent:"center" ,textAlign:"center"}} className="fs-1"> No Data </div>)}
              </div>
            ) }
          </div>
        }
      </Container>
    </>
  );
};

export default SpecializationDetails;
