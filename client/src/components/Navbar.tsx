import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Menu, MenuItem } from "./ui/Menu";
import { Link, useNavigate } from "react-router-dom";
import { CartDrawer } from "../pages/Cart";
import { Icon } from "@/@/components/ui/Icon";

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false); // New state for logout message visibility
  const navigate = useNavigate();

  // Check if the user is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set the login state based on the presence of a token
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutMessage(false); // Hide the logout message after logout
    navigate("/login");
  };

  // Handle clicking the user icon
  const handleProfileClick = () => {
    setShowLogoutMessage((prev) => !prev); // Toggle visibility of logout message
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyStore
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Products
          </Link>
          <Link to='/wishlist' >
          Wishlist
          </Link>
          <CartDrawer />
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Dashboard
          </Link>

          {/* Conditional Rendering of Login or Profile Icon */}
          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileClick} // Toggle the message on click
              >
                <Icon name="user" className="text-gray-800 text-xl" />
              </Button>

              {/* Show logout message when clicked */}
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
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-40">
          <Menu className="flex flex-col space-y-2 p-4">
            <MenuItem>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/products"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Products
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
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
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
                  <Link to="/login">Login</Link>
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
