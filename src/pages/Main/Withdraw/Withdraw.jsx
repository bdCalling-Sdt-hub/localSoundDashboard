import React from "react";
import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Withdraw = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();

  const dataSource = [
    {
      key: "1",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "2",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "3",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "4",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "5",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "6",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "7",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "8",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "9",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
    },
    {
      key: "10",
      email: "ahad.aiman@gmail.com",
      doctorName: "Ahad Hossain",
      bankName: "Brac Bank",
      type: "Savings",
      accountNumber: "123456789",
      amount: "5000",
      status: "Pending",
      date: "2022-12-12",
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
      dataIndex: "doctorName",
      key: " doctorName",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "A/C Type",
      dataIndex: "type",
      key: "phoneNumber",
    },
    {
      title: "A/C Number",
      dataIndex: "accountNumber",
      key: "date",
    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
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
          <p className=" test-[24px] font-bold">Withdraw Request List</p>
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
            dataSource={dataSource}
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
              Withdraw Request Details
            </p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Artist Name: </p>
              <p>{user?.doctorName ? user?.doctorName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Bank Name:</p>
              <p>{user?.bankName ? user?.bankName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C type:</p>
              <p>{user?.type ? user?.type : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C Number:</p>
              <p>{user?.accountNumber ? user?.accountNumber : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Withdraw Amount :</p>
              <p>{user?.amount ? user?.amount : "N/A"}</p>
            </div>
            <div className="flex justify-center gap-4 items-center pt-[16px]">
              <p className="px-[35px] cursor-pointer py-[10px] bg-white border-2 border-primary text-primary rounded-lg font-medium">
                Cancel
              </p>
              <p className="px-[55px] cursor-pointer py-[10px] bg-primary text-white rounded-lg">
                {/* Regular P550 */}
                Approve
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Withdraw;
