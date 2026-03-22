import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios'; //تثبيت Axios لإرسال طلبات HTTP.
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Coffee from './pages/Coffee';
import Products from './pages/Products';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AnimatedPage from './components/AnimatedPage';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/coffee" element={<AnimatedPage><Coffee /></AnimatedPage>} />
        <Route path="/products" element={<AnimatedPage><Products /></AnimatedPage>} />
        <Route path="/product/:id" element={<AnimatedPage><Product /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><Search /></AnimatedPage>} />
        <Route path="/signin" element={<AnimatedPage><SignIn /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppContent />
      <Footer />
    </BrowserRouter>
  );
}

export default App;