// Initial menu data
const initialMenuData = {
  categories: [
    {
      id: 1,
      name: "Breakfast",
      items: [
        {
          id: 101,
          name: "Masala Dosa",
          price: 40,
          description: "Crispy rice crepe with spiced potato filling",
          image: "/images/masala-dosa.jpg",
          isAvailable: true,
          rating: 4.5
        },
        {
          id: 102,
          name: "Idli Sambar",
          price: 30,
          description: "Steamed rice cakes with lentil soup",
          image: "/images/idli.jpg",
          isAvailable: true,
          rating: 4.3
        }
      ]
    },
    {
      id: 2,
      name: "Lunch",
      items: [
        {
          id: 201,
          name: "Veg Thali",
          price: 80,
          description: "Complete meal with roti, rice, dal, and sabzi",
          image: "/images/thali.jpg",
          isAvailable: true,
          rating: 4.4
        },
        {
          id: 202,
          name: "Chicken Biryani",
          price: 120,
          description: "Fragrant rice cooked with spiced chicken",
          image: "/images/biryani.jpg",
          isAvailable: true,
          rating: 4.6
        }
      ]
    },
    {
      id: 3,
      name: "Snacks",
      items: [
        {
          id: 301,
          name: "Samosa",
          price: 15,
          description: "Crispy pastry with spiced potato filling",
          image: "/images/samosa.jpg",
          isAvailable: true,
          rating: 4.7
        },
        {
          id: 302,
          name: "Vada Pav",
          price: 20,
          description: "Spiced potato patty in a bun",
          image: "/images/vada-pav.jpg",
          isAvailable: true,
          rating: 4.5
        }
      ]
    }
  ]
};

// Initialize menu data in localStorage if not exists
export const initializeMenuData = () => {
  console.log('Checking if menuData exists in localStorage...');
  const existingData = localStorage.getItem('menuData');
  if (!existingData) {
    console.log('menuData not found, initializing with default data...');
    localStorage.setItem('menuData', JSON.stringify(initialMenuData));
    console.log('Default data initialized:', initialMenuData);
  } else {
    console.log('menuData already exists in localStorage');
  }
};

// Get all menu categories with items
export const getAllMenuData = () => {
  console.log('Getting all menu data from localStorage...');
  const menuData = JSON.parse(localStorage.getItem('menuData') || '{}');
  console.log('Retrieved menuData:', menuData);
  const categories = menuData.categories || [];
  console.log('Returning categories:', categories);
  return categories;
};

// Get menu items by category
export const getMenuItemsByCategory = (categoryId) => {
  const menuData = getAllMenuData();
  const category = menuData.find(cat => cat.id === categoryId);
  return category ? category.items : [];
};

// Add new menu item
export const addMenuItem = (categoryId, item) => {
  const menuData = JSON.parse(localStorage.getItem('menuData'));
  const categoryIndex = menuData.categories.findIndex(cat => cat.id === categoryId);
  
  if (categoryIndex !== -1) {
    menuData.categories[categoryIndex].items.push({
      ...item,
      id: Date.now(),
      isAvailable: true,
      rating: 0
    });
    localStorage.setItem('menuData', JSON.stringify(menuData));
    return true;
  }
  return false;
};

// Update menu item
export const updateMenuItem = (categoryId, itemId, updates) => {
  const menuData = JSON.parse(localStorage.getItem('menuData'));
  const categoryIndex = menuData.categories.findIndex(cat => cat.id === categoryId);
  
  if (categoryIndex !== -1) {
    const itemIndex = menuData.categories[categoryIndex].items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      menuData.categories[categoryIndex].items[itemIndex] = {
        ...menuData.categories[categoryIndex].items[itemIndex],
        ...updates
      };
      localStorage.setItem('menuData', JSON.stringify(menuData));
      return true;
    }
  }
  return false;
};

// Delete menu item
export const deleteMenuItem = (categoryId, itemId) => {
  const menuData = JSON.parse(localStorage.getItem('menuData'));
  const categoryIndex = menuData.categories.findIndex(cat => cat.id === categoryId);
  
  if (categoryIndex !== -1) {
    menuData.categories[categoryIndex].items = menuData.categories[categoryIndex].items.filter(
      item => item.id !== itemId
    );
    localStorage.setItem('menuData', JSON.stringify(menuData));
    return true;
  }
  return false;
};

// Update item availability
export const updateItemAvailability = (categoryId, itemId, isAvailable) => {
  return updateMenuItem(categoryId, itemId, { isAvailable });
};

// Update item rating
export const updateItemRating = (categoryId, itemId, rating) => {
  return updateMenuItem(categoryId, itemId, { rating });
};

// Function to get menu items based on user role
export const getMenuItems = (role) => {
  const menuData = JSON.parse(localStorage.getItem('menuData') || '{}');
  return menuData.categories || [];
};

// Function to update menu data
export const updateMenuData = (role, newMenuItems) => {
  const currentData = JSON.parse(localStorage.getItem('menuData') || '{}');
  currentData.categories = newMenuItems;
  localStorage.setItem('menuData', JSON.stringify(currentData));
}; 