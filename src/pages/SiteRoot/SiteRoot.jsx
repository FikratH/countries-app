import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layout/Header/Header";

const SiteRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SiteRoot;
