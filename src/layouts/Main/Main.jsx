import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div className="flex p-[32px] min-h-screen">
      <div className="fixed top-3 left-3 h-[90%]">
      <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="ml-[350px] fixed top-3 w-[calc(100%-410px)] z-20">
          <Header />
        </div>
        <div className="overflow-y-auto h-full flex-1 ml-[74px] pt-[80px] pl-[275px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;