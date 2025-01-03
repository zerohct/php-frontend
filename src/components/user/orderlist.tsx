import React, { useEffect, useState } from "react";
import { Order, productApi } from "../../api/ProductApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await productApi.getUserOrders();
        if (response?.status === "success") {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border bg-white shadow">
            <p className="text-lg text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="overflow-hidden rounded-lg border bg-white shadow"
              >
                <div className="border-b bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Order #{order.order_id}
                    </h2>
                    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">
                          Shipping Details
                        </h3>
                        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                          <p className="text-gray-700">{order.order_name}</p>
                          <p className="text-gray-700">{order.phone}</p>
                          <p className="text-gray-700">{order.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">
                          Order Details
                        </h3>
                        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Product:</span>
                            <span className="font-medium text-gray-900">
                              {order.product_name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-medium text-gray-900">
                              {order.quantity}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Total Price:</span>
                            <span className="text-lg font-semibold text-blue-600">
                              ${order.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
