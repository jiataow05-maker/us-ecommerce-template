'use client'

import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    href: '/products/wireless-headphones',
    price: '$199.99',
    originalPrice: '$249.99',
    imageSrc: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Premium wireless headphones',
    rating: 4.8,
    reviewCount: 128,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    href: '/products/smart-watch',
    price: '$299.99',
    originalPrice: '$399.99',
    imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Smart fitness watch',
    rating: 4.9,
    reviewCount: 89,
    badge: 'New Arrival',
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    href: '/products/bluetooth-speaker',
    price: '$79.99',
    originalPrice: '$99.99',
    imageSrc: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Portable bluetooth speaker',
    rating: 4.7,
    reviewCount: 156,
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    href: '/products/wireless-charger',
    price: '$49.99',
    originalPrice: null,
    imageSrc: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Wireless charging pad',
    rating: 4.6,
    reviewCount: 73,
    badge: null,
  },
]

export function FeaturedProducts() {
  return (
    <div className="bg-gray-50 section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Featured Products</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Handpicked favorites
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover our most popular products, carefully selected for their quality, innovation, and customer satisfaction.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    product.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-800' :
                    product.badge === 'New Arrival' ? 'bg-green-100 text-green-800' :
                    product.badge === 'Sale' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors duration-200">
                <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>

              {/* Product Image */}
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-700">
                    <Link href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>

                {/* Rating */}
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                        } h-4 w-4 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-lg font-medium text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full btn-primary text-sm py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
