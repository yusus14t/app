import React from "react";
import { Link } from "react-router-dom";
import clinicPhoto2 from "../../assets.web/img/clinic-grid/348x350-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getFullPath } from "../../constants/utils";

export function ClinicListCard({ clinics }) {
  return (
    <>
      {console.log(clinics)}
      {clinics.length > 0 &&
        clinics.map((clinic, key) => (
          <div className="col-lg-4 mb-4 col-md-4 mcard mt-4" key={key}>
            <div style={{ background: "#ffffff" }} className="clinic-card ">
              <div className="inner-card-border"></div>
              <div style={{ marginBottom: "-22px" }}>
                <img
                  className="clinic-img"
                  src={
                    clinic?.photo ? getFullPath(clinic?.photo) : clinicPhoto2
                  }
                  alt=""
                />
                <span className=" p-2 clinic-title">
                  {clinic?.name} : <span className="open">close</span>
                </span>
              </div>
              <div className="clinic-details d-flex flex-row justify-content-between">
                <div className="mt-2">
                  <h6 className="clinic-specialization text-disabled">
                    {"Dermatologist"}
                  </h6>
                  <div className="contact-info">
                    <h6 className="text-disabled mt-1">Contact Info :</h6>
                    <div>
                      <FontAwesomeIcon className="clinic-icon" icon={faPhone} />
                      <p className="d-inline-block ml-2 mb-0">
                        {clinic?.phone ? "+91" + clinic?.phone : ""}
                      </p>
                    </div>
                    <div>
                      <p className="ml-2 adjust hospital-address  ">
                        <FontAwesomeIcon
                          className="clinic-icon address-icon"
                          icon={faLocationDot}
                        />
                        {clinic?.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h6 className="text-disabled">Timming</h6>
                  <div className="d-flex flex-column justify-contant-between">
                    <div className="">
                      <p className="clinic-timming mb-0">
                        Morning : 08 AM to 11 PM
                      </p>
                      <p className="clinic-timming mb-0">
                        Evening : 05 PM to 11 PM
                      </p>
                    </div>
                    <Link
                      className="text-light clinic-btn  btn btn1 btn-primary shadow-none"
                      to={`/clinic-detail/${clinic?._id}`}
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
