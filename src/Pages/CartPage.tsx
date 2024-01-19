import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useShoppingContext } from '../context/ShoppingCartContext'
import React, { useEffect, useState } from 'react'
import { IVouchers } from '../interfaces/vouchers'
import { getVoucher } from '../api/vouchers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const CartPage = () => {
  const { totalPrice, cartQty, cartItem } = useShoppingContext()
  console.log(totalPrice, 'djdjd')
  // const [voucherCode, setVoucherCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [vouchers, setVouchers] = useState<IVouchers[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState('')

  console.log(vouchers, 'aaaa')
  const handleApplyVoucher = () => {
    // Tìm voucher trong danh sách dựa trên mã
    console.log(vouchers, 'tung')

    const voucher = vouchers.data.vouchers.find((voucher) => voucher.Voucher_Code === selectedVoucher)

    // Nếu voucher tồn tại, áp dụng giảm giá và tính toán giá mới
    if (voucher && voucher.Quantity !== undefined && voucher.Quantity !== null && voucher.Quantity !== 0) {
      const { Quantity, Discount_Type, Expiration_Date, Start_Date, _id } = voucher
      const currentDate = new Date()
      const startDate = new Date(Start_Date)
      const expiryDate = new Date(Expiration_Date)
      if (startDate <= currentDate && expiryDate > currentDate) {
        if (totalPrice >= 100000 && totalPrice < 200000 && Discount_Type <= 35000) {
          setDiscountPercentage(Discount_Type)
          localStorage.setItem('Discount_Type', Discount_Type)
          localStorage.setItem('Quantity', Quantity)
          localStorage.setItem('id', _id)
          toast.success('Áp dụng voucher thành công', { autoClose: 2000 })
        } else if (totalPrice >= 200000 && Discount_Type <= 65000) {
          setDiscountPercentage(Discount_Type)
          localStorage.setItem('Discount_Type', Discount_Type)
          localStorage.setItem('Quantity', Quantity)
          localStorage.setItem('id', _id)
          toast.success('Áp dụng voucher thành công', { autoClose: 2000 })
        } else if (totalPrice > 500000 && Discount_Type <= 100000) {
          setDiscountPercentage(Discount_Type)
          localStorage.setItem('Discount_Type', Discount_Type)
          localStorage.setItem('Quantity', Quantity)
          localStorage.setItem('id', _id)
          toast.success('Áp dụng voucher thành công', { autoClose: 2000 })
        } else if (totalPrice > 1000000 && Discount_Type <= 200000) {
          setDiscountPercentage(Discount_Type)
          localStorage.setItem('Discount_Type', Discount_Type)
          localStorage.setItem('Quantity', Quantity)
          localStorage.setItem('id', _id)
          toast.success('Áp dụng voucher thành công', { autoClose: 2000 })
        } else if (totalPrice > 5000000 && Discount_Type <= 500000) {
          setDiscountPercentage(Discount_Type)
          localStorage.setItem('Discount_Type', Discount_Type)
          localStorage.setItem('Quantity', Quantity)
          localStorage.setItem('id', _id)
          toast.success('Áp dụng voucher thành công', { autoClose: 2000 })
        } else {
          console.log('Không áp dụng được voucher này cho đơn hàng của bạn!')
          toast.error('Không áp dụng được voucher này cho đơn hàng của bạn hãy chọn mã giảm giá khác!', {
            autoClose: 2000
          })
          localStorage.removeItem('Discount_Type')
          localStorage.removeItem('Quantity')
          localStorage.removeItem('id')
        }
      } else if (startDate > currentDate) {
        console.log(`Mã giảm giá ${selectedVoucher} chưa có hiệu lực do chưa đến ngày bắt đầu sử dụng!`)
        toast.error('Mã giảm giá của bạn chưa có hiệu lực!', { autoClose: 2000 })
        localStorage.removeItem('Discount_Type')
        localStorage.removeItem('Quantity')
        localStorage.removeItem('id')
      } else {
        console.log(`Mã giảm giá ${selectedVoucher} không hợp lệ do đã hết hạn sử dụng!`)
        toast.error('Mã giảm giá của bạn không hợp lệ do đã hết hạn sử dụng!', { autoClose: 2000 })
        localStorage.removeItem('Discount_Type')
        localStorage.removeItem('Quantity')
        localStorage.removeItem('id')
      }
    } else {
      console.log(`Mã giảm giá ${selectedVoucher} đã hết số lượng!`)
      toast.error('Mã giảm giá của bạn đã được sử dụng hết vui lòng chọn mã giảm giá khác!', { autoClose: 2000 })
      localStorage.removeItem('Discount_Type')
      localStorage.removeItem('Quantity')
      localStorage.removeItem('id')
    }
  }

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const vouchersData = await getVoucher()
        console.log(vouchersData, '3131')
        setVouchers(vouchersData)
      } catch (error) {
        console.error('Error fetching vouchers:', error)
      }
    }

    fetchVouchers()
  }, [])
  if (!vouchers.data) {
    return <p>Đang tải ...</p> // Thêm một thông báo hoặc chỉ báo đang tải
  }
  const validVouchers = vouchers.data.vouchers.filter((voucher) => {
    const currentDate = new Date();
    const startDate = new Date(voucher.Start_Date);
    const expiryDate = new Date(voucher.Expiration_Date);
    const isVoucherValid = startDate <= currentDate && expiryDate > currentDate;
  
    // Kiểm tra điều kiện của voucher để quyết định nó có hiển thị hay không
    if (isVoucherValid && voucher.Quantity !== 0) {
      if (
        (totalPrice >= 100000 && voucher.Discount_Type <= 20000) ||
        (totalPrice >= 200000 && voucher.Discount_Type <= 50000) ||
        (totalPrice >= 500000 && voucher.Discount_Type <= 100000) ||
        (totalPrice >= 1000000 && voucher.Discount_Type <= 200000)||
        (totalPrice >= 5000000 && voucher.Discount_Type <= 500000)

      ) {
        return true;
      }
    }
  
    return false;
  });
  if (cartItem.length === 0) {
    return <h2 className=' text-center py-[150px] font-bold text-[30px]'>Không có sản phẩm nào</h2>
  } else {
    return (
      // <div>
      //   <div>
      //     <ul className='flex'></ul>
      //   </div>
      //   <section className='flex gap-8 w-10/12 m-auto py-20 '>
      //     <section className='basis-4/6'>
      //       {cartItem.map((item) => {
      //         console.log('item', item)
      //         return <CartItem key={item._id} {...item} />
      //       })}

      //       <div className='border-t-2 flex justify-between'>
      //         <Link to={'/product'}>
      //           <button className='border-2  font-semibold p-3 px-5 mt-10'>Tiếp tục mua sắm</button>{' '}
      //         </Link>

      //         <button className='bg-black text-white font-semibold p-3 px-7 mt-10 '>Cập nhật giỏ hàng </button>
      //       </div>
      //     </section>
      //     <section className='basis-2/6 w-full'>
      //       <p className='font-semibold'>Mã giảm giá</p>
      //       <div className='w-full'>
      //         <select
      //           className='border w-8/12 py-3 px-2 mt-10'
      //           value={selectedVoucher}
      //           onChange={(e) => setSelectedVoucher(e.target.value)}
      //         >
      //           <option value='' disabled hidden>
      //             Chọn voucher
      //           </option>
      //           {validVouchers.map((voucher) => (
      //             <option key={voucher._id} value={voucher.Voucher_Code}>
      //               {`${voucher.Voucher_Code} - Giảm :${voucher.Discount_Type}vnd`}
      //             </option>
      //           ))}
      //         </select>
      //         <button className='border w-3/12 py-3 px-2 mt-10 bg-black text-white' onClick={handleApplyVoucher}>
      //           Áp dụng
      //         </button>
      //       </div>
      //       <section className='bg-zinc-100 mt-12'>
      //         <div className='p-10'>
      //           {' '}
      //           <div className=' pt-5 flex'>
      //             {' '}
      //             <span className='grow'>Tổng giỏ hàng</span>
      //             <span className='text-right '>{cartQty}</span>
      //           </div>
      //           <div className=' pt-5 flex'>
      //             {' '}
      //             <span className='grow'>Tổng tiền </span>
      //             <span className='text-right '>{totalPrice} vnd</span>
      //           </div>
      //           <div className=' pt-5 flex'>
      //             {' '}
      //             <span className='grow'>voucher</span>
      //             <span className='text-right'>giảm giá {discountPercentage} vnd</span>
      //           </div>
      //           {/* <div className="pt-5 flex">
      //             <span className="grow">Tổng giảm giá</span>
      //             <span className="text-right">
      //               {(totalPrice * discountPercentage) / 100} vnd
      //             </span>
      //           </div> */}
      //           <div className='pt-5 flex'>
      //             <span className='grow'>Tổng tiền sau giảm giá</span>
      //             <span className='text-right'>{totalPrice - discountPercentage} vnd</span>
      //           </div>
      //           <Link to={'/pay'}>
      //             <button className='bg-black text-white font-semibold p-3 mt-10 w-full'>Thanh toán</button>
      //           </Link>
      //         </div>
      //       </section>
      //     </section>
      //   </section>
      // </div>
      <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">

   
    <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-blue-900 text-xl font-extrabold">Đơn Hàng Của Bạn</p>
        <div>
        {cartItem.map((item) => {
              console.log('item', item)
            return <CartItem key={item._id} {...item} />
           })}
        
        </div>

       
        
    </div>

    
    <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
        <p className="text-blue-900 text-xl font-extrabold">Voucher Của Shop</p>
        <div>
        
            <p className='font-semibold'>Mã giảm giá</p>
            <div className='w-full '>
             <select
                 className='border lg:w-8/12 py-3 px-2 mt-1 md:w-full'
                value={selectedVoucher}
                 onChange={(e) => setSelectedVoucher(e.target.value)}
             >
                <option value='' disabled hidden>
                   Chọn voucher
               </option>
               {validVouchers.map((voucher:any) => (
                 <option key={voucher._id} value={voucher.Voucher_Code}>
                  {`${voucher.Voucher_Code} - Giảm :${voucher.Discount_Type}vnd`}
                  </option>
                ))}
              </select>
              <button className='border lg:w-3/12 py-3 px-2 mt-1 lg:ml-4 md:w-full  bg-black text-white  ' onClick={handleApplyVoucher}>
                Áp dụng
              </button>
        </div>
        </div>
        <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className="flex flex-row justify-between">
                <p className="text-gray-600">Tổng Tiền({cartQty} Items)</p>
                <p className="text-end font-bold">{totalPrice.toLocaleString()}đ</p>
            </div>
            <hr className="bg-gray-200 h-0.5"/>
            <div className="flex flex-row justify-between">
                <p className="text-gray-600">Voucher</p>
                <div>
                <p className="text-end font-bold">{discountPercentage.toLocaleString()}đ</p>
                </div>
            </div>
            <hr className="bg-gray-200 h-0.5"/>
            {/* <div className="flex flex-row justify-between">
                <p className="text-gray-600">Discount Coupon</p>
                <p className="text-gray-500 text-base underline">{((totalPrice - discountPercentage)).toLocaleString()}</p>
            </div> */}
            {/* <hr className="bg-gray-200 h-0.5"/> */}
            <div className="flex flex-row justify-between">
                <p className="text-gray-600">Tổng thanh toán</p>
                <div>
                <p className="text-end font-bold">{(totalPrice - discountPercentage).toLocaleString()}đ</p>
                </div>
            </div>
            <div className="flex gap-2">
              <Link className="transition-colors text-center text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md"  to={'/pay'}>
              <button >
                        Mua Hàng  
              </button>
              </Link>
                
                <Link to={'/product'} className="transition-colors text-sm text-center bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md" >
                <button >
                        Mua Sắm Thêm
                </button>
                </Link>
                
                
            </div>
        </div>
    </div>
</div>
    )
  }
}

export default CartPage
