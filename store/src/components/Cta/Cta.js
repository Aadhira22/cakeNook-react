import React from 'react';

const Cta = () => {
  return (
    <div className="relative bg-pink-500 text-white py-16 px-6 md:px-20 overflow-hidden">
      <section className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Be the first to know about our offers & workshops.
        </h2>
        <div className="flex justify-center">
          <form className="flex flex-col sm:flex-row gap-4 sm:gap-0 w-full max-w-md">
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-pink-500 font-semibold px-6 py-3 rounded-md hover:bg-pink-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      {/* White overlay, semi-transparent */}
      <div className="absolute inset-0 bg-white opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default Cta;
