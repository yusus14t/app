import React, { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../../constants/utils";
import { Navigate } from "react-router-dom"
import DoctorCard from "../../App/cards/DoctorCard";

function DoctorsList({ source, filter }) {
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      let { data } = await axiosInstance.get("/all-doctors", { params: { filter, source: 'doctor-page' }, ...getAuthHeader() });
      setDoctors(data?.doctors);
    } catch (error) {
      console.error(error)
    }
  };
 
  return (
    <div>
      <div className="row p-0 mx-0 ">
        {doctors?.length > 0 &&
          doctors
            .filter(
              (doctor, index) =>
                (source === "homepage" && index < 7) ||
                source !== "homepage"
            )
            .map((doctor, key) => (<DoctorCard doctor={doctor} key={key} />
            ))}
      </div>
    </div>
  );
}



export default DoctorsList;
