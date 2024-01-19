import { useForm, Controller } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addVoucher } from '../../../api/vouchers'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useState } from 'react'
const AddVouchers = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const [randomCode, setRandomCode] = useState(nanoid(6))

  const onSubmit = async (data: any) => {
    if (!data.Voucher_Code) {
      data.Voucher_Code = randomCode;
    }
    const discountType = parseInt(data.Discount_Type);

    // Kiểm tra ngày bắt đầu và kết thúc
    const startDate = new Date(data.Start_Date);
    const endDate = new Date(data.Expiration_Date);

    if (startDate >= endDate) {
      toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc.');
      return;
    }

    // Kiểm tra Discount_Type
    if (isNaN(discountType) || discountType <= 0) {
      toast.error('Loại giảm giá phải lớn hơn 0.');
      return;
    }

    try {
      const response = await addVoucher(data)
      if (response.status === 201) {
        console.log('Thêm phiếu voucher thành công:', response.data)
        setTimeout(() => {
          navigate('/admin/vouchers');
        }, 3000);
        toast.success('Thêm phiếu voucher thành công', { autoClose: 2000 })

      } else {
        console.error('Có lỗi khi thêm phiếu voucher:', response.data.message)
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
      <h1 className='text-2xl font-bold mb-5'>Thêm Phiếu Voucher</h1>
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
                value={randomCode}
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
            voucher giảm
          </label>
          <Controller
            name='Discount_Type'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Giảm'
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
            rules={{ required: true, min: 1 }}
            render={({ field }) => (
              <input
                type='number'
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Số Lượng'
              />
            )}
          />
          {errors.Quantity && <p className='text-red-500'>Số Lượng không được để trống và phải lớn hơn 0.</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Expiration_Date'>
            Ngày Bắt Đầu
          </label>

          <Controller
            name='Start_Date'
            control={control}
            rules={{ required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ }}
            render={({ field }) => (
              <input
                type='date'
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Ngày Bắt Đầu'
              />
            )}
          />
          {errors.Start_Date && errors.Start_Date.type === 'required' && (
            <p className='text-red-500'>Bắt buộc phải nhập Ngày Bắt Đầu.</p>
          )}
          {errors.Start_Date && errors.Start_Date.type === 'pattern' && (
            <p className='text-red-500'>Ngày Bắt Đầu không hợp lệ (định dạng yyyy-mm-dd).</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Expiration_Date'>
            Ngày Hết Hạn
          </label>

          <Controller
            name='Expiration_Date'
            control={control}
            rules={{ required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ }}
            render={({ field }) => (
              <input
                type='date'
                {...field}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Nhập Ngày Hết Hạn'
              />
            )}
          />
          {errors.Expiration_Date && errors.Expiration_Date.type === 'required' && (
            <p className='text-red-500'>Bắt buộc phải nhập Ngày Hết Hạn.</p>
          )}
          {errors.Expiration_Date && errors.Expiration_Date.type === 'pattern' && (
            <p className='text-red-500'>Ngày Hết Hạn không hợp lệ (định dạng yyyy-mm-dd).</p>
          )}
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
          {errors.Description && <p className='text-red-500'>Bắt buộc phải nhập Mô Tả.</p>}
        </div>
        <div className='flex justify-between items-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Thêm Phiếu Voucher
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddVouchers
