import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();

  const dataSource = [
    {
      key: "1",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      package: "Online Consultation",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "2",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      package: "Online Consultation",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "3",
      email: "ahad.aiman@gmail.com",
      package: "Online Consultation",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "4",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      package: "Online Consultation",
      phoneNumber: "0123456787",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "5",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      package: "Online Consultation",
      phoneNumber: "0123456787",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "6",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      package: "Online Consultation",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "7",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      package: "Online Consultation",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "8",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      package: "Online Consultation",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "9",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      package: "Online Consultation",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
      specializedIn: "Cardiologist",
      experience: "5 years",
      clinicAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      key: "10",
      email: "ahad.aiman@gmail.com",
      patientName: "Ahad",
      doctorName: "Ahad Hossain",
      phoneNumber: "0123456787",
      package: "Online Consultation",
      fee: 3000,
      age: 32,
      paymentStatus: "Pending",
      AppointmentStatus: "Completed",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      date: "2022-12-12",
      time: "10:00",
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
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
    },
    {
      title: "Time & Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
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
          <p className=" test-[24px] font-bold">Appointments List</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#193664",
                headerColor: "white",
                headerBorderRadius: 2,
                colorBgContainer: "#E8EBF0",
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
              Appointment Details
            </p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Patient Name: </p>
              <p>{user?.patientName ? user?.patientName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Package:</p>
              <p>{user?.package ? user?.package : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Date & Time:</p>
              <p>{user?.date ? user?.date : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Doctor name :</p>
              <p>{user?.doctorName ? user?.doctorName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Appointment fee :</p>
              <p>{user?.fee ? user?.fee : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Payment Status :</p>
              <p className="text-primary p-2 border-2 rounded-md border-primary">
                {user?.paymentStatus ? user?.paymentStatus : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>Appointment Status :</p>
              <p className="text-primary p-2 border-2 rounded-md border-primary">
                {user?.AppointmentStatus ? user?.AppointmentStatus : "N/A"}
              </p>
            </div>
            <div className="flex justify-center gap-4 items-center pt-[16px]">
              <p className="px-[35px] cursor-pointer py-[10px] bg-white border-2 border-primary text-primary font-normal rounded-lg">
                Download
              </p>
              <p className="px-[55px] cursor-pointer py-[10px] bg-primary text-white rounded-lg">
                {/* Regular P550 */}
                Print
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
