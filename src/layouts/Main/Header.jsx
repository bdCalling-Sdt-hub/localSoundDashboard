import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Button, Menu } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetUserByTokenQuery } from "../../redux/features/Users/userApi";
// import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const navigate = useNavigate();
  const { data } = useGetUserByTokenQuery(undefined);
  return (
    <div className="flex justify-between items-center rounded-md mb-[24px] p-[16px] bg-secondary">
      <div className="flex items-center gap-5">
        <MdMenu className="h-[42px] w-[42px] text-secondary" />
        {location.pathname == "/dashboard/users" ||
        location.pathname == "/dashboard/appointments" ||
        location.pathname == "/dashboard/earnings" ? (
          <div className="">{/* <SearchBox /> */}</div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-5">
        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        <div
          onClick={(e) => navigate("notification")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "red" }} count={1}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={` bg-primary w-[52px] h-[52px] text-secondary border-2 border-secondary rounded-full p-2 `}
            />
          </Badge>
        </div>
        {/* </Dropdown> */}
        <div
          onClick={() => navigate("profile-information")}
          className="flex items-center cursor-pointer mr-[30px] bg-primary text-white rounded-full p-1"
        >
          {data?.data?.image ? (
            <div className="w-[52px] h-[52px] overflow-hidden rounded-full">
              <img
                className="rounded-full w-full h-full object-cover"
                src={`${import.meta.env.VITE_SERVER_URL}/${data?.data?.image}`}
                alt=""
              />
            </div>
          ) : (
            <FaRegUser className="text-secondary border-2 border-secondary rounded-full p-2 w-[42px] h-[42px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
