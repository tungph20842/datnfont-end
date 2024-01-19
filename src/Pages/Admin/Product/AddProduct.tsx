import React, { useEffect, useState } from "react";
import { ICategories } from "../../../interfaces/categories";
import { getCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { addproduct } from "../../../api/product";
import { ISize } from "../../../interfaces/size";
import { IColor } from "../../../interfaces/color";
import { getSize } from "../../../api/size";
import { getColor } from "../../../api/color";
import { IProduct } from "../../../interfaces/product";



const AddProduct = () => {
  const [categories, setcategories] = useState<ICategories[]>([])
  const [colors, setcolors] = useState<IColor[]>([])
  const [sizes, setsizes] = useState<ISize[]>([])
  const [images, setImages] = useState<string[]>([]);
  const [additionalSizes, setAdditionalSizes] = useState<Array<{ sizeId: string;colorId: string; quantity: number }>>([]);
  const [isAddingSize, setIsAddingSize] = useState(false)
  const navigate = useNavigate();
  console.log(categories);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getCategory();
      setcategories(data);
      console.log(data);

    }
    fetchProduct()
  }, [])
  useEffect(() => {
    async function fetchSizes() {
      const { data } = await getSize();
      setsizes(data);
      console.log(data);

    }
    fetchSizes()
  }, [])
  useEffect(() => {
    async function fetchColors() {
      const { data } = await getColor();
      setcolors(data);
      console.log(data);

    }
    fetchColors()
  }, [])
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IProduct>();

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const uploadPromises = Array.from(files).map((file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload_preset");

        return fetch(`https://api.cloudinary.com/v1_1/dfftwrlu2/image/upload`, {
          method: "POST",
          body: formData,
        })
          .then(response => response.json())
          .then(data => data.secure_url)
          .catch(error => {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
          });
      });

      Promise.all(uploadPromises)
        .then((uploadedImages) => {
          const filteredImages = uploadedImages.filter((img) => img !== null);
          setImages((prevImages) => [...prevImages, ...filteredImages]);
        })
        .catch(error => {
          console.error("Error uploading images:", error);
        });
    }
  };
  
  const onHandleSubmit: SubmitHandler<IProduct> = async (data: any) => {
    try {
      data.img = images;

      if (!isAddingSize) {
        const createProduct = await addproduct(data);
          setTimeout(() => {
         navigate('/admin/products');
       }, 3000);
        toast.success("Thêm sản phẩm thành công", { autoClose: 2000 });
      }

      setIsAddingSize(false); // Reset the flag after submission
    } catch (error) {
      // Handle error
    }
  };
  const addSizeRow = () => {
    setIsAddingSize(true);
    setAdditionalSizes((prevSizes) => [...prevSizes, { sizeId: '',colorId:'', quantity: 0 }]);
  };

  const removeSizeRow = (index: number) => {
    setAdditionalSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  

  return (
    // -----
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Thêm Sản Phẩm</h1>
      <form className="w-1/3" onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Tên Sản Phẩm
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Tên"
            id="categoryName"
            type="text"
            {...register("name", { required: true })}
          />
          {/* {errors.name && <span>this field is required</span>} */}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Ảnh
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Ảnh"
            id="categoryImage"
            type="file"
            accept="image/*"
            onChange={onImageUpload}

          />

          {errors.img && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadedImages">

          </label>
          <div className="flex gap-3 ">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index + 1}`} className="rounded-md  h-32" />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Giá
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Giá"
            id="categoryImage"
            type="number"
            {...register("price")}
          />
          {errors.price && <span>this field is required</span>}
        </div>
      
        {/* sizes */}
        <div className="mb-4 ">
          <label
            htmlFor="size"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Size
          </label>
          {additionalSizes.map((size, index) => (
            <div key={index} className=" mt-3 mb-3 ">
              <div className="w-full flex gap-2 mb-3">
                <select
                  {...register(`sizeAndcolor.${index}.sizeId` as const)}
                  value={watch(`sizeAndcolor.${index}.sizeId` as const)}
                  onChange={(e) => setValue(`sizeAndcolor.${index}.sizeId`, e.target.value)}
                  id={`sizes-${index}`}

                  className=" shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
                >
                  <option value="">Nhập Size</option>
                  {sizes.map((size) => (
                    <option key={size._id} value={size._id}>{size.name}</option>
                  ))}
                </select>
                <select
                  {...register(`sizeAndcolor.${index}.colorId` as const)}
                  value={watch(`sizeAndcolor.${index}.colorId` as const)}
                  onChange={(e) => setValue(`sizeAndcolor.${index}.colorId`, e.target.value)}
                  id={`colors-${index}`}
                  className=" shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
                >
                  <option value="">Nhập Color</option>
                  {colors.map((color) => (
                    <option key={color._id} value={color._id}>{color.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <input
                  className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nhập Số Lượng"
                  id="sizes"
                  {...register(`sizeAndcolor.${index}.quantity` as const)}
                  type="number"
                  
                />
                
              </div>

            </div>
          ))}
          <div className="w-full mt-3 mb-3">
            <button className="w-full" onClick={addSizeRow}>
              <div
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                <span className="text-sm font-medium"> Thêm Size </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

              </div>
            </button>
          </div>
          
          {errors.sizeAndcolor && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="HeadlineAct"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Loại
          </label>

          <select

            id="HeadlineAct"
            {...register("categoryId")}
            className="mt-1.5 shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
          >
            <option value="">Nhập Loại</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" {...register("description")}>

          </textarea>
          {errors.description && <span>this field is required</span>}
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Thêm Sản Phẩm
          </button>
          <a href="/admin/products">
            <button
              className="bg-blue-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Quay Lại
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};


export default AddProduct;