import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa'; 
import StandardLayout from '../components/layout/StandardLayout';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import { useSnapshot } from "valtio";
import state from "../store";

import des1 from "../images/designs/design1.jpg";
import des2 from "../images/designs/design2.jpg";
import des3 from "../images/designs/design3.jpg";



const CompanyDesViewMore = () => {
  
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const { id } = useParams();
  // console.log(id);

  const [design, setDesign] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/individual_company_design/${id}`)
      .then(response => {
        setDesign(response.data);
      })
      .catch(error => {
        console.error('Error fetching design:', error);
      });
  }, [id]);

  if (!design) {
    return null; // Display loading or error message while fetching data
  }
  
  const handleThumbnailClick = index => {
    setSelectedImageIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  
  const splitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 75) {
      const index = words.slice(0, 75).findLastIndex((word) => word.endsWith('.'));
      if (index !== -1) {
        const firstPara = words.slice(0, index + 1).join(' ');
        const secondPara = words.slice(index + 1).join(' ');
        return [firstPara, secondPara];
      }
    }
    return [description];
  };

  const [descriptionPara1, descriptionPara2] = splitDescription(design.description);

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
  
    const ratingElements = starRatingCounts.map((item) => {
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
    });
  
    return (
      <div>
        <div className="flex items-center mb-2 py-1">
          {starIcons}
          <span className="ml-2 text-gray-700">
            {rating.toFixed(1)} rating based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        <div className="flex flex-col">
          {ratingElements}
        </div>
      </div>
    );
  };
  

  return (
    <StandardLayout>
      <div className="container mx-auto px-4 py-8 mt-8  overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="px-4 lg:px-20">
            <img
              src={`http://127.0.0.1:8080/uploads/company_designs/${design['image_' + (selectedImageIndex + 1)]}`}
              alt={design.design_name}
              style={{ width: '700px', height: '400px' }}
              className="object-cover rounded-lg cursor-pointer"
              onClick={openModal} // Open modal on image click
            />

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
                <div className="relative">
                  <img
                    src={`http://127.0.0.1:8080/uploads/company_designs/${design['image_' + (selectedImageIndex + 1)]}`}
                    alt={design.design_name}
                    style={{ maxWidth: '100%', maxHeight: '100vh' }}
                    className="object-contain"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 p-2 text-white"
                  >
                    <FaTimes size={24} color='red' />
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mt-4 justify-center">
              {[1, 2, 3].map(index => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index - 1)}
                  className={`cursor-pointer ${
                    selectedImageIndex === index - 1
                      ? 'border-blue-500 border-2'
                      : ''
                  }`}
                  style={{ width: '150px', height: '120px' }}
                >
                  <img
                    src={`http://127.0.0.1:8080/uploads/company_designs/${design['image_' + index]}`}
                    alt={`Product Thumbnail ${index}`}
                    className="w-full h-full rounded-lg object-cover"
                  />
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
            <h1 className="text-3xl font-bold">{design.name}</h1>
            <div className="flex items-center py-2">
              <p className="text-gray-400 font-light text-l mr-2">Design Code:</p>
              <p className="text-black font-light text-l">256AT5</p>
            </div>

            <div className="flex items-center py-2">
              <p className="text-gray-400 font-light text-l mr-2">Material:</p>
              <p className="text-black font-light text-l">{design.material}</p>
            </div>


            <div className="flex flex-col mb-2">
              <p className="text-brown">Designer Rating:</p>
              <div className="flex items-center">
                {renderStarRating(product.rating, product.reviewCount)}
              </div>
            </div>

            {true && (
              <div className="flex justify-start mt-4 gap-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Order Now
                </button>

                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-light text-l mr-2">Unit Price:</p>
                  <p className="text-black font-light text-l">Rs. {Number(design.price).toFixed(2)}</p>
                </div>

              </div>
            )}

            <hr className="border-t border-gray-300 my-4" />

            <div className="text-gray-700 mb-4 py-5">
              {splitDescription(design.description).map((paragraph, paraIndex) => (
                <React.Fragment key={paraIndex}>
                  <p>
                    {paragraph.split(' ').map((word, wordIndex) => (
                      <React.Fragment key={wordIndex}>
                        {/^colou?r/i.test(word) ? (
                          <span style={{ color: 'red' }}>{word}</span>
                        ) : (
                          `${word} `
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  {paraIndex === 0 && <br />}
                </React.Fragment>
              ))}
            </div>
            <hr className="border-t border-gray-300 my-4" />
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default CompanyDesViewMore;
