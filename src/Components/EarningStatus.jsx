import { Skeleton } from "antd";
import { useGetTotalEaringQuery } from "../redux/features/Earnings/earingApi";

const EarningStatus = () => {
  const { data, isError, isLoading } = useGetTotalEaringQuery();

  // console.log(data);
  if (isLoading) {
    return  (
      <div className="w-full grid grid-cols-3 gap-7 py-[33px]">
        <Skeleton active className="w-full h-full " />
        <Skeleton active className="w-full h-full " />
        <Skeleton active className="w-full h-full " />
      </div>
    );
  }
  if (isError) {
    return <h1 className="text-center">Something want wrong!</h1>;
  }
  return (
    <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
        {/* <LuBadgeDollarSign size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className=" font-medium text-[20px] text-textColor">
            Total Earnings
          </p>
          <h1 className="text-primary text-[44px] font-medium">
            $ {data?.data?.totalEarnings}
          </h1>
        </div>
      </div>
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
        {/* <MdEmojiEvents size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className="text-textColor font-medium  text-[20px]">
            Total Transaction
          </p>
          <h1 className="text-primary text-[44px] font-medium">
            {data?.data?.totalPayments}
          </h1>
        </div>
      </div>
      <div className="bg-secondary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2">
        {/* <FaUsers size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
        <div className="">
          <p className="text-textColor font-medium text-[20px]">
            Total Subscribers
          </p>
          <h1 className="text-primary text-[44px] font-medium">
            {data?.data?.totalSubscribers}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EarningStatus;
