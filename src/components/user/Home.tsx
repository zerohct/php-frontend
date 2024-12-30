import React, { useState, useEffect } from "react";
import { productApi } from "../../api/ProductApi";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category_name: string;
}

interface ProductHomeProps {
  itemsPerPage?: number;
}

const ProductHome: React.FC<ProductHomeProps> = ({ itemsPerPage = 8 }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAllProducts();
      const productsData = Array.isArray(response) ? response : response.data;

      console.log("Fetched products data:", productsData); // Log dữ liệu trả về

      if (!productsData?.length) {
        setError("Không tìm thấy sản phẩm nào");
        return;
      }

      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      setAddingToCart(productId);
      await productApi.addToCart(productId.toString());
      alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setAddingToCart(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Sản phẩm của chúng tôi
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image || "/api/placeholder/400/400"}
                alt={product.name}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                // onError={(e) => {
                //   const target = e.target as HTMLImageElement;
                //   target.src = "/api/placeholder/400/400";
                // }}
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {product.category_name}
              </p>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {product.description}
              </p>

              <div className="mt-auto">
                <p className="text-xl font-semibold text-right mb-4">
                  {parseFloat(product.price).toLocaleString("vi-VN")} ₫
                </p>
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart === product.id}
                >
                  {addingToCart === product.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Thêm vào giỏ hàng
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded transition-colors duration-300 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductHome;
