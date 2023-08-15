import StandardLayout from "../components/layout/StandardLayout";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnapshot } from "valtio";
import state from "../store";

const CompanyDesignCard = ({ design }) => {
  // const renderStarRating = (rating, reviewCount) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;
  //   const starIcons = [];

  //   for (let i = 0; i < fullStars; i++) {
  //     starIcons.push(<FaStar key={i} className="text-yellow-500" />);
  //   }

  //   if (hasHalfStar) {
  //     starIcons.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  //   }

  //   return (
  //     <div className="flex items-center mb-2 py-1">
  //       {starIcons}
  //       <span className="ml-2 text-gray-700">{rating} rating based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
  //     </div>
  //   );
  // };
  const starIcons = [
    <FaStar key={1} className="text-yellow-500" />,
    <FaStar key={2} className="text-yellow-500" />,
    <FaStar key={3} className="text-yellow-500" />,
    <FaStar key={3} className="text-yellow-200" />,
    <FaStar key={3} className="text-yellow-200" />,
    // Add more star icons as needed
  ];

  return (
    <div className="w-81 h-100 rounded overflow-hidden shadow-lg">
       <img src={`http://127.0.0.1:8080/uploads/company_designs/${design.image_1}`}  alt={design.design_name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{design.design_name}</div>
        <p className="text-gray-700 text-base">Design by: {design.designer_full_name}</p>
        {/* {renderStarRating(product.rating, product.reviewCount)} */}
        <div className="flex items-center mb-2 py-1">
          {starIcons}
          <span className="ml-2 text-gray-700">4.5 rating based on 6 reviews</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <Link to={`/com-design-view-more/${design.company_design_id}`} className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          View More
        </Link>
      </div>
    </div>
  );
};

const CompanyDesign = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/viewCompanyDesigns')
      .then(response => {
        setDesigns(response.data);
      })
      .catch(error => {
        console.error('Error fetching designs:', error);
      });
  }, []);

  return (
    <div className="font-sans container mx-auto px-4 lg:px-20 py-8 min-h-[575.9px]">
      <h1 className="text-4xl py-4 font-bold text-center mb-2">
        Featured Designs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
         {designs.map((design) => (
            <CompanyDesignCard key={design.company_design_id} design={design} />
          ))}
      </div>
    </div>
  );
};

export default CompanyDesign;
