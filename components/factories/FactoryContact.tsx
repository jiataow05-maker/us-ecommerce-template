'use client'

import { PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Factory } from '@/lib/templates'

interface FactoryContactProps {
    factory: Factory
    variant?: string
    colorScheme?: {
        primary: string
        secondary: string
        accent: string
    }
}

export function FactoryContact({ factory, variant = 'contact1', colorScheme }: FactoryContactProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Ready to start your manufacturing project? Contact our experienced team for
                            detailed discussions about your requirements and custom solutions.
                        </p>

                        {/* Contact Methods */}
                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <PhoneIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Phone</div>
                                    <a href={`tel:${factory.contact.phone}`} className="text-blue-600 hover:text-blue-700">
                                        {factory.contact.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <EnvelopeIcon className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Email</div>
                                    <a href={`mailto:${factory.contact.email}`} className="text-green-600 hover:text-green-700">
                                        {factory.contact.email}
                                    </a>
                                </div>
                            </div>

                            {/* Website */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <GlobeAltIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Website</div>
                                    <a
                                        href={`https://${factory.contact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 hover:text-purple-700"
                                    >
                                        {factory.contact.website}
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <MapPinIcon className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Address</div>
                                    <p className="text-orange-600">{factory.contact.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href={`mailto:${factory.contact.email}?subject=Manufacturing Inquiry - ${factory.englishName}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors duration-200"
                            >
                                Send Email Inquiry
                            </a>
                            <a
                                href={`tel:${factory.contact.phone}`}
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-center transition-all duration-200"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>

                    {/* Quick Inquiry Form */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Inquiry</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tell us about your manufacturing requirements..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors duration-200"
                            >
                                Send Inquiry
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                We typically respond within 24 hours
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">Ready to Start Manufacturing?</h3>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join hundreds of satisfied clients who trust {factory.englishName} for their manufacturing needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`mailto:${factory.contact.email}?subject=Partnership Inquiry - ${factory.englishName}`}
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            Start Partnership
                        </a>
                        <a
                            href={`https://${factory.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                        >
                            Visit Our Website
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
