// Initial drinks restaurant data
const initialDrinksData = {
  restaurants: [
    {
      id: 1,
      name: 'STARBUCKS',
      menu: [
        {
          id: 101,
          name: 'Caramel Frappuccino',
          price: 4.99,
          description: 'Sweet caramel blended with coffee, milk and ice',
          image: '/images/caramel-frappuccino.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 102,
          name: 'Iced Latte',
          price: 3.99,
          description: 'Espresso mixed with cold milk over ice',
          image: '/images/iced-latte.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 103,
          name: 'Hot Chocolate',
          price: 3.49,
          description: 'Rich chocolate steamed with milk',
          image: '/images/hot-chocolate.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 104,
          name: 'Green Tea Lemonade',
          price: 3.99,
          description: 'Green tea blended with lemonade and ice',
          image: '/images/green-tea-lemonade.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 105,
          name: 'Chai Tea Latte',
          price: 4.49,
          description: 'Black tea infused with cinnamon and spices',
          image: '/images/chai-latte.jpg',
          isAvailable: true,
          rating: 4.8
        }
      ]
    },
    {
      id: 2,
      name: 'DUNKIN DONUTS',
      menu: [
        {
          id: 201,
          name: 'Iced Coffee',
          price: 2.99,
          description: 'Freshly brewed coffee served over ice',
          image: '/images/iced-coffee.jpg',
          isAvailable: true,
          rating: 4.3
        },
        {
          id: 202,
          name: 'Frozen Chocolate',
          price: 4.49,
          description: 'Blended chocolate drink topped with whipped cream',
          image: '/images/frozen-chocolate.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 203,
          name: 'Coolatta',
          price: 4.99,
          description: 'Frozen beverage in various flavors',
          image: '/images/coolatta.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 204,
          name: 'Hot Coffee',
          price: 2.49,
          description: 'Classic hot brewed coffee',
          image: '/images/hot-coffee.jpg',
          isAvailable: true,
          rating: 4.2
        },
        {
          id: 205,
          name: 'Vanilla Chai',
          price: 3.99,
          description: 'Spiced chai tea with vanilla flavor',
          image: '/images/vanilla-chai.jpg',
          isAvailable: true,
          rating: 4.6
        }
      ]
    },
    {
      id: 3,
      name: 'JUICE WORLD',
      menu: [
        {
          id: 301,
          name: 'Fresh Orange Juice',
          price: 3.99,
          description: 'Freshly squeezed orange juice',
          image: '/images/orange-juice.jpg',
          isAvailable: true,
          rating: 4.8
        },
        {
          id: 302,
          name: 'Green Smoothie',
          price: 5.49,
          description: 'Blend of spinach, kale, and fruits',
          image: '/images/green-smoothie.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 303,
          name: 'Berry Blast',
          price: 5.99,
          description: 'Mixed berry smoothie with yogurt',
          image: '/images/berry-blast.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 304,
          name: 'Mango Lassi',
          price: 4.49,
          description: 'Indian yogurt drink with mango',
          image: '/images/mango-lassi.jpg',
          isAvailable: true,
          rating: 4.9
        },
        {
          id: 305,
          name: 'Watermelon Juice',
          price: 3.99,
          description: 'Fresh watermelon juice',
          image: '/images/watermelon-juice.jpg',
          isAvailable: true,
          rating: 4.5
        }
      ]
    }
  ]
};

// Initialize drinks data in localStorage if not exists
export const initializeDrinksData = () => {
  if (!localStorage.getItem('drinksData')) {
    localStorage.setItem('drinksData', JSON.stringify(initialDrinksData));
  }
};

// Get all restaurants with their menus
export const getAllDrinksRestaurants = () => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData') || '{}');
  return drinksData.restaurants || [];
};

// Get restaurant by ID
export const getDrinksRestaurantById = (restaurantId) => {
  const restaurants = getAllDrinksRestaurants();
  return restaurants.find(restaurant => restaurant.id === restaurantId);
};

// Add new restaurant
export const addDrinksRestaurant = (restaurant) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  drinksData.restaurants.push({
    ...restaurant,
    id: Date.now(),
    menu: []
  });
  localStorage.setItem('drinksData', JSON.stringify(drinksData));
  return true;
};

// Update restaurant
export const updateDrinksRestaurant = (restaurantId, updates) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  const restaurantIndex = drinksData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    drinksData.restaurants[restaurantIndex] = {
      ...drinksData.restaurants[restaurantIndex],
      ...updates
    };
    localStorage.setItem('drinksData', JSON.stringify(drinksData));
    return true;
  }
  return false;
};

// Delete restaurant
export const deleteDrinksRestaurant = (restaurantId) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  drinksData.restaurants = drinksData.restaurants.filter(r => r.id !== restaurantId);
  localStorage.setItem('drinksData', JSON.stringify(drinksData));
  return true;
};

// Add menu item to restaurant
export const addDrinksMenuItem = (restaurantId, item) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  const restaurantIndex = drinksData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    drinksData.restaurants[restaurantIndex].menu.push({
      ...item,
      id: Date.now(),
      isAvailable: true,
      rating: 0
    });
    localStorage.setItem('drinksData', JSON.stringify(drinksData));
    return true;
  }
  return false;
};

// Update menu item
export const updateDrinksMenuItem = (restaurantId, itemId, updates) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  const restaurantIndex = drinksData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    const itemIndex = drinksData.restaurants[restaurantIndex].menu.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      drinksData.restaurants[restaurantIndex].menu[itemIndex] = {
        ...drinksData.restaurants[restaurantIndex].menu[itemIndex],
        ...updates
      };
      localStorage.setItem('drinksData', JSON.stringify(drinksData));
      return true;
    }
  }
  return false;
};

// Delete menu item
export const deleteDrinksMenuItem = (restaurantId, itemId) => {
  const drinksData = JSON.parse(localStorage.getItem('drinksData'));
  const restaurantIndex = drinksData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    drinksData.restaurants[restaurantIndex].menu = drinksData.restaurants[restaurantIndex].menu.filter(
      item => item.id !== itemId
    );
    localStorage.setItem('drinksData', JSON.stringify(drinksData));
    return true;
  }
  return false;
}; 