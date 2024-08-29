
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetSettingsQuery } from "../../../redux/features/settings/settingApi";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetSettingsQuery([]);
    const content = "This is Terms & Conditions content";
    return (
        <div className="relative ml-[24px] ">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
       <MdOutlineKeyboardArrowLeft
        className=""
      onClick={() => navigate("/settings")}
      size={34}
    />
        <h1 className="text-[24px] font-semibold ">
          Terms & Conditions
        </h1>
      </div>
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        dataEmpty={!data?.data?.terms}
        height={"h-[63vh]"}
      >
        <div
          className=" text-justify bg-secondary mt-[24px] h-[60vh] overflow-y-auto border-2 border-primary rounded-md p-4"
          dangerouslySetInnerHTML={{ __html: data?.data?.terms || content }}
        ></div>
      </LoaderWraperComp>
    <Link to={`/settings/edit-terms-conditions`} className="absolute text-center bottom-[-60px] bg-primary
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit Terms & Conditions</Link>
        </div>
    );
}

export default TermsAndConditions;



