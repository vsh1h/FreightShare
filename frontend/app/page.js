"use client"

import * as React from "react"
import Link from "next/link"
import { Truck, Package, Lock, Award } from "lucide-react"

export default function FreightShareHomepage() {
    return (
        <div className="min-h-screen bg-purple-50">

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
                        <Link href="/products" className="text-gray-600 hover:text-purple-500 transition-colors">Products</Link>
                        <Link href="/development" className="text-gray-600 hover:text-purple-500 transition-colors">Development</Link>
                        <Link href="/login" className="text-gray-600 hover:text-purple-500 transition-colors">Log In</Link>
                        <Link href="/signup" className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full transition-colors font-medium">Sign Up</Link>
                    </div>
                </div>
            </nav>


            <section
                className="relative text-white py-24 px-6 overflow-hidden"
                style={{
                    backgroundImage: "url('/hero-background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                            Smarter Shipping.<br />
                            <span className="text-pink-200">Zero Waste.</span>
                        </h1>
                        <p className="text-lg text-purple-100">
                            Share FreightShare, buy shares, and leave Empty Truck space to no waste. Ship Smarter.
                        </p>
                        <button className="bg-pink-300 hover:bg-pink-400 text-purple-900 px-8 py-3 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>


            <section className="bg-purple-50 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="text-center space-y-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <Package className="w-10 h-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Step 1</h3>
                            <p className="text-sm text-purple-600 font-semibold">Easy to Ship</p>
                            <p className="text-sm text-gray-600">We have focus priorities to enumerate your maintained east l trip.</p>
                        </div>


                        <div className="text-center space-y-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <Truck className="w-10 h-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Step 2</h3>
                            <p className="text-sm text-purple-600 font-semibold">Rename able</p>
                            <p className="text-sm text-gray-600">Spanialized minations and safer, truck company, and embodees.</p>
                        </div>


                        <div className="text-center space-y-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <Lock className="w-10 h-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Step 3</h3>
                            <p className="text-sm text-purple-600 font-semibold">Process</p>
                            <p className="text-sm text-gray-600">Spannelized multiations safe, truck comp, and delivery condwires.</p>
                        </div>


                        <div className="text-center space-y-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <Award className="w-10 h-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Step 4</h3>
                            <p className="text-sm text-purple-600 font-semibold">Commable</p>
                            <p className="text-sm text-gray-600">Forward to enumerate access to truck, and fundsowart prevailing mail quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Advantage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-purple-50 rounded-2xl p-8 space-y-4 hover:scale-105 transition-transform shadow-sm border border-purple-100">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Easy to Ship</h3>
                            <p className="text-gray-600">We have focus prioritize to enumerate your maintained east trip.</p>
                        </div>


                        <div className="bg-purple-50 rounded-2xl p-8 space-y-4 hover:scale-105 transition-transform shadow-sm border border-purple-100">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Rename able</h3>
                            <p className="text-gray-600">Spannelized multiations and safer, truck companys, and delivery condwires.</p>
                        </div>


                        <div className="bg-purple-50 rounded-2xl p-8 space-y-4 hover:scale-105 transition-transform shadow-sm border border-purple-100">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Commable</h3>
                            <p className="text-gray-600">Forward to ensure access to truck, and fundsowart prevailing mail quality.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-purple-200 py-16 px-6">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-bold text-gray-800">Sign Up</h2>
                    <p className="text-gray-600">
                        Sign up for FreightShare to our account and we help you maintain account, ensure, accounting tech and rusbustion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="flex-1 px-6 py-3 rounded-full border-2 border-purple-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                        />
                        <button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-md">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-purple-600 hover:underline font-medium">Log In</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
