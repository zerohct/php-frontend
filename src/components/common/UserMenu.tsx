import React, { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";

interface UserData {
  username: string;
  roles: string[];
}

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const checkAndUpdateUserData = () => {
    if (AuthApi.isAuthenticated()) {
      const username = AuthApi.getUsername();
      const roles = AuthApi.getRoles(); // Assuming you'll add this method to AuthApi
      if (username) {
        setUserData({
          username: username,
          roles: roles || [], // Use roles from AuthApi
        });
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAndUpdateUserData();

    const handleStorageChange = () => {
      checkAndUpdateUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", checkAndUpdateUserData);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", checkAndUpdateUserData);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(checkAndUpdateUserData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    AuthApi.logout();
    setUserData(null);
    setIsOpen(false);
    navigate("/login");
  };

  const isAdmin = userData?.roles?.includes("Admin");

  if (!AuthApi.isAuthenticated() || !userData) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
      >
        <User className="w-6 h-6" />
        <span className="font-medium">{userData.username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-medium text-gray-800">{userData.username}</p>
            <p className="text-sm text-gray-500">
              {isAdmin ? "Quản trị viên" : "Thành viên"}
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Quản lý hệ thống
            </Link>
          )}

          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Thông tin tài khoản
          </Link>

          <Link
            to="/orders"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Đơn hàng của tôi
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
