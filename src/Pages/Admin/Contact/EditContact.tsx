import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContactById, updateContact } from '../../../api/contact';
import { useParams, useNavigate } from 'react-router-dom';
import { IContact } from '../../../interfaces/contact';

const EditContact = () => {
    const [contact, setContact] = useState<IContact>({} as IContact);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchContact() {
            try {
                if (id) {
                    const { data } = await getContactById(id);
                    setContact(data);
                    console.log(data, "2232");
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin liên hệ:', error);
            }
        }
        fetchContact();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };
    const handleTraloiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id && contact) {
                await updateContact(contact, id);
                setTimeout(() => {
                    navigate('/admin/contact');
                }, 3000);
                toast.success('Cập nhật liên hệ thành công!', { autoClose: 2000 });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật liên hệ:', error);
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-5">Cập Nhật Liên Hệ</h1>
            <form className="w-1/3" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Tên người liên hệ
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        name="name"
                        value={contact.name || ''}
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
                        value={contact.email || ''}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
                        Số điện thoại
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={contact.phonenumber || ''}
                        disabled
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
                        value={contact.description || ''}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="traloi">
                       trả lời
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="traloi"
                        name="traloi"
                        value={contact.traloi || ''}
                        onChange={handleTraloiChange}
                   
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Trạng thái
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={contact.status}
                        onChange={handleChange}
                        disabled={contact.status === 'DATUVAN'}
                        className="mt-1.5 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
                    >
                        <option value="" disabled hidden>--Chọn trạng thái--</option>
                        <option value="CHUATUVAN">Chờ tư vấn</option>
                        <option value="DATUVAN">Đã tư vấn</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Cập nhật Liên Hệ
                    </button>
                    <a href="/admin/contact">
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

export default EditContact;
