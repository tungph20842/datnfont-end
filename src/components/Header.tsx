import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useShoppingContext } from '../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchProduct } from '../api/search';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '../api/auth';
import { IUser } from '../interfaces/auth';
import { IProduct } from '../interfaces/product';
import { getColor } from "../api/color";
import { getSize } from "../api/size";
import { IColor } from '../interfaces/color'
import { ISize } from "../interfaces/size";
import axios from "axios";


interface TokenPayload {
  id: string;
  // Bạn cần thêm các trường khác từ payload token nếu cần
}
const Header: React.FC = () => {
  const [showCartItems, setShowCartItems] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showseach, setShowSeach] = useState(false);
  const [colors, setColors] = useState<IColor[]>([]);
const [sizes, setSizes] = useState<ISize[]>([]);

  const [data, setData] = useState<IUser>({} as IUser);
  const [searchData, setSearchData] = useState<IProduct[]>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isAuthenticated = !!token && !!username;
  useEffect(() => {
    axios
      .get<ISize[]>("http://localhost:8080/api/size")
      .then((response) => setSizes(response.data))
      .catch((error) => console.error("Error fetching size data:", error));

    // Fetch color data from your API
    axios
      .get<IColor[]>("http://localhost:8080/api/color")
      .then((response) => setColors(response.data))
      .catch((error) => console.error("Error fetching color data:", error));
  }, []);

  const getSize = (sizeId: string) => {
    const size = sizes.find((s) => s._id === sizeId);
    return size ? size.name : "Unknown Size";
  };
  const getColor = (colorId: string) => {
    const color = colors.find((c) => c._id === colorId);
    return color ? color.name : "Unknown Color";
  };
    // const size = sizes.find(s => s._id === sizeId)?.name || 'Unknown Size';
    // const color = colors.find(c => c._id === colorId)?.name || 'Unknown Color';
  if (isAuthenticated) {
    console.log('Authenticated user:', username);
  } else {
    console.log('User not authenticated');
  }
  const hanldeSearch = async (e: any) => {
    const value = e.target.value;
    setSearchValue(value);


    if (value.trim() !== '') {
      // Thực hiện tìm kiếm chỉ khi có giá trị trong ô tìm kiếm
      const res = await searchProduct(value);
      const { data } = res;
      setSearchData(data);
    } else {
      // Nếu giá trị trống, đặt data về mảng rỗng
      setSearchData([]);
    }
  }
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

  const menuRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const { cartQty,cartItem } = useShoppingContext()
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
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await getUserById(id)
        setData(data)
        console.log(data);

      }
    }
    fetchData()
  }, [id])
  return (
    <header className="bg-white shadow-md relative">
      <ToastContainer />
      <div className="text-center bg-black text-white overflow-hidden">
  <p className="text-[12px] pt-1 pb-1" style={{
    animation: 'marquee 15s linear infinite',
    // display: 'inline-block',
    whiteSpace: 'nowrap',
  }}>Shop Thời Trang Quần Áo Nam TND</p>
</div>
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">
          <a href=""> <img src="image-removebg-preview 1.png" alt="" /></a>
        </div>

        <nav className="hidden md:flex space-x-4 mr-8 lg:flex lg:items-center lg:justify-end lg:gap-8 uppercase text-sm text-gray-500 font-medium">
          <a href="/" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Trang chủ</a>
          <a href="/product" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Cửa hàng</a>
          <a href="/blog" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Blog</a>
          <a href="/contact" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Liên Hệ</a>

        </nav>

        <div className="flex items-center space-x-4 relative">
        <i className="fas fa-search text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setShowSeach(!showseach)}></i>
        {showseach && (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-md shadow-lg p-4 z-10 transition-transform transform ">
        <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchValue}
            onChange={(e) =>
                hanldeSearch(e)
            }

            onBlur={() => {
                if (!searchValue.trim()) {
                  setShowSeach(false);
                }
            }}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
            autoFocus
        />
                {searchValue.trim() && searchData.length > 0 && (
               <div className="absolute z-10 bg-white border border-gray-300 mt-2 mt-auto w-full rounded-md shadow-md right-0 max-h-80 overflow-y-auto">
                {searchData.map((value) => (
                <Link
                key={value._id}
                to={`/product/${value._id}`}
                className="block px-4 py-2 hover:bg-gray-100"
                >
                <div className="flex items-center">
                  {value.img && value.img.length > 0 ? (
                    <img
                      src={value.img[0]}
                      alt={value.name}
                      className="w-8 h-8 object-cover mr-2 "
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 mr-2 rounded-md"></div>
                  )}

                  <div>
                    <div>{value.name}</div>
                    <span className="text-sm font-bold mr-2 text-red-500">
                      {`${value.price.toLocaleString()}đ`}

                    </span>
                  </div>
                </div>
                </Link>
                ))}
                </div>
                )}
                    </div>
                )}



