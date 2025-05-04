import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeRestaurantData, getAllRestaurants } from '../data/burgerRestaurantData';
import './GourmetBurgers.css';

const GourmetBurgers = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize restaurant data if not exists
    initializeRestaurantData();
    
    // Load restaurant data
    const loadRestaurantData = () => {
      try {
        const restaurantData = getAllRestaurants();
        setRestaurants(restaurantData);
      } catch (error) {
        console.error('Error loading restaurant data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurantData();
  }, []);

  const handleItemClick = (item, restaurantName) => {
    const itemWithRestaurant = {
      ...item,
      restaurant: restaurantName
    };
    
    navigate('/item-details', { 
      state: { 
        item: itemWithRestaurant 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="gourmet-burgers-container">
        <div className="loading">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="gourmet-burgers-container">
      <div className="restaurants-grid">
        {restaurants.map((restaurant, index) => (
          <div key={restaurant.id} className="restaurant-section">
            <h2 className="restaurant-name">{restaurant.name}</h2>
            <div className="menu-items">
              {restaurant.menu.map((item, itemIndex) => (
                <div 
                  key={item.id} 
                  className={`menu-item ${itemIndex % 2 === 0 ? 'yellow' : 'beige'}`}
                  onClick={() => handleItemClick(item, restaurant.name)}
                >
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GourmetBurgers; 