import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cakeData from '../../cakeData';
import CakesSlide from './CakesSlide';
import { useStateContext } from '../../context/StateContextProvider';

const CakeDetails = () => {
  const {
    cake,
    displayCakeDetails,
    quantity,
    increaseQty,
    decreaseQty,
    formatPrice,
    onAddClick
  } = useStateContext();

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const findCake = cakeData.find((cake) => cake.slug === slug);

  useEffect(() => {
    displayCakeDetails(findCake);
  }, [displayCakeDetails, findCake]);

  const [cakeImage, setCakeImage] = useState(0);

  const handleClickImage = (id) => {
    setCakeImage(id);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <button
          className="mb-6 text-sm text-pink-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; Go Back
        </button>

        {cake && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Images */}
            <div className="flex-1 space-y-4">
              <div className="w-full h-72 md:h-96 bg-white rounded shadow overflow-hidden">
                <img
                  src={cake.images[cakeImage]}
                  alt={`Cake ${cake.cakeName}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex gap-4">
                {cake.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Cake ${cake.cakeName} reference ${i}`}
                    onClick={() => handleClickImage(i)}
                    className={`w-20 h-20 object-cover rounded border-2 cursor-pointer transition ${
                      cakeImage === i ? 'border-pink-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{cake.cakeName}</h2>
              <p className="text-xl text-pink-600 font-semibold">
                Rs.{formatPrice(cake.details.price)}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-gray-700 font-medium">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded px-3 py-1 gap-4">
                  <i
                    className="fa-solid fa-minus text-sm cursor-pointer text-gray-700"
                    onClick={decreaseQty}
                  ></i>
                  <span>{quantity}</span>
                  <i
                    className="fa-solid fa-plus text-sm cursor-pointer text-gray-700"
                    onClick={increaseQty}
                  ></i>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
                  onClick={(e) =>  onAddClick(cake, e.target.innerText)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-6 py-2 rounded border border-pink-300"
                  onClick={(e) => onAddClick(cake, e.target.innerText)}
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {cake.details.description.map((desc) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related cakes slider */}
      <CakesSlide currentCake={cake} formatPrice={formatPrice} />
    </>
  );
};

export default CakeDetails;
