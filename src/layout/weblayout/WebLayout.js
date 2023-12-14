import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../../components/App/Layout/Navbar';
import { APP_MENU_ITEM } from "../../constants/constant";


const WebLayout = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [ pathname ])

  return (
    <>
      <Outlet />
      <Navbar items={APP_MENU_ITEM.APP} popItems={APP_MENU_ITEM.APP_POPUP} source={'app'} />
    </>
  );
};

export default WebLayout;
