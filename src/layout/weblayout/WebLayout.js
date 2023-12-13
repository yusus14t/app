import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../../components/App/Layout/Navbar';


const WebLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default WebLayout;
