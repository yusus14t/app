import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../../components/App/Layout/Navbar';


const WebLayout = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [ pathname ])

  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default WebLayout;
