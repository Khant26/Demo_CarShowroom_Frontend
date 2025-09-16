
import React from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

export default function About() {
  return (
    <>
      <Nav />
  <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-5xl font-bold mb-8 text-center">About Car Showroom</h1>
        <section className="flex flex-col items-center mb-16">
          <div className="max-w-[1000px] w-full mx-auto mb-8">
            <img 
              src="https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg" 
              alt="Showroom" 
              className="w-full h-64 sm:h-96 object-cover rounded-lg shadow mb-4" 
            />
          </div>
          <div className="max-w-[800px] w-full mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-2">Our Story</h2>
            <p className="mb-4 text-gray-700 text-lg">We are passionate about connecting people with their dream cars. Our showroom offers a curated selection of premium vehicles, exceptional service, and a seamless buying experience.</p>
            <h3 className="text-2xl font-semibold mb-1">Vision & Mission</h3>
            <ul className="list-disc list-inside text-gray-600 mx-auto inline-block text-left text-lg">
              <li>Deliver the best car buying experience</li>
              <li>Offer a wide range of quality vehicles</li>
              <li>Build lasting relationships with our customers</li>
            </ul>
          </div>
        </section>
        {/* Contact Us Form */}
 
      </main>
      <Footer />
    </>
  );
}
