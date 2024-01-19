import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { changepassword, getUserById } from '../api/auth';
import { IUser } from '../interfaces/auth';
import { IChangePassword } from '../interfaces/cart';
type Props = {}

const ChangePassword = (props: Props) => {
    const { id } = useParams();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmNewPassword] = useState('');
    const [data, setData] = useState<IChangePassword>({} as IChangePassword);
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                // Add your logic to check if the new password and confirm password match
                if (newPassword !== confirmPassword) {
                    toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp', { autoClose: 2000 });
                    return;
                }

                // Make a request to your backend API to update the password
                await changepassword({ currentPassword, newPassword,confirmPassword }, id);

                toast.success('Đổi mật khẩu thành công', { autoClose: 2000 });

                // Optionally, you can redirect the user after successful password change
                // Change the path to where you want to redirect
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Đổi mật khẩu thất bại', { autoClose: 2000 });
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

                    <form onSubmit={handlePasswordChange} >


                        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-full md:w-9/12">
                                <div className="flex flex-wrap -m-3">
                                    <div className="w-full p-3 md:w-1/3">
                                        <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                            Đổi mật khẩu
                                        </p>
                                    </div>
                                    <div className="w-full p-3 md:flex-1">
                                        <label className='text-base font-semibold text-gray-700 dark:text-gray-400' htmlFor="">Mật khẩu hiện tại</label>
                                        <input
                                            className="w-full px-4 py-2.5 mb-3 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="password" id="currentPassword"
                                            name="currentPassword"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Mật khẩu hiện tại" />
                                        <label className='text-base font-semibold text-gray-700 dark:text-gray-400' htmlFor="">Mật khẩu mới</label>
                                        <input
                                            className="w-full px-4 py-2.5 mb-3 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="password"  id="newPassword"
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" />
                                        <label className='text-base font-semibold text-gray-700 dark:text-gray-400' htmlFor="">Nhập lại mật khẩu</label>
                                        <input
                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="password"  id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Nhập lại mật khẩu" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex pt-6 flex-wrap -m-1.5">
                            <div className="w-full md:w-auto p-1.5">
                                <Link to={`/information/${data._id}`}
                                    className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700 hover:border-gray-300 ">
                                    <p>Trở Lại</p>
                                </Link>
                            </div>
                            <div className="w-full md:w-auto p-1.5">
                                <button
                                    type='submit'
                                    className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 ">
                                    <p>Lưu</p>
                                </button>
                            </div>
                        </div>

                    </form>




                </div>
            </div>
        </section>
    )
}

export default ChangePassword