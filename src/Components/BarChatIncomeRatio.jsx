import { DatePicker } from "antd";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { useGetChartDataQuery } from "../redux/features/Earnings/earingApi";

const BarChartIncomeRatio = () => {
  const [year, setYear] = useState("2024");
  const {
    data: chart,
    isError,
    isLoading,
  } = useGetChartDataQuery([{ name: "year", value: year }]);
  const onChange = (date, dateString) => {
    // console.log(dateString);
    setYear(dateString);
  };
  if (isLoading) {
    return <h1 className="text-center my-5">Loading....</h1>;
  }
  if (isError) {
    return <h1>Something want wrong!</h1>;
  }
  // const chart = [
  //     {
  //         "name": "Jan",
  //         "price": 500
  //     },
  //     {
  //         "name": "Feb",
  //         "price": 700
  //     },
  //     {
  //         "name": "Mar",
  //         "price": 40
  //     },
  //     {
  //         "name": "Apr",
  //         "price": 900
  //     },
  //     {
  //         "name": "May",
  //         "price": 672
  //     },
  //     {
  //         "name": "Jun",
  //         "price": 300
  //     },
  //     {
  //         "name": "Jul",
  //         "price": 800
  //     },
  //     {
  //         "name": "Aug",
  //         "price": 400
  //     },
  //     {
  //         "name": "Sep",
  //         "price": 250
  //     },
  //     {
  //         "name": "Oct",
  //         "price": 710
  //     },
  //     {
  //         "name": "Nov",
  //         "price": 310
  //     },
  //     {
  //         "name": "Dec",
  //         "price": 840
  //     }
  // ]
  return (
    <div className="bg-secondary w-full   h-[318px] mt-5 rounded-xl border-2 shadow-xl ">
      <div className="flex justify-between p-[16px]">
        <div>
          <h1 className="text-[20px] font-medium">Earnings</h1>
          {/* <div className="flex gap-5 mt-[20px]">
              <div className="flex gap-2 items-center">
                <span className="bg-[#54A630] w-4 h-4 rounded-full"></span>
                <span>This month</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-[#B0D6A0] w-4 h-4 rounded-full"></span>
                <span>Last month</span>
              </div>
            </div> */}
        </div>
        <div className="bg-secondary">
          <DatePicker
            className="custom-date-picker"
          // defaultValue={"2024"}
            onChange={onChange}
            picker="year"
            // suffixIcon
          />
        </div>
      </div>
      <div>
        <BarChart
          width={1500}
          height={250}
          data={chart?.data}
          // data={chart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="black" />
          <XAxis dataKey="month" tick={{ stroke: "black", strokeWidth: 0.5 }} />
          <YAxis tick={{ stroke: "black", strokeWidth: 0.5 }} />
          <Bar
            dataKey="totalAmount"
            fill="#57B660"
            barSize={36}
            // activeBar={<Rectangle fill="pink" stroke="green" />}
          />
          {/* <Bar
              dataKey="ThisMonth"
              fill="#54A630"
              barSize={6}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            /> */}
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartIncomeRatio;
