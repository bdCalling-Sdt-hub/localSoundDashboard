import { Button, Form, Input } from "antd";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/appoinment-logo.jpg";
import { GoArrowLeft } from "react-icons/go";
import Swal from "sweetalert2";
import { CustomSpinner } from "../../Components/Spinners/Spinner";
import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values) => {
    try {
      const response = await forgotPassword(values);
      // console.log(response);
      if (response?.data?.statusCode == 200) {
        navigate(`/auth/verify/${response.data?.data?.id}`);
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
    <div className="mx-[310px]  bg-secondary px-[115px] py-[40px] rounded-xl border-2 border-secondary">
      <div>
        <div className="w-[500px]">
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
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="space-y-1"
          >
            <Form.Item name="email">
              <Input
                size="large"
                placeholder="Enter Your email"
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
                Send OTP {isLoading && <CustomSpinner />}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
