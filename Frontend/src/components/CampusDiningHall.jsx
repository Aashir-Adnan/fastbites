import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeDiningHallData, getPageData } from '../data/diningHallData';
import './CampusDiningHall.css';

const CampusDiningHall = () => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3; // Display 3 sections per page

  useEffect(() => {
    // Initialize and load menu data
    initializeDiningHallData();
    const data = getPageData();
    setMenuData(data);
    setIsLoading(false);
  }, []);


  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next') {
        return Math.min(Math.ceil(Object.keys(menuData).length / itemsPerPage) - 1, prevPage + 1);
      }
      if (direction === 'prev') {
        return Math.max(0, prevPage - 1);
      }
      return prevPage;
    });
  };

  if (isLoading || !menuData) {
    return (
      <div className="dining-hall-container">
        <div className="loading">Loading menu...</div>
      </div>
    );
  }

  // Split data into chunks for pagination
  const sections = Object.keys(menuData);
  const currentSections = sections.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="dining-hall-container">
      <h1 className="dining-hall-title">CAMPUS DINING HALL</h1>
      
      <div className="menu-sections">
        {currentSections.map((sectionKey) => {
          const section = menuData[sectionKey];
          return (
            <div className="menu-section" key={sectionKey}>
              <h2 className="section-title">{sectionKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
              <div className="menu-items">
                {section.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`menu-item ${index % 2 === 0 ? 'yellow' : 'beige'}`}
                  >
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination-buttons">
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange('prev')} 
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="page-number">Page {currentPage + 1}</span>
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange('next')} 
          disabled={(currentPage + 1) * itemsPerPage >= sections.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampusDiningHall;
