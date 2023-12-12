import React, { useEffect, useState } from "react";
import "./SpecializationDetails.css";
import Container from '../Layout/Container'
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { getAuthHeader, getFullPath,axiosInstance, convertTo12HourFormat,  } from "../../../constants/utils";
import { HOSPITAL_DEFAUL_IMG, NUMBER_TO_DAY } from "../../../constants/constant";
import NO_PHOTO from "../../../assets/images/no_images/no_clinic.jpg";
import HospitaCard from "../cards/HospitaCard";
import ClinicCard from "../cards/ClinicCard";
import Modal from '../../common-components/Modal'




const SpecializationDetails = () => {
  const params = useParams()
  const [clinics, setClinics] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [specialization, setSpecialization] = useState([]);

  useEffect(() => {
    getSpecialization();
  }, [ params.id, ]);

  useEffect(() => {
    getAllClinics();
    getAllHospitals();
  },[specialization])

  const getSpecialization = async () => {
    try{
      let { data } = await axiosInstance.get(`/specialization/${params.id}`);
      setSpecialization(data?.specializations);
    } catch(error){ console.error(error) }
  };
   
  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", { params: { filter: {specialization: specialization?.id }, isClinic: true }, ...getAuthHeader()});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals", { params: { filter: {specialization: specialization?.id }}, ...getAuthHeader()});
      setHospitals( data?.organization );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Container>
      <div className="">
        <div className="  banner text-center">
          <h3 className="title pt-0">{specialization?.name}</h3>
        </div>
      </div>
      {
        <div className="splz-deatial container mt-3">
          <div style={{display:"flex",flexWrap:"wrap", justifyContent:"space-between"}} >
            <div className="mb-3 col-12 w-100 ">
              <img
                className="specialization-image"
                src={specialization?.image}
                alt=""
              />
            </div>
            <div className="deatil  mb-3 ">
              <p className="details-text">{specialization?.description}</p>
            </div>
          </div>

          <div className="">
            <h2 className="text-center">Hospitals</h2>
            <div className="row">
              {hospitals?.length > 0 &&
                hospitals.map((hospital) => { return ( <HospitaCard hospital={hospital}/>)})}
            </div>
          </div>
          <div className="">
            <h2 className="text-center">Clinics</h2>
            <div className="row">
              {clinics.length > 0 &&
                clinics
                  .filter((e, i) => i < 3)
                  .map((clinic, key) => {
                    return ( <ClinicCard clinic={clinic}/>)
                  })}
            </div>
          </div>
        </div>
      }
      
    </Container>
    </>
  );
};

export default SpecializationDetails;
