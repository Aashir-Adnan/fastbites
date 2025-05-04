import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import './Menus.css';

import placeholder from '../assets/placeholder.jpg';

const cuisines = [
  {
    name: 'burgers',
    displayName: 'Gourmet Burgers',
    description: 'Packed with flavor and cooked to perfection',
    image: placeholder,
  },
  {
    name: 'wings',
    displayName: 'Chicken Wings',
    description: 'Paired with dipping sauces that are too good to pass up',
    image: placeholder,
  },
  {
    name: 'drinks',
    displayName: 'Thirst Quenchers',
    description: 'Choose from classic blends and unique concoctions',
    image: placeholder,
  },
  {
    name: 'rice',
    displayName: 'Rice Bowls',
    description: 'Hearty bowls with rich flavors and variety',
    image: placeholder,
  },
];

const restaurantData = {
  burgers: [
    { name: 'Burger Palace', rating: 4.5, priceRange: 'Mid-Range' },
    { name: 'Grill House', rating: 4.2, priceRange: 'Budget' },
  ],
  wings: [
    { name: 'Wing Stop', rating: 4.6, priceRange: 'Mid-Range' },
    { name: 'Spicy Bites', rating: 4.3, priceRange: 'Expensive' },
  ],
  drinks: [
    { name: 'Boba Bliss', rating: 4.8, priceRange: 'Mid-Range' },
    { name: 'Juice Hub', rating: 4.1, priceRange: 'Budget' },
  ],
  rice: [
    { name: 'Rice Bowl Express', rating: 4.4, priceRange: 'Mid-Range' },
    { name: 'Eastern Delight', rating: 4.5, priceRange: 'Expensive' },
  ],
};

const Menus = () => {
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleCuisineClick = (cuisineName) => {
    console.log('Clicked:', cuisineName); // this should show in dev tools
    setSelectedCuisine(cuisineName === selectedCuisine ? null : cuisineName);
  };

  const handleRestaurantClick = (restaurantName) => {
    // Navigate to the restaurant details page and pass the restaurant name in the URL
    navigate(`/restaurant/${restaurantName}`);
  };

  return (
    <div className="menus-container">
      <div className="menu-header">
        <h1 className="menu-title">On the Menu</h1>
      </div>

      <div className="menu-cards-container">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.name}
            className={`menu-card ${selectedCuisine === cuisine.name ? 'selected' : ''}`}
            onClick={() => handleCuisineClick(cuisine.name)}
          >
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${cuisine.image})`,
              }}
            />
            <div className="card-content">
              <h3>{cuisine.displayName}</h3>
              <p>{cuisine.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCuisine && (
        <div className="modal-overlay" onClick={() => setSelectedCuisine(null)}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <h2>Restaurants Serving {cuisines.find(c => c.name === selectedCuisine).displayName}</h2>
    <div className="restaurant-list">
      {restaurantData[selectedCuisine]?.map((restaurant, index) => (
        <button 
          key={index} 
          className="restaurant-btn" 
          onClick={() => handleRestaurantClick(restaurant.name)}
        >
          <strong>{restaurant.name}</strong> — {restaurant.rating}⭐ ({restaurant.priceRange})
        </button>
      ))}
    </div>
    <button className="close-btn" onClick={() => setSelectedCuisine(null)}>Close</button>
  </div>
</div>
      )}
    </div>
  );
};

export default Menus;
