import React, { useState, useEffect } from 'react';
import './CampusDiningHall.css';
import foodplaceholder from '../assets/foodplaceholder.jpeg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CampusDiningHall = () => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const itemsPerPage = 3; // Display 3 sections per page
  const handleReviewSubmit = async () => {
    if (!reviewRating) {
      toast.warning("Please select a rating.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/crud/rating`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "dininghall",
          id: selectedItem.id,
          data: {
            rating: (reviewRating + selectedItem.rating * selectedItem.rating_count) / (selectedItem.rating_count + 1),
            rating_count: selectedItem.rating_count + 1
          }
        }),
      });
  
      const result = await response.json();
      toast.success("Review submitted successfully!");
      setTimeout(() => {
        window.location.reload(); // Refresh page after toast
      }, 1000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review.");
    }
  };
  
  
  
  useEffect(() => {
    // Fetch the dining hall data from the API
    const fetchDiningHallData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/crud/dininghall');
        const data = await response.json();
        const categorizedData = data.payload.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
        
        setMenuData(categorizedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dining hall data:", error);
        setIsLoading(false);
      }
    };

    fetchDiningHallData();
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
      <ToastContainer position="top-center" autoClose={2000} />
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
                    onClick={() => setSelectedItem(item)}
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
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.attachment_url || foodplaceholder} alt={selectedItem.name} className="modal-image"/>
            <p><strong>Price:</strong> Rs {selectedItem.price.toFixed(2)}</p>
            <p><strong>Rating: </strong> {selectedItem.rating}⭐</p>
            <p><strong>Availability:</strong> {selectedItem.isAvailable ? '✅' : '❌'}</p>

            {/* ⭐ Star Rating Section */}
            <div className="star-rating">
              <p><strong>Your Rating:</strong></p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-icon ${hoverRating >= star || reviewRating >= star ? 'filled' : ''}`}
                  onClick={() => setReviewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>


            <button className="submit-rating-button" onClick={handleReviewSubmit}>
              Submit Review
            </button>

            <button className="close-button" onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}


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
