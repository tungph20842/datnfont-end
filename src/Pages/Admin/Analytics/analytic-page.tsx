import {
  AnalyticOrderPending,
  AnalyticStatusCancelled,
  AnalyticStatusComplete,
  AnalyticStatusCount,
  AnalyticStatusDelivery,
  AnalyticStatusProccessing
} from '../components'
import { IAnalyticStatusYear, ICountNumber } from '../../../interfaces'
import { useEffect, useState } from 'react'

import { CardInfo } from '../components/dashboard/card-info'
import { CartIcon2 } from '../../../components'
import { LineChartOrderStatus } from '../components/dashboard/line-chart'
import { analyticApi } from '../../../api/analytic.api'
import { convertMoneyOrder } from '../components/dashboard/utils/conver-money'
import { getOrderStatusYear } from '../components/dashboard/hooks/get-order-status'
import { message } from 'antd'
import { TopProduct } from './top-product'

const AnalyticPage = () => {
  const [isOpen, setIsOpen] = useState({
    orderPending: false,
    orderProcessing: false,
    orderOnDelivery: false,
    orderCancelled: false,
    orderComplete: false
  })

  const [orderStatusYear, setOrderStatusYear] = useState<IAnalyticStatusYear[]>([])
  const [dataCounts, setDataCounts] = useState<ICountNumber[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStatusYeanr = await getOrderStatusYear()
        const dataCounts = await analyticApi.getCounts()
        setOrderStatusYear(responseStatusYeanr)
        setDataCounts(dataCounts.data)
      } catch (error) {
        message.error('Lỗi lấy dữ liệu')
      }
    }
    fetchData()
  }, [])

  const handleOpenModal = (item: string) => {
    switch (item) {
      case 'PENDING':
        setIsOpen({ ...isOpen, orderPending: !isOpen.orderPending })
        break
      case 'PROCESSING':
        setIsOpen({ ...isOpen, orderProcessing: !isOpen.orderProcessing })
        break
      case 'ONDELIVERY':
        setIsOpen({ ...isOpen, orderOnDelivery: !isOpen.orderOnDelivery })
        break
      case 'CANCELLED':
        setIsOpen({ ...isOpen, orderCancelled: !isOpen.orderCancelled })
        break
      case 'COMPLETED':
        setIsOpen({ ...isOpen, orderComplete: !isOpen.orderComplete })
        break
      default:
        break
    }
  }
  return (
    <>

      <main className='overflow-hidden'>
        <div className='mx-auto p-4 md:p-6'>
          <div className='grid grid-cols-5 gap-4'>
            {orderStatusYear.map((item) => (
              <CardInfo
                key={item._id}
                title={`Đơn hàng ${item._id}`}
                number={convertMoneyOrder(item.totalAmount)}
                icon={<CartIcon2 />}
                onClick={() => handleOpenModal(item._id)}
              />
            ))}
          </div>
        </div>

        <AnalyticStatusCount />

        <div className='mx-auto p-4 md:p-6'>
          <div className='grid grid-cols-5 gap-4'>
            {dataCounts &&
              dataCounts.length &&
              dataCounts.map((item) => (
                <CardInfo key={item.title} title={`Số lượng ${item.title}`} number={item.value} icon={<CartIcon2 />} />
              ))}
          </div>
        </div>

        <div className='mx-auto p-4 md:p-6 xl:p-10'>
          <LineChartOrderStatus />
        </div>
        <div className='mx-auto p-4 md:p-6 xl:p-10'>
        <TopProduct />
      </div>
      </main>

      <AnalyticOrderPending
        onClose={() => setIsOpen({ ...isOpen, orderPending: !isOpen.orderPending })}
        isOpen={isOpen.orderPending}
      />
      <AnalyticStatusProccessing
        onClose={() => setIsOpen({ ...isOpen, orderProcessing: !isOpen.orderProcessing })}
        isOpen={isOpen.orderProcessing}
      />
      <AnalyticStatusDelivery
        onClose={() => setIsOpen({ ...isOpen, orderOnDelivery: !isOpen.orderOnDelivery })}
        isOpen={isOpen.orderOnDelivery}
      />
      <AnalyticStatusCancelled
        onClose={() => setIsOpen({ ...isOpen, orderCancelled: !isOpen.orderCancelled })}
        isOpen={isOpen.orderCancelled}
      />
      <AnalyticStatusComplete
        onClose={() => setIsOpen({ ...isOpen, orderComplete: !isOpen.orderComplete })}
        isOpen={isOpen.orderComplete}
      />
    </>
    
  )
}

export default AnalyticPage
