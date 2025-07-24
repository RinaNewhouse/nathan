// Timeline Events Data - Accurate Nathan timeline
export const timelineEvents = [
  {
    id: 1,
    year: 2000,
    age: 0,
    title: "Nathan Rohn Saltzman is Born! 🍼",
    description: "Nathan was born on July 23, 2000 in Chicago, IL!",
    emoji: "👶",
    category: "birth",
  },
  {
    id: 2,
    year: 2002,
    age: 2,
    title: "Moved to Hinsdale, IL 🏠",
    description: "Nathan and his family moved from Chicago to the suburbs in anticipation of his sister's birth.",
    emoji: "🏠",
    category: "milestone",
  },
  {
    id: 3,
    year: 2003,
    age: 3,
    title: "Became a Big Brother! 👨‍👩‍👧‍👦",
    description: "Nathan's sister Camryn was born on May 5, 2003, making him officially a brother!",
    emoji: "👨‍👩‍👧‍👦",
    category: "family",
  },
  {
    id: 4,
    year: 2005,
    age: 5,
    title: "Started Kindergarten 📚",
    description: "Nathan began his educational journey in the Hinsdale school system.",
    emoji: "📚",
    category: "education",
  },
  {
    id: 5,
    year: 2011,
    age: 11,
    title: "Started Middle School 🏫",
    description: "Nathan began middle school and continued his education in Hinsdale.",
    emoji: "🏫",
    category: "education",
  },
  {
    id: 6,
    year: 2014,
    age: 14,
    title: "High School & Running Team 🏃‍♂️",
    description: "Nathan started at Hinsdale Central High School and joined the running team, beginning his passion for running!",
    emoji: "🏃‍♂️",
    category: "sports",
  },
  {
    id: 7,
    year: 2016,
    age: 16,
    title: "Cubs World Series Win! ⚾",
    description: "Nathan got to see the Cubs World Series win live at Wrigley Field - a dream come true for any Cubs fan!",
    emoji: "⚾",
    category: "sports",
  },
  {
    id: 8,
    year: 2017,
    age: 17,
    title: "Sub-5 Minute Mile! 🏃‍♂️",
    description: "Nathan achieved an incredible running milestone - running a sub-5 minute mile!",
    emoji: "🏃‍♂️",
    category: "sports",
  },
  {
    id: 9,
    year: 2018,
    age: 18,
    title: "Graduated High School 🎓",
    description: "Nathan graduated from Hinsdale Central High School and learned to drive.",
    emoji: "🎓",
    category: "education",
  },
  {
    id: 10,
    year: 2018,
    age: 18,
    title: "Started UIUC 🎓",
    description: "Nathan began his college journey at the University of Illinois Urbana-Champaign, studying Industrial Engineering.",
    emoji: "🎓",
    category: "education",
  },
  {
    id: 11,
    year: 2019,
    age: 19,
    title: "Birthright Trip 🇮🇱",
    description: "Nathan went on UIUC's Birthright trip to Israel in the summer of 2019.",
    emoji: "🇮🇱",
    category: "personal",
  },
  {
    id: 12,
    year: 2020,
    age: 20,
    title: "Met Rina! 💕",
    description: "Nathan met his girlfriend Rina at a Birthright reunion Shabbat dinner at Illini Hillel on January 24th, 2020!",
    emoji: "💕",
    category: "personal",
  },
  {
    id: 13,
    year: 2022,
    age: 22,
    title: "Graduated UIUC 🎓",
    description: "Nathan graduated from UIUC with a degree in Industrial Engineering with a concentration in Operations Research and a minor in math.",
    emoji: "🎓",
    category: "education",
  },
  {
    id: 14,
    year: 2022,
    age: 22,
    title: "First Job - NTT Data 💼",
    description: "Nathan started his professional career as a data analyst at NTT Data.",
    emoji: "💼",
    category: "career",
  },
  {
    id: 15,
    year: 2024,
    age: 24,
    title: "Second Job - Huntington Bank 💼",
    description: "Nathan moved to Huntington Bank as a data analyst in March 2024.",
    emoji: "💼",
    category: "career"
  },
  {
    id: 16,
    year: 2025,
    age: 25,
    title: "Current Job - GEICO 💼",
    description: "Nathan started at GEICO in April 2025 as a data analyst, and it's his favorite job so far!",
    emoji: "💼",
    category: "career",
  },
  {
    id: 17,
    year: 2025,
    age: 25,
    title: "25th Birthday! 🎂",
    description: "Nathan turns 25 on July 23, 2025! A quarter century of amazing memories and experiences!",
    emoji: "🎂",
    category: "birthday",
  }
];

export const addTimelineEvent = (event) => {
  timelineEvents.push({
    id: Date.now(),
    dateAdded: new Date().toISOString().split('T')[0],
    ...event
  });
  // Sort by year
  timelineEvents.sort((a, b) => a.year - b.year);
};

export const updateTimelineEvent = (id, updatedEvent) => {
  const index = timelineEvents.findIndex(e => e.id === id);
  if (index !== -1) {
    timelineEvents[index] = { ...timelineEvents[index], ...updatedEvent };
  }
  // Sort by year
  timelineEvents.sort((a, b) => a.year - b.year);
};

export const deleteTimelineEvent = (id) => {
  const index = timelineEvents.findIndex(e => e.id === id);
  if (index !== -1) {
    timelineEvents.splice(index, 1);
  }
};

export const getEventsByCategory = (category) => {
  return timelineEvents.filter(event => event.category === category);
};

export const getTimelineStats = () => {
  return {
    totalEvents: timelineEvents.length,
    years: timelineEvents.length > 0 ? timelineEvents[timelineEvents.length - 1].year - timelineEvents[0].year + 1 : 0,
    categories: new Set(timelineEvents.map(e => e.category)).size
  };
}; 