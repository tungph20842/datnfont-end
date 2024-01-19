import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Vui lòng điền đầy đủ email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/forgot_password', { email });
      
      toast.success(response.data.message, { autoClose: 2000 });
      
      setTimeout(() => {
        navigate('/resetpassword');
      }, 3000);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xử lý yêu cầu quên mật khẩu.', { autoClose: 2000 });
      console.error('Error sending forgot password request', error);
    }
  };

  return (
    <section className="font-poppins">
      <div className="flex items-center justify-center h-full mt-3 mb-3 mx-auto max-w-7xl">
        <div className="flex-1">
          <div className="flex flex-wrap ">
            <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
              <div className="max-w-md mx-auto">
                <div className="px-4 my-7">
                  <div className="mb-7">
                    <span className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-gray-200 bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                      </svg>
                    </span>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
                    Bạn Quên Mật Khẩu</h2>
                  <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                    Vui lòng điền đầy đủ thông tin yêu cầu</p>
                  <form acceptCharset="UTF-8" className="p-0 m-0" id="forgot_password_form" onSubmit={handleForgotPassword}>
                    <label htmlFor="email" className="text-lg font-medium text-gray-700 dark:text-gray-400">Email</label>
                    <input
                      className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="mb-4 text-right ">
                                    <a href="/resetpassword"
                                        className="text-sm font-semibold text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                                        reset password?</a>
                                </div>
                    <input
                      type="submit"
                      className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200"
                      value="Gửi Mã Xác Nhận"
                    />
                    
                  </form>
                </div>
              </div>
            </div>
            <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2">
              <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
              <img className="absolute inset-0 z-0 object-cover w-full h-full ml-auto" src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" />
              <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
                <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
                  Chào mừng đến với cộng đồng của chúng tôi và tham gia với chúng tôi</h2>
                <div className="max-w-lg mx-auto mb-6">
                  <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
                    Bạn được chào đón ở đây!
                  </p>
                </div>
                <a href="#" className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300">
                  Tham gia</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
