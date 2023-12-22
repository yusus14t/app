import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../constants/utils";
import ClinicCard from "../App/cards/ClinicCard";
import Container from "../../layout/Container";


function Clinics({  }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    getAllClinics();
  }, []);

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {params: { isClinic: true }});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="row mx-0 px-0">
        { clinics.length &&
          clinics.map((clinic, key) =>
            <ClinicCard clinic={clinic} key={key} />
          )
        }
      </div>
    </Container>
  );
}

export default Clinics;
