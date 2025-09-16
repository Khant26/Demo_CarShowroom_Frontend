import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaViber, FaTiktok, FaLine } from 'react-icons/fa';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
  <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <section className="bg-white rounded-lg shadow p-8 flex flex-col justify-center">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" placeholder="First Name" className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                <input type="text" placeholder="Last Name" className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <input type="email" placeholder="Email Address" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <input type="text" placeholder="Subject Line" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <textarea placeholder="Drop Your Message..." rows={5} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none" />
              <button type="submit" className="mt-2 w-fit px-6 py-2 bg-black text-white rounded transition hover:bg-gray-800 self-start">Send Message</button>
            </form>
          </section>
          {/* Info & Social */}
          <section className="bg-white rounded-lg shadow p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Line</span>
              <span>Scan</span>
            </div>
            <img src="https://qr-official.line.me/gs/M_1234567.png?oat_content=qr" alt="Line QR" className="w-28 h-28 object-cover rounded mb-2" />
            <div className="mb-2">
              <span className="font-semibold">Social Medias</span>
              <div className="flex gap-4 mt-2">
                <a href="#" aria-label="Facebook" className="text-2xl text-blue-600 hover:text-blue-800"><FaFacebookF /></a>
                <a href="#" aria-label="Telegram" className="text-2xl text-blue-400 hover:text-blue-600"><FaTelegramPlane /></a>
                <a href="#" aria-label="Viber" className="text-2xl text-purple-500 hover:text-purple-700"><FaViber /></a>
                <a href="#" aria-label="TikTok" className="text-2xl text-black hover:text-gray-700"><FaTiktok /></a>
                <a href="#" aria-label="Line" className="text-2xl text-green-500 hover:text-green-700"><FaLine /></a>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">123/45 Soi Sukhumvit 101, Sukhumvit Road,<br />Bangna Nua, Bangna, Bangkok 10260, Thailand</p>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="material-icons">phone</span>
              <span className="text-gray-600">0912345678</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="material-icons">email</span>
              <span className="text-gray-600">carshowroom@gmail.com</span>
            </div>
          </section>
        </div>
        {/* Map Placeholder */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Location</h2>
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
            {/* Replace with Google Maps iframe if needed */}
            <iframe
              title="Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8577268616307!2d-86.8039116846767!3d33.5206609807517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88891b8e8e8e8e8e%3A0x8e8e8e8e8e8e8e8e!2sBirmingham!5e0!3m2!1sen!2sus!4v1630000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
