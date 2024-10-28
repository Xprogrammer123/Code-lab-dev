import React from 'react';
import { motion } from 'framer-motion';
import { IceCream, Heart, Leaf, Star } from 'lucide-react';

const values = [
  {
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    title: 'Made with Love',
    description: 'Every scoop is crafted with passion and care, ensuring the perfect taste every time.'
  },
  {
    icon: <Leaf className="w-8 h-8 text-pink-500" />,
    title: 'Natural Ingredients',
    description: 'We use only the finest, natural ingredients sourced from local farmers.'
  },
  {
    icon: <Star className="w-8 h-8 text-pink-500" />,
    title: 'Quality First',
    description: 'Our commitment to excellence means never compromising on quality.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Master Ice Cream Maker',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Creative Flavor Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
  {
    name: 'Emma Davis',
    role: 'Quality Assurance',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://watermark.lovepik.com/photo/40052/1077.jpg_wh1200.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <IceCream size={64} className="text-pink-400" />
          </motion.div>
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our Sweet Story
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto px-4"
          >
            Crafting moments of joy through artisanal ice cream since 1970
          </motion.p>
        </div>
      </motion.header>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-pink-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Beginning</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Started in a small kitchen with big dreams, Sweet Scoops has grown from a family recipe 
                to become the community's favorite ice cream destination.
              </p>
              <p className="text-gray-600 text-lg">
                Every scoop we serve carries the same passion and dedication that went into our very 
                first batch, made with love and the finest ingredients.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80"
                alt="Vintage ice cream parlor"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block mb-4"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-pink-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;