import { Table, message } from 'antd'
import { useEffect, useState } from 'react'

import { IProductTop } from '../../../interfaces'
import { analyticApi } from '../../../api/analytic.api'

export const TopProduct = () => {
  const [topProduct, setTopProduct] = useState<IProductTop | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await analyticApi.top10Product()
        setTopProduct(response.data)
      } catch (error) {
        message.error('Lỗi tải dữ liệu')
      }
    })()
  }, [])

  if (!topProduct) return null

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="product" style={{ width: '50px', height: '50px' }} /> 
    },
    {
      title: 'Số lượng',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity'
    }
  ]
// console.log(product,"31321")
  const dataCompleted = topProduct.completed
    .map((product) => ({
      key: product._id,
      name: product.name,
      // image:product.img,
      image: product.img.length > 0 ? product.img[0] : null,
      totalQuantity: product.totalQuantity
    }))
 
    .sort((a, b) => b.totalQuantity - a.totalQuantity)

  const dataCancelled = topProduct.cancelled
    .map((product) => ({
      key: product._id,
      name: product.name,
      // image:product.img,
      image: product.img.length > 0 ? product.img[0] : null,

      totalQuantity: product.totalQuantity
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)

  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-medium'>Top sản phẩm bán chạy</h2>
        <Table dataSource={dataCompleted} columns={columns} />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-medium'>đơn hàng giao thất bại</h2>
        <Table dataSource={dataCancelled} columns={columns} />
      </div>
    </div>
  )
}
