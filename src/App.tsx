
import './App.css'
import FutureBanner from './components/sections/Home/FutureBanner.tsx'
import Hero from './components/sections/Home/Hero.tsx'
import Industries from './components/sections/Home/Industries.tsx'
import ServicesSlider from './components/sections/Home/Services.tsx'
import TrustedStrip from './components/sections/Home/TrustedStrip.tsx'
import WhyUs from './components/sections/Home/WhyUS.tsx'
import Footer from './components/ui/Footer.tsx'
import Navbar from './components/ui/Navbar.tsx'

function App() {

  return (
    <>
  <Navbar />
  <Hero />
  <TrustedStrip />
  <FutureBanner />
  <ServicesSlider />
  <Industries/>
  <WhyUs />
  {/* <div className="min-h-screen"></div> */}
  <Footer />
    </>
  )
}

export default App
