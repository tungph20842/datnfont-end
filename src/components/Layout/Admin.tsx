import { Outlet } from 'react-router-dom'
import withAuthorization from '../../path/to/withAuthorization'
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IUser } from '../../interfaces/auth';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '../../api/auth';
import { Link } from 'react-router-dom'

interface TokenPayload {
  id: string;
  // Bạn cần thêm các trường khác từ payload token nếu cần
}
type Props = {}

const Admin = (props: Props) => {
  const [data, setData] = useState<IUser>({} as IUser);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      // Xóa token username khi đăng xuất
      localStorage.removeItem('token');
      localStorage.removeItem('avatar');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('Discount_Type')
      localStorage.removeItem('Quantity')
      localStorage.removeItem('id')

      setTimeout(() => {
        navigate('/');
      }, 3000);
      toast.success('Đăng xuất thành công ', { autoClose: 2000 })

    } catch (error) {
      toast.error('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.', { autoClose: 2000 });
      console.error('Error during logout', error);
    }
  };
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in localStorage.");
      return null;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log("id", decoded); // Kiểm tra xem decoded token có đúng không
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const id = getUserIdFromToken();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await getUserById(id)
        setData(data)
        console.log(data);

      }
    }
    fetchData()
  }, [])
  return (
    <div className='font-poppins  antialiased'>
      <div id='view' className='h-full w-screen flex flex-row' x-data='{ sidenav: true }'>

        <button className='p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden'>
          <svg
            className='w-5 h-5 fill-current'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div
          id='sidebar'
          className='bg-white  md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out'
          x-show='sidenav'
        >

          <div className='space-y-6  md:space-y-10 mt-10'>

            <h1 className='font-bold text-4xl text-center md:hidden'>
              D<span className='text-teal-600'>.</span>
            </h1>

            <h1 className='hidden  md:block font-bold text-sm md:text-xl text-center '>
              {/* <img className='mx-auto' src="image-removebg-preview 1.png" alt="" /> */}
            </h1>


            <div id='profile' className='space-y-3'>
              <div className='relative '>
                <img
                  src={data.avatar}
                  alt='Avatar user'
                  className='w-32 h-32 rounded-full overflow-hidden object-cover mx-auto'
                />
              </div>
              <div>
                <h2 className='font-medium text-xs md:text-sm text-center text-teal-500'>{data.username} <span> </span></h2>
                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '3 px'  }}>
                  <p className='text-xs text-gray-500 text-center relative'>{data.role} </p>
                  <span>
                  <svg onClick={() => setShowMenu(!showMenu)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-4 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>

                    
                  </span>
                </div>

                {showMenu && (
                  <div className={`absolute-left-11  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`} ref={menuRef}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link to={`/information/${data._id}`} className='block px-2 py-2 text-sm text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className='w-4 h-4 fill-current inline-block'
                          fill='currentColor'
                          viewBox='0 0 512 512'>


                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        {/* <p className="block px-4 py-2 text-sm text-gray-700">Thay Đổi Thông Tin</p> */}
                        <span className='px-1'>Thay Đổi Thông Tin</span>
                      </Link>
                      <a

                        className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className='w-4 h-4 fill-current inline-block'
                          fill='currentColor'
                          viewBox='0 0 512 512'
                        >

                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                        <span className='px-1'>Đăng xuất</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div id='menu' className='flex flex-col space-y-2'>
              <a
                href='/admin'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                </svg>
                <span className=''>Dashboard</span>
              </a>
              <Link
                to='/admin/analytics'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                </svg>
                <span className=''>Analytics</span>
              </Link>
              <a
                href='/admin/products'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z'></path>
                </svg>
                <span className=''>Products</span>
              </a>
              <a
                href='/admin/categories'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                  <path
                    fillRule='evenodd'
                    d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className=''>Categories</span>
              </a>
              <a
                href='/admin/productSize'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <img className='w-7 h-7 fill-current inline-block' src="/triangle-ruler-9456.svg" alt="" />
                <span className=''>Product Size</span>
              </a>
              <a
                href='/admin/color'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                   viewBox='0 0 512 512'
                >
                  <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                <span className='mx-1'>Color</span>
              </a>
              <a
                href='/admin/size'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
              <svg xmlns="http://www.w3.org/2000/svg" 
              className='w-6 h-6 fill-current inline-block'
              fill='currentColor'
               viewBox='0 0 512 512'>
                
                
                <path d="M200 32H56C42.7 32 32 42.7 32 56V200c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312V456c0 13.3 10.7 24 24 24H200c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H456c13.3 0 24-10.7 24-24V312c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V56c0-13.3-10.7-24-24-24H312c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"/></svg>
                <span className='mx-1'>Size</span>
              </a>
              <a
                href='/admin/messages'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z'></path>
                  <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z'></path>
                </svg>
                <span className=''>Messages</span>
              </a>
              <a
                href='/admin/vouchers'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className=''>Vouchers</span>
              </a>
              <a
                href='/admin/orders'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className=''>Order</span>
              </a>
              <a
                href='/admin/blog'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z'></path>
                </svg>
                <span className=''>Blog</span>
              </a>
              <a
                href='/admin/contact'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 384 512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {/* Thêm biểu tượng liên hệ tại đây */}
                  {/* Đây là một ví dụ biểu tượng liên hệ, bạn có thể thay đổi hoặc sử dụng biểu tượng của mình */}
                  <path d='M256 48V64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H256zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM160 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z'></path>
                </svg>
                <span className=''>Contact</span>
              </a>
              <a
                href='/admin/users'
                className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out'
              >
                <svg
                  className='w-6 h-6 fill-current inline-block'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
                </svg>
                <span className=''>Users</span>
              </a>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default withAuthorization(Admin)
