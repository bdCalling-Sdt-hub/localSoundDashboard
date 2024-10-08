import { ConfigProvider, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useRef, useState } from "react";
import { useGetTransectionQuery } from "../redux/features/Earnings/earingApi";
import { useReactToPrint } from "react-to-print";

const FullRecentTransaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Transaction Details",
    // onAfterPrint: () => alert("Print success"),
  });

  const { data, isError, isLoading } = useGetTransectionQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: "15" },
  ]);
  if (isError) {
    return <h1 className="text-center">Something want wrong!</h1>;
  }
  const transData = data?.data?.map((user, index) => ({
    transactionId: user.transactionId,
    name: user.user.name,
    subscription: user.subscription.name,
    amount: user.amount,
    date: new Date(user.createdAt).toDateString(),
  }));

  // const dataSource = [
  //   {
  //     key: '1',
  //     transactionId: '12345678',
  //     name:"Ahad",
  //     providerName:"Ahad Hossain",
  //     age: 32,
  //     amount: 3000,
  //     date:"2022-12-12",
  //     subscription:"Gold",
  //   },
  //   {
  //     key: '2',
  //     transactionId: '12345678',
  //     name:"Ahad",
  //     providerName:"Ahad Hossain",
  //     age: 32,
  //     amount: 3000,
  //     date:"2022-12-12",
  //     subscription:"Gold",
  //   },
  //   {
  //     key: '3',
  //     transactionId: '12345678',
  //     name:"Ahad",
  //     providerName:"Ahad Hossain",
  //     age: 32,
  //     amount: 3000,
  //     date:"2022-12-12",
  //     subscription:"Gold",
  //   },
  //   {
  //     key: '4',
  //     transactionId: '12345678',
  //     name:"Ahad",
  //     providerName:"Ahad Hossain",
  //     age: 32,
  //     amount: 3000,
  //     date:"2022-12-12",
  //     subscription:"Gold",
  //   },
  //   {
  //     key: '5',
  //     transactionId: '12345678',
  //     name:"Ahad",
  //     providerName:"Ahad Hossain",
  //     age: 32,
  //     amount: 3000,
  //     date:"2022-12-12",
  //     subscription:"Gold",
  //   },
  //   {
  //       key: '6',
  //       transactionId: '12345678',
  //       name:"Ahad",
  //       providerName:"Ahad Hossain",
  //       age: 32,
  //       amount: 3000,
  //       date:"2022-12-12",
  //       subscription:"Basic",
  //     },
  //     {
  //       key: '7',
  //       transactionId: '12345678',
  //       name:"Ahad",
  //       providerName:"Ahad Hossain",
  //       age: 32,
  //       amount: 3000,
  //       date:"2022-12-12",
  //       subscription:"Gold",
  //     },
  //     {
  //       key: '8',
  //       transactionId: '12345678',
  //       name:"Ahad",
  //       providerName:"Ahad Hossain",
  //       age: 32,
  //       amount: 3000,
  //       date:"2022-12-12",
  //       subscription:"Gold",
  //     },
  //     {
  //       key: '9',
  //       transactionId: '12345678',
  //       name:"Ahad",
  //       providerName:"Ahad Hossain",
  //       age: 32,
  //       amount: 3000,
  //       date:"2022-12-12",
  //       subscription:"Gold",
  //     },
  //     {
  //       key: '10',
  //       transactionId: '12345678',
  //       name:"Ahad",
  //       providerName:"Ahad Hossain",
  //       age: 32,
  //       amount: 3000,
  //       date:"2022-12-12",
  //       subscription:"Gold",
  //     },
  // ];

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
      // render: (text,_,index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      // render: (_, record) => (
      //   <div className="flex gap-2 items-center">
      //     <img
      //       className="w-[34px] h-[34px] rounded-full"
      //       src={`${import.meta.env.VITE_BASE_URL}${record?.image?.publicFileURL}`}
      //       alt=""
      //     />
      //     <p className="font-medium">{record.name}</p>
      //   </div>
      // ),
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   // render: (_, record) => (
    //   //   <p>{record?.club ? record?.club : "N/A"}</p>
    //   // )
    // },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      // render: (_, record) => (
      //   <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
      // )
    },
    // {
    //   title: 'Amount',
    //   key: 'amount',
    //   dataIndex: 'amount',

    // },
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
          <p className=" test-[24px] font-bold">Transactions</p>
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
            dataSource={transData}
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
        <div
          ref={componentRef}
          className="text-black bg-secondary print:bg-white w-full border-2 print:border-0 rounded-t-lg "
        >
          <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
            <p className=" text-[26px] font-bold mb-[16px] my-10">
              Transaction Details
            </p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Transaction ID: </p>
              <p>{user?.transactionId ? user?.transactionId : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Date:</p>
              <p>{user?.date ? user?.date : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>User Name:</p>
              <p>{user?.name ? user?.name : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Amount :</p>
              <p>{user?.amount ? user?.amount + " $" : "N/A"}</p>
            </div>
            {/* <div className="flex justify-between border-b py-[16px]">
            <p>Score:</p>
            <p>
              {user?.score ? user?.score : "N/A"}
            </p>
          </div> */}
            <div className="flex justify-between border-b py-[16px]">
              <p>Provider Name:</p>
              <p>{user?.providerName ? user?.providerName : "N/A"}</p>
            </div>

            <div className="flex justify-center gap-4 items-center pt-[16px] print:hidden">
              <button className="px-[35px] cursor-pointer py-[10px] bg-white border-2 border-primary text-primary font-normal rounded-lg">
                Download
              </button>
              <button
                onClick={handlePrint}
                className="px-[55px] cursor-pointer py-[10px] bg-primary text-white rounded-lg"
              >
                {/* Regular P550 */}
                Print
              </button>
            </div>
            <div className="hidden print:block text-center py-7 text-xl text-blue-500">
              🎶 Provide by LocalSound-Music 🎶
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FullRecentTransaction;
