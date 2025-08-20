'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Premium Products,{' '}
              <span className="text-gradient">Fast Delivery</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Discover our curated collection of premium products with guaranteed quality 
              and lightning-fast shipping across the United States.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center justify-center"
              >
                Shop Now
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full">
        <Image
          className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Premium products showcase"
          width={2340}
          height={1560}
          priority
        />
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1-2 Days</div>
              <div className="text-sm text-gray-600">Fast Shipping</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
