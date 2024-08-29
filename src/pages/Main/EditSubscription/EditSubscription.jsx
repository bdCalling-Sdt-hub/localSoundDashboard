import { Input } from "antd";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import baseURL from "../../../config";
import Swal from "sweetalert2";
import {
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/Subscription/subscription.api";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";

const EditSubscription = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleSubscriptionQuery(id, {
    skip: !id,
  });
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const handleOnFinish = async (values) => {
    const body = {
      ...values,
      price: Number(values.price),
      duration: Number(values.duration),
    };
    try {
      const res = await updateSubscription({
        id,
        body,
      });
      // console.log(res);
      if (res?.data?.status == "success") {
        navigate(-1)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update success!",
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
      //   // console.log("Registration Fail", error?.response?.data?.message);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.error?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  console.log(data);
  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[32px] flex items-center pb-3 gap-2 cursor-pointer">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate("/subscriptions")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">
          Edit Subscription
        </h1>
      </div>
      <div className="mt-[20px]">
        <LoaderWraperComp isError={isError} isLoading={isLoading}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={data?.data}
            onFinish={handleOnFinish}
            autoComplete="off"
          >
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-5">
                <Form.Item
                  label={
                    <span className="text-[#222222] text-[18px] font-medium">
                      Package Name
                    </span>
                  }
                  name="name"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Package Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Package name"
                    className="p-4 bg-secondary
                    rounded w-full 
                    justify-start 
                    border-2 
                    border-primary
                    mt-[12px]
                    items-center
                    gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                    // type="text"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-[#222222] text-[18px] font-medium">
                      Package Amount
                    </span>
                  }
                  name="price"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Amount!",
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error("Amount must be a number!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="Package amount"
                    className="p-4 bg-secondary
                    rounded w-full 
                    justify-start 
                    border-2 
                    border-primary
                    mt-[12px]
                    items-center
                    gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                    type="text"
                  />
                </Form.Item>
              </div>

              <div className="flex gap-[25px]">
                <div className="flex-1">
                  <Form.Item
                    name="duration"
                    label={
                      <span className="text-[#222222] text-[18px] font-medium">
                        Package Expiration
                      </span>
                    }
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Package Expiration!",
                      },
                      {
                        validator(_, value) {
                          if (value && isNaN(value)) {
                            return Promise.reject(
                              new Error("Expiration month must be a number!")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      // onChange={(e) => setPriceDrugTest(e.target.value)}
                      placeholder="Package expiration"
                      className="p-4 bg-secondary
                  rounded w-full 
                  justify-start 
                  border-2 
                  border-primary
                  mt-[12px]
                  items-center
                  gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                      type="text"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex-1">
                <label
                  htmlFor=""
                  className="text-[#222222] text-[18px] font-medium mb-[12px]"
                >
                  * Package Features
                </label>

                <Form.List
                  name="benefits"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.length < 2) {
                          return Promise.reject(
                            new Error("At least 2 passengers")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                          // required={true}
                          key={index}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input Feature or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="Features"
                              // style={{
                              //   width: '100%',
                              // }}
                              className="p-4 bg-secondary
                              rounded w-full 
                              border-2 
                              border-primary
                              mt-[12px]
                               focus:bg-secondary hover:bg-secondary hover:border-primary"
                            />
                          </Form.Item>

                          {fields.length > 2 ? (
                            <MinusCircleOutlined
                              className=" dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          className="focus:bg-secondary hover:bg-secondary hover:border-primary text-white h-[50px]"
                          onClick={() => add()}
                          style={{
                            width: "100%",
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add Features
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>

            <Button
              // onClick={handleAddMembership}
              htmlType="submit"
              className="text-[18px] w-full mt-[50px] mb-[20px] cursor-pointer h-[60px] bg-[#3BA6F6] text-white rounded-lg"
            >
              Edit Subscription
            </Button>
          </Form>
        </LoaderWraperComp>
      </div>
    </div>
  );
};

export default EditSubscription;
