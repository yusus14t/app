import React from "react";
import NO_PHOTO from "../../../assets/images/no-photo.png";
import { Link } from "react-router-dom";
import { getFullPath } from "../../../constants/utils";
const DepartmentCard = ({ departments }) => {
  return (
    <>
        <div className="row mx-0">
          {departments?.map(( department, key )=>{
            return (
              <div className="col-lg-6 col-md-10" key={key}>
                <div className="card p-2 department-card">
                  <div className="d-flex align-items-center">
                    <div className="image">
                      <img
                        src={ department?.organizationId?.doctor?.doctorPhoto ? getFullPath(department?.organizationId?.doctor?.doctorPhoto) : NO_PHOTO}
                        // src={department?.organizationId?.photo ? getFullPath( department?.organizationId?.photo) : NO_PHOTO }
                        className="rounded department-card-image"
                        alt=""
                      />
                    </div>

                    <div className="departments-details ">
                      <h5 className="mb-0 mt-0 department-card-name">
                        <h5 className="mb-0 department-card-name">
                          <span className="text-dark mb-0 "></span> {department?.organizationId?.doctor?.name}
                        </h5>
                        <span style={{fontSize:"15px"}} className="mb-0">Dept. &nbsp;{department?.organizationId?.name}</span>
                      </h5>
                      <span>
                        {department?.organizationId?.specialization
                          ? department?.organizationId?.specialization?.map(
                              (sp) => sp.name
                            )
                          : "-"}
                      </span>
                      <br />
                      <span> Room No: {department?.organizationId?.room}</span>

                      <div className="color-primary mt-2 d-flex flex-row align-items-center">
                        <Link
                          className="btn btn btn-secondary"
                          to={`/department-detail/${department?.organizationId?._id}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>
    </>
  );
};

export default DepartmentCard;
