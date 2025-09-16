
import { Link } from 'react-router-dom';

const categories = [
  {
    brand: 'Mercedes',
    model: 'C-Class',
    img: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg',
  },
  {
    brand: 'BMW',
    model: '3 Series',
    img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/bmw-1957037_1280.jpg',
  },
  {
    brand: 'Audi',
    model: 'A4',
    img: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/audi-49278_1280.jpg',
  },
    {
    brand: 'Audi',
    model: 'A4',
    img: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/audi-49278_1280.jpg',
  },  {
    brand: 'Audi',
    model: 'A4',
    img: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/audi-49278_1280.jpg',
  },
    {
    brand: 'Audi',
    model: 'A4',
    img: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/audi-49278_1280.jpg',
  },
];

export default function CategoryType() {
  return (
  <div className="my-10">
  <h1 className="text-5xl font-extrabold mt-16 mb-16 text-center">Car Brand Categories</h1>
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-[40px] mt- justify-items-center">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-2xl w-80 p-5 flex flex-col items-center hover:scale-105 transition-transform">
            <img src={cat.img} alt={cat.brand} className="w-full h-56 object-cover rounded-xl mb-6" />
            <h2 className="text-2xl font-bold mb-1">{cat.brand}</h2>
            <p className="text-lg text-gray-600 mb-4">Model: {cat.model}</p>
            <Link to={`/category?brand=${encodeURIComponent(cat.brand)}`}>
              <button className="mt-auto px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition w-full">Show All</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
} 
