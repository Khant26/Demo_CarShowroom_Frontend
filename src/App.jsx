
import './App.css';
import Nav from './Components/Nav';
import Banner from './Components/Banner';
import CategoryType from './Components/CategoryType';
import Category from './Pages/Category';
import Cardetail from './Pages/Cardetail';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Rental from './Pages/Rental';
import { Routes, Route } from 'react-router-dom';
import Cars from './Components/Cars';
import Footer from './Components/Footer';


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Nav />
          <Banner />
          <CategoryType />
          <Cars></Cars>
          <Footer></Footer>
        </>
      } />
  <Route path="/category" element={<Category />} />
  <Route path="/category/cardetail" element={<Cardetail />} />
  <Route path="/aboutus" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/rental" element={<Rental />} />
    </Routes>
  );
}

export default App
