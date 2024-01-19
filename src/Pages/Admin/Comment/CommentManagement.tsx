
import React, { useEffect, useState,useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getProduct } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';
import { Table ,Input } from 'antd';
import { Comments } from '../../../interfaces/comment';


const { Search } = Input;
const CommentManagement = () => {
    const [products, setProducts] = useState<IProduct[]>([])
  const [searchKeyword, setSearchKeyword] = useState('');
  const sorte = products.reverse()
    
    console.log(products);
    useEffect(() => {
        async function fetchProduct() {
            const { data } = await getProduct();
            setProducts(data);
            console.log(data);

        }
        fetchProduct()
    }, [])
    const handleSearch = (value: string) => {
        setSearchKeyword(value);
      };
    
    const columns = [
        {
            title: 'Images',
            dataIndex: 'img',
            width: "10%",
            key: 'img',
            render: (img: string[]) => (
                <img src={img[0]} alt="product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: "30%",
            key: 'name',
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "40%",
            key: "status",
            render: (status:any,record:IProduct) => (
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <Link to={`comment/${record._id}`}>
                    <button
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>

                        View
                    </button>
                    </Link>
                </div>

            )
        },
    ];
    const filteredProducts = useMemo(() => {
        return sorte.filter((product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }, [sorte, searchKeyword]);
    return (
        <div className="ml-4 mr-4 mt-4">
        <div className="flex justify-between items-center mb-4"> 
    <div className="text-center flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Quản Lý Bình Luận</h1>
    </div>
    <div>
      <Search
          placeholder="Tìm kiếm theo name"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginBottom: 16 }}
        />
      </div>
    </div>
    
            <Table dataSource={filteredProducts.map((product,index)=>({...product,index:index+1}))} columns={columns} />
            </div>

        //     <body classNameName="bg-gray-100 mx-auto w-full">

        //     <div classNameName="container   p-4 bg-white rounded shadow-xl">
        //     <div classNameName="text-center pb-7 ">
        //         <h1 classNameName="text-2xl font-semibold">Quản Lý Bình Luận</h1>

        //     </div>

        //     {/* <div classNameName="mt-4">
        //         <input type="text" placeholder="Tìm kiếm bình luận..." classNameName="w-full p-2 border rounded"/>

        //         <div classNameName="flex mt-2 space-x-4">
        //             <select classNameName="p-2 border rounded">
        //                 <option>Chọn sản phẩm</option>

        //                 <option>Sản phẩm A</option>
        //                 <option>Sản phẩm B</option>
        //             </select>
        //             <select classNameName="p-2 border rounded">
        //                 <option>Tất cả trạng thái</option>
        //                 <option>Đã duyệt</option>
        //                 <option>Chưa duyệt</option>
        //                 <option>Đã ẩn</option>
        //             </select>

        //             <input type="date" classNameName="p-2 border rounded"/>
        //             <span>đến</span>
        //             <input type="date" classNameName="p-2 border rounded"/>
        //         </div>
        //     </div> */}

        //     <table classNameName="mt-4 w-full border-collapse">
        //         <thead>
        //             <tr classNameName="bg-gray-300">
        //                 <th classNameName="border p-2">ID</th>
        //                 <th classNameName="border p-2">Tên sản phẩm</th>
        //                 <th classNameName="border p-2">Ảnh</th>
        //                 <th classNameName="border p-2">giá </th>
        //                 <th classNameName="border p-2">Giá Sale</th>
        //                 <th classNameName="border p-2">Trạng thái</th>
        //             </tr>
        //         </thead>
        //         <tbody>

        //            {products.map((product,index)=>(
        //              <tr classNameName='' key={product._id}>
        //              <td classNameName="border p-2 text-center">{index+1}</td>
        //              <td classNameName="border text-center">{product.name}</td>
        //              <td classNameName="border   text-center"><img classNameName='h-80 mx-auto ' src={product.img} alt="" /></td>
        //              <td classNameName="border  text-center">{product.price}</td>
        //              <td classNameName="border  text-center">{product.price_sale}</td>
        //              <td classNameName="border text-center  ">
        //                  <Link classNameName='' to={`comment/${product._id}`}><button classNameName="bg-red-500 text-white pl-3 pr-3   py-1 rounded">Xem chi tiết bình luận</button></Link>
        //              </td>
        //          </tr>
        //            ))}

        //         </tbody>
        //     </table>

        //     <div classNameName="mt-4 flex justify-center">

        //         <button classNameName="bg-blue-500 text-white px-4 py-2 rounded">1</button>
        //         <button classNameName="bg-white text-blue-500 px-4 py-2 rounded ml-2">2</button>

        //     </div>
        // </div>

        // </body>

    )
}

export default CommentManagement