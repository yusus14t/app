import React from "react";
import Doctor from "../../assets.app/img/dashboard/doctor-3.jpg";
// import { Link,  } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { userRoutes } from "../../constants/constant";
import { getFullPath } from "../../constants/utils";

function WebSidebar({ isOpen, setIsOpen }) {
  const MENU_ITEM = [
    { id: "home", name: "Home", path: "/" },
    { id: "gynae", name: "Gynae", path: "/gynae" },
    { id: "hospitals", name: "Hospitals", path: "/hospitals" },
    { id: "clinics", name: "Clinics", path: "/clinics" },
    { id: "doctors", name: "Doctors", path: "/doctors" },
    { id: "radiologist", name: "Radiologist", path: "/radiologist" },
    { id: "homeopathy", name: "Homeopathy", path: "/homeopathy" },
    { id: "aboutus", name: "About Us", path: "/about" },
    { id: "contactus", name: "Contact Us", path: "/contact" },
  ];

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const logout= () =>{
    localStorage.clear()
  }

  return (
    <aside
      className={`side-nav fixed ms-aside-scrollable ms-aside ps ps--active-y  ${
        !isOpen ? "ms-aside-left" : ""
      } `}
    >
      {/* <!-- Logo --> */}
      <div className="logo-sn ms-d-block-lg m-container">
        <div className="m-container">
          <div className="">
            <Link to="/" className="text-center">
              {" "}
              <img
                className="profile-image"
                src={
                  userInfo?.organizationId?.photo
                    ? getFullPath(userInfo?.organizationId?.photo)
                    : Doctor
                }
                alt="logo"
              />
            </Link>
            <p className="m-title">
              {userInfo ? (
                userInfo.name ||
                  userInfo.hospitalId?.name ||
                  userInfo.organizationId?.name
              ) :""}
            </p>
          </div>
          <div className="m-footer">
            {userInfo ? (
              <>
                <Link
                  to={`${userRoutes[userInfo?.userType]?.path}/dashboard`}
                  className="m-login"
                >
                  Dashboard
                </Link>

                <Link onClick={logout} className="m-login">
                  LogOut
                </Link>
              </>
            ) : (
              <Link to={"/login"} className="m-login">
                Login/Signup
              </Link>
            )}
            {/* <Link>logout</Link> */}
          </div>
          <div className="height-auto ">
            <ul className="m-menu ">
              {MENU_ITEM.map((item, key) => (
                <li
                  className="m-menu-item w-100 pe-3"
                  key={key}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link to={item.path} className="text-white " key={item.id}>
                    <div className=" d-flex justify-content-between">
                      <div>{item.name}</div>
                      <div>
                        <FontAwesomeIcon
                          // style={{ marginLeft: "100px" }}
                          className="m-icon"
                          icon={faAnglesRight}
                        />
                      </div>
                    </div>
                    {/* <hr className="underline" /> */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default WebSidebar;
