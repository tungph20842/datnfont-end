import Form from "./Layout/Form"

const Footer = () => {
    return (
        <section>
            

        <div className="max-w-screen-xl mx-auto pb-7 px-4 md:px-8">
            <div className="my-4">
                <a href=""><img src="image-removebg-preview 1.png" alt="" /></a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="">
                    <div className="grid grid-cols-2 items-center gap-6">
                        <div className="">
                            <a href=""><img src="image 10.png" alt="" /></a>
                        </div>
                        <ul className="flex gap-2">
                            <li><a href=""><img className="w-5" src="facebook.svg" alt="" /></a></li>
                            <li><a href=""><img className="w-5" src="instagram.svg" alt="" /></a></li>
                            <li><a href=""><img className="w-5" src="tiktok.svg" alt="" /></a></li>
                            <li><a href=""><img className="w-5" src="telegram.svg" alt="" /></a></li>
                        </ul>
                    </div>
                    <div className="pt-4">
                        <p>
                            Thương hiệu thời trang TND - CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI NÉT VIỆT
                        </p>
                        <p className="pt-2">
                            Địa chỉ: 180 P. Đông Các, Chợ Dừa, Đống Đa, Hà Nội
                        </p>
                    </div>
                    <div className="pt-9">
                        <ul>
                            <li className="hover:text-red-500"><a href="">Chính sách bảo mật</a></li>
                            <li className="hover:text-red-500"><a href="">Các điều khoản và điều kiện</a></li>
                        </ul>
                    </div>
                </div>
                <div className="lg:ml-10">
                    <h3 className=" text-[22px] font-medium">Về chúng tôi</h3>
                    <div className="text-[15px] pt-3">
                        <ul>
                            <li className="hover:text-red-200"><a href="">Giới thiệu TND</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Tuyển dụng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Cảm hứng thời trang</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Danh sách cửa hàng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Nhượng quyền thương hiệu</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Khách hàng thân thiết</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Chính sách giao hàng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Chính sách bảo hành</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-[22px] font-medium">Hỗ trợ khách hàng</h3>
                    <div className="text-[15px] pt-3">
                        <ul>
                            <li className="hover:text-red-200 "><a href="">Liên hệ đến TND</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Câu hỏi thường gặp</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Hướng dẫn tạo tài khoản</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Hướng dẫn đặt hàng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Mua Online nhận tại cửa hàng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Hướng dẫn mua trước trả sau</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Quy định và hướng dẫn đổi/trả hàng</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Hướng dẫn đánh giá sản phẩm</a></li>
                            <li className="hover:text-red-200 pt-2"><a href="">Hướng dẫn xem và đổi thưởng</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-[22px] font-medium">Liên lạc</h3>
                    <div className="text-[15px] pt-3">
                        <p>Đặt hàng trực tuyến (8h-21h)</p>
                        <a className="text-[#0000ff] font-bold" href="">0335 830 256</a>
                        <p className="pt-5">Chăm sóc khách hàng</p>
                        <a className="text-[#0000ff] font-bold" href="">0335 830 256</a>
                    </div>
                    <div className="text-[15px] pt-7">
                        <a className="text-[#0097ba]" href=""><span>shopthoitrangnamTND@gmail.com</span></a>
                    </div>

                </div>
            </div>
        </div>
    </section>
    )
}
export default Footer