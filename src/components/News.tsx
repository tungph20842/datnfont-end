import React from 'react'

type Props = {}

const News = (props: Props) => {
  return (
    <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">

                        {/* Card 1 */}
                        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img src="new1.png" alt="Image 1" className="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:scale-110" />

                            <div className="mt-4">
                                <p className="font-semibold">THE GMEN RA MẮT BỘ SƯU TẬP DÀNH CHO CÁC ‘TÍN ĐỒ’ LINEN</p>
                                <p className="text-gray-600 mt-2">Thương hiệu thời trang nam THE GMEN đã lựa chọn linen - chất liệu đáp ứng mong muốn về những trang phục tự do và thoải mái - cho bộ sưu tập hè 2023.</p>
                                <p className="text-gray-500 mt-4">ĐĂNG BỞI THỦY HÀNG</p>
                                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full">XEM THÊM</button>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img src="new2.png" alt="Image 2" className="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:scale-110" />
                            <div className="mt-4">
                                <p className="font-semibold">THE GMEN: THÍCH, CHỌN VÀ TRẢI NGHIỆM</p>
                                <p className="text-gray-600 mt-2">Khi người Việt bắt đầu làm thời trang Việt, đó thực sự là một thử thách bởi việc bắt đầu, phát triển và nỗ lực khẳng định mình hoàn toàn từ con số 0.</p>
                                <p className="text-gray-500 mt-4">ĐĂNG BỞI THỦY HÀNG</p>
                                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full">XEM THÊM</button>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <img src="new3.png" alt="Image 3" className="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:scale-110" />
                            <div className="mt-4">
                                <p className="font-semibold">"THE GMEN" - THƯƠNG HIỆU THỜI TRANG NỘI ĐỊA VÀ HÀNH TRÌNH 6 NĂM MANG TỚI SẢN PHẨM CHẤT LƯỢNG CHO KHÁCH HÀNG VIỆT</p>
                                <p className="text-gray-600 mt-2">“Không dừng lại ở việc mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ chuyên nghiệp. THE GMEN còn muốn truyền cảm hứng và khích lệ khách hàng trở thành phiên bản tốt nhất của chính mình. Đó chính là các giá trị cốt lõi mà THE GMEN đã mang trong mình kể từ khi thành lập.”</p>
                                <p className="text-gray-500 mt-4">ĐĂNG BỞI THỦY HÀNG</p>
                                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full">XEM THÊM</button>
                            </div>
                        </div>

                    </div>
  )
}

export default News