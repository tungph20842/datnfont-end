import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { getByidCategory, updateCategory } from '../../../api/categories';
import { ToastContainer, toast } from 'react-toastify';
import { ICategories } from '../../../interfaces/categories';
import { Button, Form, Input, Upload, message } from 'antd';
import { AiOutlineUserAdd } from 'react-icons/ai';



const UpdateCategories = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams<{
    id:string
  }>() as { id: string };
  const [existingCategoryData, setExistingCategoryData] = useState<ICategories | null>(null);
  useEffect(() => {
    // Function to fetch existing category data
    const fetchExistingCategoryData = async () => {
      try {
        const response = await getByidCategory(id);
        setExistingCategoryData(response.data); // Assuming the API response has a data property with the category details
        // Set form values with existing data
        form.setFieldsValue({
          name: response.data.name,
          img: response.data.img, // Assuming img is an array of image data
        });
      } catch (error) {
        console.error('Error fetching existing category data:', error);
        // Handle error or show a message to the user
      }
    };

    // Call the function to fetch existing category data
    fetchExistingCategoryData();
  }, [id, form]);
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
    
    await updateCategory(updateValues,id)
    toast.success('Sửa danh mục thành công', { autoClose: 2000 });
    setTimeout(() => {
      navigate('/admin/categories');
    }, 3000);
      
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: "error",
      content: `lỗi không thể thêm thử lại sau ${errorInfo.errorFields[0].errors}`,
    });
  };
  return (
    <Form
    name="basic"
    form={form}
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
    // <div className="flex flex-col items-center mt-10">
    //   <ToastContainer />
    //   <h1 className="text-2xl font-bold mb-5">Thêm Danh Mục</h1>
    //   <form className="w-1/3" onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
    //         Tên Danh Mục
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         placeholder='Nhập Tên'
    //         id="categoryName"
    //         type="text"
    //         value={categoryName}
    //         onChange={(e) => setCategoryName(e.target.value)}

    //       />
    //       {nameTouched && !categoryName && <p className='text-red-500'>Bắt buộc phải nhập tên danh mục.</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryImage">
    //         Ảnh
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         placeholder='Nhập Ảnh'
    //         id="categoryImage"
    //         type="text"
    //         value={imageUrl}
    //         onChange={(e) => setImageUrl(e.target.value)}

    //       />
    //       {imgTouched && !imageUrl && <p className='text-red-500'>Bắt buộc phải nhập URL hình ảnh.</p>}
    //     </div>

    //     <div className="flex justify-between items-center">
    //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    //         Thêm Danh Mục
    //       </button>
    //       <a href="/admin/categories">
    //         <button className="bg-blue-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    //             <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    //           </svg>
    //           Quay Lại
    //         </button></a>


    //     </div>
    //   </form>
    // </div>
  )
}

export default UpdateCategories