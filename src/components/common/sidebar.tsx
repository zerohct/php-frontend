import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      to: "/admin",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      to: "/admin/categories",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      ),
      label: "Danh mục sản phẩm",
    },
    {
      to: "/admin/products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      label: "Sản phẩm",
    },
    {
      to: "/admin/orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      label: "Đơn hàng",
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#2D323E] flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="text-center">
          <div className="text-white font-semibold">ADMIN STORE</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`
              flex items-center px-6 py-3 text-gray-300 relative
              transition-all duration-300 ease-in-out
              ${
                location.pathname === item.to
                  ? "text-white"
                  : "hover:text-white"
              }
              group
            `}
          >
            <div
              className={`
                absolute inset-0 bg-[#4CB8FF] opacity-0
                transition-all duration-300 ease-in-out
                ${
                  location.pathname === item.to
                    ? "opacity-10"
                    : "group-hover:opacity-5"
                }
              `}
            />

            <div
              className={`
                absolute left-0 top-0 bottom-0 w-1 bg-[#4CB8FF]
                transform origin-left transition-all duration-300 ease-in-out
                ${
                  location.pathname === item.to
                    ? "scale-y-100"
                    : "scale-y-0 group-hover:scale-y-100"
                }
              `}
            />

            <span className="w-8 h-8 flex items-center justify-center mr-3 relative z-10">
              {item.icon}
            </span>
            <span className="text-sm relative z-10">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="
            w-full flex items-center justify-center px-4 py-2
            text-sm text-gray-300 rounded-md
            border border-gray-600
            transition-all duration-300 ease-in-out
            hover:bg-gray-700 hover:text-white
            active:transform active:scale-95
          "
          onClick={() => {
            /* Add logout logic */
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
