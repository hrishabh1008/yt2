import React from 'react';
import { FaHome, FaFire, FaMusic, FaGamepad, FaNewspaper, FaBars, FaHistory, FaClock, FaThumbsUp } from 'react-icons/fa';
import { Link } from "react-router-dom";

const sidebarLinks = [
  { icon: <FaHome />, label: "Home", path: "/" },
  { icon: <FaFire />, label: "Trending", path: "/trending" },
  { icon: <FaMusic />, label: "Music", path: "/music" },
  { icon: <FaGamepad />, label: "Gaming", path: "/gaming" },
  { icon: <FaNewspaper />, label: "News", path: "/news" },
  { icon: <FaHistory />, label: "History", path: "/history" },
  { icon: <FaClock />, label: "Watch Later", path: "/watch-later" },
  { icon: <FaThumbsUp />, label: "Liked Videos", path: "/liked-videos" },
];

const Sidebar = ({ isSidebarOpen }) => {
  return (
    // display the sidebar only when isSidebarOpen is true
    <aside
      className={`bg-white border-r border-gray-200 h-full p-4 pt-6 transition-transform duration-200 z-20 shadow-lg ${
        isSidebarOpen ? "translate-x-0 w-64 " : "-translate-x-full w-0"
      } fixed md:static flex flex-col`}
      //show nav links only when isSidebarOpen is true
    >
      {isSidebarOpen && (
        <>
          <nav className="flex-1">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  to={link.path}
                  key={link.label}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-800 text-base font-medium transition">
                  <span className="text-xl w-8 flex justify-center">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </ul>
          </nav>
          <div className="mt-8 border-t pt-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} YouTube Clone</p>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;