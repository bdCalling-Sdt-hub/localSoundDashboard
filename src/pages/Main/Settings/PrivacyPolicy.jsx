import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    // const {data,isSuccess,isLoading} = useGetAboutUsQuery();
    // if(isLoading){  
    //     return <Loading/>;
    // }
    // console.log(data);
    // const content = data?.data?.attributes?.content;
    const content = "Privacy Policy content";
    return (
        <div className="relative ml-[24px] ">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
       <MdOutlineKeyboardArrowLeft
        className=""
      onClick={() => navigate("/settings")}
      size={34}
    />
        <h1 className="text-[24px] font-semibold ">
          Privacy Policy
        </h1>
      </div>
      <div className=" text-justify bg-secondary mt-[24px] h-[60vh] overflow-y-auto border-2 border-primary rounded-md p-2 font-bold" dangerouslySetInnerHTML={{__html: content}}>
        
      </div>
    <Link to={`/settings/edit-privacy-policy`} className="absolute text-center bottom-[-60px] bg-primary
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit Privacy Policy</Link>
        </div>
    );
}

export default PrivacyPolicy;
