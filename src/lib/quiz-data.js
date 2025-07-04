// Updated sample quiz data with status and difficulty fields
const quizzes = [
  {
    id: "test-quiz",
    title: "Test Quiz",
    subject: "maths",
    difficulty: "medium",
    status: "available",
    description: "A simple test quiz to verify answer submission and handling",
    duration: 10,
    questions: [
      {
        id: "tq1",
        type: "mcq",
        question: "Option A is correct for Q1?",
        options: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C" },
          { value: "d", label: "Option D" },
        ],
        correctAnswer: "a",
        multipleCorrect: false,
      },
      {
        id: "tq2",
        type: "mcq",
        question: "Options A & B are correct for Q2 (Select all that apply)",
        options: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C" },
          { value: "d", label: "Option D" },
        ],
        correctAnswer: ["a", "b"],
        multipleCorrect: true,
      },
    ],
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    subject: "react",
    difficulty: "medium",
    status: "available",
    description:
      "Test your knowledge of React core concepts and best practices",
    duration: 25,
    questions: [
      {
        id: "rf1",
        type: "mcq",
        question: "What is JSX?",
        options: [
          { value: "a", label: "JavaScript XML" },
          { value: "b", label: "Java Syntax Extension" },
          { value: "c", label: "JSON XML" },
          { value: "d", label: "JavaScript Extension" },
        ],
        correctAnswer: "a",
        multipleCorrect: false,
      },
    ],
  },
  {
    id: "css-advanced",
    title: "Advanced CSS Techniques",
    subject: "css",
    difficulty: "hard",
    status: "completed",
    description: "Explore modern CSS features and advanced styling techniques",
    duration: 30,
    questions: [
      {
        id: "css1",
        type: "mcq",
        question: "Which CSS property is used for flexbox?",
        options: [
          { value: "a", label: "display: flex" },
          { value: "b", label: "flex: true" },
          { value: "c", label: "flexbox: on" },
          { value: "d", label: "layout: flex" },
        ],
        correctAnswer: "a",
        multipleCorrect: false,
      },
    ],
  },
  {
    id: "advanced-algorithms",
    title: "Advanced Algorithms",
    subject: "maths",
    difficulty: "hard",
    status: "locked",
    description: "Complex algorithmic problems and data structures",
    duration: 45,
    questions: [],
  },
  {
    id: "universal-gravitation",
    title: "Universal Law of Gravitation Quiz",
    subject: "physics",
    difficulty: "medium",
    status: "available",
    description:
      "Test your understanding of Newton’s Universal Law of Gravitation and related concepts.",
    duration: 15,
    questions: [
      {
        id: "ug1",
        type: "mcq",
        question:
          "If the mass of one of two objects is doubled, how does the gravitational force between them change (assuming distance remains constant)?",
        options: [
          { value: "a", label: "It doubles" },
          { value: "b", label: "It halves" },
          { value: "c", label: "It becomes four times" },
          { value: "d", label: "It stays the same" },
        ],
        correctAnswer: "a",
        multipleCorrect: false,
      },
      {
        id: "ug2",
        type: "mcq",
        question:
          "If the distance between two objects is tripled, how does the gravitational force between them change?",
        options: [
          { value: "a", label: "It becomes 3 times stronger" },
          { value: "b", label: "It becomes 9 times stronger" },
          { value: "c", label: "It becomes 1/3 as strong" },
          { value: "d", label: "It becomes 1/9 as strong" },
        ],
        correctAnswer: "d",
        multipleCorrect: false,
      },
      {
        id: "ug3",
        type: "mcq",
        question:
          "Which of the following changes will cause the greatest increase in gravitational force?",
        options: [
          { value: "a", label: "Doubling the distance" },
          { value: "b", label: "Halving one of the masses" },
          { value: "c", label: "Doubling both masses" },
          { value: "d", label: "Reducing both masses to half" },
        ],
        correctAnswer: "c",
        multipleCorrect: false,
      },
      {
        id: "ug4",
        type: "mcq",
        question:
          "Two objects attract each other with a gravitational force of 100 N. If the distance between them is reduced by half, what is the new gravitational force?",
        options: [
          { value: "a", label: "25 N" },
          { value: "b", label: "50 N" },
          { value: "c", label: "200 N" },
          { value: "d", label: "400 N" },
        ],
        correctAnswer: "d",
        multipleCorrect: false,
      },
      {
        id: "ug5",
        type: "mcq",
        question:
          "According to Newton's Law of Gravitation, which of the following statements is true?",
        options: [
          {
            value: "a",
            label: "Gravitational force decreases linearly with distance",
          },
          {
            value: "b",
            label:
              "Gravitational force is directly proportional to the square of the distance",
          },
          {
            value: "c",
            label:
              "Gravitational force is directly proportional to the product of the masses",
          },
          {
            value: "d",
            label:
              "Gravitational force is inversely proportional to the product of the masses",
          },
        ],
        correctAnswer: "c",
        multipleCorrect: false,
      },
    ],
  },
];

export async function getAllQuizzes() {
  return Promise.resolve(quizzes);
}

export async function getQuizById(id) {
  const quiz = quizzes.find((q) => q.id === id);
  return Promise.resolve(quiz);
}
