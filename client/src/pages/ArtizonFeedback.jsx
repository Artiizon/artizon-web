import { FaStar, FaStarHalfAlt, FaCommentAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnapshot } from "valtio";
import state from "../store";

const FeedbackCard = ({ feedback }) => {

  const snap = useSnapshot(state);
  state.page = "no-canvas";
  
  const renderStarRating = (rating) => {
    const maxStars = 5; // Total number of stars
    const starIcons = [];
  
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        starIcons.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        starIcons.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
  
    return (
      <div className="flex items-center mb-2 py-1">
        {starIcons}
      </div>
    );
  };

  const getTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const feedbackDate = new Date(timestamp);
    const timeDifference = currentDate - feedbackDate;

    // Convert time difference to days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) {
      return 'Today';
    } else if (daysAgo === 1) {
      return 'Yesterday';
    } else {
      return `${daysAgo} days ago`;
    }
  };
  

  return (
    <div className="w-81 h-100 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        {renderStarRating(feedback.rating)}
        <p className="text-gray-700 text-base">{feedback.description}</p>
        {feedback.visibility ? (
          <p className="text-gray-400 italic mt-2">Anonymous</p>
        ) : (
          <p className="text-gray-700 mt-2">By: {feedback.customer_name}</p>
         
        )}
         <p className="text-gray-400 italic mt-2">{getTimeAgo(feedback.date_and_time)}</p>
      </div>
    </div>
  );
};

const ArtizonFeedback = () => {
  // Calculate overall feedback
  const [feedbacks, setFeedbacks] = useState([]);
  const totalReviews = feedbacks.length;
  const totalRatings = feedbacks.reduce((total, feedback) => total + feedback.rating, 0);
  const averageRating = totalRatings / totalReviews;

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/getCompanyFeedback')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching designs:', error);
      });
  }, []);

  const renderStarRating = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const fractionalPart = rating % 1;
    const starIcons = [];
  
    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        starIcons.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars && fractionalPart > 0) {
        starIcons.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        // Render an empty star for the rest
        starIcons.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
  
    return (
      <div className="flex items-center mb-2 py-1">
        {starIcons}
      </div>
    );
  };
  
  

  const starRatings = [5, 4, 3, 2, 1];
  const ratingCounts = starRatings.map((rating) => {
    const count = feedbacks.filter((feedback) => feedback.rating === rating).length;
    return { rating, count };
  });

  return (
    <div className="font-sans">
      <h1 className="text-2xl py-6 font-bold text-left px-8 mb-0">Customer Feedbacks</h1>
      
      <div className='px-4'>
      <hr className="border-t border-gray-300" /> 
      </div>
      

      <div className="px-20">
     
        <div className="flex flex-col py-4 px-8">
          <div>
          <div className="flex gap-2">
          <p className="text-l font-bold">Artizon Rating:</p>
          <div className="ml-1">{renderStarRating(averageRating)}</div>
        </div>
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

      </div>
      
      <div className='px-4'>
      <hr className="border-t border-gray-300" />
      </div>

      <div className="flex py-6 px-8 items-center">
        <FaCommentAlt className="text-1xl mr-2 text-gray-600" /> {/* Feedback icon */}
        <h2 className="text-1xl font-bold">Feedbacks ({totalReviews})</h2>
      </div>
     

      <div className="container mx-18 px-8 py-2">
        <div className="grid grid-cols-2 gap-y-8">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
          ))}
        </div>
      </div>
      </div>
  );
};

export default ArtizonFeedback;
