import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BowlShowcase from "./components/BowlShowcase.jsx";
import MenuSection from "./components/MenuSection.jsx";
import OrderForm from "./components/OrderForm.jsx";
import Contact from "./components/Contact.jsx";
import PhotoStrip from "./components/PhotoStrip.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BowlShowcase />
        <MenuSection />
        <OrderForm />
        <Contact />
        <PhotoStrip />
      </main>
      <Footer />
    </>
  );
}
