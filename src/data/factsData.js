// Nathan Facts Data - Persisted in localStorage
const STORAGE_KEY = 'nathan-facts';

// Initial facts data
const initialFacts = [
  {
    id: 1,
    category: 'Sports',
    fact: "Nathan is a Chicago native and is obsessed with the Cubs, Bears, and Illini College basketball and football!",
    emoji: "⚾",
    detail: "He recently got an autograph from Bubić, a Cubs player. Nathan also loves seeing the Cubs World Series win live at Wrigley Field in 2016!"
  },
  {
    id: 2,
    category: 'Running',
    fact: "Nathan is an avid runner who runs 4-6 miles every morning!",
    emoji: "🏃‍♂️",
    detail: "He ran a sub-5 minute mile in Fall 2017, which is incredibly fast! Nathan joined the running team in high school and has been passionate about it ever since."
  },
  {
    id: 3,
    category: 'Food',
    fact: "Nathan loves Brazilian food and has been to Brazil once with his girlfriend Rina!",
    emoji: "🍽️",
    detail: "His dream vacation destinations are anywhere in South America - Argentina, Colombia, and Brazil (though he's already been there once)."
  },
  {
    id: 4,
    category: 'Daily Routine',
    fact: "Nathan religiously eats 2 Chobani key lime Greek yogurts and 2 RXBars every day!",
    emoji: "🥤",
    detail: "His favorite RXBar flavors are blueberry, chocolate sea salt, and chocolate peanut butter. He loves eating protein and has a huge stomach despite being slender due to running."
  },
  {
    id: 5,
    category: 'Food Paradoxes',
    fact: "Nathan doesn't like chickpeas but loves hummus, and doesn't like avocado but loves guacamole!",
    emoji: "🤔",
    detail: "This is one of his funny quirks - he enjoys the final products but not the individual ingredients!"
  },
  {
    id: 6,
    category: 'Career',
    fact: "Nathan is a data analyst at GEICO, and it's his favorite job so far!",
    emoji: "💼",
    detail: "He started there in April 2025. Nathan studied Industrial Engineering with a concentration in Operations Research and a minor in math at UIUC."
  },
  {
    id: 7,
    category: 'Education',
    fact: "Nathan graduated from UIUC in May 2022 with a degree in Industrial Engineering!",
    emoji: "🎓",
    detail: "He went to UIUC from Fall 2018 to May 2022, studying Industrial Engineering with a concentration in Operations Research and a minor in math."
  },
  {
    id: 8,
    category: 'Family',
    fact: "Nathan has a younger sister named Camryn, born May 5, 2003!",
    emoji: "👨‍👩‍👧‍👦",
    detail: "He officially became a brother when Camryn was born. Nathan moved from Chicago to Hinsdale, IL in December 2002 in anticipation of his sister's birth."
  },
  {
    id: 9,
    category: 'Relationship',
    fact: "Nathan and Rina met on January 24th, 2020 at a Birthright reunion Shabbat dinner!",
    emoji: "💕",
    detail: "They both went on UIUC's birthright trips (Nathan in summer 2019, Rina in January 2020) and met at Illini Hillel. Both are Jewish and attended UIUC."
  },
  {
    id: 10,
    category: 'Personality',
    fact: "Nathan is very loyal, consistent, goal-oriented, and knows what he wants in life!",
    emoji: "⭐",
    detail: "He's very devoted to his family and girlfriend, listens intently, and makes things happen. Nathan is also neurodivergent like his girlfriend Rina."
  },
  {
    id: 11,
    category: 'Entertainment',
    fact: "Nathan would rather listen to Cubs podcasts than music!",
    emoji: "🎧",
    detail: "He doesn't have a specific music type preference. Nathan loves classic movies like Home Alone, Meet the Parents, Ferris Bueller's Day Off, and Indiana Jones."
  },
  {
    id: 12,
    category: 'Travel',
    fact: "Nathan loves traveling internationally, especially to South America!",
    emoji: "✈️",
    detail: "His dream destinations include Argentina and Colombia. He's already been to Brazil once with his girlfriend Rina, and loves exploring new places."
  }
];

// Load facts from localStorage or use initial data
const loadFacts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialFacts;
  } catch (error) {
    console.error('Error loading facts from localStorage:', error);
    return initialFacts;
  }
};

// Save facts to localStorage
const saveFacts = (facts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(facts));
  } catch (error) {
    console.error('Error saving facts to localStorage:', error);
  }
};

export let nathanFacts = loadFacts();

export const addFact = (fact) => {
  const newFact = {
    id: Date.now(),
    dateAdded: new Date().toISOString().split('T')[0],
    ...fact
  };
  nathanFacts.push(newFact);
  saveFacts(nathanFacts);
  return newFact;
};

export const updateFact = (id, updatedFact) => {
  const index = nathanFacts.findIndex(f => f.id === id);
  if (index !== -1) {
    nathanFacts[index] = { ...nathanFacts[index], ...updatedFact };
    saveFacts(nathanFacts);
    return nathanFacts[index];
  }
  return null;
};

export const deleteFact = (id) => {
  const index = nathanFacts.findIndex(f => f.id === id);
  if (index !== -1) {
    const deletedFact = nathanFacts.splice(index, 1)[0];
    saveFacts(nathanFacts);
    return deletedFact;
  }
  return null;
};

export const getFactsByCategory = (category) => {
  return nathanFacts.filter(fact => fact.category === category);
};

// Function to refresh facts from localStorage (useful for cross-tab sync)
export const refreshFacts = () => {
  nathanFacts = loadFacts();
  return nathanFacts;
};

export const getFactsStats = () => {
  const totalFacts = nathanFacts.length;
  const uniqueContributors = new Set(nathanFacts.filter(f => f.addedBy).map(f => f.addedBy)).size;
  return {
    totalFacts: totalFacts,
    factsLabel: totalFacts === 1 ? 'Fact' : 'Facts',
    uniqueContributors: uniqueContributors,
    contributorsLabel: uniqueContributors === 1 ? 'Contributor' : 'Contributors'
  };
}; 