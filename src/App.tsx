import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FoodSpots from './pages/FoodSpots';
import PlaceDetail from './pages/PlaceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Vlog from './pages/Vlog';
import MediaKit from './pages/MediaKit';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/vlog" element={<Vlog />} />
          <Route path="/media-kit" element={<MediaKit />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<Layout hideFooter />}>
          <Route path="/food-spots" element={<FoodSpots />} />
          {/* Legacy route redirect */}
          <Route path="/map" element={<FoodSpots />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
