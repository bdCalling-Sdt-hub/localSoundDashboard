import { Input } from "antd";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import baseURL from "../../../config";
import Swal from "sweetalert2";

const AddSubscription = () => {
    const navigate = useNavigate();
    const handleAddMembership = async (values) => {
        console.log(values);
        try{
          const response = await baseURL.post(`/membership`,values,{
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`,
               
            }});
    
          console.log(response.data)
          
          if(response.data.code==201){
              Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500
              });
              navigate('/dashboard/membership', { replace: true });
              window.location.reload();
          }
      }catch(error){
          console.log("Registration Fail",error?.response?.data?.message);
          Swal.fire({
              icon: "error",
              title: "Error...",
              text: error?.response?.data?.message,
              footer: '<a href="#">Why do I have this issue?</a>'
            });
      }
      };
    return (
        <div className="ml-[24px] overflow-auto">
        <div className="mt-[32px] flex items-center pb-3 gap-2 cursor-pointer">
          <MdOutlineKeyboardArrowLeft
            onClick={() => navigate("/subscriptions")}
            size={34}
          />
          <h1 className="text-[24px] text-primary font-semibold">
            Add Subscription
          </h1>
        </div>
        <div className="mt-[20px]">
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              // remember: true,
            }}
            onFinish={handleAddMembership}
            //   onFinishFailed={handleCompanyInformationFailed}
            autoComplete="off"
          >
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-5">
                <Form.Item
                  // label="Membership Name"
                  label={
                    <span className="text-[#222222] text-[18px] font-medium">
                      Package Name
                    </span>
                  }
                  name="title"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Package Name!",
                    },
                  ]}
                >
                  <Input
                    // onChange={(e) => setMemberShiptName(e.target.value)}
                    placeholder="Membership Name"
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
                  ]}
                >
                  <Input
                    // onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
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
                    name="PerDrugTestPrice"
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
                    ]}
                  >
                    <Input
                      // onChange={(e) => setPriceDrugTest(e.target.value)}
                      placeholder="Price"
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
                  name="features"
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
                          required={true}
                          key={field.key}
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
                              justify-start 
                              border-2 
                              border-primary
                              mt-[12px]
                              items-center
                              gap-4 inline-flex  focus:bg-secondary hover:bg-secondary hover:border-primary"
                            />
                          </Form.Item>
  
                          {fields.length > 1 ? (
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
              Add Subscription
            </Button>
          </Form>
        </div>
        </div>
    );
}

export default AddSubscription;
