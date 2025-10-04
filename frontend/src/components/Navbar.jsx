import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout: logoutContext } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await api.get("/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        logoutContext();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="font-bold text-xl text-blue-600">ExpenseTracker</span>
            <div>Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-blue-600">
              ExpenseTracker
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/expenses" className="text-gray-700 hover:text-blue-600">
                  All Expenses
                </Link>
                <Link to="/expenses/add" className="text-gray-700 hover:text-blue-600">
                  Add Expense
                </Link>
                <span className="text-gray-600">Hi, {user.fullname}</span>
                <button
                  onClick={logoutHandler}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/expenses"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                All Expenses
              </Link>
              <Link
                to="/expenses/add"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Add Expense
              </Link>
              <span className="block text-gray-600 py-2">Hi, {user.fullname}</span>
              <button
                onClick={() => {
                  logoutHandler();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;