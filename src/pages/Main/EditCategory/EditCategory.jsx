import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const EditCategory = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUploadScore = (values) => {
        console.log(values);
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    return (
        <div className="ml-[24px] overflow-auto">
    <div className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
      <MdOutlineKeyboardArrowLeft
        onClick={() => navigate(`/categories`)}
        size={34}
      />
      <h1 className="text-[24px] text-textColor font-semibold">
        Edit Category
      </h1>
    </div>
    <div>
      <Form
        name="basic"
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        // initialValues={{
        //   remember: true,
        //   matchName: result?.matchName,
        //   eventName: result?.eventDetails?.eventName,
        // }}
        onFinish={handleUploadScore}
        //   onFinishFailed={handleCompanyInformationFailed}
        autoComplete="off"
      >
        <div className="flex gap-5">
          <Form.Item
            name="categoryName"
            label={
              <span className="text-textColor text-[18px] ">Category Name</span>
            }
            className="flex-1"
            rules={[
              {
                required: true,
                message: "Please input your Match Name!",
              },
            ]}
          >
            <Input
              placeholder="category name"
              className="p-4 bg-secondary
              rounded w-full 
              justify-start 
              border-2
              border-primary
              mt-[12px]
              items-center 
              gap-4 inline-flex focus:bg-secondary hover:bg-secondary focus:border-secondary hover:border-primary"
            />
          </Form.Item>

         
        </div>

        <div className="flex gap-5">
           <Form.Item
            name=""
            label={
              <span className="text-textColor text-[18px] ">Upload category Icon</span>
            }
            className="flex-1"
            rules={[
              {
                required: true,
                message: "Please input your Match Name!",
              },
            ]}
          >
            <input
            className="p-4 bg-secondary
            rounded w-full 
            justify-start 
            border-2 
            border-primary
            mt-[12px]
            
            items-center 
            gap-4 inline-flex"
            type="file"
            onChange={handleFileChange}
            // accept=".csv"
            required
          />
          
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          // onClick={handleAddToBlog}
          block
          className="block w-[500px] h-[56px] mt-[30px] px-2 py-4  text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
          style={{
            marginTop: "30px",
            backgroundColor: "#193664",
            color: "#fff",
            size: "18px",
            height: "56px",
          }}
        >
          Edit Category
        </Button>
      </Form>
    </div>
    </div>
    );
}

export default EditCategory;
