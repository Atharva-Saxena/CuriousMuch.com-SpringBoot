import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useApi";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-red-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-700">
            CuriousMuch.com
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/questions" className="text-gray-700 hover:text-red-600 font-medium">
              Questions
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/ask" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                  Ask Question
                </Link>
                <span className="text-gray-700">Hi, {user?.username}</span>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-red-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}