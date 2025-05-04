// Initial restaurant data
const initialRestaurantData = {
  restaurants: [
    {
      id: 1,
      name: 'KFC',
      image: '/images/kfc.jpg',
      rating: 4.5,
      menu: [
        {
          id: 101,
          name: 'Original Chicken',
          price: 5.00,
          description: 'Classic fried chicken with 11 herbs and spices',
          image: '/images/original-chicken.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 102,
          name: 'Spicy Chicken',
          price: 5.50,
          description: 'Extra spicy fried chicken with special seasoning',
          image: '/images/spicy-chicken.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 103,
          name: 'Zinger Burger',
          price: 6.00,
          description: 'Crispy chicken fillet with spicy sauce',
          image: '/images/zinger.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 104,
          name: 'Popcorn Chicken',
          price: 4.50,
          description: 'Bite-sized pieces of crispy chicken',
          image: '/images/popcorn-chicken.jpg',
          isAvailable: true,
          rating: 4.3
        },
        {
          id: 105,
          name: 'Twister Wrap',
          price: 5.20,
          description: 'Grilled chicken with fresh vegetables in a tortilla',
          image: '/images/twister.jpg',
          isAvailable: true,
          rating: 4.5
        }
      ]
    },
    {
      id: 2,
      name: 'MCDONALDS',
      image: '/images/mcdonalds.jpg',
      rating: 4.3,
      menu: [
        {
          id: 201,
          name: 'Big Mac',
          price: 5.00,
          description: 'Two beef patties with special sauce',
          image: '/images/big-mac.jpg',
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 202,
          name: 'McChicken',
          price: 5.50,
          description: 'Crispy chicken patty with lettuce and mayo',
          image: '/images/mcchicken.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 203,
          name: 'Quarter Pounder',
          price: 6.00,
          description: 'Quarter pound beef patty with cheese',
          image: '/images/quarter-pounder.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 204,
          name: 'McNuggets',
          price: 4.50,
          description: 'Crispy chicken nuggets with dipping sauce',
          image: '/images/mcnuggets.jpg',
          isAvailable: true,
          rating: 4.3
        },
        {
          id: 205,
          name: 'McWrap',
          price: 5.20,
          description: 'Grilled chicken with fresh vegetables',
          image: '/images/mcwrap.jpg',
          isAvailable: true,
          rating: 4.4
        }
      ]
    },
    {
      id: 3,
      name: 'BURGER LAB',
      image: '/images/burger-lab.jpg',
      rating: 4.7,
      menu: [
        {
          id: 301,
          name: 'Classic Burger',
          price: 5.00,
          description: 'Angus beef patty with classic toppings',
          image: '/images/classic-burger.jpg',
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 302,
          name: 'Spicy Burger',
          price: 5.50,
          description: 'Spicy beef patty with jalapeños',
          image: '/images/spicy-burger.jpg',
          isAvailable: true,
          rating: 4.6
        },
        {
          id: 303,
          name: 'Cheese Burger',
          price: 6.00,
          description: 'Double cheese with special sauce',
          image: '/images/cheese-burger.jpg',
          isAvailable: true,
          rating: 4.8
        },
        {
          id: 304,
          name: 'Veggie Burger',
          price: 4.50,
          description: 'Plant-based patty with fresh vegetables',
          image: '/images/veggie-burger.jpg',
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 305,
          name: 'Chicken Burger',
          price: 5.20,
          description: 'Grilled chicken with special sauce',
          image: '/images/chicken-burger.jpg',
          isAvailable: true,
          rating: 4.5
        }
      ]
    }
  ]
};

export const initializeRestaurantData = () => {
  if (!localStorage.getItem('restaurantData')) {
    localStorage.setItem('restaurantData', JSON.stringify(initialRestaurantData));
  }
};

export const getAllRestaurants = () => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
  return restaurantData.restaurants || [];
};

export const getRestaurantById = (restaurantId) => {
  const restaurants = getAllRestaurants();
  return restaurants.find(restaurant => restaurant.id === restaurantId);
};

export const addRestaurant = (restaurant) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  restaurantData.restaurants.push({
    ...restaurant,
    id: Date.now(),
    menu: []
  });
  localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
  return true;
};

export const updateRestaurant = (restaurantId, updates) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  const restaurantIndex = restaurantData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    restaurantData.restaurants[restaurantIndex] = {
      ...restaurantData.restaurants[restaurantIndex],
      ...updates
    };
    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    return true;
  }
  return false;
};

export const deleteRestaurant = (restaurantId) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  restaurantData.restaurants = restaurantData.restaurants.filter(r => r.id !== restaurantId);
  localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
  return true;
};

export const addMenuItem = (restaurantId, item) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  const restaurantIndex = restaurantData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    restaurantData.restaurants[restaurantIndex].menu.push({
      ...item,
      id: Date.now(),
      isAvailable: true,
      rating: 0
    });
    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    return true;
  }
  return false;
};

export const updateMenuItem = (restaurantId, itemId, updates) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  const restaurantIndex = restaurantData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    const itemIndex = restaurantData.restaurants[restaurantIndex].menu.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      restaurantData.restaurants[restaurantIndex].menu[itemIndex] = {
        ...restaurantData.restaurants[restaurantIndex].menu[itemIndex],
        ...updates
      };
      localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
      return true;
    }
  }
  return false;
};

export const deleteMenuItem = (restaurantId, itemId) => {
  const restaurantData = JSON.parse(localStorage.getItem('restaurantData'));
  const restaurantIndex = restaurantData.restaurants.findIndex(r => r.id === restaurantId);
  
  if (restaurantIndex !== -1) {
    restaurantData.restaurants[restaurantIndex].menu = restaurantData.restaurants[restaurantIndex].menu.filter(
      item => item.id !== itemId
    );
    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    return true;
  }
  return false;
}; 