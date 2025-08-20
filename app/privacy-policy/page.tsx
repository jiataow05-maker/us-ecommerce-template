import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Your Store',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 mb-6">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <div className="space-y-4">
                            <p>We collect information you provide directly to us, such as when you:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Create an account or make a purchase</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Contact us for customer support</li>
                                <li>Participate in surveys or promotions</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <div className="space-y-4">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Send you order confirmations and shipping updates</li>
                                <li>Provide customer support</li>
                                <li>Improve our products and services</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer your personal information to third parties
                            without your consent, except as described in this policy. We may share your information with:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-4">
                            <li>Service providers who assist us in operating our website</li>
                            <li>Payment processors to handle transactions</li>
                            <li>Shipping partners to deliver your orders</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information against
                            unauthorized access, alteration, disclosure, or destruction. This includes:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-4">
                            <li>SSL encryption for data transmission</li>
                            <li>Secure payment processing through Stripe</li>
                            <li>Regular security audits and updates</li>
                            <li>Limited access to personal information</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                        <p>Under applicable privacy laws, you have the right to:</p>
                        <ul className="list-disc ml-6 space-y-2 mt-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Data portability (where applicable)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar technologies to improve your browsing experience,
                            analyze website traffic, and personalize content. You can control cookie
                            settings through your browser preferences.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or our privacy practices,
                            please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p><strong>Email:</strong> privacy@yourstore.com</p>
                            <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
                            <p><strong>Address:</strong> 123 Main St, Anytown, USA 12345</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

