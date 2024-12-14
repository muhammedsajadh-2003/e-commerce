import React from "react";
import { Button } from "../components/ui/Button";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Welcome to MyStore
          </h1>
          <p className="text-lg md:text-xl font-light mb-6">
            Discover the best deals and products tailored just for you.
          </p>
          <Button variant="default" size="lg" className="mb-4 px-8 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300">
            Explore Now
          </Button>
        </div>
      </header>

      {/* Featured Products */}
      <main className="container mx-auto px-6 py-12 flex-grow">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Product Cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow ease-in-out duration-300"
              >
                <div className="h-60 bg-gray-300 rounded-md mb-4"></div>
                <div className="px-4 py-3">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    Product {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This is a brief description of the product.
                  </p>
                  <Button variant="outline" size="sm" className="w-full py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-white hover:text-gray-300 mx-2 transition duration-200">Privacy Policy</a>
            <a href="#" className="text-white hover:text-gray-300 mx-2 transition duration-200">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
