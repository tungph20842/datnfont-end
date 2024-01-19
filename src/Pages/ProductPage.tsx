import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api/product';
import { IProduct } from '../interfaces/product';
import { getCategory, getByidCategory } from '../api/categories';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../api/search';
import { FaSearch } from "react-icons/fa";
const ProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState<IProduct[]>([]);




  const navigate = useNavigate();
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
  const fetchCategories = async () => {
    try {
      const { data } = await getCategory();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  // const handleSearchChange = (event) => {
  //   // Lưu giá trị nhập từ người dùng khi thay đổi ô tìm kiếm
  //   setSearchTerm(event.target.value);
  // };


  const searchProducts = () => {
    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    setProducts(filteredProducts);
  };


  // const handleCategoryClick = (categoryId) => {
  //   // Chuyển hướng đến URL `/categories/:categoryId`
  //   navigate(`/categories/${categoryId}`);
  // };


  const handleSortChange = (event) => {
    // Lưu giá trị lựa chọn của người dùng khi thay đổi sắp xếp
    setSortOption(event.target.value);
  };


  const sortProducts = () => {
    // Xử lý sắp xếp sản phẩm dựa trên lựa chọn của người dùng
    let sortedProducts = [...products];


    switch (sortOption) {
      case 'low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Mặc định sắp xếp theo giá thấp đến cao
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
    }


    setProducts(sortedProducts);
  };


  const fetchProducts = async () => {
    try {
      const { data } = await getProduct();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);


  useEffect(() => {
    // Gọi hàm tìm kiếm khi giá trị từ khóa thay đổi
    searchProducts();
  }, [searchTerm]);


  useEffect(() => {
    // Gọi hàm sắp xếp khi giá trị lựa chọn thay đổi
    sortProducts();
  }, [sortOption]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Nếu có `categoryId`, thì lấy sản phẩm thuộc danh mục đó
        if (categoryId) {
          const response = await getByidCategory(categoryId);
          // Kiểm tra xem response.data có phải là mảng không
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            console.error('Invalid data structure for products');
          }
        } else {
          // Nếu không có `categoryId`, lấy tất cả sản phẩm
          fetchProducts();
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


    fetchData();
  }, [categoryId]);


  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-[20%,75%]  mr-8">
        {/* Phần danh mục */}
        <div className="hidden md:block">
          <div className="flex h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">

              <span className="grid h-10 place-content-center rounded-lg bg-gray-100 text-xl text-gray-600">
                Danh mục
              </span>
              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    to="/product"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    Tất cả sản phẩm
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category._id} className="grid grid-cols-1">
                    <Link
                      to={`/categories/${category._id}`}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Phần tìm kiếm */}


              <div className=" flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 items-center mt-4 relative mb-5">
                <div className="relative ml-auto flex-shrink-0 search-bar">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchValue}
                    onChange={(e) => hanldeSearch(e)}
                    onBlur={() => {
                      if (!searchValue.trim()) {
                        setSearchData([]);
                      }
                    }}
                    className="w-full p-2 pl-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    autoFocus
                  />
                  <span className="absolute top-0 left-0 bottom-0 px-2 flex items-center">
                    <FaSearch className="text-gray-400" />
                  </span>
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
                              <div className="w-8 h-8 bg-gray-300 mr-2 rounded-md">{/* Hiển thị một phần nào đó khi không có ảnh */}</div>
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
              </div>
            </div>

          </div>
        </div>
        <div className="">
          {/* Phần lọc sản phẩm */}
          <div className="grid grid-cols-1 justify-end">
            <div className="md:col-span-2 lg:col-span-3">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold ml-3 md:ml-5">
                Tất cả sản phẩm
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 ml-5  justify-end">
              <div className="w-full md:w-auto lg:w-auto">
                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="mt-1 w-full md:w-auto lg:w-auto rounded-lg border-gray-300 text-sm text-gray-700"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="">Giá</option>
                  <option value="low">Thấp nhất</option>
                  <option value="high">Cao nhất</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hiển thị sản phẩm */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-28 mt-5 mx-auto pl-5">
          
          
            {products
              .filter((product) => (categoryId ? product.categoryId === categoryId : true))
              .map((product) => (
                <div key={product._id} className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <div>
                        <Link to={`/product/${product._id}`}>
                <img src={product.img[0]}
                  alt="Product" className="h-96 w-full object-cover rounded-t-xl" />
                         </Link>
                <div className="px-4 py-3 w-98">
                <Link to={`/product/${product._id}`}>
                  <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                  </Link>
                  <div className="flex items-center">
                <Link to={`/product/${product._id}`}>
                    <p className="text-lg font-semibold text-black cursor-auto my-3">{product.price.toLocaleString()}đ</p>
                    </Link>
                    <div className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              </div>
                // <div
                //   key={product._id}
                //   className="rounded shadow-sm p-4 relative group hover:transition-all duration-300"
                // >
                //   <Link to={`/product/${product._id}`}>
                //     <img
                //       src={product.img[0]}
                //       className="w-full h-auto object-cover mb-4 transition-transform transform hover:scale-105 rounded-xl "
                //       alt=""
                //     />
                //   </Link>
                //   <div className="text-center">
                //     <div className="text-lg my-2">
                //       <Link
                //         to={`/product/${product._id}`}
                //         className="text-gray-400 hover:text-black"
                //       >
                //         {product.name}
                //       </Link>
                //     </div>
                //     <span className="text-sm font-bold mr-2 text-red-500">
                //       {`${product.price}đ`}

                //     </span>
                //   </div>
                // </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};




export default ProductPage;
