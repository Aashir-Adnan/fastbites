// Initial chicken wings restaurant data
const initialChickenWingsData = {
  restaurants: [
    {
      id: 1,
      name: 'WINGSTOP',
      menu: [
        {
          id: 101,
          name: 'Classic Wings',
          price: 8.99,
          description: 'Traditional buffalo wings with your choice of sauce',
          image: '/images/classic-wings.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 102,
          name: 'Boneless Wings',
          price: 9.99,
          description: 'Crispy boneless wings with signature sauce',
          image: '/images/boneless-wings.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 103,
          name: 'Spicy Wings',
          price: 9.49,
          description: 'Extra spicy wings with hot sauce',
          image: '/images/spicy-wings.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 104,
          name: 'Honey BBQ Wings',
          price: 9.99,
          description: 'Sweet and smoky BBQ wings',
          image: '/images/honey-bbq-wings.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 105,
          name: 'Garlic Parmesan Wings',
          price: 9.99,
          description: 'Wings tossed in garlic parmesan sauce',
          image: '/images/garlic-parm-wings.jpg',
          isAvailable: true,
          rating: 4.5
        }
      ]
    },
    {
      id: 2,
      name: 'BUFFALO WILD WINGS',
      menu: [
        {
          id: 201,
          name: 'Traditional Wings',
          price: 8.99,
          description: 'Classic buffalo wings with signature sauce',
          image: '/images/traditional-wings.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 202,
          name: 'Boneless Wings',
          price: 9.99,
          description: 'Crispy boneless wings with choice of sauce',
          image: '/images/boneless-wings-bww.jpg',
          isAvailable: true,
          rating: 4.3
        },
        {
          id: 203,
          name: 'Blazin Wings',
          price: 9.49,
          description: 'Extremely hot wings with blazin sauce',
          image: '/images/blazin-wings.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 204,
          name: 'Honey BBQ Wings',
          price: 9.99,
          description: 'Sweet and tangy BBQ wings',
          image: '/images/honey-bbq-wings-bww.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 205,
          name: 'Asian Zing Wings',
          price: 9.99,
          description: 'Sweet and spicy Asian-style wings',
          image: '/images/asian-zing-wings.jpg',
          isAvailable: true,
          rating: 4.7
        }
      ]
    },
    {
      id: 3,
      name: 'POPEYES',
      menu: [
        {
          id: 301,
          name: 'Classic Wings',
          price: 7.99,
          description: 'Crispy fried wings with signature seasoning',
          image: '/images/classic-wings-popeyes.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 302,
          name: 'Spicy Wings',
          price: 8.49,
          description: 'Hot and spicy fried wings',
          image: '/images/spicy-wings-popeyes.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 303,
          name: 'Boneless Wings',
          price: 8.99,
          description: 'Crispy boneless chicken pieces',
          image: '/images/boneless-wings-popeyes.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 304,
          name: 'Family Pack Wings',
          price: 19.99,
          description: '20 pieces of mixed wings',
          image: '/images/family-pack-wings.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 305,
          name: 'Wing Combo',
          price: 9.99,
          description: '8 wings with fries and drink',
          image: '/images/wing-combo.jpg',
          isAvailable: true,
          rating: 4.5
        }
      ]
    }
  ]
};

// Initialize chicken wings data in localStorage if not exists
export const initializeChickenWingsData = () => {
  if (!localStorage.getItem('chickenWingsData')) {
    localStorage.setItem('chickenWingsData', JSON.stringify(initialChickenWingsData));
  }
};

// Get all restaurants with their menus
export const getAllChickenWingsRestaurants = () => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData') || '{}');
  return chickenWingsData.restaurants || [];
};

// Get restaurant by ID
export const getChickenWingsRestaurantById = (restaurantId) => {
  const restaurants = getAllChickenWingsRestaurants();
  return restaurants.find(restaurant => restaurant.id === restaurantId);
};

// Add new restaurant
export const addChickenWingsRestaurant = (restaurant) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  chickenWingsData.restaurants.push({
    ...restaurant,
    id: Date.now(),
    menu: []
  });
  localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
  return true;
};

// Update restaurant
export const updateChickenWingsRestaurant = (restaurantId, updates) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  const restaurantIndex = chickenWingsData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    chickenWingsData.restaurants[restaurantIndex] = {
      ...chickenWingsData.restaurants[restaurantIndex],
      ...updates
    };
    localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
    return true;
  }
  return false;
};

// Delete restaurant
export const deleteChickenWingsRestaurant = (restaurantId) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  chickenWingsData.restaurants = chickenWingsData.restaurants.filter(r => r.id !== restaurantId);
  localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
  return true;
};

// Add menu item to restaurant
export const addChickenWingsMenuItem = (restaurantId, item) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  const restaurantIndex = chickenWingsData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    chickenWingsData.restaurants[restaurantIndex].menu.push({
      ...item,
      id: Date.now(),
      isAvailable: true,
      rating: 0
    });
    localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
    return true;
  }
  return false;
};

// Update menu item
export const updateChickenWingsMenuItem = (restaurantId, itemId, updates) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  const restaurantIndex = chickenWingsData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    const itemIndex = chickenWingsData.restaurants[restaurantIndex].menu.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      chickenWingsData.restaurants[restaurantIndex].menu[itemIndex] = {
        ...chickenWingsData.restaurants[restaurantIndex].menu[itemIndex],
        ...updates
      };
      localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
      return true;
    }
  }
  return false;
};

// Delete menu item
export const deleteChickenWingsMenuItem = (restaurantId, itemId) => {
  const chickenWingsData = JSON.parse(localStorage.getItem('chickenWingsData'));
  const restaurantIndex = chickenWingsData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    chickenWingsData.restaurants[restaurantIndex].menu = chickenWingsData.restaurants[restaurantIndex].menu.filter(
      item => item.id !== itemId
    );
    localStorage.setItem('chickenWingsData', JSON.stringify(chickenWingsData));
    return true;
  }
  return false;
}; 