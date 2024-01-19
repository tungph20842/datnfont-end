import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts'
import { DatePicker, Drawer, Space, message } from 'antd'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import { IData, IFilterOrder } from '../../../../interfaces'
import { convertMoney, convertMoneyOrder } from './utils/conver-money'
import { useEffect, useState } from 'react'

import { CardInfo } from './card-info'
import { CartIcon2 } from '../../../../components'
import { analyticApi } from '../../../../api/analytic.api'
import { filterOrder } from './hooks/get-order-status'

interface AnalyticStatusCompleteProps {
  isOpen: boolean
  onClose: () => void
}

const { RangePicker } = DatePicker

export const AnalyticStatusComplete = ({ isOpen, onClose }: AnalyticStatusCompleteProps) => {
  const [orderFilterDate, setOrderFilterDate] = useState<number | null>(null)
  console.log('🚀 ~ AnalyticStatusComplete ~ orderFilterDate:', orderFilterDate)
  const [data, setData] = useState<IData | null>(null)
  const [countOrders, setCountOrders] = useState<number>(0)

  const onChange = async (
    _: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    const startDate = (dateString as [string, string])[0]
    const endDate = (dateString as [string, string])[1]
    const values = { startDate, endDate }

    /* kiểm tra xem enđate có lớn hơn startDate hay không */
    const isEndDateGreaterThanStartDate = new Date(endDate).getTime() > new Date(startDate).getTime()
    if (!isEndDateGreaterThanStartDate) {
      message.error('Ngày kết thúc phải lớn hơn ngày bắt đầu')
      return
    }

    /* lấy dữ liệu */
    const data = await filterOrder(values)
    if (data) {
      const resultOrder = convertMoney(data, 'COMPLETED')
      setOrderFilterDate(resultOrder.totalMoney)
      setCountOrders(resultOrder.countOrders)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticApi.analyticComplete()
        setData(data.data)
      } catch (error) {
        message.error('Lỗi lấy dữ liệu')
      }
    }
    fetchData()
  }, [])

  const dataRechart = [
    {
      name: 'Doanh thu ngày',
      'Doanh thu': data?.day[0]?.totalAmount,
      'Số lượng đơn': data?.day[0]?.count
    },
    {
      name: 'Doanh thu tuần',
      'Doanh thu': data?.week[0]?.totalAmount,
      'Số lượng đơn': data?.week[0]?.count
    },
    {
      name: 'Doanh thu tháng',
      'Doanh thu': data?.month[0]?.totalAmount,
      'Số lượng đơn': data?.month[0]?.count
    },
    {
      name: 'Doanh thu năm',
      'Doanh thu': data?.year[0]?.totalAmount,
      'Số lượng đơn': data?.year[0]?.count
    }
  ]

  if (!data) return null
  return (
    <Drawer
      title='Thông kê đơn hàng "giao hàng thành công"'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width={1024}
      extra={
        <Space>
          <RangePicker onChange={onChange} />
        </Space>
      }
    >
      {orderFilterDate && (
        <div className='grid grid-cols-4 gap-4 mb-4'>
          <CardInfo
            title='Doanh thu tìm kiếm'
            number={orderFilterDate > 0 ? convertMoneyOrder(orderFilterDate) : 0}
            icon={<CartIcon2 />}
          />
          <CardInfo title='Số lượng đơn hàng' number={countOrders} icon={<CartIcon2 />} />
        </div>
      )}
      <div className='grid grid-cols-4 gap-4'>
        <CardInfo title='Doanh thu ngày' number={(data?.day[0]?.totalAmount.toLocaleString())} icon={<CartIcon2 />} />
        <CardInfo title='Số lượng đơn theo ngày' number={data?.day[0]?.count} icon={<CartIcon2 />} />
        <CardInfo title='Doanh thu tuần' number={convertMoneyOrder(data?.week[0]?.totalAmount)} icon={<CartIcon2 />} />
        <CardInfo title='Số lượng đơn theo tuần' number={data?.week[0]?.count} icon={<CartIcon2 />} />
        <CardInfo
          title='Doanh thu tháng'
          number={convertMoneyOrder(data?.month[0]?.totalAmount)}
          icon={<CartIcon2 />}
        />
        <CardInfo title='Số lượng đơn theo tháng' number={data?.month[0]?.count} icon={<CartIcon2 />} />
        <CardInfo title='Doanh thu năm' number={convertMoneyOrder(data?.year[0]?.totalAmount)} icon={<CartIcon2 />} />
        <CardInfo title='Số lượng đơn theo năm' number={data?.year[0]?.count} icon={<CartIcon2 />} />
      </div>
      <div className='mt-10'>
        <ComposedChart
          width={900}
          height={400}
          data={dataRechart}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Doanh thu' barSize={20} fill='#413ea0' />
          <Line type='monotone' dataKey='Số lượng đơn' stroke='#ff7300' />
        </ComposedChart>
      </div>
    </Drawer>
  )
}
