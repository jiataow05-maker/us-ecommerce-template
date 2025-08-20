'use client'

import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
    
    // 3秒后重置状态
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="bg-primary-600 section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay updated with our latest offers
          </h2>
          <p className="mt-4 text-lg leading-8 text-primary-200">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special promotions.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-md">
          {isSubmitted ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Successfully subscribed!
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Thank you for joining our newsletter. You'll receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
        
        {/* Newsletter benefits */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-center text-primary-200">
              <div className="text-lg font-semibold text-white">🎁 Exclusive Deals</div>
              <div className="text-sm">Special offers just for subscribers</div>
            </div>
            <div className="text-center text-primary-200">
              <div className="text-lg font-semibold text-white">📦 Early Access</div>
              <div className="text-sm">First to know about new products</div>
            </div>
            <div className="text-center text-primary-200">
              <div className="text-lg font-semibold text-white">💌 Weekly Updates</div>
              <div className="text-sm">Curated content delivered weekly</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-primary-200">
          <p>
            We respect your privacy. Unsubscribe at any time.{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
