import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../../../Components/SubscriptionCard";
import { useGetAllSubscriptionQuery } from "../../../redux/features/Subscription/subscription.api";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";

const Subscription = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllSubscriptionQuery(undefined);
  // if (isLoading) {
  //   return <MagnifingGlassLoader />;
  // }
  // if (isError) {
  //   return <h1 className="text-center">Something want wrong!</h1>;
  // }

  //   const subscription = [
  //     {
  //       id: 1,
  //       name: "Basic",
  //       price: "4.99",
  //       feature: [
  //         {
  //           id: 1,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 2,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 3,
  //           name: "Personalized Diet",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "Gold",
  //       price: "4.99",
  //       feature: [
  //         {
  //           id: 1,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 2,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 3,
  //           name: "Personalized Diet",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: "DIAMOND",
  //       price: "4.99",
  //       feature: [
  //         {
  //           id: 1,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 2,
  //           name: "Personalized Diet",
  //         },
  //         {
  //           id: 3,
  //           name: "Personalized Diet",
  //         },
  //       ],
  //     },
  //   ];
  //   console.log(data.data)
  return (
    <div>
      <div className="flex justify-between items-center my-10">
        <p className="text-primary font-bold text-[24px]">Subscription</p>
        <div
          onClick={(e) => navigate("/subscription/add-subscription")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-primary
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add New Subscription</p>
        </div>
      </div>
      <LoaderWraperComp isError={isError} isLoading={isLoading}>
        <div className="grid grid-cols-3 gap-x-8 gap-y-12 my-4">
          {data?.data?.map((item) => (
            <SubscriptionCard key={item.id} item={item} />
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Subscription;
