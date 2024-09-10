import { Button, Checkbox, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/appoinment-logo.jpg";
import Swal from "sweetalert2";
import { IconLock } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/Auth/authSlice";
import { CustomSpinner } from "../../Components/Spinners/Spinner";
import { usePostLoginMutation } from "../../redux/features/Auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [setData, { isLoading }] = usePostLoginMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  // console.log(location.state);
  const onFinish = async (value) => {
    try {
      const response = await setData(value);
      // console.log(response);
      if (response?.data?.statusCode == 200) {
        if (response?.data?.data.user.type == "ADMIN") {
          localStorage.setItem("token", response?.data?.data?.token);
          localStorage.setItem(
            "user-update",
            JSON.stringify(response?.data?.data?.user)
          );
          dispatch(
            setUser({
              user: response?.data?.data?.user,
              token: response?.data?.data?.token,
            })
          );
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate(from, { replace: true });
          navigate(location.state ? location.state : "/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed!!",
            text: "You are not a Admin",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: response?.error?.data?.message || "Login Failed!!",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
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
                // bordered={false}
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
                  background: "#CBE8CE",
                  outline: "none",
                  // marginBottom: "0px",
                }}
              />
            </Form.Item>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2"></div>
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
                disabled={isLoading}
                style={{
                  backgroundColor: "#57B660",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                htmlType="submit"
                className="w-full hover:bg-secondary h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg flex justify-center items-center gap-1 disabled:cursor-wait"
              >
                Log in {isLoading && <CustomSpinner />}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
