import React, { useEffect, useState, useMemo } from 'react';
import { Comments } from '../../../interfaces/comment';
import { deleteComment, getComment } from '../../../api/comment';
import { useParams } from 'react-router-dom';
import { Popconfirm, message, Input, Table } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Search } = Input;

const Message = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const sorte = comments.reverse()
  const [searchTerm, setSearchTerm] = useState('');

  const { productId } = useParams();

  const fetchComment = async () => {
    if (productId) {
      const { data } = await getComment(productId);
      console.log(data);
      setComments(data.comments);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handleDeleteComment = async (commentId: any) => {
    try {
      if (commentId !== null) {
        await deleteComment(commentId);
        setComments((prevComments) =>
          prevComments.reverse().filter((comment) => comment._id !== commentId)
        );
        toast.success('Xóa bình luận thành công', { autoClose: 2000 });
      }
    } catch (error) {
      console.log('Error deleting comment:', error);
      toast.error('Xóa bình luận thất bại');
    }
  };
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'index',
    //   key: 'index',
    //   render: (text: any, record: any, index: number) => index + 1,
    // },
    {
      title: 'Tên người gửi',
      dataIndex: 'userId',
      key: 'userId',
      width: "20%",
      render: (userId: any) =>
        userId && typeof userId === 'object' && 'username' in userId
          ? (userId as { username?: string }).username || 'Unknown'
          : 'Unknown',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Comments, b: Comments) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      render: (createdAt: any) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : 'Không rõ',
    },
    // {
    //   title: 'Hành động',
    //   dataIndex: '_id',
    //   key: 'action',
    //   render: (commentId: any) => (
    //     <Popconfirm
    //       title="Bạn có chắc chắn muốn xóa bình luận này?"
    //       onConfirm={() => handleDeleteComment(commentId)}
    //       okText={<button className="text-red-500 hover:text-black">Xóa</button>}
    //       cancelText="Hủy"
    //       placement="topRight"
    //     >
    //       <button className="inline-flex hover:text-red-500 items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke-width="1.5"
    //           stroke="currentColor"
    //           className="h-4 w-4 "
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    //           />
    //         </svg>
    //         Delete
    //       </button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  const filteredComments = useMemo(() => {
    return sorte.filter((comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sorte, searchTerm]);

  return (
    <div className="ml-4 mr-4 mt-4">
      <ToastContainer />
      <div className="container mx-auto mt-10 p-4 bg-white rounded shadow-xl">
      <div className="text-center flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-semibold">Quản Lý Bình Luận</h1>
        </div>
        <div><Search
          placeholder="Tìm kiếm theo tên người gửi"
          onSearch={handleSearch}
          style={{ width: 200, marginBottom: 16 }}
        /></div>
  </div>
        <Table
          dataSource={filteredComments.map((comment, index) => ({ ...comment, index }))}
          columns={columns}
        />

   
      </div>
      </div>
  );
};

export default Message;
