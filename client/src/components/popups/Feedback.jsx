import React, { useState } from 'react';
import axios from 'axios';


const StarRating = ({ onChange, initialRating }) => {
    const [rating, setRating] = useState(initialRating || 1);
  
    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
      onChange(selectedRating);
    };
  
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              onClick={() => handleStarClick(starValue)}
              style={{
                color: starValue <= rating ? 'gold' : 'gray',
                cursor: 'pointer',
              }}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

const FeedbackModal = ({ isOpen, onClose, Id }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
//   console.log(Id)
 
  const handleSubmitFeedback = async () => {
    // Construct the feedback data to send to your backend
    const feedbackData = {
      rating,
      feedbackText,
      isAnonymous,
      orderId
    };

    try {
      
      const response = await axios.post("http://localhost:8080/api/addFeedback", feedbackData);

      // Handle the response from the backend (e.g., show a success message)
      console.log('Feedback submitted successfully', response.data);

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Error submitting feedback', error);
    }
  };


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };


  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modalFeedback-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Leave Feedback</h2>
        <div className="rating">
          <StarRating onChange={setSelectedRating} />
        </div>
        <div className="feedback-description">
          <textarea
            placeholder="Write your feedback here"
            value={feedbackText}
            onChange={handleFeedbackTextChange}
          />
        </div>
        <div className="anonymous">
          <label>
            <input
              type="radio"
              value="anonymous"
              checked={isAnonymous}
              onChange={handleAnonymousChange}
            />
            Send feedback anonymously
          </label>
        </div>
        <button className="feedback-submit-button" onClick={handleSubmitFeedback}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
