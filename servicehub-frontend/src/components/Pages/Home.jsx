import HeroSection from '../HomeComponents/HeroSection';
import StatsBanner from '../HomeComponents/StatsBanner';
import Services from '../HomeComponents/Services';
import FeaturedProfessionals from '../HomeComponents/FeaturedProfessionals';
import HowItWorks from '../HomeComponents/HowItWorks';
import ReadyToBook from '../HomeComponents/ReadyToBook';
import TestimonialsSection from '../HomeComponents/TestimonialsSection';
import ServiceHubHome from '../HomeComponents/ServiceHubHome';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBanner />
      <ServiceHubHome />
      <Services />
      <FeaturedProfessionals />
      <HowItWorks />
      <ReadyToBook />
      <TestimonialsSection />
    </div>
  );
}
