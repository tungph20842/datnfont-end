import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getByColorId,updateColor } from '../../../api/color';
import { useParams, useNavigate } from 'react-router-dom';
import { IColor } from '../../../interfaces/color';
const UpdateColors = () => {
  const [color, setColor] = useState<IColor>({} as IColor);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchColors() {
      try {
        if (id) {
          const { data } = await getByColorId(id);
          setColor(data);
          console.log(data, "2232");
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin Color:', error);
      }
    }
    fetchColors();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setColor((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && color) {
        await updateColor(color, id);
        setTimeout(() => {
          navigate('/admin/color');
        }, 3000);
        toast.success('Cập nhật Color thành công!', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật Color:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Cập Nhật Color</h1>
      <form className="w-1/3" onSubmit={handleSubmit}>
      

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Tên Color
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
            value={color.name}
            onChange={handleChange}
          />
        </div>

    
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cập nhật Color
          </button>
          <a href="/admin/color">
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

export default UpdateColors;
