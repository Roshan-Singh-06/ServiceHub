import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HeroSection from './components/HomePage/HeroSection.jsx';
import Services from './components/HomePage/Services.jsx';
import HowItWorks from './components/HomePage/HowItWorks.jsx';
import FeaturedProfessionals from './components/HomePage/FeaturedProfessionals.jsx';
import StatsBanner from './components/HomePage/StatsBanner.jsx';
import TestimonialsSection from './components/HomePage/TestimonialsSection.jsx';
import ReadyToBook from './components/HomePage/ReadyToBook.jsx';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ServiceHubHome from './components/HomePage/ServiceHubHome.jsx';
import About from './components/About';
import PlumberSection from './components/PlumberSection';
import WomenSalon from './components/WomenSalon.jsx';
import CheckoutPage from './components/CheckoutPage.jsx'
import LocationPage from './components/LocationPage.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <div className="pt-20"> {/* Add top padding to prevent content from hiding behind fixed navbar */}
                <HeroSection />
                <ServiceHubHome/>
                <Services />
                <HowItWorks />
                <FeaturedProfessionals/>
                <StatsBanner/>
                <TestimonialsSection/>
                <ReadyToBook/>
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
          <Route path="/location" element={<LocationPage />} />
         
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
