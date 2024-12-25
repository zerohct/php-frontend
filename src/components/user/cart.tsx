import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { Product, products } from "../../types/product";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  //   useEffect(() => {
  //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     setCartItems(storedCart);
  //   }, []);

  //   const updateQuantity = (id, newQuantity) => {
  //     setCartItems((prevItems) =>
  //       prevItems.map((item) =>
  //         item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
  //       )
  //     );
  //   };

  //   const removeItem = (id) => {
  //     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  //   };

  //   const total = cartItems.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Giỏ hàng của bạn đang trống</p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Sản phẩm trong giỏ hàng
            </h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Sản phẩm</th>
                  <th className="px-4 py-2 border-b">Giá</th>
                  <th className="px-4 py-2 border-b">Số lượng</th>
                  <th className="px-4 py-2 border-b">Tổng</th>
                  <th className="px-4 py-2 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr>
                    {/* key={item.id} */}
                    <td className="px-4 py-2 border-b flex items-center space-x-3">
                      <img
                        // src={item.image}
                        // alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      {/* <span>{item.name}</span> */}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {/* {item.price.toLocaleString("vi-VN")} đ */}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="number"
                        // value={item.quantity}
                        // onChange={(e) =>
                        //   updateQuantity(item.id, parseInt(e.target.value, 10))
                        // }
                        className="w-16 border border-gray-300 rounded-md text-center"
                        min="1"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      {/* {(item.price * item.quantity).toLocaleString("vi-VN")} đ */}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        // onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        <Trash2 className="inline-block w-5 h-5" /> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Tổng giỏ hàng</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                {/* <span>{total.toLocaleString("vi-VN")} đ</span> */}
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng:</span>
                {/* <span>{total.toLocaleString("vi-VN")} đ</span> */}
              </div>
            </div>
            <a
              href="/checkout"
              className="block mt-4 bg-green-500 text-white text-center py-2 rounded-md"
            >
              Tiến hành thanh toán
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
