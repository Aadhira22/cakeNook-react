import React, { useEffect } from 'react';


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-gray-800 leading-relaxed">
      <h2 className="text-3xl font-bold mb-8 text-center">About The Cake Nook</h2>
      <p className="text-lg">
        <strong>The Cake Nook</strong> is a functioning e-commerce website for cakes.
        <br /><br />
        It is a personal project of a fullstack developer, aiming to showcase her skills in building professional, useful web applications like an e-commerce store.
        <br /><br />
        This website is built using <strong>ReactJS</strong> (JSX, Hooks, Context API), <strong>Tailwind CSS</strong>, and <strong>Stripe</strong> for payments.
        <br /><br />
        The images used on this website are generated from
        <a
          href="https://www.craiyon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 underline hover:text-blue-800 ml-1"
        >
          Craiyon
        </a>.
      </p>
    </div>
  );
}
