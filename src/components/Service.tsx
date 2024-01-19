import React from 'react'



const Service = () => {
  return (
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
  )
}

export default Service