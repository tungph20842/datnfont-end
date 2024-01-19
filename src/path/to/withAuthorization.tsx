import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const withAuthorization = (WrappedComponent) => {
  const WithAuthorization = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
      if (userRole !== 'admin') {
        // Hiển thị thông báo
        toast.error('Bạn không có quyền truy cập trang admin', {
          autoClose: 3000,
        });
    
        navigate('/');
      }
    }, [userRole, navigate]);

    return <WrappedComponent />;
  };

  return WithAuthorization;
};

export default withAuthorization;
    