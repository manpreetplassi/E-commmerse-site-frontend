import React from 'react'
import Navbar from '../features/navbar/Navbar'

const AboutUsPage = () => {
  return (
    <Navbar>
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Welcome to Our Marketplace</h1>
        <p className="mt-2">Empowering Sellers, Connecting Buyers</p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
        <p className="text-gray-700">
          We are a passionate team dedicated to providing a platform for sellers to showcase their products and manage their rates and profits with ease. Our goal is to connect buyers with a diverse range of high-quality products while empowering sellers to grow their businesses.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At [Your Company Name], our mission is to create a seamless and transparent marketplace where sellers have full control over their products and buyers can discover unique and exceptional items. We strive to foster a community that values innovation, collaboration, and success for all.
          </p>
        </div>

        {/* Add more sections as needed */}

        {/* Catchy Lines */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Join Us Today!</h2>
          <p className="text-gray-700">
            Whether you're a seller looking to expand your reach or a buyer seeking quality products, [Your Company Name] is the perfect place for you. Join our community today and experience the future of online commerce.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2023 [Your Company Name]. All rights reserved.</p>
      </footer>
    </div>
    </Navbar>
  );
};

export default AboutUsPage;
