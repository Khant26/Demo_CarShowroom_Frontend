import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import Footer from '../Components/Footer';

import { useLocation } from 'react-router-dom';

export default function Category() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  const location = useLocation();
  // Get brand from query string, e.g. /category?brand=BMW
  const params = new URLSearchParams(location.search);
  const brand = params.get('brand');

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-transparent border-b border-gray-300 h-[100px]">
        <Link to="/" className="flex items-center gap-2 mr-4 ml-4 group" aria-label="Back to Home">
          <span className="text-4xl md:text-4xl text-black group-hover:text-gray-600 transition">&#8592;</span>
          <span className="text-lg mt-3 md:text-xl font-semibold text-black group-hover:text-gray-600 transition">Back</span>
        </Link>
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
      <div>
  <h1 className="text-3xl font-bold text-left my-8 ml-9 pl-9">{brand}</h1>
  <div className="ml-12 flex flex-wrap justify-start gap-9 px-8 pb-40">
  {[...Array(8)].map((_, i) => <Card key={i} />)}
  </div>
      <Footer />
    </div>
    </>
  );
}
