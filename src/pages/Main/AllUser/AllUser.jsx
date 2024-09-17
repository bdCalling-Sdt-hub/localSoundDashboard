import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useGetAllUserQuery } from "../../../redux/features/Users/userApi";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const { data, isLoading, isError } = useGetAllUserQuery([
    { name: "type", value: "USER" },
    { name: "page", value: currentPage },
    { name: "limit", value: "15" },
  ]);
 
  // console.log(data);
  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "",
      key: "",
      render: (text, _, index) => (currentPage - 1) * 15 + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "providerName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Join Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primary cursor-pointer"
          />

          {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
        </Space>
      ),
    },
  ];
  if (isError) {
    return <h1 className="text-center">Something want wrong!</h1>;
  }
  const tableData = data?.data?.map((user, index) => ({
    key: index + 1,
    name: user.name,
    email: user.email,
    phone: user.number || "N/A",
    date: new Date(user.createdAt).toDateString(),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* <DatePicker
            className="custom-date-picker"
            onChange={onChange}
            picker="month"
            suffixIcon
          /> */}
      </div>
      <div className="bg-secondary w-full  border-2 rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className=" test-[24px] font-bold">User List</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#57B660",
                headerColor: "white",
                headerBorderRadius: 2,
                colorBgContainer: "#CBE8CE40",
              },
            },
          }}
        >
          <Table
            loading={isLoading}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
              total: data?.pagination?.totalData,
              pageSize: 15,
            }}
            // pagination={false}
            columns={columns}
            // dataSource={usersAll?.data?.attributes}
            dataSource={tableData}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon
      >
        <div className="text-black bg-secondary w-full  border-2 rounded-t-lg">
          <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
            <p className=" text-[26px] font-bold mb-[16px] my-10">
              User Details
            </p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>User Name: </p>
              <p>{user?.name ? user?.name : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Email:</p>
              <p>{user?.email ? user?.email : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Phone Number:</p>
              <p>{user?.phoneNumber ? user?.phoneNumber : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Address:</p>
              <p>{user?.address ? user?.address : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Joining Date :</p>
              <p>{user?.date ? user?.date : "N/A"}</p>
            </div>
            {/* <div className="flex justify-between border-b py-[16px]">
            <p>Score:</p>
            <p>
              {user?.score ? user?.score : "N/A"}
            </p>
          </div> */}
            {/* <div className="flex justify-between border-b py-[16px]">
            <p>Driving license:</p>
            <p className="text-secondary font-bold cursor-pointer">
             Click Here
            </p>
          </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllUser;
