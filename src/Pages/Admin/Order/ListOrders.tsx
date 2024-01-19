import { Space, Table, Tag,Input  } from 'antd';
import React, { useEffect, useMemo,useState } from 'react'
import { IOrders } from '../../../interfaces/Orders';
import { getAllOrder } from '../../../api/orders';
import moment from 'moment';
import { Link } from 'react-router-dom';
type Props = {}
const { Search } = Input;   
const statusOptions = [
    { value: 'PENDING', label: 'chờ duyệt' },
    { value: 'PROCESSING', label: 'lấy hàng' },
    { value: 'ONDELIVERY', label: 'đang giao' },
    { value: 'COMPLETED', label: 'giao hàng thành công' },
    { value: 'CANCELLED', label: 'Hủy đơn hàng' },
    { value: 'ID', label: 'ID' },
  ];
const ListOrders = (props: Props) => {
    const [Orders, setOrders] = useState<IOrders[]>([])
    const sorte = Orders.reverse()
    const [searchKeyword, setSearchKeyword] = useState('');
    const fetchOrder = async () => {
        try {
            const { data } = await getAllOrder()
            setOrders(data)
            console.log(data);

        } catch (error) {
            console.error("Không có dữ liệu", error);

        }
    }
    useEffect(() => {
        fetchOrder()
    }, [])
   
    const handleSearch = (value: string) => {
        setSearchKeyword(value);
      };
      const formatCurrency = (value:any) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value);
      };
    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        width: "15%",    

        key: '_id',
    },
        {
            title: 'Email',
            dataIndex: 'email',
            width: "15%",    

            key: 'email',
        },
        {
            title: 'Ngày Đặt Hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            sorter: (a: IOrders, b: IOrders) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
            render: (text: string) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Tên Khách Hàng',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Trạng Thái Đơn Hàng',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
              const statusOption = statusOptions.find((option) => option.value === status);
          
              if (statusOption) {
                return (
                  <span className="text-base font-normal">
                    <span className="bg-transparent border-none">{statusOption.label}</span>
                  </span>
                );
              }
          
              return null;
            },
          },
        {
            title: 'Tổng Tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (orderTotal:any) => formatCurrency(orderTotal),
        },
        {
            title: 'Hoạt Động',
            render: ((record:IOrders) => (
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <Link to={`orderdetail/${record._id}`}>
                    <button
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-blue-500 focus:relative"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        View
                    </button>
                    </Link>
                </div>
            ))
        },
    ];
    const filteredOrders = useMemo(() => {
      return sorte.filter((order) =>
        order._id.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }, [sorte, searchKeyword]);
    
      return (
        <div className="ml-4 mr-4 mt-4">

        <div className="flex justify-between items-center mb-4">
        <div className="text-center pb-7 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Quản Lý Đơn Hàng</h1>
        </div>
          <div>
            <Search
              placeholder="Tìm kiếm theo id"
              allowClear
              onSearch={handleSearch}
              style={{ width: 200, marginBottom: 16 }}
            />
          </div>
        </div>
        <Table dataSource={filteredOrders} columns={columns} />
      </div>
      );
}

export default ListOrders