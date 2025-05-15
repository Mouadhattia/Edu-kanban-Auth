import type { Assignment } from "./assignment-types"

// Generate a random date within a range
function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

// Current date for reference
const now = new Date()

// Past date (30 days ago)
const pastDate = new Date()
pastDate.setDate(pastDate.getDate() - 30)

// Future date (30 days from now)
const futureDate = new Date()
futureDate.setDate(futureDate.getDate() + 30)

// Generate mock assignments
export const mockAssignments: Assignment[] = [
  // Upcoming assignments (not started)
  {
    id: "a1",
    title: "Algebra Equations Worksheet",
    description: "Complete the worksheet on solving quadratic equations using the quadratic formula.",
    subject: "Mathematics",
    type: "homework",
    status: "not_started",
    dueDate: randomDate(now, futureDate),
    assignedDate: randomDate(pastDate, now),
    points: 0,
    maxPoints: 20,
    teacherName: "Ms. Johnson",
    classId: "c1",
    className: "Algebra II",
  },
  {
    id: "a2",
    title: "Cell Structure Lab Report",
    description: "Write a lab report on the cell structure observation experiment conducted in class.",
    subject: "Biology",
    type: "lab",
    status: "not_started",
    dueDate: randomDate(now, futureDate),
    assignedDate: randomDate(pastDate, now),
    points: 0,
    maxPoints: 50,
    teacherName: "Mr. Smith",
    classId: "c2",
    className: "Biology 101",
  },
  {
    id: "a3",
    title: "American Revolution Essay",
    description: "Write a 1000-word essay on the causes and effects of the American Revolution.",
    subject: "History",
    type: "essay",
    status: "not_started",
    dueDate: randomDate(now, futureDate),
    assignedDate: randomDate(pastDate, now),
    points: 0,
    maxPoints: 100,
    teacherName: "Dr. Williams",
    classId: "c3",
    className: "U.S. History",
  },

  // In progress assignments
  {
    id: "a4",
    title: "Poetry Analysis",
    description: "Analyze the themes and literary devices in the poem 'The Road Not Taken' by Robert Frost.",
    subject: "English",
    type: "homework",
    status: "in_progress",
    dueDate: randomDate(now, futureDate),
    assignedDate: randomDate(pastDate, now),
    points: 0,
    maxPoints: 30,
    teacherName: "Ms. Garcia",
    classId: "c4",
    className: "English Literature",
  },
  {
    id: "a5",
    title: "Chemical Reactions Project",
    description: "Create a presentation explaining three types of chemical reactions with examples.",
    subject: "Chemistry",
    type: "project",
    status: "in_progress",
    dueDate: randomDate(now, futureDate),
    assignedDate: randomDate(pastDate, now),
    points: 0,
    maxPoints: 75,
    teacherName: "Dr. Chen",
    classId: "c5",
    className: "Chemistry 101",
  },

  // Submitted assignments
  {
    id: "a6",
    title: "Spanish Vocabulary Quiz",
    description: "Quiz on Spanish vocabulary from Chapter 3.",
    subject: "Spanish",
    type: "quiz",
    status: "submitted",
    dueDate: randomDate(pastDate, now),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 25,
    submissionUrl: "https://example.com/submission/a6",
    teacherName: "Sr. Rodriguez",
    classId: "c6",
    className: "Spanish II",
  },
  {
    id: "a7",
    title: "Geometry Proofs",
    description: "Complete the geometric proofs worksheet.",
    subject: "Mathematics",
    type: "homework",
    status: "submitted",
    dueDate: randomDate(pastDate, now),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 20,
    submissionUrl: "https://example.com/submission/a7",
    teacherName: "Ms. Johnson",
    classId: "c1",
    className: "Geometry",
  },

  // Graded assignments
  {
    id: "a8",
    title: "Physics Forces Test",
    description: "Test covering Newton's laws of motion and forces.",
    subject: "Physics",
    type: "test",
    status: "graded",
    dueDate: randomDate(pastDate, pastDate),
    assignedDate: randomDate(pastDate, pastDate),
    points: 92,
    maxPoints: 100,
    grade: {
      value: "A-",
      type: "letter",
      feedback: "Excellent work! You demonstrated a strong understanding of Newton's laws.",
    },
    teacherName: "Dr. Brown",
    classId: "c7",
    className: "Physics 101",
  },
  {
    id: "a9",
    title: "Art History Presentation",
    description: "Create and deliver a presentation on a Renaissance artist of your choice.",
    subject: "Art",
    type: "project",
    status: "graded",
    dueDate: randomDate(pastDate, pastDate),
    assignedDate: randomDate(pastDate, pastDate),
    points: 85,
    maxPoints: 100,
    grade: {
      value: "B+",
      type: "letter",
      feedback: "Good presentation with strong visual elements. Could improve on the historical context.",
    },
    teacherName: "Ms. Lee",
    classId: "c8",
    className: "Art History",
  },

  // Late assignments
  {
    id: "a10",
    title: "Music Theory Worksheet",
    description: "Complete the worksheet on chord progressions and harmonization.",
    subject: "Music",
    type: "homework",
    status: "late",
    dueDate: randomDate(pastDate, now),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 15,
    teacherName: "Mr. Jackson",
    classId: "c9",
    className: "Music Theory",
  },
  {
    id: "a11",
    title: "Environmental Science Report",
    description: "Write a report on local ecosystem observations and data collection.",
    subject: "Science",
    type: "project",
    status: "late",
    dueDate: randomDate(pastDate, now),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 50,
    teacherName: "Dr. Martinez",
    classId: "c10",
    className: "Environmental Science",
  },

  // Missing assignments
  {
    id: "a12",
    title: "Calculus Integration Problems",
    description: "Complete problems 1-15 on integration techniques.",
    subject: "Mathematics",
    type: "homework",
    status: "missing",
    dueDate: randomDate(pastDate, pastDate),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 25,
    teacherName: "Dr. Wilson",
    classId: "c11",
    className: "Calculus II",
  },
  {
    id: "a13",
    title: "Computer Science Coding Assignment",
    description: "Implement a binary search tree with insertion, deletion, and traversal methods.",
    subject: "Computer Science",
    type: "project",
    status: "missing",
    dueDate: randomDate(pastDate, pastDate),
    assignedDate: randomDate(pastDate, pastDate),
    points: 0,
    maxPoints: 100,
    teacherName: "Prof. Taylor",
    classId: "c12",
    className: "Data Structures",
  },
]
