import React from "react";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-800">
          MyShop
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">
                Trang chủ
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
