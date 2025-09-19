import Hero from "./Hero";
import Navigation from "./Navigation";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import FoodReviews from "./FoodReviews";
import Lifestyle from "./Lifestyle";
import Events from "./Events";
import Portfolio from "./Portfolio";
import MediaKit from "./MediaKit";
import Press from "./Press";
import Contact from "./Contact";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black">
      <Navigation />
      <Hero />
      <Portfolio />
      <FoodReviews />
      <Lifestyle />
      <Events />
      <MediaKit />
      <Press />
      <Contact />
      <Footer />
    </main>
  );
}
