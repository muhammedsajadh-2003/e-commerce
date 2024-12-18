import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Menu, MenuItem } from "./ui/Menu";
import { Link, useNavigate } from "react-router-dom";
import { CartDrawer } from "../pages/Cart";
import { Icon } from "@/@/components/ui/Icon";
import { FaHome, FaBox, FaUserAlt, FaSignInAlt } from "react-icons/fa"; // Import icons

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutMessage(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowLogoutMessage((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyStore
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
          >
            <FaBox /> <span>Products</span>
          </Link>
          <CartDrawer />
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
          >
            <FaUserAlt /> <span>Dashboard</span>
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
              >
                <Icon name="user" className="text-gray-800 text-xl" />
              </Button>

              {showLogoutMessage && (
                <div className="absolute right-0 mt-2 bg-white shadow-md p-2 rounded-md">
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="outline" size="sm">
              <Link to="/login" className="flex items-center space-x-2">
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
              />
            </svg>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-40">
          <Menu className="flex flex-col space-y-2 p-4">
            <MenuItem>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome /> <span>Home</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/products"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaBox /> <span>Products</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <div className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <CartDrawer />
              </div>
            </MenuItem>
            <MenuItem>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserAlt /> <span>Dashboard</span>
              </Link>
            </MenuItem>
            <MenuItem>
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <Icon name="user" className="text-gray-800 text-xl" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to="/login" className="flex items-center space-x-2">
                    <FaSignInAlt /> <span>Login</span>
                  </Link>
                </Button>
              )}
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
