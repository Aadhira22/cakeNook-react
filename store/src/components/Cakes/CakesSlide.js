import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cakes from "../../cakeData";
import { useStateContext } from "../../context/StateContextProvider";

const CakesSlide = ({ currentCake }) => {
  const { formatPrice } = useStateContext();

  // Filter out current cake
  const filteredCakes = cakes.filter((c) => c.slug !== currentCake?.slug);

  // Responsive slidesPerView logic
  const getSlidesPerView = () => {
    if (window.innerWidth >= 1440) return 4;
    if (window.innerWidth >= 375) return 2;
    return 1;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update slidesPerView on resize
  useEffect(() => {
    const handleResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate left
  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredCakes.length - slidesPerView : prevIndex - 1
    );
  };

  // Navigate right
  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= filteredCakes.length - slidesPerView ? 0 : prevIndex + 1
    );
  };

  // Calculate visible cakes
  const visibleCakes = filteredCakes.slice(
    currentIndex,
    currentIndex + slidesPerView
  );

  // If we reach the end, and there are not enough cakes to fill slidesPerView, loop from start
  if (visibleCakes.length < slidesPerView) {
    visibleCakes.push(
      ...filteredCakes.slice(0, slidesPerView - visibleCakes.length)
    );
  }

  // Scroll to top on click
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h3>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-pink-100 transition z-10"
          >
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-pink-100 transition z-10"
          >
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="flex space-x-4 overflow-hidden">
            {visibleCakes.map((cake, idx) => (
              <Link
                key={idx}
                to={`/cakes/${cake.slug}`}
                onClick={scrollToTop}
                className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex-shrink-0"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <img
                  src={cake.images[0]}
                  alt={cake.cakeName}
                  className="w-full h-40 object-contain"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800">{cake.cakeName}</p>
                  <p className="text-sm text-pink-600 font-medium mt-1">
                    Rs.{formatPrice(cake.details.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakesSlide;
