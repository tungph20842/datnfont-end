import { useEffect, useState } from 'react'

import { CardInfo } from './card-info'
import { CartIcon2 } from '../../../../components'
import { IAnalyticYear } from '../../../../interfaces'
import { getOrderStatus } from './hooks/get-order-status'
import { message } from 'antd'

export const AnalyticStatusCount = () => {
  const [orderStatus, setOrderStatus] = useState<IAnalyticYear[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseYearn = await getOrderStatus()
        setOrderStatus(responseYearn)
      } catch (error) {
        message.error('Lỗi lấy dữ liệu')
      }
    }
    fetchData()
  }, [])
  return (
    <div className='mx-auto p-4 md:p-6'>
      <div className='grid grid-cols-5 gap-4'>
        {orderStatus &&
          orderStatus.length > 0 &&
          orderStatus.map((item) => (
            <CardInfo
              key={item._id}
              title={`Số lượng đơn ${item._id.toLowerCase()}`}
              number={item.count}
              icon={<CartIcon2 />}
            />
          ))}
      </div>
    </div>
  )
}
