import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import Contact from './Contact';


const PageWrapper = ({ children }) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutUs/></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact/></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 w-2/6 z-20 mt-1 ml-1">
        <Header />
      </div>
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
      
      </div>
    </Router>
  );
}

export default App;
