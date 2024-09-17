import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import {
  useGetAllResellsQuery,
  useResellPriceUpdateMutation,
} from "../../../redux/features/Resells/resells.api";
import { BiDollar } from "react-icons/bi";
import Swal from "sweetalert2";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";

const Resells = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const { data, isLoading, isError } = useGetAllResellsQuery(undefined);
  const [priceUpdate, { isLoading: upIsLoading, isError: upIsError }] =
    useResellPriceUpdateMutation();

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
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // return console.log(modalData);
    try {
      const res = await priceUpdate({
        data: { price: Number(values.price) },
        id: modalData.id,
      });
      cancleModal();
      // console.log(res);
      if (res?.data?.status == "success") {
        cancleModal();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Price update success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        cancleModal();
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: res?.error?.data?.message || "Something went wrong!!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      cancleModal();
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.error?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const columns = [
    {
      title: "#SI",
      dataIndex: "",
      key: "",
      render: (text, _, index) => (currentPage - 1) * 10 + index + 1,
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
    <LoaderWraperComp isError={isError} isLoading={isLoading}>
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
          <div className="text-black bg-secondary w-full  border-2 rounded-t-lg px-10">
            <p className=" text-[26px] font-bold mb-[30px] mt-10 text-center">
              Update Price
            </p>
            <Form
              ref={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              // initialValues={modalData}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              // className="mx-[50px]"
            >
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your price!",
                  },
                  {
                    validator(_, value) {
                      if (value && isNaN(value)) {
                        return Promise.reject(
                          new Error("Price must be a number!")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="New price"
                  prefix={<BiDollar size={20} />}
                  style={{
                    border: "2px solid #57B660",
                    height: "62px",
                    background: "#CBE8CE",
                    outline: "none",
                    marginBottom: "4px",
                    padding: "4px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  // type="primary"
                  style={{
                    backgroundColor: "#57B660",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  size="large"
                  className="block w-[200px] mx-auto hover:bg-secondary h-[56px] text-white bg-secondary rounded-lg mt-2"
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </LoaderWraperComp>
  );
};

export default Resells;
