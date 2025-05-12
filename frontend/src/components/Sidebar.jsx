import React from 'react';
import { FaHome, FaFire, FaMusic, FaGamepad, FaNewspaper, FaBars, FaHistory, FaClock, FaThumbsUp } from 'react-icons/fa';

const sidebarLinks = [
  { icon: <FaHome />, label: 'Home' },
  { icon: <FaFire />, label: 'Trending' },
  { icon: <FaMusic />, label: 'Music' },
  { icon: <FaGamepad />, label: 'Gaming' },
  { icon: <FaNewspaper />, label: 'News' },
  { icon: <FaHistory />, label: 'History' },
  { icon: <FaClock />, label: 'Watch Later' },
  { icon: <FaThumbsUp />, label: 'Liked Videos' },
];

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 h-full w-64 p-4 pt-6 transition-transform duration-200 z-20 shadow-lg ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      } fixed md:static flex flex-col`}
    >
      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => (
            <li
              key={link.label}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-800 text-base font-medium transition"
            >
              <span className="text-xl w-8 flex justify-center">{link.icon}</span>
              <span>{link.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 border-t pt-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} YouTube Clone</p>
      </div>
    </aside>
  );
};

export default Sidebar;