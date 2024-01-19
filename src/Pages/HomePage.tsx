
import Category from './Category'
import Form from '../components/Layout/Form'
import { useEffect, useState } from 'react'
import { getProduct } from '../api/product'
import { IProduct } from '../interfaces/product'
import Product from '../components/product'
import ListCategories from '../components/ListCategories'
import { IBlog } from '../interfaces/blog'
import { getAllBlog } from '../api/blog'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [sortedBlogs, setSortedBlogs] = useState<IBlog[]>([]);
    const fetProducts = async () => {
        const { data } = await getProduct()
        // console.log(data);
        setProducts(data)

    }
    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await getAllBlog();
            const sortedBlogs = response.data.sort((a:any, b:any) => {
              // Sắp xếp theo thời gian mới nhất đến cũ nhất
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setSortedBlogs(sortedBlogs);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          }
        };
      
        fetchBlogs();
      }, []);
    useEffect(() => {
        fetProducts()
    }, [])
    // console.log(products);

    return (
        <div>
            <Category />
            <div className='max-w-[1440px] mx-auto px-8'>
                <h2 className="font-bold text-[27px] text-center pt-8 pb-8">Sản Phẩm Mới</h2>
                <section id="Projects"
                    className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-10 mt-10 mb-5">

                    {products.slice(0, 8).map((item) => <Product key={item._id} data={item} />)}
                </section>


            </div>
            {/* ListProduct1 */}
            <div className='max-w-[1440px] mx-auto mb-10 px-8'>
                <h2 className="font-bold text-[27px] text-center pt-8 pb-8">Áo Blazer Cao Cấp</h2>
                <section id="Projects"
                    className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-10 mt-10 mb-5">

                    <ListCategories />
                </section>

            </div>
            <div className='border-b-2 max-w-[1800px] mx-auto'>
                <img className='w-full' src="slide_1.png" alt="" />
                <div className='max-w-[1440px] mx-auto '>

                    <div className='text-center'>
                        <h2 className='font-bold text-[27px] text-center pt-8 pb-2'>GOOD THING GOOD NEWS</h2>
                        <span className='text-[14px] font-medium '>ĐÓN ĐẦU XU HƯỚNG, ĐỊNH HÌNH PHONG CÁCH</span>
                    </div>

                    <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {sortedBlogs.slice(0,3).map((blog) => (
                        <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img src={blog.img} alt="Image 1" className="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:scale-110" />

                            <div className="mt-4">
                                <p className="font-semibold">{blog.title}</p>
                                <p className="text-gray-600 mt-2 overflow-hidden overflow-ellipsis  whitespace-nowrap ">{blog.description}</p>
                                <p className="text-gray-500 mt-4">Ngày đăng :{blog.date}</p>
                                <Link to={`/blog/${blog._id}`}>
                                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full">XEM THÊM</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                        {/* Card 1 */}
                        

                      
                        

                      
                        

                    </div>


                </div>
            </div>
            <div className='max-w-[1440px] mx-auto mt-14   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='flex gap-5 items-center'>
                    <div>
                        <img src="ship.jpg" alt="" />
                    </div>
                    <div>
                        <p className='text-[16px] font-semibold pb-5'>Miễn phí vận chuyển</p>
                        <p className='text-[14px]'>Áp dụng cho mọi đơn hàng từ 500k</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div>
                        <img src="doi.jpg" alt="" />
                    </div>
                    <div>
                        <p className='text-[16px] font-semibold pb-5'>Đổi trả dễ dàng</p>
                        <p className='text-[14px]'>7 ngày đổi trả vì bất kì lí do gì</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div>
                        <img src="hotro.jpg" alt="" />
                    </div>
                    <div>
                        <p className='text-[16px] font-semibold pb-5'>Hỗ trợ nhanh chóng</p>
                        <p className='text-[14px]'>HOTLINE 24/7 : 0964942121</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div>
                        <img src="thanhtoan.jpg" alt="" />
                    </div>
                    <div>
                        <p className='text-[16px] font-semibold pb-5'>Thanh toán đa dạng</p>
                        <p className='text-[14px]'>Thanh toán khi nhận hàng, Napas, Visa, Chuyển Khoản</p>
                    </div>
                </div>
            </div>
            <Form />
        </div>
    )
}

export default HomePage