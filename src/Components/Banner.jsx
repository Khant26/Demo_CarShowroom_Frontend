import React, { useState } from 'react';

const images = [
  '/public/vite.svg',
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
  <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 h-[650px] overflow-hidden flex items-center justify-center bg-gray-100 rounded-2xl shadow-lg">
      {/* Slides */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        />
      ))}

      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow text-5xl z-20"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        &#129168;
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow text-5xl z-20"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        &#129170;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-white ${idx === current ? 'bg-black' : 'bg-white/70'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
