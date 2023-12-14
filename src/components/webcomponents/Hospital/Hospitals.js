import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../constants/utils";

import HospitaCard from "../../App/cards/HospitaCard";
import Container from "../../../layout/Container";

const HospitalGrid = ({ }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals");
      setHospitals(data?.organization);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="row mx-0 ">
        {hospitals.length &&
          hospitals.map((hospital) => <HospitaCard hospital={hospital} />)}
      </div>
    </Container>
  );
};

export default HospitalGrid;
