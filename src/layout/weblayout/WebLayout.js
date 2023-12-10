import React from "react";
import { Outlet } from "react-router-dom";
import WebHeader from "./WebHeader";
import WebFooter from "./WebFooter";
import Search from "../../components/common-components/Search";

const WebLayout = () => {
  return (
    <>
      {/* <WebHeader /> */}
        {/* <Search /> */}
      <Outlet />
      <WebFooter />
    </>
  );
};

export default WebLayout;
