"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white shadow-md mb-5">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <p className="hover:text-gray-400">MyBlog</p>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <p className="hover:text-gray-400">Home</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-400">Contact</p>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={` bg-gray-700 text-white absolute inset-x-0 top-16 transition-transform transform md:hidden h-full ${
          isMenuOpen
            ? "translate-y-0 flex md:flex-col"
            : "-translate-y-full hidden"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          <Link href="/">
            <p className="hover:text-gray-300" onClick={toggleMenu}>
              Home
            </p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-300" onClick={toggleMenu}>
              Contact
            </p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
