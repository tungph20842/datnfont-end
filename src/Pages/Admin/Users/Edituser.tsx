import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById, updateUser } from '../../../api/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from '../../../interfaces/cart';

const UpdateUser = () => {
  const [user,setUser]=useState<IUser>({} as IUser)

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        if (id) {
          const { data } = await getUserById(id);
          setUser(data)
          console.log(data,"2232");
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Nếu trường name là 'status', cập nhật giá trị cho 'role'
    if (name === 'role') {
      setUser((prevUser) => ({
        ...prevUser,
        role: value,
      }));
    } else {
      // Ngược lại, giữ nguyên cách xử lý như trước
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && user) {
        await updateUser(user,id)
        setTimeout(() => {
          navigate('/admin/users');
        }, 3000);
        toast.success('Cập nhật người dùng thành công!', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Cập Nhật Người Dùng</h1>
      <form className="w-1/3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên người dùng
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            name="username"
            value={user.username}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
          Vai trò
          </label>
          <select
          id="role"
          name="role"
          value={user.role}  
          onChange={handleChange}
          className="mt-1.5 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
          >
          <option value="" disabled hidden>Chọn Vai trò</option>
          <option value="member">Thành viên</option>
          <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                     Trạng thái
                    </label>
                    <select
          id="status"
          name="status"
          value={user.status}  
          onChange={handleChange}
          className="mt-1.5 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
          >
          <option value="" disabled hidden>Chọn trạng thái</option>
          <option value="on going">on going</option>
          <option value="block">block</option>
          </select>
                </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cập nhật Người Dùng
          </button>
          <a href="/admin/users">
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

export default UpdateUser;