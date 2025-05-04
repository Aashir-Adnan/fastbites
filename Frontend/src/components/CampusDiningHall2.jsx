import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CampusDiningHall.css'; // Reusing the same CSS

const CampusDiningHall2 = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/order-summary');
  };

  const handleBack = () => {
    navigate('/dining-hall');
  };

  const handleItemClick = (item, category) => {
    const itemWithDetails = {
      ...item,
      restaurant: 'Campus Dining Hall',
      category: category,
      description: `Delicious ${item.name} from our ${category} menu`,
      isAvailable: true,
      rating: 4.5
    };
    
    navigate('/item-details', { 
      state: { 
        item: itemWithDetails
      } 
    });
  };

  const createMenuItem = (name, price) => ({
    name,
    price,
    id: `${name.toLowerCase().replace(/\s+/g, '-')}`
  });

  return (
    <div className="dining-hall-container">
      <h1 className="dining-hall-title">CAMPUS DINNIGN HALL</h1>
      
      <div className="menu-sections">
        {/* Chinese Food Section */}
        <div className="menu-section">
          <h2 className="section-title">CHINESE FOOD</h2>
          <div className="menu-items">
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Chicken Chowmein", 6.50), "Chinese Food")}
            >
              <span className="item-name">Chicken Chowmein</span>
              <span className="item-price">6.50</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Fried Rice", 5.00), "Chinese Food")}
            >
              <span className="item-name">Fried Rice</span>
              <span className="item-price">5.00</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Manchurian", 7.00), "Chinese Food")}
            >
              <span className="item-name">Manchurian</span>
              <span className="item-price">7.00</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Spring Rolls", 4.00), "Chinese Food")}
            >
              <span className="item-name">Spring Rolls</span>
              <span className="item-price">4.00</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Sweet & Sour Soup", 3.50), "Chinese Food")}
            >
              <span className="item-name">Sweet & Sour Soup</span>
              <span className="item-price">3.50</span>
            </div>
          </div>
        </div>

        {/* Italian Food Section */}
        <div className="menu-section">
          <h2 className="section-title">ITALIAN FOOD</h2>
          <div className="menu-items">
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Margherita Pizza", 8.00), "Italian Food")}
            >
              <span className="item-name">Margherita Pizza</span>
              <span className="item-price">8.00</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Pasta Alfredo", 7.50), "Italian Food")}
            >
              <span className="item-name">Pasta Alfredo</span>
              <span className="item-price">7.50</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Lasagna", 9.00), "Italian Food")}
            >
              <span className="item-name">Lasagna</span>
              <span className="item-price">9.00</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Garlic Bread", 3.00), "Italian Food")}
            >
              <span className="item-name">Garlic Bread</span>
              <span className="item-price">3.00</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Tiramisu", 5.00), "Italian Food")}
            >
              <span className="item-name">Tiramisu</span>
              <span className="item-price">5.00</span>
            </div>
          </div>
        </div>

        {/* Desserts Section */}
        <div className="menu-section">
          <h2 className="section-title">DESSERTS</h2>
          <div className="menu-items">
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Ice Cream", 2.50), "Desserts")}
            >
              <span className="item-name">Ice Cream</span>
              <span className="item-price">2.50</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Chocolate Cake", 4.00), "Desserts")}
            >
              <span className="item-name">Chocolate Cake</span>
              <span className="item-price">4.00</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Apple Pie", 3.50), "Desserts")}
            >
              <span className="item-name">Apple Pie</span>
              <span className="item-price">3.50</span>
            </div>
            <div 
              className="menu-item beige"
              onClick={() => handleItemClick(createMenuItem("Brownie", 3.00), "Desserts")}
            >
              <span className="item-name">Brownie</span>
              <span className="item-price">3.00</span>
            </div>
            <div 
              className="menu-item yellow"
              onClick={() => handleItemClick(createMenuItem("Cheesecake", 4.50), "Desserts")}
            >
              <span className="item-name">Cheesecake</span>
              <span className="item-price">4.50</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="order-now-button" onClick={handleOrderNow}>
          <img src="/order-now-icon.png" alt="Order Now" className="order-icon" />
          ORDER NOW
        </button>
        <button 
          className="next-button" 
          onClick={handleBack}
          style={{ backgroundColor: '#F5DEB3' }}
        >
          ⬅️ BACK
        </button>
      </div>
    </div>
  );
};

export default CampusDiningHall2; 