import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './RestaurantPage.css';

const ITEMS_PER_PAGE = 9;

const RestaurantPage = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantId, setRestaurantId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`item-${index}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // more tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    const content = card.querySelector('.item-card-content');
    content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    card.classList.add('hover-effect');
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`item-${index}`);
    const content = card.querySelector('.item-card-content');
    content.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    card.classList.remove('hover-effect');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user?.user_id) {
      setCurrentUser(user);
    } else {
      console.warn("User not found in localStorage.");
    }
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/custom/get/restaurantitems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.replace(/-/g, ' ') }),
        });

        const data = await response.json();
        if (data?.payload) {
          setItems(data.payload);
          if (data.payload.length > 0) {
            setRestaurantId(data.payload[0].restaurant_id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch restaurant items:', err);
      }
    };

    fetchItems();
  }, [name]);

  const handleConfirmSubscription = async () => {
    if (!currentUser?.user_id || !restaurantId) {
      console.log(currentUser);
      console.log("Restaurant Id: ", restaurantId);
      toast.error("User or restaurant information is missing."); // Use Toastify for error message
      return;
    }

    try {
      console.log(restaurantId);
      const res = await fetch('http://localhost:3000/api/crud/user_discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry: [{ user_id: currentUser.user_id, restaurant_id: restaurantId }],
          table: 'user_discounts',
        }),
      });

      const result = await res.json();
      console.log('Subscription success:', result);
      toast.success("You're subscribed to discount updates!"); // Use Toastify for success message
    } catch (err) {
      console.error('Subscription failed:', err);
      toast.error("There was an error subscribing."); // Use Toastify for error message
    } finally {
      setShowConfirmModal(false);
    }
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="restaurant-page">
      <ToastContainer />

      <div className="restaurant-card">
        <h1 className="restaurant-name">{name.replace(/-/g, ' ')}</h1>
        <p className="restaurant-description">Explore our menu and specials!</p>
        <button className="save-page-button" onClick={() => setShowConfirmModal(true)}>
          Save This Page
        </button>
      </div>

      <div className="items-grid">
        {paginatedItems.map((item, index) => (
          <div
            className="item-card"
            key={item.id}
            id={`item-${index}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="item-card-content">
              <img
                src={`http://localhost:3000/uploads${item.attachment_url}`}
                alt={item.name}
                className="item-image"
              />
              <h3>{item.name}</h3>
              <p>Rs {item.price.toFixed(2)}</p>
              <p>Rating: {item.rating?.toFixed(1) || 'No ratings yet'} ⭐</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next ➡
          </button>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Subscribe for Discounts</h2>
            <p>Are you sure you want to receive email updates when discounts go live?</p>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={handleConfirmSubscription}
                style={{ marginRight: '10px', background: '#328E6E', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none' }}
              >
                Yes, Notify Me
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ background: '#ccc', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantPage;
