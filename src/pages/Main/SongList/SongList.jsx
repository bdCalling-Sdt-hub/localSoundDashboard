import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";

const SongList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const dataSource = [
    {
      key: "1",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "2",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "3",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "4",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "5",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "6",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "7",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "8",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "9",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
    {
      key: "10",
      name: "Ahad",
      artistName: "Hossain",
      Price: 32,
    },
  ];
  const handleEditPrice = () => {
    setIsModalOpen(false);
  };
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
      title: "Music Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist Name",
      dataIndex: "artistName",
      key: "artistName",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "Edit Price",
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
          <p className=" test-[24px] font-bold">Song List</p>
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
        <div className="px-[60px] pb-[60px] bg-secondary">
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={handleEditPrice}
            className="space-y-7 fit-content object-contain"
          >
            <div className="">
              <div
                className="flex justify-between items-center cursor-pointer text-black pt-[20px]"
              >
                <h1 className="text-[24px]  font-medium my-[24px]">
                  EDIT PRICE
                </h1>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Price!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Price"
                  name="email"
                //   prefix={
                //     <HiOutlineMailOpen
                //       className="mr-2 bg-white rounded-full p-[6px]"
                //       size={28}
                //       color="#193664"
                //     />
                //   }
                  className="p-4 bg-secondary
                      rounded w-full 
                      border-2 border-primary
                      justify-start 
                      mt-[12px]
                      
                       outline-none focus:border-none hover:bg-secondary hover:border-primary"
                />
              </Form.Item>
            </div>
            <Form.Item>
              {/* <Button
                    type="primary"
                    htmlType="submit"
                    className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-[#FA1131] rounded-lg"
                  >
                    Send OTP
                  </Button> */}
              <Button
                style={{
                  backgroundColor: "#57B660",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                htmlType="submit"
                className="block w-full h-[56px] px-2 py-4 mt-2 focus:bg-secondary text-white bg-[#FA1131] rounded-lg"
              >
                Edit Price
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SongList;
