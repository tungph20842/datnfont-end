import { useEffect,useMemo, useState } from 'react'
import { IVouchers } from '../../../interfaces/vouchers'
import { getVoucher, deleteVoucher } from '../../../api/vouchers'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Popconfirm,Input  } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
const { Search } = Input;
const ListVouchers = () => {
  const [vouchers, setVouchers] = useState<IVouchers[]>([])
  const sorte = vouchers.reverse()
  const [voucherToDelete, setVoucherToDelete] = useState<string | number | null>(null)
  const [visible, setVisible] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    getVoucher()
      .then((response) => {
        if (Array.isArray(response.data.vouchers)) {
          setVouchers(response.data.vouchers)
        } else {
          console.error('Data is not an array:', response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching vouchers:', error)
      })
  }, [])

  const handleDeleteClick = (voucherId: string | number) => {
    setVoucherToDelete(voucherId)
    setVisible(true)
  }

  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      deleteVoucher(voucherToDelete)
        .then(() => {
          setVouchers((prevVouchers) => prevVouchers.filter((voucher) => voucher._id !== voucherToDelete))
          toast.success('Delete Susscessfully !', { autoClose: 2000 })
        })
        .catch((error) => {
          console.error('Error deleting voucher:', error)
          toast.error('Error Delete Vouchers !')
        })
    }
    setVoucherToDelete(null)
    setVisible(false)
  }
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const columns = [
    {
      title: 'Voucher_Code',
      dataIndex: 'Voucher_Code',
      key: 'Voucher_Code'
    },
    {
      title: 'Discount_Type',
      dataIndex: 'Discount_Type',
      key: 'Discount_Type',
      render: (text: string) => `${text} vnd`
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity'
    },
    {
      title: 'Start_Date',
      dataIndex: 'Start_Date',
      key: 'Start_Date',
      render: (text: string) => {
        const StartDate = new Date(text)
        if (!isNaN(StartDate.getTime())) {
          return StartDate.toLocaleDateString('en-US')
        } else {
          return 'Invalid Date'
        }
      }
    },
    {
      title: 'Expiration Date',
      dataIndex: 'Expiration_Date',
      key: 'Expiration_Date',
      render: (text: string) => {
        const expirationDate = new Date(text)
        if (!isNaN(expirationDate.getTime())) {
          return expirationDate.toLocaleDateString('en-US')
        } else {
          return 'Invalid Date'
        }
      }
    },
    // {
    //   title: 'IsActive',
    //   dataIndex: 'Expiration_Date',
    //   key: 'IsActive',
    //   render: (text: string) => {
    //     const expirationDate = new Date(text)
    //     if (!isNaN(expirationDate.getTime())) {
    //       const currentDate = new Date()
    //       if (currentDate <= expirationDate) {
    //         return 'Active'
    //       } else {
    //         return 'InActive'
    //       }
    //     } else {
    //       return 'Invalid Date'
    //     }
    //   }
    // },
{
  title: 'Description',
  dataIndex: 'Description',
  key: 'Description',
},
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <div className='inline-flex rounded-lg border  border-gray-100 bg-gray-100 p-1'>
          <Link to={`update/${record._id}`}>
            <button className='inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
              Edit
            </button>
          </Link>
          {/* <Popconfirm
            title='Bạn có chắc chắn muốn xóa sản phẩm này?'
            onConfirm={() => handleDeleteClick(record._id)}
            okText={<button className='text-red-500 hover:text-black'>Xóa</button>}
            cancelText='Hủy'
            placement='topRight'
          >
            <button className='inline-flex hover:text-red-500 items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='h-4 w-4 '
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
              Delete
            </button>
          </Popconfirm> */}
        </div>
      )
    }
  ]
  const filteredvouchers = useMemo(() => {
    return sorte.filter((voucher) =>
    voucher.Voucher_Code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [sorte, searchKeyword]);

  return (
    <div className='ml-4 mr-4 mt-4'>
    <ToastContainer />
    <div className="flex justify-between items-center mb-4"> 
    <div className="text-center flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Quản Lý Voucher</h1>
    </div>
    <div>
      <Search
          placeholder="Tìm kiếm theo name"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginBottom: 16 }}
        />
      </div>
    </div>
    <div className="flex justify-between items-center mb-4"> 
    <div></div>
      <div>
        <Link to={'add'}>
          
          <button className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Thêm Voucher{' '}
          
          </button>
        </Link>
      </div>
    
    </div>
    <Table dataSource={filteredvouchers} columns={columns} />
    {/* <Modal title='Confirm Delete' visible={visible} onOk={handleConfirmDelete} onCancel={() => setVisible(false)}>
          <p>Xóa?</p>
        </Modal> */}
  </div>
  )
}

export default ListVouchers
