import React, { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";

interface UserData {
  username: string;
  roles?: string[];
}

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Thêm hàm kiểm tra và cập nhật user data
  const checkAndUpdateUserData = () => {
    if (AuthApi.isAuthenticated()) {
      const username = AuthApi.getUsername();
      if (username) {
        setUserData({
          username: username,
          roles: [], // Có thể thêm roles nếu cần
        });
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    // Kiểm tra ngay khi component mount
    checkAndUpdateUserData();

    // Thêm event listener để lắng nghe thay đổi trong sessionStorage
    const handleStorageChange = () => {
      checkAndUpdateUserData();
    };

    window.addEventListener("storage", handleStorageChange);

    // Kiểm tra mỗi khi focus vào window
    window.addEventListener("focus", checkAndUpdateUserData);

    // Click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", checkAndUpdateUserData);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array but with better event handling

  const handleLogout = () => {
    AuthApi.logout();
    setUserData(null);
    setIsOpen(false);
    navigate("/login");
  };

  // Thêm một useEffect để kiểm tra token interval
  useEffect(() => {
    const intervalId = setInterval(checkAndUpdateUserData, 1000); // Kiểm tra mỗi giây
    return () => clearInterval(intervalId);
  }, []);

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
              {userData.roles?.includes("Admin")
                ? "Quản trị viên"
                : "Thành viên"}
            </p>
          </div>

          {userData.roles?.includes("Admin") && (
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
