"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 bottom-0 mt-8">
      <div className="container mx-auto px-0">
        {/* Copyright */}
        <div className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
