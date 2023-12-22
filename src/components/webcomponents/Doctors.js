import React, { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../constants/utils";
import DoctorCard from "../App/cards/DoctorCard";
import Container from "../../layout/Container";

function DoctorsList({ source, filter }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      let { data } = await axiosInstance.get("/all-doctors", {
        params: { filter, source: "doctor-page" },
        ...getAuthHeader(),
      });
      setDoctors(data?.doctors);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="row p-0 mx-0 ">
        {doctors?.length > 0 &&
          doctors.map((doctor, key) =>
            <DoctorCard doctor={doctor} key={key}  />
          )}
      </div>
    </Container>
  );
}

export default DoctorsList;
