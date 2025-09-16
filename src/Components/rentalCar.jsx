import React from 'react';

export default function RentalCar({ image, name, description }) {
  return (
  <div className="max-w-[1300px] w-full mx-auto bg-white rounded-xl shadow-lg flex flex-row items-center p-4 sm:p-6 h-[400px]">
      <img
        src={image || "https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg"}
        alt={name || "Car"}
        className="w-1/3 h-full object-cover rounded-lg mr-6"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 tracking-wide mb-2">{name || "Car Name"}</h3>
          <p className="text-gray-600 mb-4">{description || "Description goes here."}</p>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-y-2 gap-x-6 text-lg text-gray-700">
            <div className="flex justify-between items-center"><span className="font-semibold">Price:</span> <span className="font-medium">{"$50/day"}</span></div>
            <div className="flex justify-between items-center"><span className="font-semibold">Seats:</span> <span className="font-medium">{"5"}</span></div>
            <div className="flex justify-between items-center"><span className="font-semibold">Fuel:</span> <span className="font-medium">{"Petrol"}</span></div>
            <div className="flex justify-between items-center"><span className="font-semibold">Trans:</span> <span className="font-medium">{"Automatic"}</span></div>
          </div>
        </div>

         <div className="flex gap-4 mt-4 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Message Us</button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Call Us</button>
          </div>
      </div>
    </div>
  );
}
