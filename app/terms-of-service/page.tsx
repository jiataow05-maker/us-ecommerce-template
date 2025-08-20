import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | Your Store',
    description: 'Terms and conditions for using our e-commerce platform.',
}

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 mb-6">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the
                            terms and provision of this agreement. If you do not agree to abide by the
                            above, please do not use this service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
                        <div className="space-y-4">
                            <p>All products and services are subject to availability. We reserve the right to:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Discontinue products at any time</li>
                                <li>Limit quantities purchased</li>
                                <li>Refuse orders that appear fraudulent</li>
                                <li>Update product information and pricing</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Pricing and Payment</h2>
                        <div className="space-y-4">
                            <p>
                                All prices are listed in USD and include applicable taxes where required by law.
                                Payment is processed securely through Stripe.
                            </p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Prices are subject to change without notice</li>
                                <li>Payment is due at time of purchase</li>
                                <li>We accept major credit cards and digital payments</li>
                                <li>Failed payments may result in order cancellation</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
                        <div className="space-y-4">
                            <p>Shipping policies for orders within the United States:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Free shipping on orders over $50</li>
                                <li>Standard delivery: 3-5 business days</li>
                                <li>Express delivery: 1-2 business days (additional charges apply)</li>
                                <li>We are not responsible for shipping delays beyond our control</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Returns and Refunds</h2>
                        <div className="space-y-4">
                            <p>Our return policy:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>30-day return window from delivery date</li>
                                <li>Items must be in original condition</li>
                                <li>Return shipping costs may apply</li>
                                <li>Refunds processed within 5-10 business days</li>
                                <li>Digital products are non-refundable</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software,
                            is the property of our company and protected by U.S. and international copyright laws.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, we shall not be liable for any indirect,
                            incidental, special, or consequential damages resulting from the use of our
                            products or services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of
                            the State of [Your State], United States, without regard to conflict of law principles.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p><strong>Email:</strong> legal@yourstore.com</p>
                            <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
                            <p><strong>Address:</strong> 123 Main St, Anytown, USA 12345</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

