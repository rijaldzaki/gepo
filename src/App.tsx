import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Project from './pages/Project';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"        element={<Home />}    />
              <Route path="/about"   element={<About />}   />
              <Route path="/product" element={<Product />} />
              <Route path="/project" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;