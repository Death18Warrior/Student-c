// This file simulates API calls to a backend server
// In a real application, you would replace these with actual API calls

export async function getCourse(courseId) {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data for Universal Law of Gravitation course
  if (courseId === "gravitation-basics") {
    return {
      id: "gravitation-basics",
      title: "Universal Law of Gravitation ",
      description:
        "Explore Newton's Universal Law of Gravitation and understand how every object in the universe attracts every other object with a force that depends on their masses and the distance between them.",
      rating: 4.9,
      ratingCount: 3412,
      studentCount: 103245,
      totalDuration: "50 minutes",
      currentSection: 1,
      totalSections: 1,
      instructor: {
        name: "Prof. Dhruv Sir",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      prevLesson: {
        id: "kepler-laws",
        title: "Kepler’s Laws of Planetary Motion",
      },
      nextLesson: {
        id: "gravitational-constant",
        title: "The Gravitational Constant",
      },
      currentLesson: {
        id: "universal-law-of-gravitation",
        title: "Universal Law of Gravitation",
        duration: "6min",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/61rygOD_lUM", // Replace with a real video if needed
        completed: true,
        isActive: false,
      },
      sections: [
        {
          id: "section-1",
          title: "Gravitation Chapter",
          completedLessons: 1,
          totalDuration: "50min",
          lessons: [
            {
              id: "kepler-laws",
              order: 1,
              title: "Kepler’s Laws of Planetary Motion",
              duration: "10min",
              type: "video",
              completed: true,
              isActive: true,
            },
            {
              id: "universal-law-of-gravitation",
              order: 2,
              title: "Universal Law of Gravitation",
              duration: "6min",
              type: "video",
              completed: true,
              isActive: true,
            },
            {
              id: "gravitational-constant",
              order: 3,
              title: "The Gravitational Constant",
              duration: "10min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "acceleration-due-to-gravity",
              order: 4,
              title: "Acceleration Due to Gravity of the Earth",
              duration: "12min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "quiz-gravitation",
              order: 5,
              title: "Quiz: Test Your Knowledge of Gravitation",
              duration: "4min",
              type: "video",
              completed: false,
              isActive: false,
            },
          ],
        },
      ],
    }
  }

  // Return null if course not found
  return null
}
