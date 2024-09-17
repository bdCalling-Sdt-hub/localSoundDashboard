import React from "react";
import { Button, ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import {
  useGetAllWithdrawRequestQuery,
  useUpdateWithdrawStatusMutation,
} from "../../../redux/features/Withdraw/withdraw.api";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import Swal from "sweetalert2";

const Withdraw = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const { data, isLoading, isError } = useGetAllWithdrawRequestQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: "10" },
  ]);
  const [updateStatus] = useUpdateWithdrawStatusMutation();

  const handleView = (record) => {
    setModalData(record);
    setIsModalOpen((c) => !c);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      render: (text, _, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record, icndx) => (
        <p key={icndx}>{record?.user?.name || "N/A"}</p>
      ),
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "A/C Type",
      dataIndex: "accountType",
      key: "accountType",
    },
    {
      title: "A/C Number",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primary cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const handleStatus = async (status) => {
    try {
      const res = await updateStatus({
        id: modalData?.id,
        body: {
          status: status,
        },
      });
      console.log(res);
      handleView({});
      if (res?.data?.status == "success") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res?.data?.message || "Successful!!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: res?.error?.data?.message || "Something went wrong!!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
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
      <LoaderWraperComp isError={isError} isLoading={false}>
        <div className="bg-secondary w-full  border-2 rounded-t-lg mt-[24px] ">
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
              loading={isLoading}
              pagination={{
                position: ["bottomCenter"],
                current: currentPage,
                onChange: (page) => setCurrentPage(page),
                total: data?.pagination?.totalData,
                pageSize: 10,
              }}
              // pagination={false}
              columns={columns}
              dataSource={data?.data}
              // dataSource={dataSource}
            />
          </ConfigProvider>
        </div>
      </LoaderWraperComp>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => handleView({})}
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
              <p>User Name: </p>
              <p>{modalData?.user ? modalData.user.name : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Bank Name:</p>
              <p>{modalData?.bankName ? modalData?.bankName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Withdraw Amount :</p>
              <p>${modalData?.amount ? modalData?.amount : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Withdraw Status :</p>
              <p className="font-medium">
                {modalData?.status ? modalData?.status : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C type:</p>
              <p>{modalData?.accountType ? modalData?.accountType : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C Number:</p>
              <p>{modalData?.accountNo ? modalData?.accountNo : "N/A"}</p>
            </div>
            <div className="flex justify-center items-center gap-4 py-[16px]">
              {modalData?.status === "PENDING" ? (
                <>
                  <Button
                    onClick={() => handleStatus("REJECTED")}
                    style={{ background: "#ffffff", color: "black" }}
                    size="large"
                    type="primary"
                    className="px-[60px]"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleStatus("APPROVED")}
                    type="primary"
                    size="large"
                    className="px-[55px] cursor-pointer bg-primary text-white rounded-lg"
                  >
                    Approve
                  </Button>
                </>
              ) : (
                <h5 className="text-lg text-red-400 mt-2">
                  You can't change the status again!!
                </h5>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Withdraw;
