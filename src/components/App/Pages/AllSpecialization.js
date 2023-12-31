import React, { useEffect, useState } from "react";
import { axiosInstance, truncate } from "../../../constants/utils";
import { Link } from "react-router-dom";
import m from "../../../assets/images/1920x1280-1.jpg";
import "./Allspecialization.css";
import Container from "../../../layout/Container";

const AllSpecialization = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    getSpecialization();
  }, []);

  const getSpecialization = async () => {
    let { data } = await axiosInstance.get("/get-specializations");
    setSpecializations(data?.specializations?.slice(0,20));
  };
  return (

    <Container>
      <h4 className="bg-light text-center text-success p-2 my-3"> All Specializations</h4>
      <div className="d-flex flex-wrap container">
        {specializations.map((specialisation) => (
          <div className="col-6 px-2 m-0">
            <Link to={`/specialization/${specialisation?.id}`}>
              <div className="spicialization-card">
                <div className="specialization-icon">
                  <img className="spe-icon"  src={specialisation?.icon} />
                </div>
                <div className="">
                  <strong className="mb-1 fs-12 text-center">
                    {specialisation.name.slice(
                      0,
                      specialisation.name.indexOf("(") >= 0 ? specialisation.name.indexOf("(") : specialisation.name.length
                    )}
                  </strong>
                  <p className="mb-0 fs-12 toh text-center">
                    {truncate(
                      specialisation.name.slice(
                        specialisation.name.indexOf("(") >= 0 ? specialisation.name.indexOf("(") : specialisation.name.length
                      ),
                      50
                    )}
                  </p>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </Container>

  );
};

export default AllSpecialization;
