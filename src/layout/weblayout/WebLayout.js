import React from "react";
import { Outlet } from "react-router-dom";
// import WebHeader from "./WebHeader";
// import Search from "../../components/common-components/Search";
import Tabs from '../../components/App/Tabs';


const WebLayout = () => {
  return (
    <>
      <Outlet />
      <Tabs />
    </>
  );
};

export default WebLayout;
