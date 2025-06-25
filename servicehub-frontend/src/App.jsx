import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Footer from './components/Footer';
import LoginPage from './components/Pages/LoginPage.jsx';
import About from './components/Pages/About.jsx';
import CheckoutPage from './components/Pages/CheckoutPage.jsx'



import SubServiceList from './components/Pages/SubService.jsx';
import Cart from './components/Pages/Cart.jsx';
import InnerService from './components/Pages/InnerService.jsx';
import Booking from './components/Pages/Booking.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <div className="pt-20">
                <Home />
                <Footer/>
              </div>
            </>
          } />
  
        
           <Route path="/booking" element={<Booking/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/subservices/:serviceName" element={<SubServiceList />} />
          <Route path="/innerservice" element={<InnerService />} />
          <Route path="/innerservice/:serviceName" element={<InnerService/>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
