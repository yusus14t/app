import React, { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../constants/utils";
import DoctorCard from "../App/cards/DoctorCard";
import Container from "../../layout/Container";
import { useLocation } from "react-router-dom";
import Filter from "../App/Pages/Filter";


export default () => {
  const [doctors, setDoctors] = useState([]);
  const [ filter, setFilter ] = useState({});

  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('search')

  useEffect(() => {
    getAllDoctors();
  }, [ filter, ]);

  const getAllDoctors = async () => {
    try {
      let { data } = await axiosInstance.get("/all-doctors", {  params: { search: searchQuery, filter }, ...getAuthHeader() });

      setDoctors(data?.doctors);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Filter title={searchQuery ? `Search : ${ searchQuery }` : 'Doctors'} source={'Doctor'} callback={( data ) => setFilter( data )} />
      <div className="row p-0 mx-0 ">
        {doctors?.length > 0 ?
          doctors.map((doctor, key) =>
            <DoctorCard doctor={doctor} key={key}  />
          )
          :
          <div ><h5 className="text-muted text-center">No Doctors</h5></div>
        }
      </div>
    </Container>
  );
}