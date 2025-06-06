import React, { useState } from 'react';
import { useContext } from "react";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { GrChannel } from "react-icons/gr";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { userContext } from "../utils/context/usersContext";
import multiavatar from "@multiavatar/multiavatar/esm";

const Header = ({ onSearch, toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // console.log(search);

  const svgCode = (str) => {
    if (str) {
      return multiavatar(str);
    } else {
      return multiavatar("ravi");
    }
  };

  const { isSignedIn, signOut } = useContext(userContext);

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleChannelBtn = () => {
    navigate("/channel");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-white border-b border-gray-200 flex items-center h-16 px-4 md:px-8 shadow-sm">
      <button
        className="mr-4 text-2xl focus:outline-none bg-white border border-white p-2 rounded-full text-gray-600 hover:bg-gray-100"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar">
        <FaBars />
      </button>

      <a href="/">
        <img
          src="/Youtube.png"
          alt="YouTube Logo"
          width={20}
          height={20}
          className="h-8 w-auto cursor-pointer mr-6 select-none"
          onClick={() => navigate("/")}
          draggable="false"
        />
      </a>

      {/* Search Input Bar with search button */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-1 max-w-xl mx-auto items-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInputChange}
          className="w-full m-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-gray-100 m-1 border border-l-0 border-gray-300 rounded-full px-4 py-2 text-xl text-gray-600 hover:bg-gray-200"
          aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {isSignedIn ? (
        <>
          <button
            className="ml-6 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition whitespace-nowrap"
            onClick={handleChannelBtn}>
            <GrChannel className="mr-2 text-xl" />
            Channel
          </button>
          <div
            className="w-10 h-10 rounded-full ml-2"
            dangerouslySetInnerHTML={{
              __html: svgCode(`${Math.random}`),
            }}></div>
          <button
            className="ml-2 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition whitespace-nowrap"
            onClick={signOut}>
            <RiLogoutCircleRLine className="mr-2 text-xl" />
          </button>
        </>
      ) : (
        <button
          className="ml-6 flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition whitespace-nowrap"
          onClick={handleSignIn}>
          <FaUserCircle className="mr-2 text-xl" /> Sign In
        </button>
      )}

      {/* SignIn Button  */}
    </div>
  );
};

export default Header;