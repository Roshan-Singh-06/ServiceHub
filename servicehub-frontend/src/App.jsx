import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Services from './components/services';
import HowItWorks from './components/HowItWorks';
import FeaturedProfessionals from './FeaturedProfessionals';
import StatsBanner from './StatsBanner';
import TestimonialsSection from './TestimonialsSection';
import ReadyToBook from './components/ReadyToBook';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ServiceHubHome from './components/ServiceHubHome';
import About from './components/About';
import PlumberSection from './components/PlumberSection';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
