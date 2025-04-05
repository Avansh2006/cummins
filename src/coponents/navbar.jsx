import React from 'react';
import Auth from './auth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white text-gray-800 shadow-md ">
      <div className="text-2xl font-bold">Wanderlust Canvas</div>
      <ul className="flex space-x-6 ml-auto mr-4">
        <Link to={"/"} className="hover:underline cursor-pointer">Home</Link>
        <Link to="/explore " className="hover:underline cursor-pointer">Explore</Link>
        <Link to='/search' className="hover:underline cursor-pointer">Search</Link>
      </ul>
        <div className="flex items-center cursor-pointer font-semibold border-2 px-4 py-1 rounded-full border-gray-800 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
            <Auth />
        </div>
    </nav>
  );
};

export default Navbar;