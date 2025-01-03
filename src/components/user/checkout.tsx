import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../../api/ProductApi";

interface FormData {
  name: string;
  phone: string;
  address: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCartTotal();
  }, []);

  const fetchCartTotal = async () => {
    try {
      const response = await productApi.getCart();
      if (response?.data) {
        const cartTotal = response.data.reduce(
          (sum: number, item: any) => sum + Number(item.price) * item.quantity,
          0
        );
        setTotal(cartTotal);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await productApi.checkout(formData);
  //     if (response?.status === "success") {
  //       navigate("/order-success");
  //     }
  //   } catch (error) {
  //     console.error("Checkout failed:", error);
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await productApi.checkout(formData);
      if (response?.status === "pending" && response.payment_url) {
        // Chuyển hướng đến URL thanh toán
        window.location.href = response.payment_url;
      } else {
        console.error("Failed to initiate payment:", response?.message);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Thanh toán khi nhận hàng</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Thông tin giao hàng</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="px-6 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Đặt hàng
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md h-fit">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Tổng đơn hàng</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
