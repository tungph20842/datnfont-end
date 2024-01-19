// import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { getById, getProduct } from "../api/product"
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/product"
import Product from "../components/product"
import { IColor } from "../interfaces/color"
import { getColor } from "../api/color"
import { ISize } from "../interfaces/size"
import { getSize } from "../api/size"
import { CartItem, useShoppingContext } from "../context/ShoppingCartContext"
import { Comments } from "../interfaces/comment"
import { jwtDecode } from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"
import { getComment } from "../api/comment"
import { Avatar, Button, Input, Progress, Rate, Space } from "antd"
import { getCategory } from "../api/categories"
import { ICategories } from "../interfaces/categories"
interface TokenPayload {
    id: string;
    // Bạn cần thêm các trường khác từ payload token nếu cần
}

const DetailPage = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    console.log(product.sizeAndcolor)
    const [products, setProducts] = useState<IProduct[]>([])

    const [colors, setColors] = useState<IColor[]>([])
    const [sizes, setSizes] = useState<ISize[]>([])
    
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Array<{ sizeId: string; colorId: string; quantity: number }>>([]);
    console.log(quantities);
    // const [color, setColor] = useState<string | null>(null)
    // const [size, setSize] = useState<string | null>(null)
    
    const [quantity, setQuantity] = useState<number>(1)
    const { productId } = useParams()
    const [comments, setComments] = useState<Comments[]>([]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [categories, setCategories] = useState<ICategories[]>([]);
    console.log("log id", productId);

    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found in localStorage.');
            return null;
        }

        try {
            const decoded = jwtDecode<TokenPayload>(token);
            console.log(decoded); // Kiểm tra xem decoded token có đúng không
            return decoded.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };
    const getUser = getUserIdFromToken()
    const handleSubmitComment = async () => {
        if (!comment.trim()) return;

        const id = getUserIdFromToken();


        console.log(id);

        if (!id) {

            toast.error('Bạn cần đăng nhập để thực hiện chức năng này.', { autoClose: 2000 })
            return;
        }

        try {
            setIsSubmitting(true);


            const response = await axios.post('http://localhost:8080/api/comment', {
                content: comment,
                productId,
                userId: id,
            }, {
                headers: {
                    // Gửi token trong header nếu API của bạn yêu cầu
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Xử lý response ở đây
            console.log(response.data);
            toast.success('Thêm bình luận thành công', { autoClose: 2000 })
            setComment('');
            fetchComment();
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error('Lỗi khi thêm bình luận', { autoClose: 2000 })
        } finally {
            setIsSubmitting(false);

        }
    };
    const fetchComment = async () => {
        if (productId) {
            const { data } = await getComment(productId)
            console.log(data);
            setComments(data.comments)

        }
    }

    useEffect(() => {
        fetchComment()
    }, [])
    const fetProduct = async () => {
        if (productId) {
            const { data } = await getById(productId)
            // console.log(data);
            setProduct(data)

        }
    }
    useEffect(() => {
        fetProduct()
    }, [productId])

    const fetProducts = async () => {
        const { data } = await getProduct()
        // console.log(data);
        setProducts(data)
    }
    const fetchCategory = async () => {
        const categoryResponse = await getCategory()
        setCategories(categoryResponse.data);
    }
    const getCategoryName = (categoryId: String) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    };
    useEffect(() => {
        fetProducts()
        fetchCategory()
    }, [])

    // const fetColor = async () => {
    //     const { data } = await getColor()
    //     // console.log(data);
    //     setColors(data)

    // }

    // useEffect(() => {
    //     fetColor()
    // }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [productId])
    
    const fetColor = async () => {
        const { data } = await getColor();
        const selectedSizeColors = product.sizeAndcolor
            .filter(sc => sc.sizeId === selectedSize && sc.quantity > 0)
            .map(sc => sc.colorId);

        const availableColors = data.map(colorItem => ({
            ...colorItem,
            available: selectedSizeColors.includes(colorItem._id),
        }));

        setColors(availableColors);
    };
    useEffect(() => {
        fetColor();
    }, [selectedSize]);

    
    const fetSize = async () => {
        const { data } = await getSize();
        setSizes(data);
    };

    
    const fetchQuantity = () => {
        // Lấy quantity từ sizeAndcolor của product
        console.log(product,"131231")
        var quantityData = product.sizeAndcolor;
    console.log(quantityData,"dhbkasdkashdaks")
        // Cập nhật state với dữ liệu quantity
        // setQuantities(quantityData);
    };
    // console.log(quantityData,"ùhdufhdu")
    useEffect(() => {
        fetSize();
        fetchQuantity();
    }, []);
    const { addCartItem  } = useShoppingContext()

    const addQuantity = (type: string) => {
        // ...

        if (type === 'plus') {
            const selectedQuantityItem = product.sizeAndcolor.find(
                (item) => item.sizeId === selectedSize && item.colorId === selectedColor
            );

            if (selectedQuantityItem && quantity < selectedQuantityItem.quantity) {
                setQuantity(quantity + 1);
            } else {
                toast.error("Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này!", { autoClose: 2000 });
            }
        } else {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
        }
    }
    const addCart = (product: IProduct, type: string) => {
        console.log(product)
        try {
            if (!selectedSize || !selectedColor || quantity === 0) {
                // Hiển thị thông báo khi không nhập đủ thông tin
                toast.error('Bạn cần nhập đủ thông tin size, color và số lượng!',{ autoClose: 2000 });
            } else {
                // Thực hiện kiểm tra kho hàng
                const selectedQuantityItem = product.sizeAndcolor.find(
                    (item) => item.sizeId === selectedSize && item.colorId === selectedColor
                  );
    
                if (selectedQuantityItem && quantity <= selectedQuantityItem.quantity) {
                    addCartItem(cartItem);
                    console.log(cartItem)
                    setQuantity(1);
    console.log(type,"hfjkdhfdsik")
                    // Chuyển hướng đến trang giỏ hàng
                    if (type === 'ADD_CART') {
                                  
                    }
                } else {
                    //   toast.error(`Sản phẩm chỉ có ${selectedQuantityItem.quantity} sản phẩm!`, { autoClose: 2000 });
                } 
            }
        } catch (error) {
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình thêm vào giỏ hàng
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
    
            // Hiển thị thông báo lỗi
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.',{ autoClose: 2000 });
        }
    };
        const cartItem: CartItem = {
            _id: typeof product._id === 'string' || typeof product._id === 'number' ? product._id : '',
            name: product.name,
            img: product.img,
            price: product.price,
            colorId: selectedColor,
            sizeId: selectedSize,
            quantity,
            warehouse:product.sizeAndcolor,
        }

     
    return (

        <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
            <div className="max-w-[1340px] px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4 mb-32">
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="sticky top-0 z-50 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10" style={{ height: "450px" }}>
                                <img src={selectedImage || (product.img && product.img[0])}
                                    alt="" className="object-contain w-full h-full " />
                            </div>
                            <div className="flex-wrap hidden md:flex ">
                                {product.img && product.img.slice(0, 4).map((image, index) => (
                                    <div className="w-1/2 p-2 sm:w-1/4">
                                        <div
                                            className="block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300 ">
                                            <img src={image}
                                                alt="" className="object-cover w-full lg:h-32"
                                                onClick={() => setSelectedImage(image)} />
                                        </div>
                                    </div>
                                ))}




                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="lg:pl-20">
                            <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-lg font-medium ">Mã SP : <span className="text-black text-base">{product._id}</span></span>
                                <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                                    {product.name}
                                </h2>

                                <br />
                                <span className="text-lg font-medium">Loại : <span className="text-black text-base">{getCategoryName(product.categoryId)}</span></span>


                                < br />
                                <div className="mb-8 mt-3 border-b border-gray-200 dark:border-gray-700"></div>
                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                    Giá :<span className="text-rose-500 dark:text-rose-200"> {product.price ? product.price.toLocaleString() + 'đ' : ''}</span>
                                </p>
                            </div>
                         
                             <div className="mb-8">
                             <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                <div className="mb-2 text-xl font-bold dark:text-gray-400">Size :</div>
                <div className="flex flex-wrap -mb-2">
                    {sizes.map((sizeItem, index) => (
                        <button
                        onClick={() => {
                            setSelectedSize(sizeItem._id);
                            setQuantity(1); // Đặt lại giá trị số lượng khi chọn size mới
                        }}
                            key={index}
                            className={`${
                                selectedSize === sizeItem._id ? 'border-blue-500' : ''
                            } py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400`}
                        >
                            {sizeItem.name}
                        </button>
                    ))}
                </div>
            </div>
        <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">     
            {selectedSize && (   
        <div className="mb-2 text-xl font-bold dark:text-gray-400">Màu sắc :</div>       
         )}

            <div className="flex flex-wrap -mb-2">
            {colors.map((colorItem, index) => (
            <div
                className={`p-1 mb-2 mr-2 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ${!colorItem.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                key={index}
            >
                <span
                
                    onClick={() => colorItem.available && setSelectedColor(colorItem._id)}
                    className={`${selectedColor === colorItem._id ? 'border-orange-500' : ''} px-[30px] py-[7px] w-10 h-10 bg-red-600 rounded-xl border`}
                    style={{ background: colorItem.name }}
                    
                ></span>
                
            </div>
        ))}
        </div>
            </div>  
            <div className="mb-2 text-xl font-bold dark:text-gray-400 ">Số lượng :</div>
                            <div className="flex flex-wrap items-center mr-10">
                                <div className="mb-4 mr-4 lg:mb-0">
                                    <div className="w-28">
                                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                            <button onClick={addQuantity.bind(this, 'minus')}
                                                className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input
                                            
                                            //  type="number"
                                                className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                placeholder="1"
                                                value={quantity}
                                                 />
                                                
                                            <button onClick={addQuantity.bind(this, 'plus')}
                                                className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {product.sizeAndcolor && product.sizeAndcolor.map((quantityItem, index) => (
                                <div key={index}>
                                    {quantityItem.sizeId === selectedSize &&
                                        quantityItem.colorId === selectedColor && (
                                            <p>{`${quantityItem.quantity} sản phẩm có sẵn`}</p>
                                        )}
                                </div>
                            ))}
        </div>
                               
                            </div>
                            <div className="mb-4 mr-4 lg:mb-0">
                                
    <button onClick={() => addCart(product, 'ADD_CART')}
        className="w-30 h-10 p-2 bg-blue-500 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center">
        <span className="mr-2">Thêm vào giỏ hàng</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-cart" viewBox="0 0 16 16">
            <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
    </button>
    
</div>


                               
                        </div>
                    </div>
                </div>
                <div className="max-w-screen mx-auto p-6  bg-white rounded-md shadow-md mt-8">
                    <h2 className="text-xl font-bold mb-2">Mô tả sản phẩm</h2>
                    <p className="text-base text-gray-700" style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
                </div>
                <section className="flex items-center py-16 bg-gray-100 font-poppins dark:bg-gray-800 ">
                    <div className="justify-center flex-1 max-w-7xl px-4 py-6 mx-auto lg:py-4 md:px-6">


                        <div className="p-6 dark:bg-gray-900 bg-gray-50">
                            {comments.map((comment) => (
                                <div className="flex flex-wrap items-center mb-4 space-x-2">
                                    <div className="flex self-start flex-shrink-0 cursor-pointer">

                                        <img src={comment.userId && typeof comment.userId === 'object' && 'avatar' in comment.userId
                                            ? (comment.userId as { avatar?: string }).avatar || 'default-avatar.jpg'
                                            : 'default-avatar.jpg'}
                                            alt=""
                                            className="object-fill w-16 h-16 rounded-full"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center space-x-2 ">
                                        <div className="block">
                                            <div className="w-auto px-2 pb-2 ">
                                                <div className="font-medium">
                                                    <a href="#" className="text-lg font-semibold dark:text-gray-400 hover:underline">
                                                        <small> {comment.userId && typeof comment.userId === 'object' && 'username' in comment.userId
                                                            ? (comment.userId as { username?: string }).username || 'Unknown'
                                                            : 'Unknown'}</small>
                                                    </a>
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {comment.content}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start w-full text-xs">
                                                <div
                                                    className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                                                    <a href="#" className="hover:underline">
                                                        <span>Like</span>
                                                    </a>
                                                    <span className="self-center">.</span>
                                                    <a href="#" className="hover:underline">
                                                        <span>Reply</span>
                                                    </a>
                                                    <span className="self-center">.</span>
                                                    <a href="#" className="hover:underline">
                                                        <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Không rõ"}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}





                        </div>

                        {getUser ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                                {/* <div className="p-6 mb-6 bg-gray-50 dark:bg-gray-900"> */}
                                    {/* <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                                        Đánh giá</h2>
                                    <div className="flex justify-start ">
                                        <div
                                            className="flex items-center mb-2 space-x-2 text-3xl leading-none text-gray-600 dark:text-gray-400 ">
                                            <div className="items-center font-bold ">4.0/5</div>
                                            <div className="items-center">
                                                <ul className="flex items-center ">
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-half"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div> */}
                                    {/* <div className="mb-6 text-xs dark:text-gray-400">16 customer reviews</div> */}
                                    {/* <div className="pb-1 mb-6">
                                        <div className="flex items-center mb-3">
                                            <div className="flex mr-2 text-xs text-black dark:text-gray-400">
                                                <span className="mr-1">4</span> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" fill="currentColor"
                                                    className="w-3 h-3 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 dark:bg-gray-700">
                                                <div className="h-3 bg-blue-500 dark:bg-blue-400" style={{ width: '75%' }}></div>
                                            </div>
                                            <div className="flex justify-end text-xs font-medium dark:text-gray-400">91% </div>
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <div className="flex mr-2 text-xs text-black dark:text-gray-400">
                                                <span className="mr-1">3</span> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" fill="currentColor"
                                                    className="w-3 h-3 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 dark:bg-gray-700">
                                                <div className="h-3 bg-blue-500 dark:bg-blue-400" style={{ width: '45%' }}></div>
                                            </div>
                                            <div className="flex justify-end text-xs font-medium dark:text-gray-400">45% </div>
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <div className="flex mr-2 text-xs text-black dark:text-gray-400">
                                                <span className="mr-1">2</span> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" fill="currentColor"
                                                    className="w-3 h-3 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 dark:bg-gray-700">
                                                <div className="h-3 bg-blue-500 dark:bg-blue-400" style={{ width: '25%' }}></div>
                                            </div>
                                            <div className="flex justify-end text-xs font-medium dark:text-gray-400">25% </div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="flex mr-2 text-xs text-black dark:text-gray-400">
                                                <span className="mr-1">1</span> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                    height="16" fill="currentColor"
                                                    className="w-3 h-3 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 dark:bg-gray-700">
                                                <div className="h-3 bg-blue-500 dark:bg-blue-400" style={{ width: '14%' }}></div>
                                            </div>
                                            <div className="flex justify-end text-xs font-medium dark:text-gray-400">14% </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="items-center ">
                                        <a href="#" className="px-4 py-2 text-xs text-gray-100 bg-blue-500 hover:bg-blue-600 ">
                                            View all reviews</a>
                                    </div> */}
                                {/* </div> */}
                                <div className="p-6 mb-6 bg-white dark:bg-gray-900">
                                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                                        Thêm bình luận</h2>
                                    <form action="" className="">

                                        <div className="mb-6 ">
                                            <textarea typeof="message"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                disabled={isSubmitting} placeholder="Nội dung"
                                                className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 "></textarea>
                                        </div>
                                        <div className="">
                                            <button onClick={handleSubmitComment} disabled={isSubmitting || comment.trim() === ''}
                                                className="px-4 py-2 text-xs font-medium text-gray-100 bg-blue-500 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700">
                                                {isSubmitting ? 'Đang gửi...' : 'Gửi Bình Luận'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center">
                                bạn phải là thành viên mới được bình luận hãy
                                <Link to={`/signup`}>
                                    <a href="signup" className="text-[red] px-1">
                                        Đăng ký
                                    </a>
                                </Link>
                                hoặc
                                <Link to={`/signin`}>
                                    <a href="" className="text-[red] px-1">
                                        Đăng nhập
                                    </a>
                                </Link>
                            </p>
                        )}


                    </div>
                </section>
                <div>
                <h2 className="font-bold text-[27px] text-center pt-8 pb-8">Sản Phẩm Mới</h2>
                <section id="Projects"
                    className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-10 mt-10 mb-5">

                    {products.slice(11, 19).map((item) => <Product key={item._id} data={item} />)}
                </section>
                </div>
            </div>
        </section>
    )


}

export default DetailPage