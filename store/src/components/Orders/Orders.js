import React,{useEffect} from 'react';
import { useStateContext } from '../../context/StateContextProvider';
import EmptyState from './EmptyState';

export default function Orders() {
  const {
    cartItems,
    handleRemoveCart,
    handleCartClick,
    totalPrice,
    cartItemQty,
    totalQty,
    formatPrice,
    showCart,user
  } = useStateContext();

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);
  
  const checkout = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
  
    try {
      const response = await fetch('https://cake-nook-react.vercel.app/checkout', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, user })
      });
      console.log("Sending checkout items:", cartItems);
      const data = await response.json();
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe session failed:", data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  return (
    <>
      {/* Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={handleCartClick}
        ></div>
      )}

      {/* Drawer */}
      <section
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-4">
          {/* Header */}
          <div className="relative mb-6 text-center">
            <i
              className="fa-solid fa-chevron-right text-gray-600 cursor-pointer absolute right-0 top-0 text-lg"
              onClick={handleCartClick}
            ></i>
            <h2 className="text-xl font-semibold">Orders ({totalQty})</h2>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {totalQty !== 0 ? (
              cartItems?.map((cake, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-100 rounded-lg relative">
                  <i
                    className="fa-solid fa-x absolute top-2 right-2 text-gray-500 cursor-pointer"
                    onClick={() => handleRemoveCart(cake)}
                  ></i>

                  <div className="w-24 h-24 overflow-hidden rounded-md">
                    <img
                      src={cake.images[0]}
                      alt={cake.cakeName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-semibold">{cake.cakeName}</h3>
                      <p className="text-sm text-gray-500">{cake.category} Cake</p>
                    </div>

                    <div className="flex items-center mt-2 space-x-2">
                      <i
                        className="fa-solid fa-minus fa-xs text-gray-600 cursor-pointer"
                        onClick={() => cartItemQty("dec", cake.index)}
                      ></i>
                      <span className="px-2">{cake.quantity}</span>
                      <i
                        className="fa-solid fa-plus fa-xs text-gray-600 cursor-pointer"
                        onClick={() => cartItemQty("inc", cake.index)}
                      ></i>
                    </div>
                  </div>

                  <p className="text-lg font-semibold text-gray-800">Rs.{formatPrice(cake.details.price)}</p>
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Total Summary */}
          {totalQty !== 0 && (
            <>
              <div className="flex justify-between items-center border-t pt-4 mb-4">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-semibold">Rs.{formatPrice(totalPrice)}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                onClick={()=> checkout()}
              >
                Pay with Stripe
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
