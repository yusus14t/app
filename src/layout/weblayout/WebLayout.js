import React from "react";
import { Outlet } from "react-router-dom";
// import WebHeader from "./WebHeader";
// import Search from "../../components/common-components/Search";
import Tabs from '../../components/App/Tabs';
import SearchBar from "../../components/App/Layout/SearchBar";


const WebLayout = () => {
  return (
    <>
      <SearchBar/>
      <Outlet />
      <Tabs />
    </>
  );
};

export default WebLayout;
