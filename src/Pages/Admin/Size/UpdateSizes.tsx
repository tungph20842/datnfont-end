import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBySizeId, updateSize } from '../../../api/size';
import { useParams, useNavigate } from 'react-router-dom';
import { ISize } from '../../../interfaces/size';
const UpdateSizes = () => {
  const [size, setSize] = useState<ISize>({} as ISize);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSizes() {
      try {
        if (id) {
          const { data } = await getBySizeId(id);
          setSize(data);
          console.log(data, "2232");
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin Color:', error);
      }
    }
    fetchSizes();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSize((prevSizes) => ({
      ...prevSizes,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && size) {
        await updateSize(size, id);
        setTimeout(() => {
          navigate('/admin/size');
        }, 3000);
        toast.success('Cập nhật Size thành công!', { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật Size:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Cập Nhật Size</h1>
      <form className="w-1/3" onSubmit={handleSubmit}>
      

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
           Tên Size
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
            value={size.name}
            onChange={handleChange}
          />
        </div>

    
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cập nhật Size
          </button>
          <a href="/admin/size">
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

export default UpdateSizes;
