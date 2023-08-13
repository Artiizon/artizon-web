import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import StandardLayout from '../components/layout/StandardLayout';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import des1 from "../images/designs/design1.jpg";
import des2 from "../images/designs/design2.jpg";
import des3 from "../images/designs/design3.jpg";

import { useSnapshot } from "valtio";
import state from "../store";

const CompanyDesViewMore = () => {
  
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const product = {
    name: '"Awesome" Design',
    description: (
      <>
        <p className='py-2'>Get ready to turn heads with our "Awesome" design t-shirt! This captivating and vibrant t-shirt is a must-have for those who want to make a bold statement. Designed with creativity and style in mind, the "Awesome" design features a stunning combination of eye-catching colors and captivating graphics that instantly grab attention. The bold typography and artistic elements showcase a sense of confidence and individuality, making it a perfect choice for those who dare to stand out from the crowd.</p>
        <p className='py-2'>Crafted with the utmost care and using high-quality materials, this t-shirt ensures both comfort and durability. The soft and breathable fabric will keep you cool and comfortable all day long, while the precise stitching guarantees long-lasting wear.</p>
      </>
    ),
    rating: 4.5,
    reviewCount: 10,
    price: '$99.99',
    available: true,
    material: 'Cotton',
    images: [
      des1,
      des2,
      des3
    ]
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const renderStarRating = (rating, reviewCount) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      starIcons.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    const starRatingCounts = [
      { stars: 5, count: 2 },
      { stars: 4, count: 5 },
      { stars: 3, count: 8 },
      { stars: 2, count: 3 },
      { stars: 1, count: 2 },
    ];

    return (
      <div>
        <div className="flex items-center mb-2 py-1">
          {starIcons}
          <span className="ml-2 text-gray-700">
            {rating.toFixed(1)} rating based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        <div className="flex flex-col">
          {starRatingCounts.map((item) => {
            const percentage = (item.count / reviewCount) * 100;
            return (
              <div key={item.stars} className="grid grid-cols-3 items-center">
                <div className="flex items-center mr-2">
                  {item.stars === 1 ? `${item.stars} star` : `${item.stars} stars`}
                </div>
                <div className="flex flex-grow">
                  <div className="w-full h-2 bg-gray-300 rounded-md">
                    <div className="h-full bg-yellow-300" style={{ width: `${percentage}%`, borderRadius: 'inherit' }}></div>
                  </div>
                </div>
                <div className="ml-2 text-gray-700">
                  {item.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
      <div className="font-sans container mx-auto px-4 py-8 mt-8  overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="px-4 lg:px-20">
          <img src={product.images[selectedImageIndex]} alt="Product" style={{ width: '700px', height: '400px' }} className="object-cover rounded-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4 justify-center">
            {product.images.map((image, index) => (
              <div key={index} onClick={() => setSelectedImageIndex(index)} className={`cursor-pointer ${selectedImageIndex === index ? 'border-blue-500 border-2' : ''}`} style={{ width: '150px', height: '120px' }}>
                <img src={image} alt={`Product Thumbnail ${index + 1}`} className="w-full h-full rounded-lg object-cover" />
              </div>
            ))}
          </div>
        </div>


          <div>
            <Link to="/company-design" className="text-gray-700 mb-4 flex items-center">
              <FaArrowLeft className="mr-2" />
              Back to Design Page
            </Link>
            <hr className="border-t border-gray-300 my-4" />
            <p className="text-red-400 font-light text-1xl py-2 font-roboto-condensed">
              DESIGN BY ARTIZON
            </p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center py-2">
              <p className="text-gray-400 font-light text-l mr-2">Design Code:</p>
              <p className="text-black font-light text-l">256AT5</p>
            </div>

            <div className="flex items-center py-2">
              <p className="text-gray-400 font-light text-l mr-2">Material:</p>
              <p className="text-black font-light text-l">{product.material}</p>
            </div>


            <div className="flex flex-col mb-2">
              <p className="text-brown">Designer Rating:</p>
              <div className="flex items-center">
                {renderStarRating(product.rating, product.reviewCount)}
              </div>
            </div>

            {product.available && (
              <div className="flex justify-start mt-4">
                <button className="bg-black  text-white font-bold py-2 px-4 rounded">
                  Order Now
                </button>
              </div>
            )}

            <hr className="border-t border-gray-300 my-4" />

            <p className="text-gray-700 mb-4 py-5">{product.description}</p>

            <hr className="border-t border-gray-300 my-4" />
          </div>
        </div>
      </div>
  );
};

export default CompanyDesViewMore;
