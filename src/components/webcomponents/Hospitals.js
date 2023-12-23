import React, { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../constants/utils";

import HospitaCard from "../App/cards/HospitaCard";
import Container from "../../layout/Container";
import { useLocation } from "react-router-dom";
import Filter from "../App/Pages/Filter";

const HospitalGrid = ({ }) => {
  const [hospitals, setHospitals] = useState([]);
  const [ filter, setFilter ] = useState({});
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search')

  useEffect(() => {
    getHospitals();
  }, [ filter, ]);

  const getHospitals = async () => {
    try {
      let { data } = await axiosInstance.get("/hospitals", { params: { search: searchQuery, filter }, ...getAuthHeader() });
      setHospitals(data?.organization);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Filter title={searchQuery ? `Search : ${ searchQuery }` : 'Hospitals'} callback={( data ) => setFilter( data ) } />
      <div className="row mx-0 ">
        {hospitals.length ?
          hospitals.map((hospital) =>
            <HospitaCard hospital={hospital} />
          )
        :<h5 className="text-muted text-center">No Hospitals</h5>
        }
      </div>
    </Container>
  );
};

export default HospitalGrid;
