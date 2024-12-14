'use client'

import { useState } from 'react'
import { Star, ChevronDown, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data for products
const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 20,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500),
  image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`,
  isNew: Math.random() > 0.8,
  onSale: Math.random() > 0.7,
}))

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popularity')

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Our Products</h1>
          <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-8 pr-4 py-2 w-full md:w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <ShoppingCart className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="text-sm mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
              <ChevronDown className="h-4 w-4 mx-2 transform rotate-270 text-gray-400" />
            </li>
            <li className="flex items-center">
              <span className="text-gray-800">Products</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row">
          {/* Filter Sidebar */}
          <aside className={`w-full md:w-64 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                {/* Add category checkboxes */}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                {/* Add price range slider */}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">{products.length} products</p>
              <select
                className="border rounded-md px-2 py-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <Link to='/aproduct'>
                      <img
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-48"
                      />
                    </Link>
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">New</span>
                    )}
                    {product.onSale && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Sale</span>
                    )}
                    <button className="absolute bottom-2 right-2 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow hover:bg-gray-100">
                      <Link to='/aproduct'>Quick View</Link>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < Math.floor(parseFloat(product.rating))
                                ? 'fill-current'
                                : 'stroke-current'
                            }`}
                          />
                        ))}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l hover:bg-gray-300">
                Previous
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">1</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300">2</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300">3</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-300">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
