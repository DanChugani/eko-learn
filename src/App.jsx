import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Subjects from './components/Subjects';
import Pricing from './components/Pricing';
import Booking from './components/Booking';
import PlatformTeaser from './components/PlatformTeaser';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Subjects />
        <Pricing />
        <Booking />
        <PlatformTeaser />
      </main>
      <Footer />
    </div>
  );
}

export default App;
