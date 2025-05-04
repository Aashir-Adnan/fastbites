import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('orderItems') || '[]');
    setOrderItems(items);
  }, []);

  const totalPrice = orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleLogout = () => {
    // Clear the order when logging out
    localStorage.removeItem('orderItems');
    navigate('/login');
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary-card">
        <h1 className="summary-title">Your order summary</h1>
        
        <div className="summary-content">
          <div className="summary-header">
            <span className="header-item">ITEM</span>
            <span className="header-price">PRICE</span>
          </div>
          
          <div className="order-items">
            {orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="total-section">
            <span className="total-label">Total:</span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          log out
        </button>
      </div>
      <div className="receipt-icon">📋</div>
    </div>
  );
};

export default OrderSummary; 