import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../api/auth';
import { IUser } from '../interfaces/auth';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}

const Information = (props: Props) => {
    const [data, setData] = useState<IUser>({} as IUser);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { data } = await getUserById(id)
                setData(data)
                console.log(data);

            }
        }
        fetchData()
    }, [])
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            try {
               if(id){
                const filename = `${uuidv4()}_${file.name}`;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'upload_preset');
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dfftwrlu2/image/upload`,
                    formData
                  );        
                  const avatarUrl = response.data.secure_url;
                  await updateUser( avatarUrl,id);
                  setData((prevData) => ({ ...prevData, avatar: avatarUrl }));
                  toast.success('Tải ảnh thành công ', { autoClose: 2000 })
               }
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            }
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Assuming you have an updateUser function that sends a request to update user data
           if(id){
            await updateUser(data, id);
           }
           setTimeout(() => {
            navigate('/');
          }, 3000);
           toast.success('Thay đổi thông tin thành công ', { autoClose: 2000 })
            
            // Optionally, you can redirect the user after successful submission
             // Change the path to where you want to redirect

        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Thay đổi thông tin thành công thất bại', { autoClose: 2000 })

            // Handle error appropriately, e.g., show an error message to the user
        }
      };
    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
            <ToastContainer />
            <div className="max-w-6xl px-4 mx-auto">
                <div className="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900">
                    <div className="pb-6 border-b border-gray-100 dark:border-gray-700 text-center">
                        <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                            Thông tin cá nhân
                        </h2>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-full md:w-9/12">
                                <div className="flex flex-wrap -m-3">
                                    <div className="w-full p-3 md:w-1/3">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">Họ và tên</p>
                                    </div>
                                    <div className="w-full p-3 md:flex-1">
                                        <input
                                            className="w-full px-4 dark:bg-gray-800 dark:placeholder-gray-500 dark:text-gray-400  dark:border-gray-700 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="text" name='username' value={data.username} onChange={handleInputChange} placeholder="Họ và tên" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-full md:w-9/12">
                                <div className="flex flex-wrap -m-3">
                                    <div className="w-full p-3 md:w-1/3">
                                        <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                            Email
                                        </p>
                                    </div>
                                    <div className="w-full p-3 md:flex-1">
                                        <input
                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="email" name='email' value={data.email} onChange={handleInputChange} placeholder="adam@gmail.com" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-full md:w-9/12">
                                <div className="flex flex-wrap -m-3">
                                    <div className="w-full p-3 md:w-1/3">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">Ảnh</p>
                                    </div>
                                    <div className="w-full p-3 md:w-auto">
                                        <img src={data.avatar} alt=""
                                            className="object-cover w-24 h-24 rounded-full" />
                                    </div>
                                    <div className="w-full p-3 md:flex-1">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-200 border-dashed rounded-lg cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                                <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6">
                                                    <span className="text-blue-500 dark:text-gray-400"> <svg
                                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" className="w-8 h-8 bi bi-cloud-upload"
                                                        viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd"
                                                            d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                                        <path fill-rule="evenodd"
                                                            d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                                    </svg></span>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold text-blue-500">Click to upload</span> or drag
                                                        and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or
                                                        GIF (upto 10MB)
                                                    </p>
                                                </div>
                                                <input type="file" id="dropzone-file"  onChange={handleFileChange} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-6 flex-wrap -m-1.5">
                        <div className="w-full md:w-auto p-1.5">
                                <button
                                type='submit'
                                    className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 ">
                                    <p>Lưu</p>
                                </button>
                            </div>
                            <div className="w-full md:w-auto p-1.5">
                            <Link to={`/ChangePassword/${data._id}`}
                                    className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700 hover:border-gray-300 ">
                                    <p>Đổi mật khẩu</p>
                            </Link>
                            </div>
                          
                        </div>

                    </form>




                </div>
            </div>
        </section>
    )
}

export default Information