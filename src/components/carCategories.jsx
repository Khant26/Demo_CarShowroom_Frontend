import React, { useState, useEffect } from 'react'
import BrandCard from './brandCard.jsx'
import AddBrandForm from './AddBrandForm.jsx'
import { itemsAPI } from './api.jsx'

function CarCategories() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  // Load brands on component mount
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const backendData = await itemsAPI.getAll();
      if (backendData && backendData.length > 0) {
        // Filter for brand items (items that are primarily brands, not detailed cars)
        const brandItems = backendData.filter(item => item.name && item.image);
        setBrands(brandItems);
      }
    } catch (error) {
      console.log('Error loading brands:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandAdded = (newBrandData) => {
    // Refresh the brand list after adding a new brand
    loadBrands();
    setShowForm(false);
  };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         setLoading(true);
//         await carCategoriesAPI.delete(id);
//         await fetchCategories(); // Refresh the list
//         alert('Category deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting category:', error);
//         alert('Error deleting category');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Car Brands</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {showForm ? 'Cancel' : 'Add Brand'}
        </button>
      </div>

      {/* Add Brand Form */}
      {showForm && (
        <div className="mb-8">
          <AddBrandForm
            onBrandAdded={handleBrandAdded}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Display Car Brands */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Static Toyota */}
        <BrandCard 
          image="https://logos-world.net/wp-content/uploads/2020/04/Toyota-Logo.png"
          title="Toyota"
        />
        {/* Static Honda */}
        <BrandCard 
          image="https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo.png"
          title="Honda"
        />
        {/* Static BMW */}
        <BrandCard 
          image="https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png"
          title="BMW"
        />
        
        {/* Dynamic brands from backend */}
        {brands.map((brand) => (
          <BrandCard
            key={brand._id}
            image={brand.image ? `http://localhost:3000/${brand.image}` : undefined}
            title={brand.name}
          />
        ))}
        
        {/* Placeholder for encouraging more additions */}
        <BrandCard 
          image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzk5OTk5OSIgZHk9Ii4zZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFkZCBNb3JlPC90ZXh0Pjwvc3ZnPg=="
          title="Add More Brands"
        />
      </div>
    </div>
  )
}

export default CarCategories