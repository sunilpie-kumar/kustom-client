import HeroSection from './HeroSections';
import Category from '../ui-sections/Category';
import HowItWorks from './HowItWorks';
import Testimonials from '../ui-sections/Testimonials';
import CTASection from './CTASection';
import Footer from './Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div id="categories-section">
        <Category />
      </div>
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;