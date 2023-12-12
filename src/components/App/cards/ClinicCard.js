import React from "react";
import "./ClinicCard.css";
import { CLINIC_DEFAUL_IMG } from "../../../constants/constant";
import { formatPhone, getFullPath, truncate } from "../../../constants/utils";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faLocationDot,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";

export default ({ clinic = {} }) => {
  return (
    <div className="col-lg-3 col-md-6 mx-0 px-0 ">
      <Link to={`/clinic-detail/${clinic?._id}`}>
        <div className=" clinic-app-card">
          <p className="head-clinic  text-dark">CLINIC</p>
          <div className="d-flex overflow-hidden">
            <div className="clinic-img-container">
              <img
                src={
                  clinic?.photo ? getFullPath(clinic?.photo) : CLINIC_DEFAUL_IMG
                }
                className="clinic-app-img"
              />
            </div>
            <div className="clinic-info">
              <div className="px-1 truncate1">
                <p className="mb-0 fs-5 font-weight-bold dr-name">
                  {clinic?.name}
                </p>
              </div>
              <div className="mb-1 fs-8 px-2 specialization">
                {truncate(
                  clinic.specialization?.name ||
                    (clinic?.specialization?.length
                      ? "Multispecialist"
                      : "-"),
                  22
                )}
              </div>
              <div className="fs-12 mt-2">
                {" "}
                <FontAwesomeIcon className="me-2 " icon={faSquarePhone} />{" "}
                {formatPhone(clinic.phone)}
              </div>
              <div className="d-flex fs-12">
                <div>
                  <FontAwesomeIcon icon={faIndianRupeeSign} /> &nbsp;&nbsp;{" "}
                  {clinic.fee} &nbsp; |
                </div>
                &nbsp;&nbsp;{" "}
                {clinic.bookingStatus ? (
                  <div className="text-success">Booking Open</div>
                ) : (
                  <div className="text-danger">Booking Closed</div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <FontAwesomeIcon className="mx-2" icon={faLocationDot} />
            </div>
            <div className="mb-1 address fs-12">
              {" "}
              {truncate(clinic.address || "-", 70)}
            </div>
          </div>
          {/* <div className="services-clinic d-flex">
            {clinic.services.map((service) => (
              <div className="mb-0 service-cap bg-light">{service.name}</div>
            ))}
          </div> */}
        </div>
      </Link>
    </div>
  );
};
