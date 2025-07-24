// Quiz Questions Data - Accurate Nathan facts
export const quizQuestions = [
  {
    id: 1,
    question: "What's Nathan's favorite food?",
    options: ["Pizza", "Brazilian Food", "Sushi", "Burgers"],
    correct: 1,
    funFact: "Nathan loves Brazilian food! He's even been to Brazil once with his girlfriend Rina!"
  },
  {
    id: 2,
    question: "What's Nathan's dream vacation destination?",
    options: ["Japan", "South America", "Europe", "Australia"],
    correct: 1,
    funFact: "Nathan loves traveling internationally, especially to South America like Argentina and Colombia!"
  },
  {
    id: 3,
    question: "What's Nathan's favorite hobby?",
    options: ["Gaming", "Sports", "Reading", "Cooking"],
    correct: 1,
    funFact: "Nathan is a Chicago native and is obsessed with the Cubs, Bears, and Illini College basketball and football!"
  },
  {
    id: 4,
    question: "What does Nathan do for work?",
    options: ["Software Engineer", "Data Analyst", "Teacher", "Doctor"],
    correct: 1,
    funFact: "Nathan is a data analyst at GEICO, and it's his favorite job so far!"
  },
  {
    id: 5,
    question: "What's Nathan's daily exercise routine?",
    options: ["Gym workout", "Running 4-6 miles", "Swimming", "Cycling"],
    correct: 1,
    funFact: "Nathan runs 4-6 miles every morning! He's an avid runner!"
  },
  {
    id: 6,
    question: "What's Nathan's favorite type of music?",
    options: ["Rock", "Pop", "Hip Hop", "Cubs Podcasts"],
    correct: 3,
    funFact: "Nathan would rather listen to Cubs podcasts than music! He's a true Cubs fan!"
  },
  {
    id: 7,
    question: "What's Nathan's favorite movie?",
    options: ["Home Alone", "The Avengers", "Titanic", "Star Wars"],
    correct: 0,
    funFact: "Nathan loves classic movies like Home Alone, Meet the Parents, and Ferris Bueller's Day Off!"
  },
  {
    id: 8,
    question: "When did Nathan and Rina meet?",
    options: ["January 22nd, 2020", "January 23rd, 2020", "January 24th, 2020", "January 25th, 2020"],
    correct: 2,
    funFact: "They met at a Birthright reunion Shabbat dinner at Illini Hillel on January 24th, 2020!"
  },
  {
    id: 9,
    question: "What's Nathan's daily snack routine?",
    options: ["Chips and soda", "2 Chobani key lime yogurts + 2 RXBars", "Fruit and nuts", "Protein shakes"],
    correct: 1,
    funFact: "Nathan religiously eats 2 Chobani key lime Greek yogurts and 2 RXBars every day!"
  },
  {
    id: 10,
    question: "What's Nathan's biggest achievement in running?",
    options: ["Running a marathon", "Running a sub-5 minute mile", "Winning a race", "Running daily"],
    correct: 1,
    funFact: "Nathan ran a sub-5 minute mile in Fall 2017! That's incredibly fast!"
  },
  {
    id: 11,
    question: "What did Nathan study in college?",
    options: ["Computer Science", "Industrial Engineering", "Business", "Mathematics"],
    correct: 1,
    funFact: "Nathan studied Industrial Engineering with a concentration in Operations Research and a minor in math at UIUC!"
  },
  {
    id: 12,
    question: "What's Nathan's favorite food paradox?",
    options: ["Likes pizza but hates cheese", "Likes hummus but hates chickpeas", "Likes sushi but hates fish", "Likes burgers but hates meat"],
    correct: 1,
    funFact: "Nathan doesn't like chickpeas but loves hummus, and doesn't like avocado but loves guacamole!"
  },
  {
    id: 13,
    question: "What time was Nathan born at?",
    options: ["8:55am CDT", "8:56am CDT", "8:57am CDT", "8:58am CDT"],
    correct: 1,
    funFact: "Nathan was born in the Northwestern Hospital at 8:56am CDT!"
  },
  {
    id: 14,
    question: "What's Nathan's current neighborhood?",
    options: ["Wicker Park", "Lake View", "Lincoln Park", "Gold Coast"],
    correct: 1,
    funFact: "Nathan lives in Lake View, a neighborhood in Chicago, IL!"
  },
  {
    id: 15,
    question: "What's Nathan's superpower?",
    options: ["Making people laugh", "Solving problems", "Being consistent and loyal", "All of the above"],
    correct: 3,
    funFact: "Nathan is just a Mensch <3"
  }
];

export const addQuizQuestion = (question) => {
  quizQuestions.push({
    id: Date.now(),
    ...question
  });
};

export const updateQuizQuestion = (id, updatedQuestion) => {
  const index = quizQuestions.findIndex(q => q.id === id);
  if (index !== -1) {
    quizQuestions[index] = { ...quizQuestions[index], ...updatedQuestion };
  }
};

export const deleteQuizQuestion = (id) => {
  const index = quizQuestions.findIndex(q => q.id === id);
  if (index !== -1) {
    quizQuestions.splice(index, 1);
  }
}; 