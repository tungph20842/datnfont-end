import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CartItem } from '../context/ShoppingCartContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
type Props = {}

const Successful = (props: Props) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const voucherId = localStorage.getItem("id");

  useEffect(() => {
    if (!searchParams.get('encode') && !searchParams.get('userId')) {
      navigate('/successful')
    }
    const date = new Date()
    if (searchParams.get('expire')) {
      if (Number(searchParams.get('expire')) < date.getTime()) {
        navigate('/')
      } else {
        if (Number(searchParams.get('vnp_ResponseCode')) != 24 && cartItems && cartItems.length > 0) {
          const orderVnpay = {
            userId:
              (searchParams.get('userId') as string) === 'undefined'
                ? undefined
                : (searchParams.get('userId') as string),

            fullname: searchParams.get('fullname'),
            phonenumber: searchParams.get('phone'),
            email: searchParams.get('email'),
            address: searchParams.get('address'),
            orderTotal: searchParams.get('total'),
            Discount: searchParams.get('discount'),
            isPaid: searchParams.get('isPaid'),
            orderDetails: cartItems?.map((item) => ({
              name: item.name,
              img: item.img[0],
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
              voucherId: voucherId,
              sizeId: item.sizeId,
              colorId: item.colorId
            }))
          }

          axios
            .post('http://localhost:8080/api/orderVnpay', orderVnpay)
            .then(() => {
              toast.success('Đặt hàng thành công')
            })
            .catch((error) => {
              return toast.error('Xin lỗi đã có vấn đề về đặt hàng của bạn' + error)
            })
          localStorage.removeItem('Discount_Type')
          localStorage.removeItem('Quantity')
          localStorage.removeItem('id')
          localStorage.removeItem('shopping_cart')
        }
      }
    }
  }, [cartItems, navigate, searchParams])
  useEffect(() => {
    const storedCart: string | null = localStorage.getItem('shopping_cart')
    if (storedCart !== null) {
      const parsedCart: CartItem[] = JSON.parse(storedCart)
      setCartItems(parsedCart)
    }
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-4xl font-bold">Thành Công !</h1>
          <p>Cảm ơn quý khách đã tin tưởng TND Shop</p>
          <div className='flex justify-between item-center gap-10'>
            <a href='/'
              className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">

              <span className="text-sm font-medium">
                Trang Chủ
              </span>
            </a>
            <a href='/purchase'
              className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
              <span className="text-sm font-medium">
                Đơn mua
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Successful