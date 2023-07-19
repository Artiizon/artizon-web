import React from 'react';
import StandardLayout from "../components/layout/StandardLayout";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import des1 from "../images/designs/design1.jpg";
import des2 from "../images/designs/design2.jpg";
import des3 from "../images/designs/design3.jpg";
import des4 from "../images/designs/design4.jpg";
import des5 from "../images/designs/design5.jpg";
import des6 from "../images/designs/design6.jpg";

const feedbacks = [
  {
    id: 1,
    rating: 4.5,
    reviewCount: 1,
    feedback: "Great design! Really loved it.",
    customerName: "John Doe",
    anonymous: false,
  },
  {
    id: 2,
    rating: 5,
    reviewCount: 6,
    feedback: "Amazing design! Highly recommended.",
    customerName: "Jane Smith",
    anonymous: true,
  },
  // Add more feedbacks as needed
];

const FeedbackCard = ({ feedback }) => {
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
      <div className="px-6 py-4">
        {renderStarRating(feedback.rating, feedback.reviewCount)}
        <p className="text-gray-700 text-base">{feedback.feedback}</p>
        {feedback.anonymous ? (
          <p className="text-gray-400 italic mt-2">Anonymous</p>
        ) : (
          <p className="text-gray-700 mt-2">Customer: {feedback.customerName}</p>
        )}
      </div>
    </div>
  );
};

const ArtizonFeedback = () => {
  // Calculate overall feedback
  const totalReviews = feedbacks.length;
  const totalRatings = feedbacks.reduce((total, feedback) => total + feedback.rating, 0);
  const averageRating = totalRatings / totalReviews;

  // Calculate count of reviews for each star rating
  const starRatings = [5, 4, 3, 2, 1];
  const ratingCounts = starRatings.map((rating) => {
    const count = feedbacks.filter((feedback) => feedback.rating === rating).length;
    return { rating, count };
  });

  return (
    <StandardLayout>
      <h1 className="text-2xl py-6 font-bold text-left px-8 mb-0">Customer Feedbacks</h1>

      <div className="px-4">
        <hr className="border-t border-gray-300" />
        <div className="flex flex-col py-4 px-8">
        <div>
            <p className="text-lg py-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">
                {averageRating.toFixed(1)} 
              </span>{" "}
              rating out of{" "}
              <span className="text-red-700 font-bold">
                {totalReviews} 
              </span>{" "}
              reviews.{" "}
            </p>
          </div>
      

          

          
          <div className="flex flex-col">
  {ratingCounts.map((rating) => (
    <div key={rating.rating} className="grid grid-cols-3 items-center gap-0">
     <p className="text-lg text-gray-700">
      {rating.rating} {rating.rating === 1 ? 'star' : 'stars'}
    </p>
      <div className="w-10px h-3 bg-gray-300 rounded-md">
        <div
          className="h-full bg-yellow-500 rounded-md"
          style={{ width: `${(rating.count / totalReviews) * 100}%` }}
        ></div>
      </div>
      <p className="text-lg text-gray-700 ml-2">{rating.count}</p>
    </div>
  ))}
</div>

        </div>
        <hr className="border-t border-gray-300" />
      </div>

      <div className="container mx-18 p-8">
      <div className="grid grid-cols-1 gap-y-8">
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>

    </StandardLayout>
  );
};

export default ArtizonFeedback;
