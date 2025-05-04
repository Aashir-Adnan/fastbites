import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Review.css';

const Review = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the review to a backend
    console.log({ rating, review });
    // For now, just navigate back to dashboard
    navigate(-1);
  };

  const handleSeeReviews = () => {
    navigate('/reviews');
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <h1 className="review-title">Write a review</h1>
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    size={50}
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>

          <textarea
            className="review-input"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </div>
        </form>

        <button className="see-reviews-button" onClick={handleSeeReviews}>
          See Reviews
        </button>
      </div>
    </div>
  );
};

export default Review; 