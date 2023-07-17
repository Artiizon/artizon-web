import StandardLayout from "../components/layout/StandardLayout";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import des1 from "../images/designs/design1.jpg";
import des2 from "../images/designs/design2.jpg";
import des3 from "../images/designs/design3.jpg";
import des4 from "../images/designs/design4.jpg";
import des5 from "../images/designs/design5.jpg";
import des6 from "../images/designs/design6.jpg";

const products = [
  {
    id: 1,
    name: '"Awesome" Design',
    designer: 'by Janith Madarasinghe',
    imageUrl: des1,
    rating: 4.5,
    reviewCount: 1,
  },
  {
    id: 2,
    name: '"Summer Vibes" Design',
    designer: 'by Punsara Deshan',
    imageUrl: des2,
    rating: 5,
    reviewCount: 6,
  },
  {
    id: 3,
    name: '"Lost" Design',
    designer: 'by K. Rathnayake',
    imageUrl: des3,
    rating: 3.5,
    reviewCount: 6,
  },
  {
    id: 4,
    name: '"Never Give Up" Design',
    designer: 'by Y.P Ranasinghe',
    imageUrl: des4,
    rating: 4,
    reviewCount: 6,
  },
  {
    id: 5,
    name: '"Wolf" Design',
    designer: 'by Devin Yapa',
    imageUrl: des5,
    rating: 4.5,
    reviewCount: 6,
  },
  {
    id: 6,
    name: '"Born to be Wild" Design',
    designer: 'by Geenath WT',
    imageUrl: des6,
    rating: 4.5,
    reviewCount: 6,
  },
];

const CompanyDesignCard = ({ product }) => {
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

    return (
      <div className="flex items-center mb-2 py-1">
        {starIcons}
        <span className="ml-2 text-gray-700">{rating} rating based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
      </div>
    );
  };

  return (
    <div className="w-81 h-100 rounded overflow-hidden shadow-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.designer}</p>
        {renderStarRating(product.rating, product.reviewCount)}
      </div>
      <div className="px-6 py-4">
        <Link to="/com-design-view-more" className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          View More
        </Link>
      </div>
    </div>
  );
};

const CompanyDesign = () => {
  return (
    <StandardLayout>
      <h1 className="text-4xl py-8 font-bold text-center">Featured Designs</h1>
      <div className="container mx-18 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <CompanyDesignCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </StandardLayout>
  );
};

export default CompanyDesign;
