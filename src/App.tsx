import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Map from './pages/Map';
import PlaceDetail from './pages/PlaceDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<Layout hideFooter />}>
          <Route path="/map" element={<Map />} />
        </Route>
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
