import React from "react";
import Abt from "../images/help.png";

import { useSnapshot } from "valtio";
import state from "../store";

export default function About() {
  const snap = useSnapshot(state);

  state.page = 'no-canvas';
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto ">
        {/* <img src={Abt}>
        <p className="text-lg text-gray-600 mb-6">What is ARTIZON</p>
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>
        </img> */}
        <div className="relative">
          <img src={Abt} alt="Your Image" className="" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white justify-center items-center">
            {/* <p className="text-[60px] font-[700] text-white mb-5">
              What is ARTIZON ?
            </p>
            <p className="text-3xl  mb-4 ml-[180px]">
              About Us
            </p> */}
          </div>
        </div>
        <div className="p-[80px]">
        <p className="text-lg text-gray-600 mb-6">
          Welcome to our t-shirt customization website! We are a passionate team
          of designers and creators, dedicated to bringing your creative visions
          to life through our custom t-shirt offerings.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our mission is to provide you with a platform where you can design and
          personalize your own t-shirts, making every piece a reflection of your
          individuality and style. From funny quotes to meaningful graphics, you
          have the freedom to express yourself in every stitch.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          With a wide range of high-quality t-shirts, colors, and sizes, you'll
          find the perfect canvas for your creativity. Our user-friendly
          customization tool allows you to easily add images, text, and choose
          from various design elements, ensuring that your t-shirt is truly
          one-of-a-kind.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Whether you're looking to create a memorable gift for a loved one or
          want to stand out in a crowd, our t-shirts offer endless
          possibilities. Our commitment to quality craftsmanship ensures that
          you'll receive a product that you can proudly wear and showcase.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for choosing us as your partner in personal expression.
          We're excited to be part of your journey in creating custom t-shirts
          that make a statement, share a story, and inspire connections. Begin
          your customization journey today and wear your imagination!
        </p>
        </div>
      </div>
    </div>
  )
}

