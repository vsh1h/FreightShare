"use client"

import * as React from "react"
import Link from "next/link"
import { Truck, User, Mail, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-purple-50">
            {/* Navbar */}
            <nav className="bg-white text-gray-800 px-6 py-4 shadow-sm border-b border-purple-100">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Truck className="w-6 h-6 text-purple-500" />
                        <span className="text-xl font-bold text-gray-800">
                            Freight<span className="text-purple-500">Share</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-purple-500 transition-colors">Home</Link>
                        <Link href="/contact" className="text-purple-500 font-medium">Contact</Link>
                        <Link href="/login" className="text-gray-600 hover:text-purple-500 transition-colors">Log In</Link>
                        <Link href="/signup" className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full transition-colors font-medium">Sign Up</Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="bg-white py-16 px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you.
                </p>
            </section>

            {/* Meet the Founders */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet the Founders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Founder 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-purple-100">
                        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Anirudh Panigrahy</h3>
                        <p className="text-purple-600 text-sm font-medium mb-4">Co-Founder & CEO</p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 rounded-lg">
                            <Mail className="w-4 h-4" />
                            <span>anirudh@freightshare.com</span>
                        </div>
                    </div>

                    {/* Founder 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-purple-100">
                        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Vinayak Mohakund</h3>
                        <p className="text-purple-600 text-sm font-medium mb-4">Co-Founder & CTO</p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 rounded-lg">
                            <Mail className="w-4 h-4" />
                            <span>vinayak@freightshare.com</span>
                        </div>
                    </div>

                    {/* Founder 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-purple-100">
                        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Vanshika Shah</h3>
                        <p className="text-purple-600 text-sm font-medium mb-4">Head of Operations</p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 rounded-lg">
                            <Mail className="w-4 h-4" />
                            <span>vanshika@freightshare.com</span>
                        </div>
                    </div>

                    {/* Founder 4 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-purple-100">
                        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Bhawna Talkute</h3>
                        <p className="text-purple-600 text-sm font-medium mb-4">Head of Product</p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 rounded-lg">
                            <Mail className="w-4 h-4" />
                            <span>bhawna@freightshare.com</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Send us a Message */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-md inline-flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
