import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-gray-600">
              MyShop - Nơi mua sắm tin cậy cho mọi nhu cầu của bạn.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-800">
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-800">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="/return" className="text-gray-600 hover:text-gray-800">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                Địa chỉ: 123 Đường ABC, Thành phố XYZ
              </li>
              <li className="text-gray-600">Điện thoại: (123) 456-7890</li>
              <li className="text-gray-600">Email: info@myshop.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; 2023 MyShop. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
