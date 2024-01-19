import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IBlog } from "../interfaces/blog";
import { getByIdBlog } from "../api/blog";

const DetailBlogPage = () => {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const { blogId } = useParams();

  useEffect(() => {
    // Gọi API để lấy dữ liệu blog theo ID
    const fetchBlogById = async () => {
      try {
        const response = await getByIdBlog(blogId); // Sử dụng hàm getByIdBlog từ module api/blog
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlogById();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto px-6">
      <section>
        <div className="mx-auto grid grid-cols-1 gap-4 mx-auto ml-4">
        <div className=" appearance-none duration-300 max-w-[1000px] mx-auto my-auto rounded-md mt-10 ">
          <div className="flex items-center text-[36px] font-bold text-black justify-center my-4 ">
          <span className="mr-4 text-center text-[#FFB000] font-roboto">{blog.title}</span>
          </div>
            <span className="mt-10 flex justify-center">
              <img
                src={blog.img}
                className="w-200 h-auto object-cover rounded-xl"
                alt=""
              />
            </span>

            <div className="flex flex-col text-[14px] mt-4">
              <span className="mt-5 self-end mb-4 text-[#FF0000] mr-5">Ngày đăng : {blog.date || new Date().toLocaleDateString()}</span>
              <p className="mb-4 mr-5 mx-5 mt-5 leading-6 text-justify" style={{ whiteSpace: "pre-wrap" }}>
                {blog.description}
              </p>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailBlogPage;
