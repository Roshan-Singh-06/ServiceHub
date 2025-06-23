import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Footer from './components/Footer';
import LoginPage from './components/Pages/LoginPage.jsx';
import About from './components/Pages/About.jsx';
import CheckoutPage from './components/Pages/CheckoutPage.jsx'

import PlumberSection from './components/Pages/SubService.jsx';
import WomenSalon from './components/Pages/WomenSalon.jsx';
import SubServiceList from './components/Pages/SubService.jsx';

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
          <Route path="/plumber" element={<PlumberSection />} />
          <Route path="/WomenSalon" element={<WomenSalon />} />
          <Route path="/women-salon" element={<WomenSalon />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/subservices/:serviceName" element={<SubServiceList />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
