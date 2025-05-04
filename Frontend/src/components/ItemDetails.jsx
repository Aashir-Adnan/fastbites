import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ItemDetails.css';

const ItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [isSelected, setIsSelected] = useState(false);

  if (!item) {
    return <div>No item details available</div>;
  }

  const cuisineTypes = [
    'Classic Burgers',
    'Vegetarian Options',
    'Vegan Choices',
    'Halal Certified',
    'Gluten-Free Buns Available'
  ];

  const priceRanges = [
    {
      type: 'Budget-Friendly',
      description: 'Perfect for students on a tight budget!'
    },
    {
      type: 'Mid-Range',
      description: 'Great value meals with premium ingredients.'
    },
    {
      type: 'Expensive',
      description: 'Gourmet burgers for when you want to splurge.'
    }
  ];

  const distances = [
    {
      type: 'Walking Distance from Campus',
      description: 'Grab a quick bite between classes.'
    },
    {
      type: 'Short Drive Away',
      description: 'Worth the trip for a mouthwatering burger experience!'
    }
  ];

  const handleSelect = () => {
    setIsSelected(!isSelected);
    const existingItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    
    if (!isSelected) {
      // Add item to order
      localStorage.setItem('orderItems', JSON.stringify([...existingItems, item]));
    } else {
      // Remove item from order
      const updatedItems = existingItems.filter(
        existingItem => !(existingItem.name === item.name && existingItem.restaurant === item.restaurant)
      );
      localStorage.setItem('orderItems', JSON.stringify(updatedItems));
    }
  };

  const handleOrderNow = () => {
    if (!isSelected) {
      // Add item to order if not already selected
      const existingItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
      localStorage.setItem('orderItems', JSON.stringify([...existingItems, item]));
    }
    navigate('/order-summary');
  };

  return (
    <div className="item-details-container">
      <div className="details-content">
        <div className="item-header">
          <h1 className="details-title">Details:</h1>
          <div className="item-selection">
            <h2 className="item-name">{item.name}</h2>
            <p className="item-price">${item.price}</p>
            <p className="item-restaurant">from {item.restaurant}</p>
            <button 
              className={`select-button ${isSelected ? 'selected' : ''}`}
              onClick={handleSelect}
            >
              {isSelected ? 'Selected' : 'Select Item'}
            </button>
          </div>
        </div>
        
        <div className="details-section">
          <h2 className="section-title">Cuisine Type</h2>
          <ul className="details-list">
            {cuisineTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h2 className="section-title">Price Range</h2>
          <ul className="details-list">
            {priceRanges.map((range, index) => (
              <li key={index}>
                <span className="price-type">{range.type}</span> - {range.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h2 className="section-title">Distance</h2>
          <ul className="details-list">
            {distances.map((distance, index) => (
              <li key={index}>
                <span className="distance-type">{distance.type}</span> - {distance.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-group">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back to Menu
          </button>
          <button 
            className="order-now-button" 
            onClick={handleOrderNow}
            disabled={!isSelected}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails; 