import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      name: 'Waiz',
      text: 'TSB is a huge part of my life. The staff feels like family, and they know just how I like my coffee - and my gourmet burger fix!',
      title: 'foodie since 2004'
    },
    {
      name: 'Aashir',
      text: 'I stumbled upon TSB when I was exploring my new neighborhood. Everyone was so friendly, and the food was delish! Will be back.',
      title: 'new in town'
    },
    {
      name: 'Sumra',
      text: 'So glad to have a neighborhood cafe, hangout spot, and bar all in one and nearby! Comfort food in a comforting atmosphere - need I say more?',
      title: 'lives around the corner'
    }
  ];

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>From Our <span className="highlight">Community</span></h1>
      </div>
      
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="reviewer-image-placeholder"></div>
            <div className="reviewer-info">
              <h2>{review.name}, {review.title}</h2>
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate('/review')}>
        Back to Reviews
      </button>
    </div>
  );
};

export default Reviews; 