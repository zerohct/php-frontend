import React, { useState } from "react";

const products = [
  // Replace this with actual product data
  { id: 1, name: "Product 1", price: 100000, image: "/path/to/image1.jpg" },
  { id: 2, name: "Product 2", price: 200000, image: "/path/to/image2.jpg" },
  // Add more product objects here
];

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm của chúng tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={`product-${product.id}`}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">
                {product.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
            <div className="p-4">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          className={`py-2 px-4 rounded ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`py-2 px-4 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default Home;
