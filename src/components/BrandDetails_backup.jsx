import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import glanza from '../assets/toyota_glanza.png'
import { itemsAPI } from './api.jsx'
import AddCarForm from './AddCarForm.jsx'

function BrandDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    color: '',
    fuelType: '',
    seats: '',
    transmission: '',
    year: ''
  });

  // Car data state - will be loaded via useEffect
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Load car data on component mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        // Try to fetch from backend API first
        const backendData = await itemsAPI.getAll();
        if (backendData && backendData.length > 0) {
          // Transform backend data to match frontend structure
          const transformedData = backendData.map(item => ({
            id: item._id,
            name: item.name,
            year: new Date().getFullYear(), // Default year since backend doesn't have it in Item model
            price: item.price,
            image: item.image ? `http://localhost:3000/${item.image}` : glanza,
            mileage: '0 Miles', // Default mileage
            fuelType: 'Petrol', // Default fuel type
            transmission: 'Automatic', // Default transmission
            color: 'White', // Default color
            seats: '5 seats' // Default seats
          }));
          setCars(transformedData);
          setFilteredCars(transformedData);
          return;
        }
      } catch (error) {
        console.log('Backend not available, using fallback data:', error.message);
      } finally {
        setLoading(false);
      }

      // Fallback to static data if backend is not available
      const carData = [
        {
          id: 1,
          name: 'Glanza',
          year: 2023,
          price: 15000,
          image: glanza,
          mileage: '6 Miles',
          fuelType: 'Gasoline',
          transmission: 'CVT',
          color: 'Red',
          seats: '5 seats'
        },
        {
          id: 2,
          name: 'Rav4',
          year: 2025,
          price: 150000,
          image: glanza,
          mileage: '50 Miles',
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          color: 'White',
          seats: '7 seats'
        },
        {
          id: 3,
          name: 'Corolla Apex',
          year: 2021,
          price: 22000,
          image: glanza,
          mileage: '2500 Miles',
          fuelType: 'Diesel',
          transmission: 'Manual',
          color: 'Black',
          seats: '4 seats'
        },
        {
          id: 4,
          name: 'Vios',
          year: 2023,
          price: 95000,
          image: glanza,
          mileage: '50 Miles',
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          color: 'Orange',
          seats: '5 seats'
        }
      ];
      
      setCars(carData);
      setFilteredCars(carData);
    };

    loadCars();
  }, []);

  // Filter cars based on search and filters
  useEffect(() => {
    const performFiltering = async () => {
      try {
        // Build filter params for backend API
        const filterParams = {};
        
        // Map frontend filters to backend field names
        if (filters.fuelType) filterParams.fuelType = filters.fuelType.toLowerCase();
        if (filters.transmission) filterParams.transmission = filters.transmission;
        if (filters.color) filterParams.color = filters.color;
        if (filters.year) filterParams.year = filters.year;
        if (filters.seats) {
          // Extract number from "X seats" format
          const seatNumber = filters.seats.replace(' seats', '');
          filterParams.seat = parseInt(seatNumber);
        }

        // If we have backend filters, try to use the backend API
        if (Object.keys(filterParams).length > 0) {
          try {
            const filteredData = await itemsAPI.filter(filterParams);
            if (filteredData && filteredData.length >= 0) {
              // Transform backend data to match frontend structure
              let transformedData = filteredData.map(detail => ({
                id: detail.itemId._id,
                name: detail.itemId.name,
                year: parseInt(detail.year),
                price: detail.itemId.price,
                image: detail.itemId.image ? `http://localhost:3000/${detail.itemId.image}` : glanza,
                mileage: detail.fuelEconomy || '0 Miles',
                fuelType: detail.fuelType,
                transmission: detail.transmission,
                color: detail.color,
                seats: `${detail.seat} seats`
              }));

              // Apply frontend-only filters (search term, price range)
              if (searchTerm) {
                transformedData = transformedData.filter(car => 
                  car.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
              }
              if (filters.priceMin) {
                transformedData = transformedData.filter(car => car.price >= parseInt(filters.priceMin));
              }
              if (filters.priceMax) {
                transformedData = transformedData.filter(car => car.price <= parseInt(filters.priceMax));
              }

              setFilteredCars(transformedData);
              return;
            }
          } catch (error) {
            console.log('Backend filtering not available:', error.message);
          }
        }
      } catch (error) {
        console.log('Error in filtering:', error.message);
      }

      // Fallback to local filtering
      let filtered = cars.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Apply filters locally
      if (filters.priceMin) {
        filtered = filtered.filter(car => car.price >= parseInt(filters.priceMin));
      }
      if (filters.priceMax) {
        filtered = filtered.filter(car => car.price <= parseInt(filters.priceMax));
      }
      if (filters.color) {
        filtered = filtered.filter(car => car.color.toLowerCase() === filters.color.toLowerCase());
      }
      if (filters.fuelType) {
        filtered = filtered.filter(car => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
      }
      if (filters.transmission) {
        filtered = filtered.filter(car => car.transmission.toLowerCase() === filters.transmission.toLowerCase());
      }
      if (filters.seats) {
        filtered = filtered.filter(car => car.seats === filters.seats);
      }
      if (filters.year) {
        filtered = filtered.filter(car => car.year.toString() === filters.year);
      }

      setFilteredCars(filtered);
    };

    performFiltering();
  }, [searchTerm, filters, cars]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      color: '',
      fuelType: '',
      seats: '',
      transmission: '',
      year: ''
    });
    setSearchTerm('');
  };

  const handleCarAdded = (newCarData) => {
    // Refresh the car list after adding a new car
    const loadCars = async () => {
      try {
        setLoading(true);
        const backendData = await itemsAPI.getAll();
        if (backendData && backendData.length > 0) {
          const transformedData = backendData.map(item => ({
            id: item._id,
            name: item.name,
            year: new Date().getFullYear(),
            price: item.price,
            image: item.image ? `http://localhost:3000/${item.image}` : glanza,
            mileage: '0 Miles',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            color: 'White',
            seats: '5 seats'
          }));
          setCars(transformedData);
          setFilteredCars(transformedData);
        }
      } catch (error) {
        console.log('Error refreshing cars:', error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadCars();
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Toyota</h1>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-800">Home</a>
              <a href="#" className="hover:text-gray-800">About</a>
              <a href="#" className="hover:text-gray-800">Contact</a>
              <a href="#" className="hover:text-gray-800">Sign in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Add Car Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add New Car'}
          </button>
        </div>

        {/* Add Car Form */}
        {showAddForm && (
          <div className="mb-6">
            <AddCarForm
              onCarAdded={handleCarAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="flex gap-6">
          {/* Search and Filter Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </button>
              </div>
            </div>

            {/* Filter Button */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span>🔽 Filter</span>
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Reset
                </button>
                <button className="bg-black text-white px-4 py-1 rounded text-sm">
                  Done
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilter && (
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Price</h3>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Color Family */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Color Family</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Pearl White', 'Green'].map(color => (
                      <button
                        key={color}
                        onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
                        className={`px-3 py-2 rounded border text-center ${
                          filters.color === color 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Fuel Type</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {['petrol', 'diesel', 'hybrid', 'electric', 'plug-in hybrid'].map(fuel => (
                      <button
                        key={fuel}
                        onClick={() => handleFilterChange('fuelType', filters.fuelType === fuel ? '' : fuel)}
                        className={`px-3 py-2 rounded border text-center capitalize ${
                          filters.fuelType === fuel 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Seats</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {['4 seats', '5 seats', '7 seats', '8 seats'].map(seat => (
                      <button
                        key={seat}
                        onClick={() => handleFilterChange('seats', filters.seats === seat ? '' : seat)}
                        className={`px-2 py-2 rounded border text-center ${
                          filters.seats === seat 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Transmission</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {['CVT', 'Automatic', 'Manual', 'eCVT'].map(trans => (
                      <button
                        key={trans}
                        onClick={() => handleFilterChange('transmission', filters.transmission === trans ? '' : trans)}
                        className={`px-3 py-2 rounded border text-center ${
                          filters.transmission === trans 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {trans}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Year</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {['2022', '2023', '2024', '2025'].map(year => (
                      <button
                        key={year}
                        onClick={() => handleFilterChange('year', filters.year === year ? '' : year)}
                        className={`px-3 py-2 rounded border text-center ${
                          filters.year === year 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Car Listings */}
          <div className="flex-1">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading cars...</p>
              </div>
            )}
            
            {!loading && (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Available Cars ({filteredCars.length} found)
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCars.map(car => (
                    <Link key={car.id} to={`/cars/${car.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-48 object-cover"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
                          ♥
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                          <span className="text-sm text-gray-500">- {car.year}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {car.mileage} • PowerShift Momentum Set AWD
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <span>⚙️</span>
                            <span>{car.transmission}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>⛽</span>
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>🔧</span>
                            <span>Auto</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-800">
                            ${car.price.toLocaleString()}
                          </span>
                          <span className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center mt-8 space-x-2">
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    ←
                  </button>
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandDetails
