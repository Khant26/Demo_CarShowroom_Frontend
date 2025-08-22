import React, { useState } from 'react';
import { itemsAPI } from './api.jsx';

function AddCarForm({ onCarAdded, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    license: '',
    enginePower: '',
    fuelType: '',
    transmission: '',
    seat: '',
    fuelEconomy: '',
    engineType: '',
    year: '',
    color: '',
    specialMark: ''
  });

  const [itemImage, setItemImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [detailPreviews, setDetailPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 19) {
      setError('Maximum 19 detail images allowed');
      return;
    }
    
    setDetailImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setDetailPreviews(previews);
  };

  const removeDetailImage = (index) => {
    const newImages = detailImages.filter((_, i) => i !== index);
    const newPreviews = detailPreviews.filter((_, i) => i !== index);
    
    setDetailImages(newImages);
    setDetailPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.description) {
        throw new Error('Please fill in all required fields (Name, Price, Description)');
      }

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Add main image
      if (itemImage) {
        submitData.append('itemImage', itemImage);
      }

      // Add detail images
      detailImages.forEach(file => {
        submitData.append('detailImages', file);
      });

      // Submit to backend
      const response = await itemsAPI.createFull(submitData);
      setSuccess('Car added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        license: '',
        enginePower: '',
        fuelType: '',
        transmission: '',
        seat: '',
        fuelEconomy: '',
        engineType: '',
        year: '',
        color: '',
        specialMark: ''
      });
      setItemImage(null);
      setDetailImages([]);
      setImagePreview(null);
      setDetailPreviews([]);
      
      // Notify parent component
      if (onCarAdded) {
        onCarAdded(response);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Car</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Toyota Rav4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 25000"
                min="0"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the car..."
                required
              />
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Vehicle Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                name="license"
                value={formData.license}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ABC123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engine Power (HP)
              </label>
              <input
                type="number"
                name="enginePower"
                value={formData.enginePower}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 150"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
                <option value="plug-in hybrid">Plug-in Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
                <option value="eCVT">eCVT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seats
              </label>
              <select
                name="seat"
                value={formData.seat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
                <option value="8">8 Seats</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Economy
              </label>
              <input
                type="text"
                name="fuelEconomy"
                value={formData.fuelEconomy}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 25 MPG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engine Type
              </label>
              <input
                type="text"
                name="engineType"
                value={formData.engineType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., V6, I4, V8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., White"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Mark
              </label>
              <input
                type="text"
                name="specialMark"
                value={formData.specialMark}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special markings or features"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Images</h3>
          
          {/* Main Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleItemImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Detail Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detail Images (Max 19)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleDetailImagesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {detailPreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {detailPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Detail ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeDetailImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCarForm;
