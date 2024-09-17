import { Skeleton } from "antd";
import { useGetTotalEaringQuery } from "../redux/features/Earnings/earingApi";
import { useGetUserStatusQuery } from "../redux/features/Users/userApi";


const Status = () => {
  const { data, isError, isLoading } = useGetTotalEaringQuery();
  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
  } = useGetUserStatusQuery();
  if (isLoading || userIsLoading) {
    return (
      <div className="w-full grid grid-cols-3 gap-7 py-[36px]">
        <Skeleton active className="w-full h-full " />
        <Skeleton active className="w-full h-full " />
        <Skeleton active className="w-full h-full " />
      </div>
    );
  }
  if (isError || userIsError) {
    return <h1 className="text-center">Something want wrong!</h1>;
  }
  const statusData = {
    totalEarning: data?.data?.totalEarnings,
    ...userData?.data,
  };
//   console.log({ statusData });
  return (
    <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
        {/* <LuBadgeDollarSign size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className=" font-medium text-[20px] text-textColor">
            Total Earnings
          </p>
          <h1 className="text-primary text-[44px] font-medium">
            $ {statusData.totalEarning || "0.00"}
          </h1>
        </div>
      </div>
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
        {/* <MdEmojiEvents size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className="text-textColor font-medium  text-[20px]">Total Users</p>
          <h1 className="text-primary text-[44px] font-medium">
            {statusData.totalUser || 0}
          </h1>
        </div>
      </div>
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2">
        {/* <FaUsers size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className="text-textColor font-medium text-[20px]">Total Artist</p>
          <h1 className="text-primary text-[44px] font-medium">
            {statusData.totalArtist || 0}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
