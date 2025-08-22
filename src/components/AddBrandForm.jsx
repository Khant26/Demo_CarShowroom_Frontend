import React, { useState } from 'react';
import { itemsAPI } from './api.jsx';

function AddBrandForm({ onBrandAdded, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0 // Set default price for brands (could be 0 or any default value)
  });

  const [brandImage, setBrandImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setBrandImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(''); // Clear any previous error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.name || !formData.description) {
        throw new Error('Please fill in all required fields (Name and Description)');
      }

      if (!brandImage) {
        throw new Error('Please select a brand logo image');
      }

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add text fields
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price || 0); // Default price for brands

      // Add brand image
      submitData.append('itemImage', brandImage);

      // Submit to backend using the same endpoint as cars
      const response = await itemsAPI.createFull(submitData);
      setSuccess('Brand added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: 0
      });
      setBrandImage(null);
      setImagePreview(null);
      
      // Notify parent component
      if (onBrandAdded) {
        onBrandAdded(response);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setBrandImage(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Car Brand</h2>
      
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
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Brand Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Toyota, Honda, BMW"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the brand, its history, or key features..."
                required
              />
            </div>
          </div>
        </div>

        {/* Brand Logo */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Brand Logo</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Brand Logo Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF. Max size: 5MB
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preview:</label>
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Brand Logo Preview"
                    className="w-32 h-24 object-contain border border-gray-300 rounded-lg bg-white p-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Adding Brand...' : 'Add Brand'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBrandForm;
