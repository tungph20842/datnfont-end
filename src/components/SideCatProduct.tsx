import React, { useEffect, useState } from 'react';
import { getCategory } from '../api/categories';
import { ICategories } from '../interfaces/categories';

const SideCatProduct = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategory();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <div className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <span className="grid h-10 place-content-center rounded-lg bg-gray-100 text-xl text-gray-600">
              Danh mục
            </span>
            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href=""
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Tất cả sản phẩm
                </a>
              </li>
              {categories.map((category) => (
                <li key={category._id} className="grid grid-cols-1">
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-gray-700"
                  >
                    {category.name}
                  </a>
                  {/* Add other category information as needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCatProduct;
