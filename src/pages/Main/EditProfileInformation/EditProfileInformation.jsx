import { Button, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import {
  useGetUserByTokenQuery,
  useUpadateProfileMutation,
} from "../../../redux/features/Users/userApi";
import { Upload } from "antd";
import { LuImagePlus } from "react-icons/lu";
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

const EditProfileInformation = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const { data, isLoading, isError } = useGetUserByTokenQuery(undefined);
  const [phoneNumber, setPhoneNumber] = useState(data?.data?.number);
  const [updateProfile] = useUpadateProfileMutation();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(``);
  useEffect(() => {
    setImageUrl(`${baseUrl}/${data?.data?.image}`);
    setPhoneNumber(data?.data?.number);
  }, [data?.data]);
  const props = {
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    listType: "picture",
    showUploadList: false, // Disable the default upload list
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("", 20, 20);
            canvas.toBlob((result) => {
              resolve(result);
              setImageUrl(URL.createObjectURL(result));
              // console.log(result);// Update the image URL
            });
          };
        };
      });
    },
  };
  const handleUpdateProfile = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("number", phoneNumber);
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0]?.originFileObj);
    }
    try {
      const res = await updateProfile({ id: data?.data?.id, body: formData });
      // console.log(res);
      if (res?.data?.status == "success") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res?.data?.message || "Successful!!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: res?.error?.data?.message || "Something went wrong!!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  // console.log(data)
  return (
    <div>
      <div
        onClick={() => navigate("/profile-information")}
        className="flex cursor-pointer  items-center mt-[40px] mb-[24px]"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-[24px] font-medium"> Edit Profile</h1>
      </div>
      <LoaderWraperComp isError={isError} isLoading={isLoading}>
        <div className="ml-[24px] p-[36px] rounded-xl">
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              name: data?.data?.name,
              email: data?.data?.email,
            }}
            autoComplete="off"
            onFinish={handleUpdateProfile}
            //   onFinishFailed={handleCompanyInformationFailed}
          >
            <div className="flex gap-8  rounded-xl">
              <div className="w-[33%] bg-secondary rounded-xl flex flex-col justify-center items-center gap-6 py-8">
                <div className="w-[242px] bg-secondary h-[242px] relative rounded-full flex flex-col justify-center items-center">
                  <div>
                    <Upload
                      {...props}
                      name="avatar"
                      // styles={{height:"242px" , width: "282px"}}
                      listType="picture-circle"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      onChange={({ fileList: newFileList }) => {
                        // console.log(fileList?.fileList[0].originFileObj);
                        setFileList(newFileList);
                      }}
                    >
                      <div className="w-[242px] h-[242px] overflow-hidden rounded-full">
                        <img
                          className="rounded-full w-full h-full object-cover"
                          src={imageUrl}
                          alt=""
                        />
                      </div>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#09010f49" }}
                        className="border-none text-[16px] absolute h-full w-full rounded-full flex justify-center items-center"
                        icon={
                          <LuImagePlus size={32} className="drop-shadow-xl" />
                        }
                      >
                        Change
                      </Button>
                    </Upload>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[20px] ">
                    {data?.data?.type.toUpperCase()}
                  </p>
                  <h1 className=" text-[30px] font-medium">
                    {data?.data?.name?.toUpperCase()}
                  </h1>
                </div>
              </div>
              <div className="flex-1 w-[66%]">
                <Form.Item
                  label={<span className=" text-[18px] font-medium">Name</span>}
                  name="name"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    className="p-4 bg-secondary
                  rounded w-full 
                  justify-start 
                  border-2 
                  border-primary
                  mt-[12px]
                  items-center
                  gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className=" text-[18px] font-medium">Email</span>
                  }
                  name="email"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    readOnly
                    placeholder="Email"
                    className="p-4 bg-secondary
                        rounded w-full 
                        justify-start 
                        border-2 
                        border-primary
                        mt-[12px]
                        items-center
                        gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                  />
                </Form.Item>
                <div className="flex-1">
                  <label
                    htmlFor=""
                    className=" text-[18px] font-medium mb-[12px]"
                  >
                    * Phone Number
                  </label>

                  <PhoneInput
                    placeholder="Enter phone number"
                    international
                    countryCallingCodeEditable={false}
                    style={{
                      marginTop: "12px",
                    }}
                    defaultCountry="US"
                    value={phoneNumber?.toString()}
                    onChange={setPhoneNumber}
                  />
                </div>
                {/* <div className="flex-1">
                    <Form.Item
                      label={
                        <span style={{fontFamily:"Aldrich"}} className="text-[white] text-[18px] font-medium">
                          Date Of Birth
                        </span>
                      }
                      name="dateOfBirth"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Date Of Birth!",
                        },
                      ]}
                      initialValue={user?.dateOfBirth
                        ? moment(user.dateOfBirth, "DD-M-YYYY")
                        : null}
                    >
                      <DatePicker
                         className="p-4 bg-[#706768]
                         rounded w-full 
                         justify-start 
                         border-none
                         mt-[12px]
                         items-center 
                         gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768] text-white"
                        type="date"
                        prefix={" "}
                        // defaultValue={
                        //   user?.dateOfBirth
                        //     ? moment(user.dateOfBirth, "DD-M-YYYY")
                        //     : null
                        // }
                      />
                    </Form.Item>
                  </div> */}
              </div>
            </div>
            <Form.Item>
              <Button
                style={{
                  marginTop: "30px",
                  backgroundColor: "#57B660",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                htmlType="submit"
                className="text-[18px] w-full mt-[50px] mb-[20px] cursor-pointer h-[60px] bg-secondary text-white"
              >
                Update profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default EditProfileInformation;
