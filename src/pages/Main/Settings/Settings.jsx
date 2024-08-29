import { Button, Form, Input, Modal, Switch } from "antd";
import logo from "../../../assets/dashboard-logo.png";
import { IconLock } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import Swal from "sweetalert2";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/Auth/authApi";
import { useSelector } from "react-redux";

const Settings = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const [mutation] = useChangePasswordMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [VerifyOtp, { isLoading }] = useVerifyEmailMutation();
  const { user } = useSelector((state) => state.auth);

  const settingsItem = [
    {
      title: "Change password",
      path: "change-password",
    },

    {
      title: "Privacy Policy",
      path: "privacy-policy",
    },
    {
      title: "Terms & Conditions",
      path: "terms-conditions",
    },
    {
      title: "About us",
      path: "about-us",
    },
  ];

  const handleNavigate = (value) => {
    if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  const handleChangePassword = async (values) => {
    const { newPassword, oldPassword } = values;
    try {
      const response = await mutation({
        id: user.id,
        body: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      });
      if (response?.data?.statusCode == 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        if (setModelTitle === "Change password") {
          setIsModalOpen(false);
          setModelTitle("");
          form.resetFields(null);
        } else {
          navigate("/auth");
          form.resetFields(null);
        }
        // Swal.fire({
        //   position: "top-center",
        //   icon: "success",
        //   title: response?.data?.message,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else {
        Swal.fire({
          icon: "error",
          title: "Faild!",
          text:
            response?.data?.message ||
            response?.error?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        // title: "Login Failed , Try Again...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  const handleForgetPassword = async (values) => {
    try {
      const response = await forgotPassword(values);
      // console.log(response);
      if (response?.data?.statusCode == 200) {
        setModelTitle("Verify OTP");
        // Swal.fire({
        //   position: "top-center",
        //   icon: "success",
        //   title: response?.data?.message,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else {
        Swal.fire({
          icon: "error",
          text:
            response?.data?.message ||
            response?.error?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        // title: "Login Failed , Try Again...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      return Swal.fire({
        icon: "error",
        title: "Faild",
        text: "Please enter your OTP!.",
      });
    }
    try {
      const response = await VerifyOtp({
        userId: user.id,
        code: otp,
      });
      if (response?.data?.statusCode == 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        setModelTitle("Reset Password");
      } else {
        Swal.fire({
          icon: "error",
          title: "Faild!",
          text:
            response?.data?.message ||
            response?.error?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="ml-[24px] mt-[60px]">
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="border border-secondary py-4 mb-2 px-4 text-sm rounded-lg bg-secondary flex items-center justify-between cursor-pointer "
          onClick={() => handleNavigate(setting.path)}
        >
          <h2>{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch
                defaultChecked
                onChange={onChange}
                // style={{ background: "#0071e3" }}
              />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </h2>
        </div>
      ))}

      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex bg-secondary justify-between items-center cursor-pointer text-black px-[60px] pt-[20px]"
          >
            <div className="object-contain">
              <div className="flex items-center justify-start gap-2">
                <Link to="/settings">
                  {" "}
                  <GoArrowLeft className="text-[24px]" />
                </Link>

                <h1 className="text-[24px]  font-medium my-[24px]">
                  {modelTitle}
                </h1>
              </div>
            </div>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        {modelTitle === "Change password" && (
          <div className="px-[60px] pb-[60px] bg-secondary">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 character long.{" "}
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your old Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Enter Your old Password"
                  name="oldPassword"
                  prefix={
                    <IconLock
                      className="mr-2 border-2 border-primary rounded-full p-[6px]"
                      size={28}
                      color="#193664"
                    />
                  }
                  className="p-4 bg-secondary
                    rounded w-full 
                    border-2 border-primary
                    justify-start 
                    mt-[12px]
                    outline-none
                   focus:border-none focus:bg-secondary hover:bg-secondary hover:border-primary"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input your new Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Set Your New Password"
                  name="newPassword"
                  prefix={
                    <IconLock
                      className="mr-2 border-2 border-primary rounded-full p-[6px]"
                      size={28}
                      color="#193664"
                    />
                  }
                  className="p-4 bg-secondary
                    rounded w-full 
                    border-2 border-primary
                    justify-start 
                    mt-[12px]
                    outline-none
                   focus:border-none focus:bg-secondary hover:bg-secondary hover:border-primary"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Re-Enter New Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  prefix={
                    <IconLock
                      className="mr-2 border-2 border-primary rounded-full p-[6px]"
                      size={28}
                      color="#193664"
                    />
                  }
                  className="p-4 bg-secondary
                  rounded w-full 
                  border-2 border-primary
                  justify-start 
                  mt-[12px]
                  outline-none
                  focus:border-none focus:bg-secondary hover:bg-secondary hover:border-primary"
                />
              </Form.Item>
              <p className=" text-primary text-[14px] font-medium">
                <button type="button" onClick={() => setModelTitle("Forget password")}>
                  Forget Password
                </button>
              </p>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#57B660",

                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-[#FA1131] rounded-lg"
                >
                  Update password
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {modelTitle === "Forget password" && (
          <div className="px-[60px] pb-[60px] bg-secondary">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={handleForgetPassword}
              className="space-y-7 fit-content object-contain"
            >
              <div className="">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    name="email"
                    prefix={
                      <HiOutlineMailOpen
                        className="mr-2 bg-white rounded-full p-[6px]"
                        size={28}
                        color="#193664"
                      />
                    }
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
                  Send OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {modelTitle === "Verify OTP" && (
          <div className="px-[60px] pb-[60px] bg-secondary">
            <form onSubmit={handleVerifyOtp}>
              <p className="text-[16px] mb-[14px]">
                Please enter your email address to recover your account.
              </p>
              <div className="my-5">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle={{
                    height: "60px",
                    width: "60px",
                    background: "#CBE8CE",
                    border: "3px solid #57B660",
                    marginRight: "20px",
                    marginLeft: "20px",
                    outline: "none",
                    color: "black",
                    borderRadius: "4px",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#57B660",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                className="bg-secondary
              w-full
              text-white mt-5 py-3 rounded-lg duration-200"
              >
                Verify
              </button>
            </form>
          </div>
        )}

        {modelTitle === "Reset Password" && (
          <div className="px-[60px] pb-[60px] bg-secondary">
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input your new Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Set Your New Password"
                  name="newPassword"
                  prefix={
                    <IconLock
                      className="mr-2 border-2 border-primary rounded-full p-[6px]"
                      size={28}
                      color="#193664"
                    />
                  }
                  className="p-4 bg-secondary
                    rounded w-full 
                    border-2 border-primary
                    justify-start 
                    mt-[12px]
                    outline-none
                   focus:border-none focus:bg-secondary hover:bg-secondary hover:border-primary"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Re-Enter New Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  prefix={
                    <IconLock
                      className="mr-2 border-2 border-primary rounded-full p-[6px]"
                      size={28}
                      color="#193664"
                    />
                  }
                  className="p-4 bg-secondary
                  rounded w-full 
                  border-2 border-primary
                  justify-start 
                  mt-[12px]
                  outline-none
                  focus:border-none focus:bg-secondary hover:bg-secondary hover:border-primary"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#57B660",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg"
                >
                  Update password
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Settings;
