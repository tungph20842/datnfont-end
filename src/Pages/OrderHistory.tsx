import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IOrders } from '../interfaces/Orders'
import axios from 'axios'
import { getAllOrderDetail } from '../api/orders'
import { jwtDecode } from 'jwt-decode'



interface TokenPayload {
  id: string
  // Bạn cần thêm các trường khác từ payload token nếu cần
}
const itemsPerPage = 7;
const statusOptions = [
  { value: 'PENDING', label: 'chờ duyệt' },
  { value: 'PROCESSING', label: 'lấy hàng' },
  { value: 'ONDELIVERY', label: 'đang giao' },
  { value: 'COMPLETED', label: 'giao hàng thành công' },
  { value: 'CANCELLED', label: 'Hủy đơn hàng' }
]
const OrderHistory = () => {
  const [OderDetail, setOderDetail] = useState<IOrders[]>([])
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1);
  //them
  const username = localStorage.getItem('username')
  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find((option) => option.value === status)
    return statusOption ? statusOption.label : status
  }
  const navigate = useNavigate()
  
  
  //    const getUserIdFromToken = (): string | null => {
  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Token not found in localStorage.')
      return null
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token)
      console.log(decoded) // Kiểm tra xem decoded token có đúng không
      return decoded.id
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const formatDate = (date: Date | string) => {
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(formattedDate);
  };
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const id = getUserIdFromToken()
        if (id) {
          const res = await getAllOrderDetail(id)
          const sortedOrders = res.data.sort((a:any, b:any) => {
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
          });
          setOderDetail(sortedOrders)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllOrders()
    
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = OderDetail.slice(indexOfFirstItem, indexOfLastItem);

  
  return (
    <div className="bg-gray-100 font-sans">

    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
  
    
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Đơn Hàng Đã Mua</h1>
        <p className="text-gray-600 text-2xl pt-6" >Xin Chào {username}</p>
      </header>
  
   
      <section>
        <ul className="divide-y divide-gray-300">
         {currentItems.map((item)=>(
           <li className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Mã Đơn : {item._id}</h2>
                <p className="text-gray-600">Ngày Đặt: {formatDate(String(item.orderDate))}</p>
                <p className="text-gray-600">Nguời Đặt: {item.fullname}</p>
                <p className="text-gray-600">Điện Thoại: {item.phonenumber}</p>
                <p className="text-gray-600">Email: {item.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-600 mb-2 font-medium">Trạng Thái: <span className='font-normal'>{item.status !== undefined && getStatusLabel(item.status)}</span></span>
              <span className="block text-green-500 font-bold text-xl">{item.orderTotal.toLocaleString()}đ</span>
              <Link to={`order/${item._id}`}>
              <p  className="text-blue-500 mt-2">Chi Tiết</p>
              </Link>
             
            </div>
          </li>
         ))}
         
  
          
          
        </ul>
      </section>
      <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(OderDetail.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              className={`mx-2 px-4 py-2 ${
                i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
  
    </div>
  
  </div>
  )
}

export default OrderHistory
