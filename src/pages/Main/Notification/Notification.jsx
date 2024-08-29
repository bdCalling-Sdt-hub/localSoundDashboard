import { Pagination } from "antd";
// import NotificationCart from "../../../Components/NotificationCart";
// import { useGetAdminNotificationQuery } from "../../../redux/Features/getAdminNotificationApi";
import { useEffect, useState } from "react";
import NotificationCart from "../../../Components/NotificationCart";
import { useGetAdminNotificationQuery } from "../../../redux/features/Users/userApi";
import { useSelector } from "react-redux";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
// import Loading from "../../../Components/Loading";

const Notification = () => {
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetAdminNotificationQuery(
    { id: user?.id, params: undefined },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );
  const onChange = (values) => {
    console.log(values);
    setCurrentPage(values);
  };

  return (
    <div>
      <div className="pl-[24px] ">
        <div className="rounded-xl overflow-hidden">
          <div className="">
            <h1 className="text-[24px] text-black  font-semibold pb-3">
              Notification
            </h1>
          </div>
          <div className="flex flex-col">
            {data?.data?.map((item, index) => (
              <NotificationCart key={item?._id} item={item} />
            ))}
          </div>
          <LoaderWraperComp isError={isError} isLoading={isLoading}>
            <div className="flex justify-center my-10">
              <Pagination
                onChange={onChange}
                defaultCurrent={1}
                // total={data?.pagination?.totalNotification}
                total={20}
              />
            </div>
          </LoaderWraperComp>
        </div>
      </div>
    </div>
  );
};

export default Notification;
