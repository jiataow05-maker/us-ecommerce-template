import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const testimonials = [
  {
    body: 'The quality of products here is outstanding! My order arrived faster than expected and everything was perfectly packaged. Will definitely shop here again.',
    author: {
      name: 'Sarah Johnson',
      handle: '@sarah_j',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    rating: 5,
  },
  {
    body: 'Exceptional customer service and premium products. The wireless headphones I bought exceeded my expectations in both quality and performance.',
    author: {
      name: 'Michael Chen',
      handle: '@mike_c',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    rating: 5,
  },
  {
    body: 'Fast shipping, great prices, and excellent product quality. This has become my go-to store for all my tech needs. Highly recommended!',
    author: {
      name: 'Emily Davis',
      handle: '@emily_d',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="bg-white section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Customer Reviews</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our customers say
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-1 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <div key={testimonialIdx} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6 card-shadow">
                  <blockquote className="text-gray-900">
                    <p>"{testimonial.body}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.author.imageUrl}
                      alt={testimonial.author.name}
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{testimonial.author.handle}</div>
                    </div>
                    <div className="ml-auto flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={`${
                            testimonial.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                          } h-4 w-4 flex-shrink-0`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Trusted by thousands of customers</h3>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="col-span-1 flex justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">50K+</div>
                  <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">4.9/5</div>
                  <div className="text-sm text-gray-600 mt-1">Average Rating</div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">99%</div>
                  <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
