import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NO_PHOTO from '../../assets/images/no-photo.png'
import logo from '../../assets/img/logo/logo.jpg'
import WebSidebar from "./WebSidebar";
import { Dropdown, Item } from "../../components/common-components/Dropdown";
import { WEB_MENU_ITEMS, userRoutes } from "../../constants/constant";
import { getFullPath } from "../../constants/utils";

const WebHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [isLogin] = useState(Boolean(userInfo))
  const [isSideBbarOpen, setIsSidebarOpen] = useState(false);

  const Logout = () => {
    localStorage.clear()
    window.location.replace('/login')
  }

  return (
    <>
      <WebSidebar isOpen={isSideBbarOpen} setIsOpen={setIsSidebarOpen} />
      <nav className="navbar ms-navbar">
        <div className="ms-aside-toggler ms-toggler ps-0">
          <span className="ms-toggler-bar bg-white"></span>
          <span className="ms-toggler-bar bg-white"></span>
          <span className="ms-toggler-bar bg-white"></span>
        </div>
        <div className="docfind-logo">
          <Link className="sigma_logo" to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="menu_item">
          <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
            {
              WEB_MENU_ITEMS.map( item => (
                <li className="ms-nav-item  ms-d-none" key={item.id}>
                  <NavLink to={item.path} className="text-white" data-bs-toggle="modal" >{item.name}</NavLink>
                </li>
              ))
            } 
          </ul>
        </div>
        {isLogin ? (
          <div className="ms-nav-item ms-nav-user dropdown d-profile cursor-pointer">
            <Dropdown
              toggle={
                <img
                  className="ms-user-img ms-img-round float-end avatar"
                  src={userInfo?.photo || userInfo?.organizationId?.photo ? getFullPath(userInfo?.photo || userInfo?.organizationId?.photo) : NO_PHOTO}
                  alt="people"
                />
              }
            >
              <li className="dropdown-menu-header">
                <h6 className="dropdown-header ms-inline m-0">
                  <span className="text-disabled">Welcome, { userInfo?.fullName || userInfo?.organizationId?.name}</span>
                </h6>
              </li>
              <li className="dropdown-divider"></li>

            {userInfo && <> 
                <Link className="fs-14" to={userRoutes[userInfo.userType]?.path}>
                  <li className="dropdown-menu-header cursor-pointer dropdown-menu-active px-3 py-1">
                    <span>Dashboard</span> 
                  </li>
                </Link>
                <Item onClick={() => Logout()}><span className="fs-14 p-2"><i className="flaticon-user"></i>Logout</span></Item>
            </>}
          </Dropdown>
        </div>)
          :
         <Link to={"/login"} className="login_button">Login/Signup</Link>
        }
        <div className="ms-toggler ms-d-block-sm pe-0 ms-nav-toggler" data-bs-toggle="slideDown" data-bs-target="#ms-nav-options" onClick={() => { setIsSidebarOpen(!isSideBbarOpen) }}>
          <span className="ms-toggler-bar bg-white"></span>
          <span className="ms-toggler-bar bg-white"></span>
          <span className="ms-toggler-bar bg-white"></span>
        </div>
      </nav>
    </>
  );
};

export default WebHeader;