<div className="flex items-center space-x-4 relative">
        <a href="/cart" onMouseEnter={() => setShowCartItems(true)} onMouseLeave={() => setShowCartItems(false)}>
          <div className="relative group">
            {/* Biểu tượng giỏ hàng */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            {/* Số lượng sản phẩm trong giỏ hàng */}
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-red-600">
              {cartQty}
            </span>
          </div>
        </a>

        {showCartItems && (
  <div onMouseEnter={() => setShowCartItems(true)} onMouseLeave={() => setShowCartItems(false)} className="absolute top-full z-10 -right-11 bg-white border border-gray-300 mt-2 mt-auto w-96 rounded-md shadow-md right-0 max-h-80 overflow-y-auto">
    <div className="p-4 space-y-4">
      {cartItem.length === 0 ? (
        <p className="text-sm font-semibold text-center">Giỏ hàng rỗng</p>
      ) : (
        cartItem.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center space-x-2">
              <img
                src={item.img[0]}
                alt={item.name}
                className="w-8 h-auto object-cover rounded-md"
              />
              <div>
                <div className="text-sm font-semibold">{item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}</div>
                <div className="text-[10px]">{`Size: ${item.sizeId !== null ? getSize(String(item.sizeId)) : "N/A"}`}</div>
                <div className="text-[10px]">{`Color: ${item.colorId !== null ? getColor(String(item.colorId)) : "N/A" }`}</div>
                <span className="text-sm font-semibold">{`Số lượng: ${item.quantity}`}</span>
              </div>
            </div>
            <div className="flex items-center">
         <span className="text-sm font-bold mr-2 text-red-500">{`${(item.price * item.quantity).toLocaleString()}đ`}</span>
            </div>
          </div>
        ))
      )}
      {cartItem.length !== 0 && (
        <div className="transition-colors text-center text-sm bg-red-600 hover:bg-red-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
          <a href='/cart' className="text-[13px] font-semibold text-red-500 text-white">Xem Giỏ hàng</a>
        </div>
      )}
    </div>
  </div>
)}

                      </div>
          <i
            className="fas fa-user text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          ></i>
          {showMenu && (
            <div className={`absolute top-full -right-11 mt-2 w-56 rounded-md  shadow-lg bg-white ring-1 ring-black ring-opacity-5`} ref={menuRef}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {isAuthenticated ? (
                  <>
                    <Link to={`/information/${data._id}`}  className='block px-2 py-2 text-sm text-gray-700'>
                      {/* <a className='block px-2 py-2 text-sm text-gray-700'> */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className='w-4 h-4 fill-current inline-block'
                          fill='currentColor'
                          viewBox='0 0 512 512'>


                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        {/* <p className="block px-4 py-2 text-sm text-gray-700">Thay Đổi Thông Tin</p> */}
                        <span className='px-1'>Thay Đổi Thông Tin</span>
                      {/* </a> */}
                    </Link>
                    <a href="/purchase" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <svg xmlns="http://www.w3.org/2000/svg"
               className='w-4 h-4 fill-current inline-block'
               fill='currentColor'
               viewBox='0 0 512 512'>
              <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
              <span className='px-1'>Đơn Hàng Đã Đặt</span>
              </a>
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
                  </>
                ) : (
                  <>
                    <a href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className='w-4 h-4 fill-current inline-block'
                        fill='currentColor'
                        viewBox='0 0 640 512'
                      >


                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                      <span className='px-1'>Đăng ký</span>

                    </a>
                    <a href="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className='w-4 h-4 fill-current inline-block'
                        fill='currentColor'
                        viewBox='0 0 512 512'>

                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>

                      <span className='px-1'>Đăng nhập</span>
                    </a>
                  </>
                )}
              </div>
              <div className="md:hidden">
                <i className="fas fa-bars text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setMenuOpen(true)}></i>
              </div>
            </div>

          )}

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${menuOpen ? 'translate-x-0 w-64' : 'translate-x-full w-0'} z-50 p-4 overflow-y-auto`}
        ref={menuRef}
      >
        <nav className="space-y-4 font-medium">
          <a href="#" className="block text-gray-600 hover:text-red-400">Trang Chủ</a>
          <a href="#" className="block text-gray-600 hover:text-red-400">Sản Phẩm</a>
          <a href="#" className="block text-gray-600 hover:text-red-400">LookBook</a>
          <a href="#" className="block text-gray-600 hover:text-red-400">Dịp/Sự Kiện</a>
          <a href="#" className="block text-gray-600 hover:text-red-400">Blog</a>
          <a href="#" className="block text-gray-600 hover:text-red-400">Cửa Hàng</a>
        </nav>
        <i className="fas fa-times text-gray-600 hover:text-gray-800 cursor-pointer absolute top-4 right-4" onClick={() => setMenuOpen(false)}></i>
      </div>
    </header>
  );
}

export default Header;