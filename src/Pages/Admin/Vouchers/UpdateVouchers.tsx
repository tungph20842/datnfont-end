import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateVoucher, getVoucherById } from '../../../api/vouchers'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateVouchers = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const [voucherData, setVoucherData] = useState({})

  useEffect(() => {
    async function loadVoucher() {
      try {
        const response = await getVoucherById(id)
        if (response.status === 200) {
          setVoucherData(response.data)
          reset(response.data)
        } else {
          console.error('Có lỗi khi tải thông tin phiếu voucher:', response.data.message)
        }
      } catch (error) {
        if (error instanceof Error && 'message' in error) {
          console.error('Có lỗi:', error.message)
        } else {
          console.error('Có lỗi không xác định')
        }
      }
    }

    loadVoucher()
  }, [id])

  const onSubmit = async (data: any) => {
    try {
      delete data._id
      delete data.__v
      const response = await updateVoucher(data, id)
      if (response.status === 200) {
        console.log('Cập nhật phiếu voucher thành công:', response.data)
        setTimeout(() => {
          navigate('/admin/vouchers');
        }, 3000);
        toast.success('Cập nhật phiếu voucher thành công', { autoClose: 2000 })
      } else {
        console.error('Có lỗi khi cập nhật phiếu voucher:', response.data.message)
      }
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        console.error('Có lỗi:', error.message)
      } else {
        console.error('Có lỗi không xác định')
      }
    }
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <ToastContainer />
      <h1 className='text-2xl font-bold mb-5'>Cập Nhật Phiếu Voucher</h1>
      <form className='w-1/3' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Voucher_Code'>
            Mã Phiếu Voucher
          </label>
          <Controller
            name='Voucher_Code'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Mã Phiếu Voucher'
              />
            )}
            disabled
          />
          {errors.Voucher_Code && <p className='text-red-500'>Bắt buộc phải nhập Mã Phiếu Voucher.</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Discount_Type'>
            Loại Giảm Giá
          </label>
          <Controller
            name='Discount_Type'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Loại Giảm Giá'
              />
            )}
          />
          {errors.Discount_Type && <p className='text-red-500'>Bắt buộc phải nhập Loại Giảm Giá.</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Quantity'>
            Số Lượng
          </label>
          <Controller
            name='Quantity'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Số lượng'
              />
            )}
          />
          {errors.Quantity && <p className='text-red-500'>Bắt buộc phải Số lượng.</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Start_Date'>
            Ngày Bắt Đầu
          </label>
          <Controller
            name='Start_Date'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Ngày Bắt Đầu'
              />
            )}
            disabled
          />
          {errors.Start_Date && <p className='text-red-500'>Bắt buộc phải nhập Ngày Bắt Đầu.</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Expiration_Date'>
            Ngày Hết Hạn
          </label>
          <Controller
            name='Expiration_Date'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Ngày Hết Hạn'
              />
            )}
            disabled
          />
          {errors.Expiration_Date && <p className='text-red-500'>Bắt buộc phải nhập Ngày Hết Hạn.</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Description'>
            Mô Tả
          </label>
          <Controller
            name='Description'
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Mô Tả'
    
              />
            )}
          />
        </div>

        <div className='flex justify-between items-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Cập Nhật Phiếu Voucher
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateVouchers
