import React from 'react'

export default function WhyChoose() {
    return (
        <>
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Why Choose TripNest?</h2>
                    <p className="text-gray-600 mb-12">
                        Experience the future of travel booking with our innovative platform designed
                        to make your journey planning effortless and enjoyable.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="text-blue-600 text-4xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
                            <p className="text-gray-600">
                                Advanced search algorithms help you find the best routes, prices, and schedules
                                across multiple transportation options in seconds.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="text-blue-600 text-4xl mb-4">🔒</div>
                            <h3 className="text-lg font-semibold mb-2">Secure Booking</h3>
                            <p className="text-gray-600">
                                Your personal information and payment details are protected with
                                bank-level security and encrypted transactions.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="text-blue-600 text-4xl mb-4">🎧</div>
                            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                            <p className="text-gray-600">
                                Our dedicated customer support team is available round the clock to
                                assist you with any queries or booking modifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
