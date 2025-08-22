import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import glanza from '../assets/toyota_glanza.png'

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample car data - replace with API call or props later
  const carData = {
    name: 'Toyota Glanza',
    price: 95000,
    description: 'The Toyota Land Cruiser represents the pinnacle of off-road luxury and capability.',
    images: [
        glanza
    ],
    specifications: {
      engine: '3.5L Twin-Turbo V6',
      fuelType: 'Gasoline',
      transmission: '10-Speed Automatic',
      seating: '8 seats',
      fuelEconomy: '17 city / 22 highway',
      topSpeed: '112 mph',
      year: '2024',
      color: 'White'
    },
    keyFeatures: [
      'Full-Time 4WD',
      'Multi-Terrain Monitor',
      'Crawl Control',
      'Premium Leather',
      'Advanced Off-Road'
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === carData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link to="/" className="hover:text-gray-800">Home</Link>
              <Link to="/brands" className="hover:text-gray-800">Browse Cars</Link>
              <a href="#" className="hover:text-gray-800">Contact</a>
              <a href="#" className="hover:text-gray-800">Sign in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={carData.images[currentImageIndex]}
                alt={carData.name}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              >
                →
              </button>
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
                ♥
              </button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-2">
              {carData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${carData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Car Name and Price */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-500">🚗</span>
                <h1 className="text-3xl font-bold text-gray-800">{carData.name}</h1>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-4">
                ${carData.price.toLocaleString()}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {carData.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(carData.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h2>
              <div className="space-y-3">
                {carData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Contact Dealer
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails