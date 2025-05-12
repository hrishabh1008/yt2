import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      navigate('/');
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-50 ml-0 md:ml-64 p-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;