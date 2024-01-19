// import React from "react";

const FilProduct = () => {
  return (
    <div className="grid grid-cols-1  justify-end">
      <div className="md:col-span-2 lg:col-span-3">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold ml-3 md:ml-5">
          Tất cả sản phẩm
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 justify-end">
        <div className="w-full md:w-auto lg:w-auto">
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1 w-full md:w-auto lg:w-auto rounded-lg border-gray-300 text-sm text-gray-700"
          >
            <option value="">Kích cỡ</option>
            <option value="">Size 1</option>
            <option value="">Size 2</option>
          </select>
        </div>
        <div className="w-full md:w-auto lg:w-auto">
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1 w-full md:w-auto lg:w-auto rounded-lg border-gray-300 text-sm text-gray-700"
          >
            <option value="">Màu sắc</option>
            <option value="">Color 1</option>
            <option value="">Color 2</option>
          </select>
        </div>
        <div className="w-full md:w-auto lg:w-auto">
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1 w-full md:w-auto lg:w-auto rounded-lg border-gray-300 text-sm text-gray-700"
          >
            <option value="">Giá</option>
            <option value="">Price 1</option>
            <option value="">Price 2</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilProduct;
