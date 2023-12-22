import React, { useEffect, useState } from "react";
import { axiosInstance, formatPhone } from "../../../constants/utils";
import Container from "../../../layout/Container";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      let { data } = await axiosInstance.get(
        userInfo.userType === "SA"
          ? "/super-admin/patients"
          : "/doctor/patients"
      );
      setPatients(data?.patients);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>

            <div className="" >
              <div className="bg-primary p-2 text-light text-center">
                <h4>Patients</h4>
              </div>
              <div className="col-sm-12 p-0 m-2 overflow-auto" style={{ height: 'calc(100vh - 8rem)'}}>
                <table 
                  className="table table-striped thead-primary w-100 dataTable no-footer"
                  role="grid"
                  aria-describedby="data-table-2_info"
                  style={{ width: "1160px" }}
                >
                  <thead className="sticky">
                    <tr role="row">
                      <th style={{ minWidth: "50px" }}>S.No</th>
                      <th style={{ minWidth: "100px" }}>Name</th>
                      <th style={{ minWidth: "200px" }}>Phone</th>
                      <th style={{ minWidth: "40px" }}>Age</th>
                      <th style={{ minWidth: "100px" }}>gender</th>
                      <th style={{ minWidth: "250px" }}>Address</th>
                      <th style={{ minWidth: "200px" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients?.length > 0 &&
                      patients.map((patient, index) => (
                        <tr role="row" className="odd">
                          <td>{index + 1}</td>
                          <td className="sorting_1">{patient.name}</td>
                          <td>{formatPhone(patient?.phone)}</td>
                          <td>{patient?.age || "-"}</td>
                          <td>{patient?.gender || "-"}</td>
                          <td>{patient?.address}</td>
                          <td>
                            {new Date(
                              patient.createdAt
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

    </Container>
  );
};

export default Patients;
