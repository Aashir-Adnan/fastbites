import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = () => {
  const navigate = useNavigate();

  const specialSelections = [
    {
      name: 'SEA SALT CARAMEL',
      price: '4.57',
      description: 'Mouthwatering caramel with a sprinkling of sea salt',
      isSpicy: false
    },
    {
      name: 'WENDELL',
      price: '5.00',
      description: 'A mix of smooth vanilla with the subtle crunch of tasty cinnamon swirls',
      isSpicy: true
    },
    {
      name: 'THAI TEA',
      price: '6.90',
      description: 'A satisfying blend of milky vanilla goodness and Thai tea sweetness',
      isSpicy: false
    }
  ];

  const handleItemClick = (item) => {
    navigate('/item-details', {
      state: { item }
    });
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-content">
        <h1 className="recommendations-title">SPECIAL SELECTIONS</h1>
        
        <div className="menu-items">
          {specialSelections.map((item, index) => (
            <div 
              key={index} 
              className="menu-item"
              onClick={() => handleItemClick(item)}
            >
              <div className="item-header">
                <h2 className="item-name">{item.name}</h2>
                <span className="item-price">${item.price}</span>
                {item.isSpicy && <span className="spicy-icon">🔥</span>}
              </div>
              <p className="item-description">{item.description}</p>
            </div>
          ))}
        </div>

        <button 
          className="order-now-button"
          onClick={() => navigate('/order-summary')}
        >
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default Recommendations; 