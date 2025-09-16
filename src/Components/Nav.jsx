import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Placeholder to prevent layout shift when nav becomes fixed */}
      {scrolled && <div className="h-[100px]" />}

      {/* full-width wrapper; inner container centers content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[100px] transition-all duration-300">
          {/* underline that spans full width */}
          <div className="absolute left-0 bottom-0 w-full h-px bg-gray-200 pointer-events-none" />
          <span className="text-black text-2xl font-bold">logo</span>
          <ul className="flex space-x-10">
            <li>
              <Link to="/" className="text-black text-lg md:text-xl hover:text-black/80 cursor-pointer">Home</Link>
            </li>
            <li>
              <Link to="/aboutus" className="text-black text-lg md:text-xl hover:text-black/80 cursor-pointer">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="text-black text-lg md:text-xl hover:text-black/80 cursor-pointer">Contact</Link>
            </li>
            <li>
              <Link to="/rental" className="text-black text-lg md:text-xl hover:text-black/80 cursor-pointer">Rental</Link>
            </li>
          </ul>
        </div>
    </>
  )
}
