import { FaHome, FaMobileAlt, FaClock, FaGift, FaStar } from "react-icons/fa";
import { GiCupcake } from "react-icons/gi";
import { RiCake2Fill } from "react-icons/ri";
import plate from "../assets/plate.png";
import plate1 from "../assets/plate1.png";
const FeaturesSection = () => {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 gap-10 items-center justify-center">
        {/* Left Side - Image & Decor */}
        <div className="relative flex flex-col items-center ">
        <RiCake2Fill size={40}/>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What’s Special <br /> About Our Cakes?
          </h2>

          {/* Grid of Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-6">
            {/* Feature 1 */}
            <div>
              <FaHome className="text-2xl mb-2" />
              <h4 className="font-semibold">Home Delivery</h4>
              <p className="text-sm text-gray-300">
                Free delivery for min. 699 Rs. purchase
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <FaMobileAlt className="text-2xl mb-2" />
              <h4 className="font-semibold">Easy to Order</h4>
              <p className="text-sm text-gray-300">
                Order our cakes on web app
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <FaClock className="text-2xl mb-2" />
              <h4 className="font-semibold">24/7 Service</h4>
              <p className="text-sm text-gray-300">
                Our CS always stay in touch for 24 hours
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <GiCupcake className="text-2xl mb-2" />
              <h4 className="font-semibold">Best Quality</h4>
              <p className="text-sm text-gray-300">
                Gluten-free, 100% fresh hand-made
              </p>
            </div>

            {/* Feature 5 */}
            <div>
              <FaGift className="text-2xl mb-2" />
              <h4 className="font-semibold">Package Gift</h4>
              <p className="text-sm text-gray-300">
                Sent our cakes to your loved ones
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
