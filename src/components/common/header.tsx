// components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-blue-600">
            Shop
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Trang chủ
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
