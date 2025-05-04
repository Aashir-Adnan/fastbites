import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Menus.css';

import placeholder from '../assets/placeholder.jpg';

const Menus = () => {
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [restaurantData, setRestaurantData] = useState({});
  const [currentCuisinePage, setCurrentCuisinePage] = useState(1);
  const [currentRestaurantPage, setCurrentRestaurantPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/crud/cuisines');
        setCuisines(res.data.payload || []);
      } catch (error) {
        console.error('Failed to fetch cuisines:', error);
      }
    };
    fetchCuisines();
  }, []);

  const fetchRestaurants = async (cuisineName) => {
    try {
      const res = await axios.post('http://localhost:3000/api/custom/get/restaurantdata', { name: cuisineName });
      setRestaurantData((prev) => ({
        [cuisineName.toLowerCase()]: res.data.payload || [],
      }));
    } catch (error) {
      console.error(`Failed to fetch restaurants for ${cuisineName}:`, error);
    }
  };

  const handleCuisineClick = (cuisineName) => {
    fetchRestaurants(cuisineName);
    setSelectedCuisine(cuisineName);
  };

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurant/${restaurantName}`);
  };

  const paginateData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePrevCuisinePage = () => {
    if (currentCuisinePage > 1) setCurrentCuisinePage(currentCuisinePage - 1);
  };

  const handleNextCuisinePage = () => {
    const totalPages = Math.ceil(cuisines.length / itemsPerPage);
    if (currentCuisinePage < totalPages) setCurrentCuisinePage(currentCuisinePage + 1);
  };

  const handlePrevRestaurantPage = () => {
    if (currentRestaurantPage > 1) setCurrentRestaurantPage(currentRestaurantPage - 1);
  };

  const handleNextRestaurantPage = () => {
    const totalPages = Math.ceil((restaurantData[selectedCuisine?.toLowerCase()]?.length || 0) / itemsPerPage);
    if (currentRestaurantPage < totalPages) setCurrentRestaurantPage(currentRestaurantPage + 1);
  };

  return (
    <div className="menus-container">
      <div className="menu-header">
        <h1 className="menu-title">On the Menu</h1>
      </div>

      <div className="menu-cards-container">
        {paginateData(cuisines, currentCuisinePage).map((cuisine) => (
          <div
            key={cuisine.id}
            className={`menu-card ${selectedCuisine === cuisine.cuisine_name ? 'selected' : ''}`}
            onClick={() => handleCuisineClick(cuisine.cuisine_name)}
          >
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${cuisine.attachment_url 
                  ? `http://localhost:3000/uploads/${cuisine.attachment_url}` 
                  : placeholder})`,
              }}
            />
            <div className="card-content">
              <h3>{cuisine.cuisine_name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevCuisinePage} disabled={currentCuisinePage === 1}>
          Previous Cuisine Page
        </button>
        <span>Page {currentCuisinePage}</span>
        <button
          onClick={handleNextCuisinePage}
          disabled={currentCuisinePage >= Math.ceil(cuisines.length / itemsPerPage)}
        >
          Next Cuisine Page
        </button>
      </div>

      {selectedCuisine && (
        <div className="modal-overlay" onClick={() => setSelectedCuisine(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Restaurants Serving {selectedCuisine}</h2>
            <div className="restaurant-list">
              {paginateData(restaurantData[selectedCuisine.toLowerCase()] || [], currentRestaurantPage).map((restaurant, index) => (
                <button
                  key={index}
                  className="restaurant-btn"
                  onClick={() => handleRestaurantClick(restaurant.name)}
                >
                  <strong>{restaurant.name}</strong> — {restaurant.rating}⭐ ({restaurant.priceRange})
                </button>
              ))}
            </div>
            <div className="pagination-controls">
              <button onClick={handlePrevRestaurantPage} disabled={currentRestaurantPage === 1}>
                Previous Restaurant Page
              </button>
              <span>Page {currentRestaurantPage}</span>
              <button
                onClick={handleNextRestaurantPage}
                disabled={currentRestaurantPage >= Math.ceil((restaurantData[selectedCuisine.toLowerCase()]?.length || 0) / itemsPerPage)}
              >
                Next Restaurant Page
              </button>
            </div>
            <button className="close-btn" onClick={() => setSelectedCuisine(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
