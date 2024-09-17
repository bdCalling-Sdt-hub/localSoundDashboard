import { Input } from "antd";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import adminUndraw from "../../../assets/admin-undraw.png";
import { useGetUserByTokenQuery } from "../../../redux/features/Users/userApi";

const ProfileInformation = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserByTokenQuery(undefined);
  // console.log(data)
  return (
    <div>
      <div className="flex justify-between items-center ml-[14px] mt-[20px] mb-[33px]">
        <h1 className="text-[30px] font-medium">Profile Information</h1>
        <div
          onClick={(e) => navigate(`/edit-profile/${data?.data?.id}`)}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-primary
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaEdit size={17} />
          <p>Edit Profile</p>
        </div>
      </div>
      <LoaderWraperComp isError={isError} isLoading={isLoading}>
        <div className="lg:flex ml-[14px] p-[36px] rounded-xl gap-5">
          <div className="w-[33%] bg-secondary rounded-xl ml-[24px] flex flex-col justify-center items-center gap-[30px] p-10">
            <div className="w-[242px] h-[242px] overflow-hidden rounded-full">
              <img
                className="rounded-full w-full h-full object-cover"
                src={
                  data?.data?.image
                    ? `${import.meta.env.VITE_SERVER_URL}/${data?.data?.image}`
                    : adminUndraw
                }
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[20px] ">
                {data?.data?.type.toUpperCase() || "Admin"}
              </p>
              <h1 className="text-[30px] font-medium">
                {data?.data?.name?.toUpperCase() || "Ahad Hossain Aiman"}
              </h1>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-[25px]">
                <div className="flex-1">
                  <label htmlFor="" className=" text-[18px] font-medium">
                    Name
                  </label>
                  <Input
                    placeholder="First name"
                    value={data?.data?.name || "N/A"}
                    className="p-4 bg-secondary
                  rounded w-full 
                  justify-start 
                  border-2 
                  border-primary
                  mt-[12px]
                  items-center
                  gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                    type="text"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor=""
                  className="  text-[18px] font-medium mb-[12px]"
                >
                  Email
                </label>
                <Input
                  placeholder="Email"
                  value={data?.data?.email || "N/A"}
                  className="p-4 bg-secondary
                rounded w-full 
                justify-start 
                border-2 
                border-primary
                mt-[12px]
                items-center
                gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor=""
                  className="  text-[18px] font-medium mb-[12px]"
                >
                  Phone Number
                </label>
                <Input
                  placeholder="Phone"
                  value={data?.data?.number || "N/A"}
                  className="p-4 bg-secondary
                rounded w-full 
                justify-start 
                border-2 
                border-primary
                mt-[12px]
                items-center
                gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                  type="text"
                  readOnly
                />
              </div>
              {/* <div className="flex-1">
              <label
                htmlFor=""
                className="text-white  text-[18px] font-medium mb-[12px]"
              >
                Date Of Birth
              </label>
              <Input
                // onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Date Of Birth"
                value={currentUser?.dateOfBirth?.split("T")[0]}
                className="p-4 bg-[#706768]
               rounded w-full 
               justify-start 
               border-none
               mt-[12px]
               text-white
               items-center 
               gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768]"
                prefix={<CiCalendarDate color="white" size={20} />}
               
              />
            </div> */}
            </div>
          </div>
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default ProfileInformation;
