import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
interface TokenPayload {
    id: string;
    username:string;
    email:string
    // Bạn cần thêm các trường khác từ payload token nếu cần
  }
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phonenumber: "",
        email: "",
        description: "",
    
      });
    const { register, formState: { errors } } = useForm()
    useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const { username, email } = decoded;
        setFormData({
          ...formData,
          name: username || "",
          email: email || "",
        });
      } catch (error) {
        
      }
    }
    
  }, []);
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in localStorage.");
      return null;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log("id",decoded); // Kiểm tra xem decoded token có đúng không
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const id = getUserIdFromToken();
  console.log(id);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
        const userId = getUserIdFromToken() || ""
              // Kiểm tra trạng thái của người dùng trước khi đặt hàng
      const userStatusResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
      const userStatus = userStatusResponse.data.status;
  
      if (userStatus === "block") {
        // Người dùng bị chặn, không thể đặt hàng
        toast.error("Tài khoản của bạn đã bị chặn và không thể liên hệ.", { autoClose: 2000 });
        return;
      }
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!formData.email.match(emailRegex)) {
        toast.error('Định dạng email không hợp lệ', { autoClose: 2000 });
        return;
      }

      const phoneRegex = /^0\d{9}$/;
      if (!formData.phonenumber.match(phoneRegex)) {
        toast.error('Số điện thoại không hợp lệ', { autoClose: 2000 });
        return;
      }
      if (!userId) {
        const dataFormNoId = {
          name: formData.name,
          phonenumber: formData.phonenumber,
          email: formData.email,
          description: formData.description,
        };
        const createContactNoUserId = await axios.post(
            "http://localhost:8080/api/contactNoId",
            dataFormNoId
          )
          toast.success("Liên hệ thành công", { autoClose: 2000 });
        return;
      }
      const dataForm = {
        userId: userId,
        name: formData.name,
        phonenumber: formData.phonenumber,
        email: formData.email,
        description: formData.description,
      };
      const createContact = await axios.post(
        "http://localhost:8080/api/contact",
        dataForm
      )
      toast.success("Liên hệ thành công", { autoClose: 2000 });
      return;
     
    } catch (error) {
        console.error("Error creating order:", error);
         toast.error("Hãy điền đầy đủ thông tin", { autoClose: 2000 });
       }
     };

    return (
        <div className='w-[1000px] mx-auto'>
            {/* <div className="mt-[50px]">
                <h2 className='text-[25px]'>CONTACT</h2>
            </div> */}
            <div className=" flex gap-[200px] mt-[80px]">
                <div className="info_contact">
                    <h3 className='text-[25px]'>Thông Tin Liên Lạc</h3>
                    <div className="content_contact">
                        <div className=" flex gap-[20px] my-[20px]">
                            <div className="icon_contact">
                                <CiLocationOn className="w-[35px] h-[35px]  text-gray-500" />
                            </div>
                            <div className="text_contact">
                                <p className='text-[18px]'>180 P. Đông Các, Chợ Dừa, Đống Đa, Hà Nội</p>
                            </div>
                        </div>
                        <div className="flex gap-[20px] mb-[20px]">
                            <div className="icon_contact">
                                <MdOutlineEmail className="w-[35px] h-[35px]  text-gray-500" />
                            </div>
                            <div className="text_contact">
                                <p className='text-[18px]'>shopthoitrangnamTND@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex gap-[20px] mb-[20px]">
                            <div className="icon_contact">
                                <FaPhoneAlt className="w-[30px] h-[30px]  text-gray-500" />
                            </div>
                            <div className="text_contact">
                                <p className='text-[18px]'>0335 830 256</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="question_contact">
                    <h3 className='text-[25px]'>Có bất kỳ câu hỏi nào! Hoặc Đặt lịch hẹn</h3>
                    <form className="w-1/3" onSubmit={handleFormSubmit}>
                        <div className="mb-4 mt-[30px]">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="fullname"
                            >
                               Tên
                            </label>
                            <input onChange={(e) => setFormData({ ...formData, name: e.target.value })}
             value={formData.name}
             disabled={!!localStorage.getItem("token")} 
            type="text" id="name" name="name"  className="shadow appearance-none border rounded w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nguyễn Văn A" />
           
                            {errors.name && <span style={{ color: 'red' }}>Bắt buộc nhập tên !</span>}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="">
            <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            value={formData.email}
            disabled={!!localStorage.getItem("token")}
            type="text" id="email" name="email"  className="shadow appearance-none border rounded w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="your.email@gmail.com" />
          </div>
                            {errors.email && <span style={{ color: 'red' }}>Bắt buộc thêm ảnh !</span>}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="phonenumber"
                            >
                               Số điện thoại
                            </label>
                            <div className="relative">
            <input onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })} 
            value={formData.phonenumber}
             type="text" id="phonenumber" name="phonenumber"  className="shadow appearance-none border rounded w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="0123456789" />
          </div>
                            {errors.phonenumber && <span style={{ color: 'red' }}>Bắt buộc thêm ảnh !</span>}
                        </div>
                               
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                                {...register("description", { required: true })}
                            >
                                Mô tả
                            </label>
                            <div className="relative">
                            
                            <textarea
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="shadow appearance-none border rounded w-[500px] h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="description"
      name="description"
      placeholder="Nhập mô tả"
    ></textarea>
                            </div>
                            {errors.description && <span style={{ color: 'red' }}>Bắt buộc nhập mô tả !</span>}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Gửi Tin Nhắn
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Contact