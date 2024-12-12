"use client"
import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { FaBars, FaTimes } from 'react-icons/fa';

export const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-3  border shadow-md rounded backdrop-blur-sm bg-white/70 flex justify-between items-center gap-7">
      
      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          src="/images/logo/WhatsApp Image 2024-11-02 at 3.53.42 PM.jpeg"
          alt="Logo"
          className="w-12 h-12 rounded-xl ml-3 transition-transform transform hover:scale-110 shadow-md shadow-purple-600"
        />
        <h1>
          <a href="/" className="text-2xl font-extrabold ml-2 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 text-transparent bg-clip-text animate-pulse">
            NEAR
          </a>
        </h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul className={`flex-col md:flex-row md:flex items-center ${isMenuOpen ? 'flex' : 'hidden'} md:gap-8`}>
        <li className="my-2 md:my-0">
          <a href="/" className="font-semibold text-gray-700 hover:text-purple-600 transition-colors m-5">Home</a>
        </li>
        <li className="my-2 md:my-0">
          <a href="/products" className="font-semibold text-gray-700 hover:text-purple-600 transition-colors">Products</a>
        </li>
        <li className="my-2 md:my-0 relative">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white  rounded shadow-md p-2">
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-purple-50 rounded">
                    <a href="/clothing" className="text-sm font-medium text-gray-600 hover:text-purple-600">Clothing</a>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-purple-50 rounded">
                    <a href="/electronics" className="text-sm font-medium text-gray-600 hover:text-purple-600">Electronics</a>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block px-3 py-2 hover:bg-purple-50 rounded">
                    <a href="/hotel" className="text-sm font-medium text-gray-600 hover:text-purple-600">Hotel&Dealers</a>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
      </ul>
    </nav>
  );
};
