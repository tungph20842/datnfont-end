import React, { useEffect, useState } from 'react'
import { ICategories } from "../../../interfaces/categories";
import { getCategory } from "../../../api/categories";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProduct } from '../../../interfaces/product';
import { getById, updateproduct } from '../../../api/product';
import { IColor } from '../../../interfaces/color';
import { ISize } from '../../../interfaces/size';
import { getSize } from '../../../api/size';
import { getColor } from '../../../api/color';


const UpdateSizeAndColor = () => {
  const [categories, setcategories] = useState<ICategories[]>([])
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const { id } = useParams();
  const [colors, setcolors] = useState<IColor[]>([])
  const [sizes, setsizes] = useState<ISize[]>([])
  const [editedImageIndex, setEditedImageIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getCategory();
        // set
        setcategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
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
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (id) {
          const { data } = await getById(id)
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct();
  }, [id]);



  const hanldeChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'img') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: value.split(',').map((url) => url.trim()),
      }))
    } else {
      setProduct((prevProduct) => ({

        ...prevProduct,
        [name]: value,
      }))
    }

  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: categoryId,
    }));
  };
  const handleSizeAndColorChange = (index: number, field: string, value: string | number) => {
    // Create a copy of the sizeAndcolor array
    const updatedSizeAndColor = [...product.sizeAndcolor];
    updatedSizeAndColor[index] = {
      ...updatedSizeAndColor[index],
      [field]: value,
    };
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizeAndcolor: updatedSizeAndColor,
    }));
  }
  const handleAddSize = () => {
    setProduct((prevProduct:any) => ({
      ...prevProduct,
      sizeAndcolor: [
        ...prevProduct.sizeAndcolor,
        {
          sizeId: sizes.length > 0 ? sizes[0]._id : '', // Default to the first available sizeId
          colorId: colors.length > 0 ? colors[0]._id : '', // Default to the first available colorId
          quantity: 0,
        },
      ],
    }));
  };
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file, null);
        const updatedImages = [...product.img]; // Create a copy of the existing images array
        if (editedImageIndex !== null) {
          // If we are editing an existing image, replace it in the array
          updatedImages[editedImageIndex] = imageUrl;
        } else {
          // If not editing, add the new image to the array
          updatedImages.push(imageUrl);
        }
        setProduct((prevProduct) => ({
          ...prevProduct,
          img: updatedImages,
        }));
        setEditedImageIndex(null); // Reset the index after editing
      } catch (error) {
        toast.error('Error uploading image. Please try again.');
      }
    }
  };
  const uploadImageToCloudinary = async (file: any, imageId: any) => {
    try {
      const cloudName = 'dfftwrlu2'; // Replace with your Cloudinary cloud name
      const uploadPreset = 'upload_preset'; // Replace with your Cloudinary upload preset

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      // Set the Cloudinary public ID with the image identifier

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        throw new Error(`Error uploading image: ${data.message}`);
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };
  const editImage = (index: any) => {
    // Set the index of the image being edited
    setEditedImageIndex(index);
  };
  const removeImage = (index: any) => {
    // Remove the image at the specified index
    const updatedImages = [...product.img];
    updatedImages.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      img: updatedImages,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && product) {
        await updateproduct(product, id)
        setTimeout(() => {
          navigate('/admin/productSize');
        }, 3000);
        toast.success('Sửa thành công !', { autoClose: 2000 })
      }

    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau')
    }
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">UPDATE Size</h1>
      <form className="w-1/3" onSubmit={handleSubmit} >
        <div className="mb-4 hidden">
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
            name='name'
            value={product.name}
            onChange={hanldeChage}

          />

        </div>
        <div className="mb-4 hidden">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Ảnh
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1.5 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

        </div>
        <div className="mb-4 hidden">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadedImages">

          </label>
          <div className="flex gap-5 ">
            {product.img && product.img.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Uploaded ${index + 1}`} className="rounded-md w-20  h-32" />
                <div className='flex justify-between'>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => editImage(index)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                  </svg>


                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => removeImage(index)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>


                </div>
              </div>


            ))}
          </div>
        </div>
        <div className="mb-4 hidden">
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
            name='price'
            value={product.price}
            onChange={hanldeChage}
          />

        </div>
        <div className="mb-4 ">
          <label
            htmlFor="size"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Size
          </label>
          {/* ------------- */}
          {product.sizeAndcolor && product.sizeAndcolor.map((item, index) => (
            <div key={index} className=" mt-3 mb-3 ">
              <div className="w-full flex gap-2 mb-3">
                <select
                value={item.sizeId}
                onChange={(e) => handleSizeAndColorChange(index, 'sizeId', e.target.value)}
                  className=" shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
                >
                  <option value="">Nhập Size</option>
                  {sizes.map((size) => (
                    <option key={size._id} value={size._id}>{size.name}</option>
                  ))}
                </select>
                <select
                  value={item.colorId}
                  onChange={(e) => handleSizeAndColorChange(index, 'colorId', e.target.value)}
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
                  value={item.quantity}
                  onChange={(e) => handleSizeAndColorChange(index, 'quantity', e.target.value)}
                  type="number"

                />
              </div>

            </div>
          ))}

          {/* ----------- */}
          <div className="w-full mt-3 mb-3">
            <div className="w-full" onClick={handleAddSize}  >
              <div
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                <span className="text-sm font-medium"> Thêm Size </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

              </div>
            </div>
          </div>


        </div>
        <div className="mb-4 hidden">
          <label
            htmlFor="HeadlineAct"
            className="block text-gray-700 text-sm font-bold mb-2"

          >
            Loại
          </label>

          <select
            id="HeadlineAct"
            onChange={handleCategoryChange}
            value={product.categoryId} // Đảm bảo giữ cho giá trị select được hiển thị đúng
            className="mt-1.5 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
          >
            <option value="">Nhập Loại</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-4 hidden">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Description
          </label>
          <textarea name='description' onChange={hanldeChage} value={product.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" >

          </textarea>

        </div>

        <div className="lg:flex lg:justify-between lg:items-center">
    <button className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Cập nhật Size
    </button>
    <a href="/admin/productSize">
        <button className="bg-blue-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Quay Lại
        </button>
    </a>
</div>
      </form>
    </div>
  )
}

export default UpdateSizeAndColor