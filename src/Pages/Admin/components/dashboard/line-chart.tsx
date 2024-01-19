import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useEffect, useState } from 'react'

import { IAnalyticStatusYear } from '../../../../interfaces'
import { getOrderStatusYear } from './hooks/get-order-status'
import { message } from 'antd'

export const LineChartOrderStatus = () => {
  const [orderStatusYear, setOrderStatusYear] = useState<IAnalyticStatusYear[]>([])
  const data =
    orderStatusYear &&
    orderStatusYear.length > 0 &&
    orderStatusYear.map((item) => ({
      name: item._id,
      'số lượng': item.count,
      'tổng tiền': item.totalAmount,
      amt: 2400
    }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStatusYeanr = await getOrderStatusYear()

        setOrderStatusYear(responseStatusYeanr)
      } catch (error) {
        message.error('Lỗi lấy dữ liệu')
      }
    }
    fetchData()
  }, [])
  return (
    <div className='w-full h-full rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5'>
      <h3 className='text-xl font-semibold text-black dark:text-white mb-4'>Tổng quan</h3>
      <div className='w-full h-full min-h-[500px]'>
        <ResponsiveContainer width='100%' height='100%' className={'!h-full min-h-[500px]'}>
          <LineChart
            width={500}
            height={300}
            data={data || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='tổng tiền' stroke='#8884d8' activeDot={{ r: 8 }} />
            <Line type='monotone' dataKey='số lượng' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
