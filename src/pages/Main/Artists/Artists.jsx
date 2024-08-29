import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { GiLoveSong } from "react-icons/gi";
import { useGetAllUserQuery } from "../../../redux/features/Users/userApi";

const Artists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllUserQuery([
    { name: "type", value: "ARTIST" },
  ]);
  const dataSource = [
    {
      key: "1",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "2",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "3",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "4",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "5",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "6",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "7",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "8",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "9",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "10",
      email: "ahad.aiman@gmail.com",
      name: "Ahad",
      phoneNumber: "0123456787",
      age: 32,
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
  ];

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "",
      key: "",
      render: (text, _, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Artist Name",
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
  if (isLoading) {
    return <h1 className="text-center my-5">Loading....</h1>;
  }
  if (isError) {
    return <h1>Something want wrong!</h1>;
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
          <p className=" test-[24px] font-bold">Artists List</p>
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
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              // pageSize:10,
              // total:usersAll?.pagination?.Users,
              // showSizeChanger: false,
              //   onChange: handleChangePage,
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
              Doctor Details
            </p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Doctor Name: </p>
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
            <div className="flex justify-between border-b py-[16px]">
              <p>Specialized In:</p>
              <p>{user?.specializedIn ? user?.specializedIn : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Experience:</p>
              <p>{user?.experience ? user?.experience : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Clinic Address:</p>
              <p>{user?.clinicAddress ? user?.clinicAddress : "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Artists;
