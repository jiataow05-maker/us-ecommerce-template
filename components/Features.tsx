import {
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Free Fast Shipping',
    description: 'Free shipping on all orders over $50. Most orders delivered within 1-2 business days across the US.',
    icon: TruckIcon,
  },
  {
    name: 'Secure Payments',
    description: 'Your payment information is always secure with our SSL encryption and trusted payment partners.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Multiple Payment Options',
    description: 'Pay with credit cards, PayPal, Apple Pay, Google Pay, and more convenient payment methods.',
    icon: CreditCardIcon,
  },
  {
    name: '24/7 Customer Support',
    description: 'Our friendly customer service team is available around the clock to help with any questions.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Gift Cards Available',
    description: 'Perfect for any occasion. Purchase digital gift cards that can be used immediately.',
    icon: GiftIcon,
  },
  {
    name: 'Easy Returns',
    description: '30-day hassle-free returns. If you\'re not satisfied, we\'ll make it right.',
    icon: ArrowPathIcon,
  },
]

export function Features() {
  return (
    <div className="bg-white section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for a great shopping experience
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're committed to providing exceptional service, quality products, and a seamless shopping experience 
            that exceeds your expectations.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
