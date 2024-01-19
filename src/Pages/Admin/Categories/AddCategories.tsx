import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory } from '../../../api/categories';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";
import { Button, Form, Input, Upload, message } from 'antd';
import { ICategories } from '../../../interfaces/categories';
type FieldType = {
  name?: string;
  img?:String
};
const AddCategories = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
 
  const onFinish = async (values: any) => {
    const imagesUrl = values.img.map((image: any) => {
      return {
        url: image?.response?.url || image?.url || null,
      };
    });
    console.log(imagesUrl);
    

    const updateValues = {
      ...values,
      img: imagesUrl,
    };
    console.log(updateValues);
    
    await addCategory(updateValues)
      .then(() =>
       toast.success('Thêm danh mục thành công', { autoClose: 2000 })
      ).then(() => {
        setTimeout(() => {
          navigate('/admin/categories');
        }, 3000);
      });
      
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo.errorFields[0].errors);
    messageApi.open({
      type: "error",
      content: `lỗi không thể thêm thử lại sau ${errorInfo.errorFields[0].errors}`,
    });
  };

  return (
    <>
    <div className="max-w-xl text-center ">
    <ToastContainer />
      <div>
      <h1 className="text-2xl  font-bold mb-5">Thêm Danh Mục</h1>
      </div>
      {contextHolder}
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<ICategories>
      label="Name"
      name="name"
      rules={[
        { required: true, message: "bắt buộc phải nhập tên danh mục!" },
        { min: 6, message: "Bắt buộc phải nhập trên 6 ký tự" },
        
      ]}
    >
      <Input placeholder="thêm tên danh mục" />
    </Form.Item>

    <Form.Item<any>
      label="Images"
      name="img"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      
    >
      <Upload
          action="https://api.cloudinary.com/v1_1/dfftwrlu2/image/upload"
          data={{
            upload_preset: "clothing_store",
          }}
          listType="picture-card"
        >
          <div>
            <AiOutlineUserAdd />
            <div style={{ marginTop: 8 }}>Ảnh</div>
          </div>
        </Upload>
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" className='bg-blue-500' htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
    </>
  )
}

export default AddCategories