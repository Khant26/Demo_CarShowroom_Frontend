
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faRoute, faGasPump } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Card() {
  return (
    <div className="bg-white rounded-xl shadow-lg w-80 flex flex-col items-center pb-8">
      <img src="https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg" alt="Car" className="w-full h-48 object-cover rounded-t-xl mb-4" />
      <div className='mx-6'>
      <h3 className="text-xl font-extrabold text-gray-900 tracking-wide">Mercedes-Benz C-Class</h3>
        <div className="text-xl font-bold text-green-600 mb-1">$30,000</div>
      </div>
      <div className="w-full flex flex-col gap-1 mb-5">
        <div className="flex justify-between w-full gap-2 mt-2">
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl mb-1"><FontAwesomeIcon icon={faCar} /></span>
            <span className="text-gray-700 text-sm font-semibold">Model</span>
            <span className="text-gray-600 text-xs">C-Class</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl mb-1"><FontAwesomeIcon icon={faRoute} /></span>
            <span className="text-gray-700 text-sm font-semibold">Mileage</span>
            <span className="text-gray-600 text-xs">20,000 km</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl mb-1"><FontAwesomeIcon icon={faGasPump} /></span>
            <span className="text-gray-700 text-sm font-semibold">Fuel</span>
            <span className="text-gray-600 text-xs">Petrol</span>
          </div>
        </div>
      </div>
        <Link to="/category/cardetail">
          <button className="px-6 py-2 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition">View Details</button>
        </Link>
    </div>
  );    
}