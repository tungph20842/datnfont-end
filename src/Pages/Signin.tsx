import React, { useState } from 'react';
import { signin } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [products, setproducts] = useState([])
  
  const handleLogin = async (e: any) => {
    e.preventDefault();


    if (!email || !password) {
      // alert('Vui lòng điền đầy đủ email và mật khẩu');
      toast.error('Vui lòng điền đầy đủ email và mật khẩu ', { autoClose: 2000 })
      return;
    }
    const data={
      email: email,
      password: password
    }
   
    // console.log(data);
    try {
      const res = await signin(data)
      const token= res.data.accessToken
      const user = res.data.user
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('avatar', user.avatar);
      localStorage.setItem('role', user.role);

      toast.success('Đăng nhập thành công ', { autoClose: 2000 })
      //   console.error('Error registering user', error);
      console.log(token);
      console.log(user.role);
      if(user.role=='admin') {
        setTimeout(() => {
              navigate('/admin');
            }, 3000);
      }else{
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }

    } catch (error) {
      toast.error('Đăng nhập không thành công vui lòng kiểm tra email hoặc mật khẩu', { autoClose: 2000 })
      console.error('Error registering user', error);
    }
    
    
    
    
    
    
   
   
  };



  return (
//     <section className=" font-poppins">
//     <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
//         <div className="flex-1">
//             <div className="flex flex-wrap ">
//                 <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
//                     <div className="max-w-md mx-auto">
//                         <div className="px-4 my-7 ">
//                             <div className="mb-7">
//                                 <span
//                                     className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600 ">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
//                                         fill="currentColor" className="text-gray-200 bi bi-person-circle"
//                                         viewBox="0 0 16 16">
//                                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
//                                         <path fill-rule="evenodd"
//                                             d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
//                                         </path>
//                                     </svg>
//                                 </span>
//                             </div>
//                             <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
//                             Đăng nhập tài khoản của bạn</h2>
//                             <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
//                             Vui lòng điền thông tin xác thực của bạn</p>
//                                 <form className="form-vertical" onSubmit={handleLogin}>
//                                   <label htmlFor="Email">Email</label>
//                                   <input
//                                     type="email"
//                                     id="Email"
//                                     className="input-full"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                   />

//                                   <label htmlFor="Password">Mật khẩu</label>
//                                   <input
//                                     type="password"
//                                     id="Password"
//                                     className="input-full"
//                                     placeholder="Mật khẩu"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                   />
//                                 <div className="mb-4 text-right ">
//                                     {/* <a href="#"
//                                         className="text-sm font-semibold text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
//                                        Quên mật khẩu?</a> */}
//                                 </div>
// {/* 
//                                 <button
//                                     className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
//                                     type="submit">LOGIN</button> */}
//                                      <input
//                 type="submit"
//                 onClick={()=>"onhandSignin"}
//                 className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200"
//                 value="Đăng nhập"
//               />
//                                 <p className="text-sm text-gray-700 dark:text-gray-400"> Cần một tài khoản?
//                                     <a href="/signup"
//                                         className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
//                                         Tạo một tài khoản</a>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2 ">
//                     <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
//                     <img className="absolute inset-0 z-0 object-cover w-full h-full ml-auto"
//                         src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
//                     <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
//                         <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
//                         Chào mừng đến với cộng đồng của chúng tôi và tham gia với chúng tôi</h2>
//                         <div className="max-w-lg mx-auto mb-6">
//                             <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
//                             Bạn được chào đón ở đây!
//                             </p>
//                         </div>
//                         <a href="#"
//                             className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300">
//                             Tham gia</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
<section className=" font-poppins">
<div className="flex items-center justify-center h-full mt-3 mb-3 mx-auto max-w-7xl">
    <div className="flex-1">
        <div className="flex flex-wrap ">
            <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
                <div className="max-w-md mx-auto">
                    <div className="px-4 my-7 ">
                        <div className="mb-7">
                            <span
                                className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    fill="currentColor" className="text-gray-200 bi bi-person-circle"
                                    viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
                        Đăng nhập tài khoản của bạn</h2>
                        <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                        Vui lòng điền thông tin xác thực của bạn</p>
                        {/* <form action="" className=""> */}
                        <form acceptCharset="UTF-8"className="p-0 m-0" id="create_customer" onSubmit={handleLogin}>
                      
                           
                           <label htmlFor="Email" className="text-lg font-medium text-gray-700 dark:text-gray-400">Email</label>
                                    <input
                                     className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800 "

                                      type="email"
                                      name="email"
                                      id="email"
                                      // className="input-full"
                                      placeholder="your.email@gmail.com"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    
                          <label htmlFor="password" className="text-lg font-medium text-gray-700 dark:text-gray-400">Mật khẩu</label>
                          
                                <input
                                
                                className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800 "
                                      type="password"
                                      name="password"
                                      id="password"
                                      // className="input-full"
                                      placeholder="********"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      
                                    />


<div className="mb-4 text-right ">
                                    <a href="/forgotpassword"
                                        className="text-sm font-semibold text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                                        Quên mật khẩu?</a>
                                </div>
                          
                                 <input
                                  type="submit"
                                  className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200"
                                  value="Đăng Nhập"
                                
                                  />
                                  
                                  <p className="text-sm text-gray-700 dark:text-gray-400"> Cần một tài khoản?
                                     <a href="/signup"
                                        className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                                        Tạo một tài khoản</a>
                                </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2 ">
                <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
                <img className="absolute inset-0 z-0 object-cover w-full h-full ml-auto"
                    src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
                      
                <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
                    <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
                    Chào mừng đến với cộng đồng của chúng tôi và tham gia với chúng tôi</h2>
                    <div className="max-w-lg mx-auto mb-6">
                        <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
                        Bạn được chào đón ở đây!
                        </p>
                    </div>
                    <a href="#"
                        className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300">
                        Tham gia</a>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
  );
};

export default Signin;