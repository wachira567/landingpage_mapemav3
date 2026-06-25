import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import StatsBar from './sections/StatsBar';
import B2BEnterprise from './sections/B2BEnterprise';
import DualStream from './sections/DualStream';
import Testimonials from './sections/Testimonials';
import ServiceCarousel from './sections/ServiceCarousel';
import ConversionFooter from './sections/ConversionFooter';

export default function App() {
  useLenis();

  return (
    <div>
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <B2BEnterprise />
        <DualStream />
        <Testimonials />
        <ServiceCarousel />
        <ConversionFooter />
      </main>
    </div>
  );
}
