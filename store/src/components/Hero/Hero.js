import { motion } from "framer-motion";
import { easeAnimate } from '../../animations/animation';
import { useStateContext } from '../../context/StateContextProvider';

import cakes from "../../assets/cakes.png";
const Hero = () => {
  const { handleScrollToProducts } = useStateContext();

  return (
    <>
    <motion.section
      variants={easeAnimate}
      initial="start"
      animate="end"
      className=" relative w-full bg-pink-100 pt-20 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Hero Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Craving Sweets?
          <br />You come to
          The Right Place
          </h1>
          <p className="text-md text-gray-700">
          Indulge in handcrafted treats made to satisfy your sweet tooth. Whether it’s a celebration or a simple craving, we’re here to make your day a little sweeter—one bite at a time.
            </p>
          <button
            onClick={handleScrollToProducts}
            className="mt-4 px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded shadow transition duration-300"
          >
            Shop Now
          </button>
        </div>
        
        {/* Hero Image */}
        <div className="flex-1 relative w-full max-w-md">
          <img
            src={cakes}
            alt="Delicious cake"
            className="w-full h-auto rounded-lg"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-pink-300 to-transparent opacity-50 rounded-lg"></div> */}
        </div>
      </div>
    </motion.section>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='w-full overflow-hidden leading-[0] z-10 bg-white'><path fill="#fce7f3" fill-opacity="1" d="M0,128L18.5,133.3C36.9,139,74,149,111,149.3C147.7,149,185,139,222,154.7C258.5,171,295,213,332,240C369.2,267,406,277,443,256C480,235,517,181,554,181.3C590.8,181,628,235,665,224C701.5,213,738,139,775,101.3C812.3,64,849,64,886,90.7C923.1,117,960,171,997,170.7C1033.8,171,1071,117,1108,80C1144.6,43,1182,21,1218,37.3C1255.4,53,1292,107,1329,128C1366.2,149,1403,139,1422,133.3L1440,128L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>
</>
  );
};

export default Hero;
