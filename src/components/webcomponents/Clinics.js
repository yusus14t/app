import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../constants/utils";
import ClinicCard from "../App/cards/ClinicCard";
import Container from "../../layout/Container";
import { useLocation } from "react-router-dom";
import Filter from "../App/Pages/Filter";


function Clinics({  }) {
  const [clinics, setClinics] = useState([]);
  const [ filter, setFilter ] = useState({});
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search')

  useEffect(() => {
    getAllClinics();
  }, [filter, ]);

  const getAllClinics = async () => {
    try {
      let { data } = await axiosInstance.get("/all-clinics", {params: { isClinic: true, search: searchQuery, filter }});
      setClinics(data?.clinics);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Filter title={searchQuery ? `Search : ${ searchQuery}` : 'Clinics' } callback={( data ) => setFilter(data) } />
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
