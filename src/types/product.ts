export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
export const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  price: Math.floor(Math.random() * 1000000) + 100000,
  image: `/placeholder.svg?height=200&width=200&text=Sản phẩm ${i + 1}`,
}));
