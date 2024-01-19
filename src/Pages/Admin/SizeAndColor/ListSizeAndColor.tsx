import React, { useEffect, useMemo, useState } from 'react';
import { Popconfirm, Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteproduct, getProduct } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';
type Props = {};

const { Search } = Input;

const ListSizeAndColor = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const sorte = products.reverse()
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getProduct();
      setProducts(data);
    }
    fetchProduct();
  }, []);

  const handleDeleteProduct = async (id: any) => {
    try {
      if (id) {
        await deleteproduct(id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        toast.success('Xóa sản phẩm thành công', { autoClose: 2000 });
      }
    } catch (error) {
      console.log('Lỗi xóa sản phẩm:', error);
      toast.error('Xóa sản phẩm thất bại');
    }
  };

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
      title: 'Image',
      dataIndex: 'img',
      width: "10%",
      key: 'img',
      render: (img: string[]) => (
        <img src={img[0]} alt="product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "50%",
    },
   
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (status: any, record: IProduct) => (
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
          <Link to={`update/${record._id}`}>
            <button
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const filteredProducts = useMemo(() => {
    return sorte.filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [sorte, searchKeyword]);

  return (
    <div className='ml-4 mr-4 mt-4'>
    <ToastContainer />
    <div className="flex justify-between items-center mb-4"> 
    <div className="text-center flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Quản Lý Size và Color</h1>
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
    
    <Table dataSource={filteredProducts} columns={columns} />

  </div>
  );
};

export default ListSizeAndColor;