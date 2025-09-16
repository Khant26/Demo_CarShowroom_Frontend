import React from 'react'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Cars() {
  const [showFilter, setShowFilter] = React.useState(false);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-14 w-full">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search cars..."
              className="border border-gray-300 rounded-full px-4 py-2 pr-10 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black-400 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black-500 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <button
            className="bg-gradient-to-r from-black-500 to-black-700 text-black px-6 py-2 rounded-full shadow hover:from-black-600 hover:to-black-800 transition font-semibold"
            onClick={() => setShowFilter((v) => !v)}
          >
            Filter
          </button>
        </div>
        {showFilter && (
          <div className="mb-6 p-6 border border-black-100 rounded-2xl bg-white shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Price */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Price</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="border border-gray-300 rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-black-200" />
                <input type="number" placeholder="Max" className="border border-gray-300 rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-black-200" />
              </div>
            </div>
            {/* Color */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Color</label>
              <div className="flex flex-wrap gap-2">
                {["Black","White","Blue","Red","Silver","Gray","Green","Yellow","Brown","Orange","Gold","Purple","Beige","Maroon"].map(color => (
                  <label key={color} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full cursor-pointer hover:bg-black-100 transition">
                    <input type="checkbox" className="accent-black-600" />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Fuel Type */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Fuel Type</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-black-200">
                <option value="">Any</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>
            {/* Seats */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Seats</label>
              <input type="number" min="2" max="15" placeholder="e.g. 5" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-black-200" />
            </div>
            {/* Transmission */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Transmission</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-black-200">
                <option value="">Any</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            {/* Year */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Year</label>
              <input type="number" min="1990" max="2025" placeholder="e.g. 2022" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-black-200" />
            </div>
            {/* Wheel */}
            <div>
              <label className="block font-semibold mb-2 text-black-700">Wheel</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-black-200">
                <option value="">Any</option>
                <option>Alloy</option>
                <option>Steel</option>
                <option>Chrome</option>
              </select>
            </div>
            {/* Add more filter options here as needed */}
          </div>
        )}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}
