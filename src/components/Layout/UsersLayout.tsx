import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "../Header"
import Footer from "../Footer"
import Category from "../../Pages/Category"
import { Skeleton } from "antd"

const UsersLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Mock: setTimeout để giả định việc tải dữ liệu mất thời gian
        const fetchData = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000); // Giả sử mất 2 giây để tải dữ liệu
        };

        fetchData();
    }, []); // 
    return (
        <div>

{isLoading ? (
        // Nếu đang loading, hiển thị toàn bộ nội dung bên trong Skeleton
        <Skeleton active />
      ) : (
        // Ngược lại, hiển thị nội dung thực tế
        <>
          <header>
            <Header />
          </header>

          <main>
            <Outlet />
          </main>

          <footer>
            <Footer />
          </footer>
        </>
      )}

        </div>
    )
}

export default UsersLayout