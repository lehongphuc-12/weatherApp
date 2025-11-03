import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayout.css";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
