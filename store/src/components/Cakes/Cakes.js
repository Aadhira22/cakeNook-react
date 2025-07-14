import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../cakeData";
import { useStateContext } from "../../context/StateContextProvider";
import { AnimatePresence, motion } from "framer-motion";
import { easeAnimate } from "../../animations/animation";

const CakeList = () => {
  const {formatPrice, scrollToTop, cakeRef ,onAddClick} = useStateContext();
  const [cakes, setCakes] = useState(data);
  const categoryList = ["All", "Classic", "Gourmet", "Designer"];
  const [cakeCategory, setcakeCategory] = useState("All");

  const handleCakeCategory = (e) => {
    setcakeCategory(e.target.innerText);
  };

  const filterCake = () => {
    if (cakeCategory === "All") {
      setCakes(data);
    } else {
      setCakes(data.filter((cake) =>    cake.category.toLowerCase() === cakeCategory.toLowerCase()
    ));
    }
  };

  useEffect(() => {
    filterCake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cakeCategory]);

  return (
    <section
      ref={cakeRef}
      id="cakes-section"
      className="w-full bg-white py-12 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Cakes</h2>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {categoryList.map((category, index) => (
            <span
              key={index}
              onClick={handleCakeCategory}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition ${
                cakeCategory === category
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="h-0.5 bg-gray-200 mb-14"></div>

        {/* Grid of Cakes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-24">
          <AnimatePresence>
            {cakes.map((cake, index) => (
              <motion.div
              key={index}
              variants={easeAnimate}
              initial="start"
              animate="end"
              exit="exit"
              className="flex flex-col items-center relative bg-white shadow rounded-lg pt-10 overflow-visible transition hover:-translate-y-2 hover:shadow-lg duration-300 ease-in-out "
            >
              {/* Illustration - Positioned Above */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                <img
                  src={cake.images[0]}
                  alt={`${cake.cakeName} illustration`}
                  className="w-24 h-24 object-contain"
                />
              </div>
            
              {/* Card Content */}
              <Link to={`/cakes/${cake.slug}`} onClick={scrollToTop}>
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold text-gray-800">{cake.cakeName}</p>
                  {/* <p className="text-sm text-gray-500 mt-1">Top Recommended</p> */}
                  <p className="text-pink-600 font-medium text-lg mt-2">
                    Rs.{formatPrice(cake.details.price)}
                  </p>
                </div>
              </Link>
              <button className="absolute -bottom-4 text-white bg-black w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-gray-800"  onClick={(e) => onAddClick(cake, "Add to Cart")}>+</button>
            </motion.div>
            
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CakeList;
