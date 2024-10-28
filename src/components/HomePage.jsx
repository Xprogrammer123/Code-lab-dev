import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';

// Content array with image URLs
const content = [
  {
    id: 1,
    thumbnail: 'https://i.postimg.cc/Gm479c85/997eee1135dc1e4da63484779706daa0-removebg-preview.png',
    background: 'https://i.postimg.cc/7YpjyGbL/image1.png',
    title: "Banana Flavoured Ice-Cream",
    description: "Smooth Banana ice cream with a soft texture.",
    buttonText: "Order Banana",
  },
  
  {
    id: 2,
    thumbnail: 'https://i.postimg.cc/PqbgyXX5/f64c7d712a6feabd6f8d8685de6b93cc-removebg-preview.png',
    background: 'https://i.postimg.cc/vmyjcJrF/Screenshot-161.png',
    title: "Apple x Flavoured Ice-Cream",
    description: "Smooth Apple ice cream with a soft texture.",
    buttonText: "Order Apple",
  },
  {
    id: 3,
    thumbnail: 'https://i.postimg.cc/PxtBFgJz/9928098003887dd38268548427a0b23a-removebg-preview.png',
    background: 'https://i.postimg.cc/sxK6Gx4t/Screenshot-163.png',
    title: "Vanilla Flavoured Ice-Cream",
    description: "Classic vanilla ice cream with a smooth texture.",
    buttonText: "Order Vanilla",
  },
  {
    id: 4,
    thumbnail: 'https://i.postimg.cc/nzpJfsRm/ai-generated-8867608-640-removebg-preview-1.png',
    background: 'https://i.postimg.cc/0Q2BC7XV/Screenshot-162.png',
    title: "Strawberry Flavoured Ice-Cream",
    description: "Sweet strawberry ice cream made from fresh berries.",
    buttonText: "Order Strawberry",
  },
];

const IceCreamPage = () => {
  const [activeContent, setActiveContent] = useState(content[0]);
  const [isFadingOut, setIsFadingOut] = useState(false); // State to track fading

  const handleImageClick = (item) => {
    if (item.id !== activeContent.id) {
      setIsFadingOut(true); // Start fading out current content
      setTimeout(() => {
        setActiveContent(item); // Set new content after fade out
        setIsFadingOut(false); // Fade in new content
      }, 500); // Time matches the exit transition duration
    }
  };

  return (
    <div className="flex h-full bg-pink-50">
      {/* Main content section */}
      <div className="flex-1 flex justify-center items-center relative">
        <ErrorBoundary>
          <AnimatePresence>
            {/* Background image */}
            {!isFadingOut && (
              <motion.div
                key={activeContent.background}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${activeContent.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}

            {/* Ice cream image and text */}
            {!isFadingOut && (
              <>
                <motion.img
                  key={activeContent.thumbnail}
                  src={activeContent.thumbnail}
                  alt={activeContent.title}
                  className="relative z-10 h-[810px] w-[600px]"
                  initial={{ opacity: 0, scale: 0.8, x: -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 50 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                <div className="absolute z-10 text-black p-8 w-[600px] top-1/2 left-1/2 transform -translate-x-[790px] translate-y-[100px]">
                  <motion.h1
                    key={activeContent.title}
                    className="text-5xl font-extrabold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                  >
                    {activeContent.title}
                  </motion.h1>
                  <motion.p
                    key={activeContent.description}
                    className="mt-4 text-lg font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {activeContent.description}
                  </motion.p>
                  <motion.button
                    key={activeContent.buttonText}
                    className="mt-6 w-1/2 h-10 bg-yellow-500 rounded-3xl shadow-md hover:bg-yellow-600 text-white font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`${activeContent.buttonText} clicked!`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </div>

      {/* Small images on the right */}
      <div className="absolute right-0 w-1/6 p-4 flex flex-col space-y-4 z-10 h-96">
        {content.map((item) => (
          <motion.img
            key={item.id}
            src={item.thumbnail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleImageClick(item)}
            className="cursor-pointer w-full h-44 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default IceCreamPage;
