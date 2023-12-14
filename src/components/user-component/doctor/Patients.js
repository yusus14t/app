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
      <div className="ms-content-wrapper ">
        {console.log(patients)}
        <div className="row">
          <div className="col-md-12">
            <div
              style={{ overflow: "auto" }}
              className="ms-panel inner-content-height"
            >
              <div className="ms-panel-header ms-panel-custome">
                <h6>Patient List</h6>
              </div>
              <div className="ms-panel-body p-0 ">
                <div className="table-responsive">
                  <div
                    id="data-table-2_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-12 p-0 m-2">
                        <table
                          id="data-table-2"
                          className="table table-striped thead-primary w-100 dataTable no-footer"
                          role="grid"
                          aria-describedby="data-table-2_info"
                          style={{ width: "1160px" }}
                        >
                          <thead>
                            <tr role="row">
                              <th style={{ width: "50px" }}>S.No</th>
                              <th style={{ width: "84px" }}>Name</th>
                              <th style={{ width: "102px" }}>Phone</th>
                              <th style={{ width: "44px" }}>Age</th>
                              <th style={{ width: "44px" }}>gender</th>
                              <th style={{ width: "200px" }}>Address</th>
                              <th style={{ width: "150px" }}>Date</th>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Patients;
