import { ConfigProvider, Form, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useGetAllResellsQuery } from "../../../redux/features/Resells/resells.api";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";

const Resells = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const { data, isLoading, isError } = useGetAllResellsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: "15" },
  ]);
  // const [priceUpdate, { isLoading: upIsLoading, isError: upIsError }] =
  //   useResellPriceUpdateMutation();

  // console.log(data);
  const viewModal = (record) => {
    setModalData(record);
    setIsModalOpen(true);
  };
  const cancleModal = () => {
    form.resetFields();
    setModalData({});
    setIsModalOpen(false);
  };
  // const onFinish = async (values) => {
  //   try {
  //     const res = await priceUpdate({
  //       data: { price: Number(values.price) },
  //       id: modalData.id,
  //     });
  //     // console.log(res);
  //     if (res?.data?.status == "success") {
  //       Swal.fire({
  //         position: "top-center",
  //         icon: "success",
  //         title: "Price update success!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error...",
  //         text: res?.error?.data?.message || "Something went wrong!!",
  //         footer: '<a href="#">Why do I have this issue?</a>',
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error...",
  //       text: error?.error?.message,
  //       footer: '<a href="#">Why do I have this issue?</a>',
  //     });
  //   } finally {
  //     cancleModal();
  //   }
  // };
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
      render: (_, record) => record.user.name,
    },
    {
      title: "Music Title",
      dataIndex: "music",
      key: "music",
      render: (_, record) => record.music.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => new Date(record.createdAt).toDateString(),
    },

    {
      title: "Action",
      key: "action",
      render: (_data, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => viewModal(record)}
            size={18}
            className="text-primary cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  // console.log(first)
  return (
    <LoaderWraperComp isError={isError} isLoading={false}>
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
            <p className=" test-[24px] font-bold"> Resells Music list</p>
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
              dataSource={data?.data}
            />
          </ConfigProvider>
        </div>
        <Modal
          open={isModalOpen}
          onOk={cancleModal}
          onCancel={cancleModal}
          footer={[]}
          closeIcon
        >
          <div className="text-black bg-secondary w-full  border-2 rounded-t-lg px-10 py-6">
            <div className="p-4 space-y-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                Purchase Details
              </h2>
              <p className="text-gray-600 mt-2">
                User: <span className="font-bold">{modalData?.user?.name}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Music:{" "}
                <span className="font-bold">{modalData?.music?.name}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Price: <span className="font-bold">${modalData?.price}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Quantity:{" "}
                <span className="font-bold">{modalData?.quantity}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Purchased on:{" "}
                <span className="font-bold">
                  {new Date(modalData?.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </LoaderWraperComp>
  );
};

export default Resells;
