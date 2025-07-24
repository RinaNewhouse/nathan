// Birthday Wishes Data - Persisted in localStorage
const STORAGE_KEY = 'nathan-birthday-wishes';

// Load wishes from localStorage or use empty array
const loadWishes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading wishes from localStorage:', error);
    return [];
  }
};

// Save wishes to localStorage
const saveWishes = (wishes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch (error) {
    console.error('Error saving wishes to localStorage:', error);
  }
};

export let birthdayWishes = loadWishes();

export const addWish = (wish) => {
  const newWish = {
    id: Date.now(),
    timestamp: new Date().toISOString().split('T')[0],
    ...wish
  };
  birthdayWishes.push(newWish);
  saveWishes(birthdayWishes);
  return newWish;
};

export const updateWish = (id, updatedWish) => {
  const index = birthdayWishes.findIndex(w => w.id === id);
  if (index !== -1) {
    birthdayWishes[index] = { ...birthdayWishes[index], ...updatedWish };
    saveWishes(birthdayWishes);
    return birthdayWishes[index];
  }
  return null;
};

export const deleteWish = (id) => {
  const index = birthdayWishes.findIndex(w => w.id === id);
  if (index !== -1) {
    const deletedWish = birthdayWishes.splice(index, 1)[0];
    saveWishes(birthdayWishes);
    return deletedWish;
  }
  return null;
};

export const getWishesStats = () => {
  const uniquePeopleCount = new Set(birthdayWishes.map(w => w.name)).size;
  return {
    totalWishes: birthdayWishes.length,
    uniquePeople: uniquePeopleCount,
    peopleLabel: uniquePeopleCount === 1 ? 'Person' : 'People'
  };
};

// Function to refresh wishes from localStorage (useful for cross-tab sync)
export const refreshWishes = () => {
  birthdayWishes = loadWishes();
  return birthdayWishes;
};
