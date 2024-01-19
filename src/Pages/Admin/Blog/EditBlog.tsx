import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getByIdBlog, updateBlog } from '../../../api/blog'; // Thay đổi hàm và đường dẫn tương ứng
import { useParams, useNavigate } from 'react-router-dom';
import { IBlog } from '../../../interfaces/blog'; // Đảm bảo import đúng interface

const EditBlog = () => {
  const [blog, setBlog] = useState<IBlog>({} as IBlog);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        if (id) {
          const { data } = await getByIdBlog(id);
          setBlog(data);
          console.log(data, "2232");
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bài viết:', error);
      }
    }
    fetchBlog();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && blog) {
        await updateBlog(blog, id);
        setTimeout(() => {
          navigate('/admin/blog');
        }, 3000);
        toast.success('Cập nhật bài viết thành công!', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Cập Nhật Bài Viết</h1>
      <form className="w-1/3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
            Ảnh
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="img"
            name="img"
            value={blog.img}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Tiêu đề
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Mô tả
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={blog.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Ngày đăng
          </label>
          <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    id="date"
    name="date"
    value={blog.date}
    disabled // Không cho phép chỉnh sửa
  />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cập nhật Bài Viết
          </button>
          <a href="/admin/blog">
            <button
              className="bg-blue-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Quay Lại
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
