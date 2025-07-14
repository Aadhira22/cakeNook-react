import React from 'react';

const Footer = () => {
  return (
    <footer id="contact-section" className="bg-gray-100 text-gray-800 pt-10 pb-4 px-6">
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo + Social Links */}
        <div>
          <h1 className="flex items-center text-xl font-bold mb-4">
            <span className="text-pink-500 text-2xl mr-2">
              <i className="fa-solid fa-cake-candles"></i>
            </span>
            The Cake Nook
          </h1>
          <div className="flex gap-4 text-pink-600 text-2xl">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="https://www.blogger.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-blogger"></i>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <div className="text-sm space-y-2">
            <p>
              Bakery lane<br />
            </p>
            <p>+91 XXX-XXX-XXXX</p>
            <p>thecakenook@gmail.com</p>
            <p>
              <strong>Operating Hours:</strong><br />
              Mon - Sun 10:30am - 6pm<br />
              Tuesday: Closed
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <div className="text-sm space-y-2">
            <p>About Us</p>
            <p>FAQs</p>
            <p>Shipping & Returns</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <div className="text-sm space-y-2">
            <p>Help Center</p>
            <p>Privacy terms</p>
            <p>Directory</p>
          </div>
        </div>
      </section>

      {/* Credit */}
      <section className="mt-10 text-center text-sm text-gray-500">
        <small>Lovingly baked & built by The Cake Nook &hearts;</small>
      </section>
    </footer>
  );
};

export default Footer;
