import React from 'react'

export default function Destinations() {
    return (
        <>
            <section className="py-12 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-10">
                        Discover amazing places and plan your next adventure with our most booked routes.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* USA Cities */}
                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/New York.jpeg" alt="New York" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">New York City</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">The city that never sleeps awaits with countless attractions.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From $89</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/Los Angles.jpeg" alt="Los Angeles" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Los Angeles</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Experience Hollywood glamour and California’s beaches.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From $124</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/Paris1.jpeg" alt="Chicago" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Paris</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Discover the rich culture and architecture of the Windy City.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From $67</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>

                        {/* India Cities */}
                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/Agra.jpeg" alt="Agra" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Agra</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Home of the Taj Mahal, a symbol of love and UNESCO heritage site.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From ₹2500</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/Jaipur.jpeg" alt="Jaipur" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Jaipur</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">The Pink City, known for its royal palaces and forts.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From ₹3200</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-3">
                            <img src="/Destination/Goa.jpeg" alt="Goa" className="rounded-xl w-full h-49 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Goa</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Famous for its beaches, nightlife, and Portuguese heritage.</p>
                                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    <span>From ₹4500</span><a href="#" className="hover:underline">View Options</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
