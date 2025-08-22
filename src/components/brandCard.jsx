import React from 'react'

function BrandCard({ image, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-w-16 aspect-h-12 bg-white p-4 flex items-center justify-center">
        <img 
          src={image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzk5OTk5OSIgZHk9Ii4zZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhciBCcmFuZDwvdGV4dD48L3N2Zz4='} 
          alt={title || 'Car Brand'} 
          className="w-full h-32 object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzk5OTk5OSIgZHk9Ii4zZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhciBCcmFuZDwvdGV4dD48L3N2Zz4=';
          }}
        />
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800 text-center">
          {title || 'Untitled Brand'}
        </h3>
      </div>
    </div>
  )
}

export default BrandCard