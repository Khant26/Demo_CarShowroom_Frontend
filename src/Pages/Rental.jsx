import React from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import RentalCar from '../Components/rentalCar';

export default function Rental() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex flex-col items-center gap-8 py-8">
        <RentalCar
          image="https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg"
          name="Toyota Camry"
          description="Comfortable sedan, perfect for city and long trips."
        />
        <RentalCar
          image="https://cdn.pixabay.com/photo/2017/01/06/19/15/auto-1954636_1280.jpg"
          name="Honda Civic"
          description="Reliable and fuel-efficient, great for daily use."
        />
        {/* Add more <RentalCar /> as needed */}
      </main>
      <Footer />
    </div>
  );
}
