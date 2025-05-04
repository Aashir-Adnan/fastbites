// Initial dining hall menu data
const initialDiningHallData = {
    fastFood: [
      {
        id: 'original-chicken-1',
        name: 'Original Chicken',
        price: 5.00,
        description: 'Classic crispy fried chicken',
        category: 'Fast Food',
        isAvailable: true,
        rating: 4.5
      },
      {
        id: 'spicy-chicken-1',
        name: 'Spicy Chicken',
        price: 5.50,
        description: 'Hot and spicy fried chicken',
        category: 'Fast Food',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'zinger-burger-1',
        name: 'Zinger Burger',
        price: 6.00,
        description: 'Crispy chicken burger with special sauce',
        category: 'Fast Food',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'popcorn-chicken-1',
        name: 'Popcorn Chicken',
        price: 4.50,
        description: 'Bite-sized crispy chicken pieces',
        category: 'Fast Food',
        isAvailable: true,
        rating: 4.4
      },
      {
        id: 'twister-wrap-1',
        name: 'Twister Wrap',
        price: 5.20,
        description: 'Chicken wrap with fresh vegetables',
        category: 'Fast Food',
        isAvailable: true,
        rating: 4.3
      }
    ],
    desiFood: [
      {
        id: 'original-chicken-2',
        name: 'Original Chicken',
        price: 5.00,
        description: 'Traditional spiced chicken',
        category: 'Desi Food',
        isAvailable: true,
        rating: 4.5
      },
      {
        id: 'spicy-chicken-2',
        name: 'Spicy Chicken',
        price: 5.50,
        description: 'Extra spicy traditional chicken',
        category: 'Desi Food',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'zinger-burger-2',
        name: 'Zinger Burger',
        price: 6.00,
        description: 'Spicy chicken burger with desi twist',
        category: 'Desi Food',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'popcorn-chicken-2',
        name: 'Popcorn Chicken',
        price: 4.50,
        description: 'Masala-spiced chicken bites',
        category: 'Desi Food',
        isAvailable: true,
        rating: 4.4
      },
      {
        id: 'twister-wrap-2',
        name: 'Twister Wrap',
        price: 5.20,
        description: 'Indian-style chicken wrap',
        category: 'Desi Food',
        isAvailable: true,
        rating: 4.3
      }
    ],
    drinks: [
      {
        id: 'americano-1',
        name: 'Americano',
        price: 3.00,
        description: 'Classic black coffee',
        category: 'Drinks',
        isAvailable: true,
        rating: 4.5
      },
      {
        id: 'cappuccino-1',
        name: 'Cappuccino',
        price: 3.00,
        description: 'Espresso with steamed milk foam',
        category: 'Drinks',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'double-espresso-1',
        name: 'Double Espresso',
        price: 3.50,
        description: 'Double shot of pure espresso',
        category: 'Drinks',
        isAvailable: true,
        rating: 4.4
      },
      {
        id: 'latte-1',
        name: 'Latte',
        price: 4.20,
        description: 'Espresso with steamed milk',
        category: 'Drinks',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'macchiato-1',
        name: 'Macchiato',
        price: 4.50,
        description: 'Espresso with a dash of milk',
        category: 'Drinks',
        isAvailable: true,
        rating: 4.5
      }
    ],
    chineseFood: [
      {
        id: 'chicken-chowmein-1',
        name: 'Chicken Chowmein',
        price: 6.50,
        description: 'Stir-fried noodles with chicken and vegetables',
        category: 'Chinese Food',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'fried-rice-1',
        name: 'Fried Rice',
        price: 5.00,
        description: 'Chinese-style fried rice with vegetables',
        category: 'Chinese Food',
        isAvailable: true,
        rating: 4.4
      },
      {
        id: 'manchurian-1',
        name: 'Manchurian',
        price: 7.00,
        description: 'Vegetable or chicken manchurian in gravy',
        category: 'Chinese Food',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'spring-rolls-1',
        name: 'Spring Rolls',
        price: 4.00,
        description: 'Crispy rolls with vegetable filling',
        category: 'Chinese Food',
        isAvailable: true,
        rating: 4.5
      },
      {
        id: 'sweet-sour-soup-1',
        name: 'Sweet & Sour Soup',
        price: 3.50,
        description: 'Traditional Chinese soup',
        category: 'Chinese Food',
        isAvailable: true,
        rating: 4.3
      }
    ],
    italianFood: [
      {
        id: 'margherita-pizza-1',
        name: 'Margherita Pizza',
        price: 8.00,
        description: 'Classic pizza with tomato and mozzarella',
        category: 'Italian Food',
        isAvailable: true,
        rating: 4.8
      },
      {
        id: 'pasta-alfredo-1',
        name: 'Pasta Alfredo',
        price: 7.50,
        description: 'Creamy pasta with parmesan',
        category: 'Italian Food',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'lasagna-1',
        name: 'Lasagna',
        price: 9.00,
        description: 'Layered pasta with meat and cheese',
        category: 'Italian Food',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'garlic-bread-1',
        name: 'Garlic Bread',
        price: 3.00,
        description: 'Toasted bread with garlic butter',
        category: 'Italian Food',
        isAvailable: true,
        rating: 4.4
      },
      {
        id: 'tiramisu-1',
        name: 'Tiramisu',
        price: 5.00,
        description: 'Classic Italian coffee dessert',
        category: 'Italian Food',
        isAvailable: true,
        rating: 4.9
      }
    ],
    desserts: [
      {
        id: 'ice-cream-1',
        name: 'Ice Cream',
        price: 2.50,
        description: 'Variety of flavors available',
        category: 'Desserts',
        isAvailable: true,
        rating: 4.5
      },
      {
        id: 'chocolate-cake-1',
        name: 'Chocolate Cake',
        price: 4.00,
        description: 'Rich chocolate layer cake',
        category: 'Desserts',
        isAvailable: true,
        rating: 4.7
      },
      {
        id: 'apple-pie-1',
        name: 'Apple Pie',
        price: 3.50,
        description: 'Classic apple pie with cinnamon',
        category: 'Desserts',
        isAvailable: true,
        rating: 4.6
      },
      {
        id: 'brownie-1',
        name: 'Brownie',
        price: 3.00,
        description: 'Warm chocolate brownie',
        category: 'Desserts',
        isAvailable: true,
        rating: 4.8
      },
      {
        id: 'cheesecake-1',
        name: 'Cheesecake',
        price: 4.50,
        description: 'New York style cheesecake',
        category: 'Desserts',
        isAvailable: true,
        rating: 4.9
      }
    ]
};

// Initialize dining hall data in localStorage
export const initializeDiningHallData = () => {
    localStorage.setItem('diningHallData', JSON.stringify(initialDiningHallData));
};

// Get menu data for page 1 (Fast Food, Desi Food, Drinks)
export const getPageData = () => {
  const data = JSON.parse(localStorage.getItem('diningHallData') || '{}');
  console.log(data);
  return data || {};
};


// Update item availability
export const updateItemAvailability = (pageId, categoryId, itemId, isAvailable) => {
  const data = JSON.parse(localStorage.getItem('diningHallData'));
  const page = data[pageId];
  const category = page[categoryId];
  
  const itemIndex = category.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    category[itemIndex].isAvailable = isAvailable;
    localStorage.setItem('diningHallData', JSON.stringify(data));
    return true;
  }
  return false;
};

// Update item rating
export const updateItemRating = (pageId, categoryId, itemId, rating) => {
  const data = JSON.parse(localStorage.getItem('diningHallData'));
  const page = data[pageId];
  const category = page[categoryId];
  
  const itemIndex = category.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    category[itemIndex].rating = rating;
    localStorage.setItem('diningHallData', JSON.stringify(data));
    return true;
  }
  return false;
}; 