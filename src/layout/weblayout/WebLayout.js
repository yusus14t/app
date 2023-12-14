import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../../components/App/Layout/Navbar';
import { APP_MENU_ITEM } from "../../constants/constant";


const WebLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar items={APP_MENU_ITEM.APP} popItems={APP_MENU_ITEM.APP_POPUP} source={'app'} />
    </>
  );
};

export default WebLayout;
