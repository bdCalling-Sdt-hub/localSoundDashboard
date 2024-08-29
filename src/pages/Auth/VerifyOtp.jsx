import { Button, Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
// import logo from "../../assets/appoinment-logo.jpg";
import { useState } from "react";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";
import { CustomSpinner } from "../../Components/Spinners/Spinner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [mutation, { isLoading }] = useVerifyEmailMutation();
  const handelResend = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/auth/otp?userId=" + email
      ).then((res) => res.json());
      Swal.fire({
        icon: res.ok ? "success" : "error",
        text: res.message,
      });
    } catch (error) {
      // console.error(error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  const handleMatchOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      return Swal.fire({
        icon: "error",
        title: "Faild",
        text: "Please enter your OTP!.",
      });
    }
    try {
      const response = await mutation({
        userId: email,
        code: otp,
      });
      if (response?.data?.statusCode == 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        navigate(`/auth/update-password/${email}`);
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
    <div className="mx-[310px]  bg-secondary border-2 border-secondary px-[100px] py-[40px] rounded-xl">
      <div>
        <div className="w-[500px]">
          {/* <img src={logo} className="mx-auto w-[50%]" alt="" /> */}
          <div
            className="flex justify-center
         items-center gap-2"
          >
            <Link to="/auth/forgot-password">
              {" "}
              <GoArrowLeft className="text-[32px] font-bold" />
            </Link>

            <h1 className="text-[24px] font-bold my-[24px]">Verify OTP</h1>
          </div>
          <p className=" text-[20px] text-[#5C5C5C] mb-[32px] text-center">
            Please enter the otp we have sent you in your email.
          </p>
          <form
            onSubmit={handleMatchOtp}
            className="space-y-6 fit-content object-contain"
          >
            <div className="flex items-center justify-center gap-2  outline-none focus:border-blue-400 object-contain w-[500px]">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={{
                  height: "75px",
                  background: "#CBE8CE",
                  width: "72px",
                  border: "3px solid #57B660",
                  marginRight: "20px",
                  marginLeft:"20px",
                  outline: "none",
                  color: "black",
                  borderRadius: "4px",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-black-400">Didn’t receive code?</p>
              <span
                className="text-green-500 cursor-pointer select-none"
                onClick={handelResend}
              >
                Resend
              </span>
            </div>
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
              Verify {isLoading && <CustomSpinner />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
