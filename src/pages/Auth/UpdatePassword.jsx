import { Button, Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
// import logo from "../../assets/appoinment-logo.jpg";
import { IconLock } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { CustomSpinner } from "../../Components/Spinners/Spinner";
import { useChangePasswordMutation } from "../../redux/features/Auth/authApi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { email } = useParams();
  const [mutation, { isLoading }] = useChangePasswordMutation();
  const onFinish = async (values) => {
    try {
      const response = await mutation({
        id: email,
        body: {
          newPassword: values?.re_enter_password,
        },
      });
      if (response?.data?.statusCode == 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        navigate("/auth");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
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

  return (
    <div className="mx-[310px]  bg-secondary border-2 border-secondary px-[100px] py-[40px] rounded-xl ">
      <div className="flex gap-[120px]">
        <div className="w-[500px]">
          {/* <img src={logo} className="mx-auto w-[50%]" alt="" /> */}
          <div className="flex justify-center items-center gap-1 my-[10px]">
            <Link to="/auth/forgot-password">
              <GoArrowLeft className="text-[34px] font-bold" />
            </Link>

            <h1 className="text-[24px] font-bold ">Reset Password</h1>
          </div>

          <p className="text-[#4E4E4E] text-[16px] mb-[10px]">
            Your password must be 8-10 character long.
          </p>

          <Form
            form={form}
            name="dependencies"
            autoComplete="off"
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            className="space-y-2 fit-content object-contain"
            onFinish={onFinish}
          >
            <Form.Item
              name="enter_password"
              label={
                <span className="text-primary text-[16px] font-medium">
                  New Password
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
                placeholder="Set your password"
                name="set_password"
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
                  // marginBottom: "2px",
                }}
              />
            </Form.Item>
            <Form.Item
              name="re_enter_password"
              label={
                <span className="text-primary text-[16px] font-medium">
                  Confirm Password
                </span>
              }
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please Input Your Re-Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("enter_password") === value) {
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
                placeholder="Enter Your Password"
                name="re_enter_password"
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
                  marginBottom: "10px",
                }}
              />
            </Form.Item>
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
                Confirm {isLoading && <CustomSpinner />}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
