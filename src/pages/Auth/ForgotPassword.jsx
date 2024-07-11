import { IconLock } from "@tabler/icons-react";
import { Button, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/appoinment-logo.jpg";
import { GoArrowLeft } from "react-icons/go";
import baseURL from "../../config";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    navigate(`/auth/verify/${values?.email}`);
    //   try {
    //     const response = await baseURL.post(
    //       `/user/forgot-password`,values, {
    //         headers: {
    //           "Content-Type": "application/json",
    //           authentication: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     console.log(response?.data);
    //     if(response?.data?.statusCode == 200){
    //       Swal.fire({
    //         position: "top-center",
    //         icon: "success",
    //         title: response?.data?.message,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       navigate(`/auth/verify/${values?.email}`);
    //     }
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Try Again...",
    //       text: error?.response?.data?.message,
    //       footer: '<a href="#">Why do I have this issue?</a>',
    //     });
    //   }
  };
  return (
    <div className="mx-[310px]  bg-secondary px-[115px] py-[40px] rounded-xl border-2 border-secondary">
      <div>
        <div className="w-[500px]">
          {/* <img src={logo} className="mx-auto w-[50%]" alt="" /> */}
          <div className="flex items-center justify-center gap-2">
            <Link to="/auth">
              {" "}
              <GoArrowLeft className="text-[32px]" />
            </Link>

            <h1 className="text-[24px] font-medium my-[24px]">
              Forgot password
            </h1>
          </div>
          <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
            Please enter your email address to reset your password.
          </p>
          <Form
            name="normal_login"
            // className="login-form"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="space-y-1"
          >
            <Input
              size="large"
              placeholder="Enter Your Email"
              name="email"
              type="email"
              prefix={
                <HiOutlineMailOpen
                  className="mr-2 bg-primary rounded-full p-[6px]"
                  size={28}
                  color="white"
                />
              }
              style={{
                border: "2px solid #57B660",
                height: "62px",
                background: "#CBE8CE",
                outline: "none",
                marginBottom: "10px",
              }}
              required
              bordered={false}
            />

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
                className="block w-[500px] hover:bg-secondary h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg"
              >
                Send OTP
              </Button>
              {/* <Link to="/dashboard"
        // type="primary"
        // htmlType="submit"
        className="block text-center w-[350px] h-[56px] px-2 py-4 mt-2 hover:text-white text-white bg-[#3BA6F6] rounded-lg"
      >
        Log In
      </Link> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
