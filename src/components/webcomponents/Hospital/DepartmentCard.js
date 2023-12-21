import React from "react";
import NO_PHOTO from "../../../assets/images/no-photo.png";
import { Link } from "react-router-dom";
import { getFullPath } from "../../../constants/utils";

const DepartmentCard = ({ departments }) => {
  return (
    <div className="row mx-0">
      {departments?.map((department, key) => {
        return (
          <div className="col-lg-6 col-md-10" key={key}>
            <div className="bg-white light-shadow curved p-3 my-2">
              <div className="d-flex align-items-center">

                <div className="image">
                  <img src={department?.organizationId?.doctor?.doctorPhoto ? getFullPath(department?.organizationId?.doctor?.doctorPhoto) : NO_PHOTO}
                    className="curved department-card-image" alt="profile" style={{ objectFit: 'contain' }} />
                </div>

                <div className="departments-details w-100 ms-3">
                  <h4>{department?.organizationId?.name}</h4>
                  <p className="my-1 text-muted">
                    {department?.organizationId?.specialization
                      ? department?.organizationId?.specialization?.map( (sp) => sp.name  )
                      : "-"}
                  </p>
                  <p className="text-muted"> Room No: {department?.organizationId?.room}</p>

                  <div className="color-primary mt-2 d-flex flex-row align-items-center">
                    <Link  className="btn btn btn-secondary"  to={`/department-detail/${department?.organizationId?._id}`} >
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
  );
};

export default DepartmentCard;
