import React from 'react'

type Props = {}

const Form = (props: Props) => {
  return (
    <div className="bg-black mx-auto text-center mt-8 pb-8">
                <p className="font-bold text-center text-[30px] pt-4 text-white ">ĐĂNG KÍ NHẬN KHUYẾN MÃI</p>
                <p className="text-center text-[14px] pt-2 text-white font-mono">Hãy nhập email của bạn vào đây để nhận được xu hướng
                    thời trang và khuyến mãi mới nhất từ TND nhé.</p>
                <div className="pt-7 relative">
                    <input className="w-[512px] outline-none h-[52px] pl-4 rounded-full" type="text"
                        placeholder="Nhập email của bạn" />
                    <button className="absolute -ml-14 ">
                        <a href=""> <img className="" src="Send_hor_fill.svg" alt="" /></a>
                    </button>
                </div>
    </div>
  )
}

export default Form