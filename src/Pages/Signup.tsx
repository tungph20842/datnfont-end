import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signup } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IUser } from '../interfaces/cart';



const Signup = () => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const [user, setUser] = useState([])
 useEffect(() => {
  async function fetchuser() {
    const { data } = await getUser();
    setUser(data);
    // console.log(data);
  }
  fetchuser()
 }, [])
console.log(user);

  const navigate = useNavigate();
  const handleSignup = async (e: any) => {
    e.preventDefault();
    
    if (!lastName || !email || !confirmPassword || !password) {
      // setError('Vui lòng nhập đầy đủ thông tin');
      toast.error('Vui lòng nhập đầy đủ thông tin ', { autoClose: 2000 })
      return;
    }
    if(password.length<6){
      toast.error('Mật khẩu ít nhất 6 ký tự', { autoClose: 2000 })
      return;
    }
    
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email.match(emailRegex)) {
      toast.error('Định dạng email không hợp lệ', { autoClose: 2000 });

      return;
    }
   

   const data={
    username: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
   }

  //  console.log(data);
    const adduser= await signup(data)
    .then(() => {
      // Đăng ký thành công
      toast.success('Đăng ký thành công', { autoClose: 2000 })
    })
    .then(() => {
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    })
    .catch((error) => {
      toast.error('Đăng ký không thành công vui lòng kiểm tra lại thông tin đăng ký', { autoClose: 2000 })
      console.error('Error registering user', error);
    });   
    
  };

  return (
  
//     	<section className="h-96 lg:h-screen font-poppins ">
//       <div className="relative z-10 flex justify-center h-screen py-7 lg:py-16 dark:bg-gray-800 2xl:py-44">
//           <div
//               className="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 lg:bottom-0 lg:h-auto lg:w-full">
//               <div className="absolute inset-0 lg:bg-[#00000066] "></div>
//               <img
//     src="1.png"
//     alt=""
//     className="hidden object-cover w-full h-full lg:block"
// />
//           </div>
//           <div className="flex items-center justify-center">
//               <div className="relative max-w-6xl px-4 mx-auto">
//                   <div className="max-w-xl mx-auto lg:max-w-5xl">
//                       <div className="flex flex-wrap items-center -mx-4">
                     
//                           <div className="hidden w-full px-6 mb-16 lg:w-3/5 lg:mb-0 lg:block">
//                                 <h2
//                                     className="text-4xl font-bold leading-loose text-left text-gray-100 dark:text-gray-300 mb-9 lg:text-6xl ">
//                                     Welcome and join our community</h2>
//                                 <p className="text-lg text-left text-gray-200 dark:text-gray-300 ">You are welcome here!</p>
//                             </div>
                       
//                           <div className="w-full px-4 lg:w-2/5">
//                               <div className="p-6 shadow-md lg:p-9 bg-gray-50 dark:bg-gray-900 ">
//                                     <div className="mb-7">
//                                   <span
//                                       className="flex items-center justify-center w-20 h-20 mx-auto text-gray-700 bg-blue-600 rounded-lg dark:bg-blue-600 ">
//                                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
//                                           fill="currentColor" className="text-gray-200 bi bi-person-circle"
//                                           viewBox="0 0 16 16">
//                                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
//                                           <path fill-rule="evenodd"
//                                               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
//                                           </path>
//                                       </svg>
//                                   </span>
//                               </div>
//                               <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
//                                   Login your Account</h2>
//                               <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
//                                   Please fill your credentials</p>
//                                   {/* <form action="" className="p-0 m-0"> */}
//                                   <form acceptCharset="UTF-8"className="p-0 m-0" id="create_customer" onSubmit={handleSignup}>
                                     
//                                       <input name="form_type" type="hidden" value="create_customer" />
//                                       <input name="utf8" type="hidden" value="✓" />
//                                       <label htmlFor="username" className="text-lg font-medium text-gray-700 dark:text-gray-400">Tên</label>
//                                       <input
//                                       className="input-full w-full px-4 py-3 mt-3 bg-gray-200 rounded-lg dark:text-gray-400 dark:bg-gray-800 "
//                                         type="text"
//                                         name="last_name"
//                                         id="username"
//                                         // className="input-full"
//                                         placeholder="Tên"
//                                         value={lastName}
//                                         onChange={(e) => setLastName(e.target.value)}
//                                       />
//                                       <label htmlFor="Email" className="text-lg font-medium text-gray-700 dark:text-gray-400">Email</label>
//                                         <input
//                                          className="input-full w-full px-4 py-3 mt-3 bg-gray-200 rounded-lg dark:text-gray-400 dark:bg-gray-800 "
//                                           type="email"
//                                           name="email"
//                                           id="email"
//                                           // className="input-full"
//                                           placeholder="Email"
//                                           value={email}
//                                           onChange={(e) => setEmail(e.target.value)}
//                                         />

                                    

//                                         <label htmlFor="CreatePassword" className="text-lg font-medium text-gray-700 dark:text-gray-400">Mật khẩu</label>
//                                         <input
//                                              className=" input-full w-full px-4 py-3 mt-3 bg-gray-200 rounded-lg dark:text-gray-400 dark:bg-gray-800 "
//                                           type="password"
//                                           name="password"
//                                           id="CreatePassword"
//                                           // className="input-full"
//                                           placeholder="Mật khẩu"
//                                           value={password}
//                                           onChange={(e) => setPassword(e.target.value)}
//                                         />

//                                       <label htmlFor="CreatePassword" className="text-lg font-medium text-gray-700 dark:text-gray-400">Nhập lại mật khẩu</label>
//                                         <input
//                                              className="input-full w-full px-4 py-3 mt-3 bg-gray-200 rounded-lg dark:text-gray-400 dark:bg-gray-800 "
//                                           type="password"
//                                           name="confirmPassword"
//                                           id="confirmPassword"
//                                           // className="input-full"
//                                           placeholder="Mật khẩu"
//                                           value={confirmPassword}
//                                           onChange={(e) => setConfirmPassword(e.target.value)}
//                                         />
              
                                     
//                                       <div className="mt-5 text-right">
//                                           <a href="#"
//                                               className="text-sm font-semibold text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
//                                               forgot password?</a>
//                                       </div>
//                                       <p>
//                                       <input
//                                       type="submit"
//                                       className="bg-black text-white w-full py-2 px-4 rounded-none"
//                                       value="Đăng ký"
                                    
//                                       />
//                                       </p>
//                                       <div
//                                           className="flex flex-wrap items-center mt-3 text-sm text-gray-700 lg:text-base lg:mt-5 dark:text-gray-400">
//                                           Need an account?
//                                           <a href="#" className="ml-2 text-base font-semibold text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
//                                               Create an account</a>
//                                       </div>
//                                   </form>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           </div>
//   </section>
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
                            Đăng ký tài khoản mới</h2>
                            <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                            Vui lòng điền đầy đủ thông tin yêu cầu</p>
                            {/* <form action="" className=""> */}
                            <form acceptCharset="UTF-8"className="p-0 m-0" id="create_customer" onSubmit={handleSignup}>
                            <input name="form_type" type="hidden" value="create_customer" />
                                    <input name="utf8" type="hidden" value="✓" />
                                    <label htmlFor="username" className="text-lg font-medium text-gray-700 dark:text-gray-400">Tên</label>
                                     <input
                                      className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800 "
                                        type="text"
                                        name="last_name"
                                        id="username"
                                        // className="input-full"
                                        placeholder="Nguyễn Văn A"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                      />
                               
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
                              <label htmlFor="CreatePassword" className="text-lg font-medium text-gray-700 dark:text-gray-400">Mật khẩu</label>
                              
                                    <input
                                    
                                    className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800 "
                                          type="password"
                                          name="password"
                                          id="CreatePassword"
                                          // className="input-full"
                                          placeholder="********"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          
                                        />

                                      <label htmlFor="CreatePassword" className="text-lg font-medium text-gray-700 dark:text-gray-400">Nhập lại mật khẩu</label>
                                        <input
                                             className="input-full w-full px-4 py-3 mt-3 bg-white-200 rounded-lg dark:text-white-400 dark:bg-white-800 "
                                          type="password"
                                          name="confirmPassword"
                                          id="confirmPassword"
                                          // className="input-full"
                                          placeholder="********"
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
              
                                {/* <div className="relative flex items-center mb-4">
                                    <input type="password"
                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                        placeholder="Repeat password" required>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        className="absolute right-0 items-center mr-3 dark:text-gray-50"
                                        fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path
                                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path
                                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path
                                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                                </div> */}
                                <div className="mb-4 text-right ">
                                   
                                </div>

                                {/* <button
                                    className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
                                    type="submit">LOGIN</button> */}
                                     <input
                                      type="submit"
                                      className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200"
                                      value="Đăng ký"
                                    
                                      />
                                      
                                <p className="text-sm text-gray-700 dark:text-gray-400"> Đã có tài khoản?
                                    <a href="/signin"
                                        className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                                       Đăng nhập</a>
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

export default Signup;