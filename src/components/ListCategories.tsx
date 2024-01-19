import React, { useEffect, useState } from 'react'
import { IProduct } from '../interfaces/product';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '../context/ShoppingCartContext'


const ListCategories = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
   
    useEffect(() => {
        // Thực hiện cuộc gọi API để lấy danh sách sản phẩm từ trang chủ
        fetch(`http://localhost:8080/api/categories/655ce0ff36e2059ae8c497cc`) // Thay thế bằng API endpoint thực tế
            .then((response) => response.json())
            .then((data) => {
                if (data.products && data.products.length > 0) {
                    setProducts(data.products);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu sản phẩm: ', error);
            });
    }, []);
    return (
        <>
            {products.map((data) => (
                <div className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <Link to={`/product/${data._id}`}>
                        <div>
                            {data.img.length > 0 &&
                                <img src={data.img[0]}
                                    alt="Product" className="h-96 w-full object-cover rounded-t-xl" />
                            }
                            <div className="px-4 py-3 w-98">

                                <p className="text-lg font-bold text-black truncate block capitalize">{data.name}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">{data.price.toLocaleString()}đ</p>
                                    <div className="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}

        </>


    )
}

export default ListCategories