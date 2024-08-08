import { Button, Checkbox, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/appoinment-logo.jpg";
import baseURL from "../../config";
import Swal from "sweetalert2";
import { IconLock } from "@tabler/icons-react";
import { usePostLoginMutation } from "../../redux/api/Post/postLoginApi";

const Login = () => {
    const navigate = useNavigate();
    const [setData] = usePostLoginMutation();


    const onFinish = async (value) => {
    console.log(value);
    try {
      const response = await setData(value);
      console.log(response);
   
      if (response?.data?.statusCode == 200) {
        if(response?.data?.data?.type == "ADMIN"){
    
          localStorage.setItem("token", response?.data?.data?.token);
          localStorage.setItem(
            "user-update",
            JSON.stringify(response?.data?.data?.user)
          );
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        // console.log(data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed , Try Again...",
          text: "You are not a Admin",
        });
      }
    }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed , Try Again...",
        text: error?.data?.message,
      });
    }
  };
    return (
        <div className=" bg-secondary px-[100px] py-[40px] rounded-xl border-2 border-secondary">
        <div className="">
          <div className="w-[500px]">
            {/* <img className="mx-auto w-[50%]" src={logo} alt="" />   */}
            <h1 className="text-[28px] text-center text-[#333333] font-bold mt-[24px] mb-[24px]">
              Sign In
            </h1>
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
              className=""
            >
              <Form.Item
                name="email"
                label={
                  <span className="text-primary text-[16px] font-medium">
                    Email
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  name="email"
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
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-primary text-[16px] font-medium">
                    Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Enter Your Password"
                  name="current_password"
                  prefix={
                    <IconLock
                    className="mr-2 bg-primary rounded-full p-[6px]"
                    size={28}
                    color="white"
                    />
                  }
                  style={{
                    border: "2px solid #57B660",
                    height: "62px",
                    background:"#CBE8CE",
                    outline: "none",
                    // marginBottom: "0px",
                  }}
                  bordered={false}
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* <Form.Item name="remember" valuePropName="checked" >
                  <Checkbox >
                    <span className="text-[white] hover:text-red-500 font-medium">
                      {" "}
                      Remember Me
                    </span>
                  </Checkbox>
                </Form.Item> */}
                </div>
                <div>
                  <Link
                    to="/auth/forgot-password"
                    className="text-primary text-[16px] font-medium hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div></div>

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
                  Log in
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
}

export default Login;