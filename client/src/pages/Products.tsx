'use client'

import { useEffect, useState } from 'react'
import { Star, ChevronDown, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popularity')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/user/all-products') // Replace with your API endpoint
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products')
        }

        setProducts(data.products)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch('/api/user/add-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a JWT token
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart')
      }

      alert('Product added to cart successfully!')
    } catch (err) {
      console.error('Error adding to cart:', err)
      alert(err.message || 'Something went wrong')
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return parseFloat(b.rating || 0) - parseFloat(a.rating || 0)
      default:
        return 0
    }
  })

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading products...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    )
  }

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
              <a href="/" className="text-gray-600 hover:text-blue-500">Home</a>
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
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <Link to={`/aproduct/${product._id}`}>
                      <img
                        src={product.images[0]} // Assuming the first image is used
                        alt={product.title}
                        className="object-cover w-full h-48"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                    <div className="flex items-center mb-2">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                      onClick={() => addToCart(product._id, 1)} // Quantity set to 1 for simplicity
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
