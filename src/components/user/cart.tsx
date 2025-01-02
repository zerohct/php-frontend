import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { CartItem, productApi } from "../../api/ProductApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productApi.getCart();
      if (response?.data) {
        setCartItems(response.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setError("Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    try {
      setError(null);
      const response = await productApi.removeFromCart(String(productId));
      if (response?.status === "success") {
        await fetchCartItems();
      } else {
        setError("Failed to remove item");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("Failed to remove item");
    }
  };

  const handleIncreaseQuantity = async (productId: number) => {
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    try {
      setError(null);
      const response = await productApi.addToCart(String(productId));
      if (response?.status === "success") {
        await fetchCartItems();
      } else {
        setError("Failed to update quantity");
      }
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      setError("Failed to update quantity");
    }
  };

  const handleDecreaseQuantity = async (productId: number) => {
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    try {
      setError(null);
      const response = await productApi.decreaseCartItem(String(productId));
      if (response?.status === "success") {
        await fetchCartItems();
      } else {
        setError("Failed to update quantity");
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      setError("Failed to update quantity");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-pulse">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center p-10">
            <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              Giỏ hàng của bạn đang trống
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Sản phẩm trong giỏ hàng</h2>
              <p className="text-gray-600 mt-1">
                Bạn có {cartItems.length} sản phẩm trong giỏ hàng
              </p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 whitespace-nowrap">
                        Sản phẩm
                      </th>
                      <th className="text-left p-4 whitespace-nowrap">Giá</th>
                      <th className="text-center p-4 whitespace-nowrap">
                        Số lượng
                      </th>
                      <th className="text-right p-4 whitespace-nowrap">Tổng</th>
                      <th className="text-center p-4 whitespace-nowrap">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900">
                          {Number(item.price).toLocaleString("vi-VN")} đ
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              disabled={isLoading}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              disabled={isLoading}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium text-gray-900">
                          {(Number(item.price) * item.quantity).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          đ
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                              disabled={isLoading}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md h-fit">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Tổng giỏ hàng</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{total.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Tổng cộng</span>
                  <span className="text-xl font-bold text-gray-900">
                    {total.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
                disabled={isLoading || cartItems.length === 0}
              >
                Tiến hành thanh toán
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-4 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
