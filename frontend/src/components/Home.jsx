import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
    
      <div className="bg-gray-50 min-h-screen font-sans">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Track Your Expenses <br className="hidden md:block" />
                Effortlessly
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-200">
                Smart Expense Tracker to manage your finances and stay on top of
                your money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition">
                  Get Started
                </button>
                <button className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
              <img
                src="https://cdn.dribbble.com/users/1007875/screenshots/6407015/expense_tracker_dribbble.png"
                alt="Expense Tracker Illustration"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Expense Tracker?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Simple & Intuitive</h3>
              <p className="text-gray-600">
                Add and track expenses in seconds with a clean and easy-to-use
                interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Visual Insights</h3>
              <p className="text-gray-600">
                See your spending patterns with charts and summaries to make
                smarter decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is safe and backed up. Manage your finances without
                worry.
              </p>
            </div>
          </div>
        </section>

        {/* Tracker Showcase */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Your Expenses, All in One Place
            </h2>
            <p className="text-gray-600 mb-12">
              Track your spending, categorize your expenses, and stay on top of
              your finances with ease.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <img
                src="https://cdn.dribbble.com/users/1007875/screenshots/6407015/expense_tracker_dribbble.png"
                alt="Expense Dashboard"
                className="w-full max-w-sm rounded-lg shadow-lg hover:scale-105 transform transition"
              />
              <img
                src="https://cdn.dribbble.com/users/1007875/screenshots/6407015/expense_tracker_dribbble.png"
                alt="Expense Dashboard"
                className="w-full max-w-sm rounded-lg shadow-lg hover:scale-105 transform transition"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mb-8">
            Start using Expense Tracker today and simplify your financial life.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
