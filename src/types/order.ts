export interface Order {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  product_id: number;
  quantity: number;
  price: number;
  product_name: string;
  product_image?: string;
}

export interface OrdersResponse {
  status: string;
  data: Order[];
}

export interface AllOrdersStats {
  status: string;
  data: {
    total_orders: number;
  };
}
