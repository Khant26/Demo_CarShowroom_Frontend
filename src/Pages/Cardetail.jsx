import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

export default function Cardetail() {
  // Array of 21 images (main + 20 others)
  const images = [
    "https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg",
    ...Array.from({ length: 20 }, (_, i) => `https://picsum.photos/id/${i + 10}/800/500`)
  ];
  // Slider state for thumbnails
  const THUMBNAILS_VISIBLE = 8;
  const [thumbStart, setThumbStart] = useState(0);
  const thumbnails = images.slice(1); // exclude main image

  const canSlideLeft = thumbStart > 0;
  const canSlideRight = thumbStart + THUMBNAILS_VISIBLE < thumbnails.length;
  const slideLeft = () => setThumbStart((s) => Math.max(0, s - 1));
  const slideRight = () => setThumbStart((s) => Math.min(thumbnails.length - THUMBNAILS_VISIBLE, s + 1));
  const [mainImage, setMainImage] = useState(images[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div >
      <Nav />
  <div className="w-full px-4 sm:px-6 lg:px-8 p-8 mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {/* Main Image and Thumbnails: only if images exist */}
          {images.length > 0 && (
            <>
              <img
                src={mainImage}
                alt="Car"
                className="w-full h-96 object-cover rounded-lg cursor-pointer mb-4"
                onClick={() => openModal(mainImage)}
              />
              {/* Thumbnails as slider with overlay arrows */}
              <div className="relative mb-6">
                {/* Left Arrow */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 pb-2 text-2xl bg-gray-700 bg-opacity-60 text-white rounded-full disabled:opacity-40"
                  onClick={slideLeft}
                  disabled={!canSlideLeft}
                  aria-label="Scroll thumbnails left"
                  style={{opacity: 0.6}}
                >
                  &#8592;
                </button>
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-hidden justify-center">
                  {thumbnails.slice(thumbStart, thumbStart + THUMBNAILS_VISIBLE).map((img, idx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`Car ${thumbStart + idx + 2}`}
                      className={`h-20 w-32 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-blue-500' : 'border-gray-200'}`}
                      onClick={() => setMainImage(img)}
                      onDoubleClick={() => openModal(img)}
                    />
                  ))}
                </div>
                {/* Right Arrow */}
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 pb-2 text-2xl bg-gray-700 bg-opacity-60 text-white rounded-full disabled:opacity-40"
                  onClick={slideRight}
                  disabled={!canSlideRight}
                  aria-label="Scroll thumbnails right"
                  style={{opacity: 0.6}}
                >
                  &#8594;
                </button>
              </div>
            </>
          )}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mercedes-Benz C-Class</h1>
          <div className="text-2xl font-bold text-green-600 mb-2">$30,000</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Specifications</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-base mb-4">
            <li><span className="font-semibold">License:</span> 1234-XYZ</li>
            <li><span className="font-semibold">Engine:</span> 2.0L Turbo</li>
            <li><span className="font-semibold">Fuel type:</span> Petrol</li>
            <li><span className="font-semibold">Seating:</span> 5</li>
            <li><span className="font-semibold">Fuel Economy:</span> 30 MPG</li>
            <li><span className="font-semibold">Wheel:</span> Alloy</li>
            <li><span className="font-semibold">Year:</span> 2022</li>
            <li><span className="font-semibold">Color:</span> Black</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 mb-4">A luxury sedan with excellent performance, comfort, and advanced features. Perfect for city and highway driving.</p>
          <h4 className="text-lg font-semibold text-gray-800">Highlights</h4>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Sunroof</li>
            <li>Leather seats</li>
            <li>Navigation system</li>
            <li>Backup camera</li>
          </ul>
          <div className="flex gap-4 mt-4 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Message Us</button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Call Us</button>
          </div>
        </div>
      </div>
      {/* Modal for image popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={closeModal}>
          <img src={modalImage} alt="Popup" className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white" />
        </div>
      )}
      <Footer />
    </div>
  );
}
