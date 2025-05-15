import type {
  Board,
  Student,
  Task,
  Template,
  Organization,
  OrganizationMember,
  User,
  Activity,
  Invitation,
} from "@/lib/types"

// Sample data for the application

// Organizations
export function getOrganizations(): Organization[] {
  return [
    {
      id: "org-1",
      name: "EduCurriculum Solutions",
      description: "Leading provider of educational curriculum templates",
      logo: "/placeholder.svg?height=80&width=80",
      website: "https://educurriculum.example.com",
      createdAt: new Date("2024-01-01"),
      ownerId: "user-1",
      plan: "professional",
      settings: {
        defaultTemplateVisibility: "organization",
        allowPublicTemplates: true,
        requireApprovalForPublishing: true,
        brandingEnabled: true,
      },
    },
    {
      id: "org-2",
      name: "TeachWell Academy",
      description: "Innovative curriculum design for modern education",
      logo: "/placeholder.svg?height=80&width=80",
      website: "https://teachwell.example.com",
      createdAt: new Date("2024-02-15"),
      ownerId: "user-3",
      plan: "enterprise",
      settings: {
        defaultTemplateVisibility: "private",
        allowPublicTemplates: true,
        requireApprovalForPublishing: false,
        brandingEnabled: true,
        customDomain: "templates.teachwell.example.com",
      },
    },
  ]
}

// Organization members
export function getOrganizationMembers(organizationId: string): OrganizationMember[] {
  return [
    {
      id: "member-1",
      organizationId: "org-1",
      userId: "user-1",
      role: "admin",
      joinedAt: new Date("2024-01-01"),
      invitedBy: "user-1",
      status: "active",
    },
    {
      id: "member-2",
      organizationId: "org-1",
      userId: "user-2",
      role: "designer",
      joinedAt: new Date("2024-01-15"),
      invitedBy: "user-1",
      status: "active",
    },
    {
      id: "member-3",
      organizationId: "org-1",
      userId: "user-4",
      role: "viewer",
      joinedAt: new Date("2024-02-01"),
      invitedBy: "user-1",
      status: "active",
    },
    {
      id: "member-4",
      organizationId: "org-2",
      userId: "user-3",
      role: "admin",
      joinedAt: new Date("2024-02-15"),
      invitedBy: "user-3",
      status: "active",
    },
    {
      id: "member-5",
      organizationId: "org-2",
      userId: "user-5",
      role: "designer",
      joinedAt: new Date("2024-02-20"),
      invitedBy: "user-3",
      status: "active",
    },
  ].filter((member) => member.organizationId === organizationId)
}

// Users
export function getUsers(): User[] {
  return [
    {
      id: "user-1",
      name: "Jane Cooper",
      email: "jane@educurriculum.example.com",
      role: "org-admin",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Curriculum design expert with 15+ years of experience in educational content development.",
      title: "Founder & Lead Designer",
      expertise: ["science", "mathematics", "curriculum development"],
      organizationIds: ["org-1"],
      defaultOrganizationId: "org-1",
    },
    {
      id: "user-2",
      name: "Alex Rodriguez",
      email: "alex@educurriculum.example.com",
      role: "org-designer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Specializing in STEM curriculum design for K-12 education.",
      title: "Senior Curriculum Designer",
      expertise: ["science", "technology", "engineering"],
      organizationIds: ["org-1"],
      defaultOrganizationId: "org-1",
    },
    {
      id: "user-3",
      name: "Michael Johnson",
      email: "michael@teachwell.example.com",
      role: "org-admin",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Former teacher turned curriculum designer with a passion for innovative teaching methods.",
      title: "CEO & Educational Director",
      expertise: ["english", "history", "educational technology"],
      organizationIds: ["org-2"],
      defaultOrganizationId: "org-2",
    },
    {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "org-viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "School district curriculum coordinator evaluating templates for district-wide adoption.",
      title: "Curriculum Coordinator",
      expertise: ["curriculum evaluation", "educational standards"],
      organizationIds: ["org-1"],
      defaultOrganizationId: "org-1",
    },
    {
      id: "user-5",
      name: "David Chen",
      email: "david@teachwell.example.com",
      role: "org-designer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Specializing in language arts and social studies curriculum design.",
      title: "Curriculum Designer",
      expertise: ["language arts", "social studies"],
      organizationIds: ["org-2"],
      defaultOrganizationId: "org-2",
    },
  ]
}

// Get user by ID
export function getUserById(userId: string): User | undefined {
  return getUsers().find((user) => user.id === userId)
}

// Get organization by ID
export function getOrganizationById(organizationId: string): Organization | undefined {
  return getOrganizations().find((org) => org.id === organizationId)
}

// Get user's organizations
export function getUserOrganizations(userId: string): Organization[] {
  const user = getUserById(userId)
  if (!user || !user.organizationIds) return []

  return getOrganizations().filter((org) => user.organizationIds?.includes(org.id))
}

// Get pending invitations for an organization
export function getOrganizationInvitations(organizationId: string): Invitation[] {
  return [
    {
      id: "invitation-1",
      email: "newdesigner@example.com",
      organizationId: "org-1",
      role: "designer",
      invitedBy: "user-1",
      invitedAt: new Date("2024-03-01"),
      status: "pending",
      expiresAt: new Date("2024-03-08"),
      token: "inv-token-123",
    },
    {
      id: "invitation-2",
      email: "reviewer@example.com",
      organizationId: "org-1",
      role: "viewer",
      invitedBy: "user-1",
      invitedAt: new Date("2024-03-02"),
      status: "pending",
      expiresAt: new Date("2024-03-09"),
      token: "inv-token-456",
    },
    {
      id: "invitation-3",
      email: "newadmin@teachwell.example.com",
      organizationId: "org-2",
      role: "admin",
      invitedBy: "user-3",
      invitedAt: new Date("2024-03-01"),
      status: "pending",
      expiresAt: new Date("2024-03-08"),
      token: "inv-token-789",
    },
  ].filter((invitation) => invitation.organizationId === organizationId && invitation.status === "pending")
}

// Get organization activity
export function getOrganizationActivity(organizationId: string): Activity[] {
  return [
    {
      id: "activity-1",
      type: "template_created",
      userId: "user-1",
      userName: "Jane Cooper",
      userAvatar: "/placeholder.svg?height=40&width=40",
      organizationId: "org-1",
      templateId: "template-1",
      templateTitle: "Science Curriculum for 5th Grade",
      timestamp: new Date("2024-03-01T10:30:00"),
      details: { templateId: "template-1" },
    },
    {
      id: "activity-2",
      type: "user_invited",
      userId: "user-1",
      userName: "Jane Cooper",
      userAvatar: "/placeholder.svg?height=40&width=40",
      organizationId: "org-1",
      timestamp: new Date("2024-03-01T11:45:00"),
      details: { invitedEmail: "newdesigner@example.com", role: "designer" },
    },
    {
      id: "activity-3",
      type: "template_published",
      userId: "user-2",
      userName: "Alex Rodriguez",
      userAvatar: "/placeholder.svg?height=40&width=40",
      organizationId: "org-1",
      templateId: "template-2",
      templateTitle: "High School Chemistry Lab",
      timestamp: new Date("2024-03-02T09:15:00"),
      details: { templateId: "template-2", version: "2.1.0" },
    },
    {
      id: "activity-4",
      type: "comment_added",
      userId: "user-2",
      userName: "Alex Rodriguez",
      userAvatar: "/placeholder.svg?height=40&width=40",
      organizationId: "org-1",
      templateId: "template-1",
      templateTitle: "Science Curriculum for 5th Grade",
      timestamp: new Date("2024-03-02T14:20:00"),
      details: {
        templateId: "template-1",
        commentId: "comment-1",
        comment: "I think we should add more interactive elements to this template.",
      },
    },
    {
      id: "activity-5",
      type: "template_created",
      userId: "user-3",
      userName: "Michael Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      organizationId: "org-2",
      templateId: "template-6",
      templateTitle: "World History Timeline Project",
      timestamp: new Date("2024-03-01T13:10:00"),
      details: { templateId: "template-6" },
    },
  ].filter((activity) => activity.organizationId === organizationId)
}

// Boards for teachers
export function getTeacherBoards(schoolId: string): Board[] {
  return [
    {
      id: "board-1",
      title: "Physics 101 - Spring Semester",
      description: "Track assignments and projects for Physics 101",
      createdAt: new Date("2025-01-15"),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: "school-1",
      shared: true,
      color: "bg-green-500",
    },
    {
      id: "board-2",
      title: "Chemistry Lab Activities",
      description: "Organize and track chemistry lab experiments and reports",
      createdAt: new Date("2025-02-10"),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: "school-1",
      shared: true,
      color: "bg-blue-500",
    },
    {
      id: "board-3",
      title: "Math Homework Tracker",
      description: "Track progress on weekly math assignments",
      createdAt: new Date("2025-03-05"),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: "school-1",
      shared: false,
      color: "bg-purple-500",
    },
    {
      id: "board-4",
      title: "Biology 201 - Fall Semester",
      description: "Course planning for Biology 201",
      createdAt: new Date("2025-01-20"),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: "school-2",
      shared: true,
      color: "bg-yellow-500",
    },
  ].filter((board) => board.schoolId === schoolId)
}

// Shared boards
export function getSharedBoards(schoolId: string): Board[] {
  return [
    {
      id: "board-5",
      title: "Biology Research Project",
      description: "Group research project on ecosystems",
      createdAt: new Date("2025-02-20"),
      ownerId: "teacher-2",
      ownerName: "Prof. Johnson",
      schoolId: "school-1",
      shared: true,
      color: "bg-yellow-500",
    },
    {
      id: "board-6",
      title: "Literature Analysis",
      description: "Track progress on literature analysis assignments",
      createdAt: new Date("2025-03-15"),
      ownerId: "teacher-2",
      ownerName: "Prof. Johnson",
      schoolId: "school-1",
      shared: true,
      color: "bg-red-500",
    },
  ].filter((board) => board.schoolId === schoolId)
}

// Get board by ID
export function getBoardById(boardId: string): Board | null {
  const allBoards = [
    ...getTeacherBoards("school-1"),
    ...getTeacherBoards("school-2"),
    ...getSharedBoards("school-1"),
    ...getSharedBoards("school-2"),
  ]

  return allBoards.find((board) => board.id === boardId) || null
}

// Get students
export function getStudents(): Student[] {
  return [
    { id: "1", name: "Alex Johnson", email: "alex@example.edu" },
    { id: "2", name: "Jamie Smith", email: "jamie@example.edu" },
    { id: "3", name: "Taylor Brown", email: "taylor@example.edu" },
    { id: "4", name: "Morgan Lee", email: "morgan@example.edu" },
    { id: "5", name: "Casey Wilson", email: "casey@example.edu" },
  ]
}

// Get student boards
export function getStudentBoards(schoolId: string) {
  // Boards assigned to the student
  const assigned = [
    {
      id: "board-1",
      title: "Physics 101 - Spring Semester",
      description: "Track assignments and projects for Physics 101",
      createdAt: new Date("2025-01-15"),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: "school-1",
      shared: true,
      color: "bg-green-500",
    },
    {
      id: "board-3",
      title: "Biology Research Project",
      description: "Group research project on ecosystems",
      createdAt: new Date("2025-02-20"),
      ownerId: "teacher-2",
      ownerName: "Prof. Johnson",
      schoolId: "school-1",
      shared: true,
      color: "bg-yellow-500",
    },
    {
      id: "board-4",
      title: "Literature Analysis",
      description: "Track progress on literature analysis assignments",
      createdAt: new Date("2025-03-15"),
      ownerId: "teacher-2",
      ownerName: "Prof. Johnson",
      schoolId: "school-1",
      shared: true,
      color: "bg-red-500",
    },
    {
      id: "board-5",
      title: "Introduction to Programming",
      description: "Learn the basics of programming",
      createdAt: new Date("2025-02-05"),
      ownerId: "teacher-3",
      ownerName: "Prof. Williams",
      schoolId: "school-2",
      shared: true,
      color: "bg-blue-500",
    },
  ].filter((board) => board.schoolId === schoolId)

  // Student's personal boards
  const personal = [
    {
      id: "personal-1",
      title: "My Study Plan",
      description: "Personal study schedule and goals",
      createdAt: new Date("2025-01-20"),
      ownerId: "student-1",
      ownerName: "Alex Johnson",
      schoolId: "school-1",
      shared: false,
      color: "bg-purple-500",
    },
    {
      id: "personal-2",
      title: "College Applications",
      description: "Track college application deadlines and requirements",
      createdAt: new Date("2025-02-15"),
      ownerId: "student-1",
      ownerName: "Alex Johnson",
      schoolId: "school-1",
      shared: false,
      color: "bg-emerald-500",
    },
  ].filter((board) => board.schoolId === schoolId)

  return { assigned, personal }
}

// Get student tasks
export function getStudentTasks(): Task[] {
  return [
    {
      id: "task-1",
      title: "Forces and Motion Group Project",
      description: "Create a demonstration of forces and motion concepts with your assigned group",
      type: "assignment",
      priority: "high",
      dueDate: new Date("2025-04-25"),
      assignedStudentIds: ["1", "2", "3"],
      attachments: [],
      comments: [],
      createdBy: "teacher-1",
      boardId: "board-1",
      boardName: "Physics 101 - Spring Semester",
    },
    {
      id: "task-2",
      title: "Momentum Problem Set",
      description: "Complete problems 1-15 on conservation of momentum",
      type: "homework",
      priority: "medium",
      dueDate: new Date("2025-04-18"),
      assignedStudentIds: ["1", "2", "3", "4", "5"],
      attachments: [],
      comments: [],
      createdBy: "teacher-1",
      boardId: "board-1",
      boardName: "Physics 101 - Spring Semester",
      status: "in-progress",
    },
    {
      id: "task-3",
      title: "Ecosystem Research Paper",
      description: "Write a 5-page research paper on a specific ecosystem of your choice",
      type: "assignment",
      priority: "high",
      dueDate: new Date("2025-05-10"),
      assignedStudentIds: ["1", "3", "5"],
      attachments: [],
      comments: [],
      createdBy: "teacher-2",
      boardId: "board-3",
      boardName: "Biology Research Project",
    },
    {
      id: "task-4",
      title: "Poetry Analysis",
      description: "Analyze the themes and literary devices in the assigned poems",
      type: "assignment",
      priority: "medium",
      dueDate: new Date("2025-04-22"),
      assignedStudentIds: ["1", "2", "4"],
      attachments: [],
      comments: [],
      createdBy: "teacher-2",
      boardId: "board-4",
      boardName: "Literature Analysis",
      status: "submitted",
    },
    {
      id: "task-5",
      title: "Midterm Exam Review",
      description: "Complete the practice problems for the upcoming midterm exam",
      type: "review",
      priority: "high",
      dueDate: new Date("2025-04-12"),
      assignedStudentIds: ["1", "2", "3", "4", "5"],
      attachments: [],
      comments: [],
      createdBy: "teacher-1",
      boardId: "board-1",
      boardName: "Physics 101 - Spring Semester",
      status: "completed",
      grade: "A-",
    },
  ]
}

// Get student board tasks
export function getStudentBoardTasks(boardId: string): Task[] {
  return getStudentTasks().filter((task) => task.boardId === boardId)
}

// Get curriculum designer templates
export function getDesignerTemplates(): Template[] {
  return [
    {
      id: "template-1",
      title: "Science Curriculum for 5th Grade",
      description:
        "A comprehensive science curriculum covering earth science, biology, and basic physics concepts for 5th grade students",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-02-15"),
      designerId: "user-1",
      designerName: "Jane Cooper",
      organizationId: "org-1",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-green-500",
      educationLevels: ["elementary"],
      subjects: ["science", "biology", "physics"],
      pricing: {
        type: "free",
      },
      status: "published",
      visibility: "public",
      stats: {
        views: 1250,
        installs: 87,
        activeInstances: 62,
        rating: 4.7,
        schoolsUsing: 15,
        revenue: 0,
      },
      versions: [
        {
          version: "1.0.0",
          releaseDate: new Date("2025-01-10"),
          changes: ["Initial release"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "To Do",
          taskIds: ["task-1", "task-2"],
        },
        {
          id: "column-2",
          title: "In Progress",
          taskIds: ["task-3"],
        },
        {
          id: "column-3",
          title: "Completed",
          taskIds: [],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Introduction to Earth Science",
          description: "Basic concepts of Earth's structure and geology",
          type: "lesson",
          priority: "medium",
        },
        {
          id: "task-2",
          title: "Plant Cell Diagram",
          description: "Create a labeled diagram of a plant cell",
          type: "assignment",
          priority: "high",
        },
        {
          id: "task-3",
          title: "Forces and Motion Quiz",
          description: "Assessment of understanding of basic physics concepts",
          type: "assessment",
          priority: "high",
        },
      ],
      collaborators: [
        {
          userId: "user-2",
          userName: "Alex Rodriguez",
          userAvatar: "/placeholder.svg?height=40&width=40",
          role: "editor",
          addedAt: new Date("2025-01-15"),
          addedBy: "user-1",
        },
      ],
    },
    {
      id: "template-2",
      title: "High School Chemistry Lab",
      description: "Template for organizing and tracking high school chemistry lab experiments and reports",
      createdAt: new Date("2025-02-05"),
      updatedAt: new Date("2025-02-05"),
      designerId: "user-1",
      designerName: "Jane Cooper",
      organizationId: "org-1",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-blue-500",
      educationLevels: ["high"],
      subjects: ["chemistry", "science"],
      pricing: {
        type: "paid",
        price: 29.99,
        model: "per_instance",
      },
      status: "published",
      visibility: "public",
      stats: {
        views: 850,
        installs: 42,
        activeInstances: 38,
        rating: 4.5,
        schoolsUsing: 8,
        revenue: 1259.58,
      },
      versions: [
        {
          version: "2.1.0",
          releaseDate: new Date("2025-02-05"),
          changes: ["Added new lab experiments", "Improved safety guidelines"],
        },
        {
          version: "1.0.0",
          releaseDate: new Date("2025-01-15"),
          changes: ["Initial release"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "Planning",
          taskIds: ["task-1"],
        },
        {
          id: "column-2",
          title: "Experiment",
          taskIds: ["task-2"],
        },
        {
          id: "column-3",
          title: "Analysis",
          taskIds: ["task-3"],
        },
        {
          id: "column-4",
          title: "Report",
          taskIds: [],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Lab Safety Orientation",
          description: "Review of lab safety procedures and equipment",
          type: "preparation",
          priority: "high",
        },
        {
          id: "task-2",
          title: "Acid-Base Titration",
          description: "Determine the concentration of an unknown acid solution",
          type: "assignment",
          priority: "medium",
        },
        {
          id: "task-3",
          title: "Chemical Reactions Lab Report",
          description: "Write a formal lab report on the observed chemical reactions",
          type: "assessment",
          priority: "high",
        },
      ],
      collaborators: [
        {
          userId: "user-2",
          userName: "Alex Rodriguez",
          userAvatar: "/placeholder.svg?height=40&width=40",
          role: "editor",
          addedAt: new Date("2025-01-20"),
          addedBy: "user-1",
        },
      ],
    },
    {
      id: "template-3",
      title: "Middle School Math Project Tracker",
      description: "Template for tracking and organizing math projects for middle school students",
      createdAt: new Date("2025-02-20"),
      updatedAt: new Date("2025-02-25"),
      designerId: "user-2",
      designerName: "Alex Rodriguez",
      organizationId: "org-1",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-purple-500",
      educationLevels: ["middle"],
      subjects: ["math", "algebra", "geometry"],
      pricing: {
        type: "trial",
        trialPeriod: 14,
        trialInstances: 2,
        maxStudents: 30,
      },
      status: "published",
      visibility: "organization",
      stats: {
        views: 620,
        installs: 28,
        activeInstances: 22,
        rating: 4.2,
        schoolsUsing: 5,
        revenue: 0,
      },
      versions: [
        {
          version: "1.2.0",
          releaseDate: new Date("2025-02-25"),
          changes: ["Added geometry projects", "Fixed calculation errors"],
        },
        {
          version: "1.0.0",
          releaseDate: new Date("2025-02-20"),
          changes: ["Initial release"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "Planning",
          taskIds: ["task-1"],
        },
        {
          id: "column-2",
          title: "Working",
          taskIds: ["task-2"],
        },
        {
          id: "column-3",
          title: "Review",
          taskIds: [],
        },
        {
          id: "column-4",
          title: "Complete",
          taskIds: ["task-3"],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Real-world Algebra Project",
          description: "Apply algebraic concepts to solve a real-world problem",
          type: "assignment",
          priority: "high",
        },
        {
          id: "task-2",
          title: "Geometry Shapes Portfolio",
          description: "Create a portfolio of geometric shapes and their properties",
          type: "assignment",
          priority: "medium",
        },
        {
          id: "task-3",
          title: "Math Skills Assessment",
          description: "End-of-unit assessment on key mathematical concepts",
          type: "assessment",
          priority: "high",
        },
      ],
      collaborators: [
        {
          userId: "user-1",
          userName: "Jane Cooper",
          userAvatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
          addedAt: new Date("2025-02-20"),
          addedBy: "user-2",
        },
      ],
    },
    {
      id: "template-4",
      title: "Literature Analysis Framework",
      description:
        "A framework for analyzing literature works with students, including character analysis, themes, and literary devices",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-01"),
      designerId: "user-1",
      designerName: "Jane Cooper",
      organizationId: "org-1",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-red-500",
      educationLevels: ["middle", "high"],
      subjects: ["english", "literature"],
      pricing: {
        type: "paid",
        price: 19.99,
        model: "per_instance",
      },
      status: "draft",
      visibility: "private",
      stats: {
        views: 0,
        installs: 0,
        activeInstances: 0,
        schoolsUsing: 0,
        revenue: 0,
      },
      versions: [
        {
          version: "0.1.0",
          releaseDate: new Date("2025-03-01"),
          changes: ["Initial draft"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "Reading",
          taskIds: ["task-1"],
        },
        {
          id: "column-2",
          title: "Analysis",
          taskIds: ["task-2"],
        },
        {
          id: "column-3",
          title: "Discussion",
          taskIds: [],
        },
        {
          id: "column-4",
          title: "Writing",
          taskIds: ["task-3"],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Novel Reading Assignment",
          description: "Read the assigned novel and take notes on key elements",
          type: "homework",
          priority: "medium",
        },
        {
          id: "task-2",
          title: "Character Analysis",
          description: "Analyze the development of the main character throughout the story",
          type: "assignment",
          priority: "high",
        },
        {
          id: "task-3",
          title: "Literary Essay",
          description: "Write an analytical essay on the novel's themes and literary devices",
          type: "assessment",
          priority: "high",
        },
      ],
    },
    {
      id: "template-5",
      title: "Elementary Art Projects",
      description: "A collection of art projects and activities for elementary school students",
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-20"),
      designerId: "user-1",
      designerName: "Jane Cooper",
      organizationId: "org-1",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-yellow-500",
      educationLevels: ["elementary"],
      subjects: ["art", "creativity"],
      pricing: {
        type: "free",
      },
      status: "archived",
      visibility: "public",
      stats: {
        views: 320,
        installs: 15,
        activeInstances: 2,
        rating: 3.8,
        schoolsUsing: 1,
        revenue: 0,
      },
      versions: [
        {
          version: "1.0.0",
          releaseDate: new Date("2025-01-15"),
          changes: ["Initial release"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "Planning",
          taskIds: ["task-1"],
        },
        {
          id: "column-2",
          title: "Creating",
          taskIds: ["task-2", "task-3"],
        },
        {
          id: "column-3",
          title: "Showcase",
          taskIds: [],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Color Theory Basics",
          description: "Introduction to primary, secondary, and tertiary colors",
          type: "lesson",
          priority: "medium",
        },
        {
          id: "task-2",
          title: "Mixed Media Collage",
          description: "Create a collage using various materials and techniques",
          type: "assignment",
          priority: "medium",
        },
        {
          id: "task-3",
          title: "Self-Portrait Project",
          description: "Create a self-portrait using the medium of your choice",
          type: "assignment",
          priority: "high",
        },
      ],
    },
    {
      id: "template-6",
      title: "World History Timeline Project",
      description: "Interactive timeline project for teaching world history events and their connections",
      createdAt: new Date("2025-03-01"),
      updatedAt: new Date("2025-03-05"),
      designerId: "user-3",
      designerName: "Michael Johnson",
      organizationId: "org-2",
      previewImage: "/placeholder.svg?height=200&width=300",
      color: "bg-indigo-500",
      educationLevels: ["middle", "high"],
      subjects: ["history", "social studies"],
      pricing: {
        type: "paid",
        price: 24.99,
        model: "per_instance",
      },
      status: "published",
      visibility: "public",
      stats: {
        views: 420,
        installs: 18,
        activeInstances: 15,
        rating: 4.6,
        schoolsUsing: 3,
        revenue: 449.82,
      },
      versions: [
        {
          version: "1.1.0",
          releaseDate: new Date("2025-03-05"),
          changes: ["Added ancient civilizations section", "Improved timeline visualization"],
        },
        {
          version: "1.0.0",
          releaseDate: new Date("2025-03-01"),
          changes: ["Initial release"],
        },
      ],
      columns: [
        {
          id: "column-1",
          title: "Research",
          taskIds: ["task-1"],
        },
        {
          id: "column-2",
          title: "Timeline Creation",
          taskIds: ["task-2"],
        },
        {
          id: "column-3",
          title: "Analysis",
          taskIds: ["task-3"],
        },
        {
          id: "column-4",
          title: "Presentation",
          taskIds: [],
        },
      ],
      tasks: [
        {
          id: "task-1",
          title: "Historical Event Research",
          description: "Research key historical events for your assigned time period",
          type: "assignment",
          priority: "high",
        },
        {
          id: "task-2",
          title: "Timeline Construction",
          description: "Create a visual timeline with events, dates, and connections",
          type: "assignment",
          priority: "medium",
        },
        {
          id: "task-3",
          title: "Historical Impact Analysis",
          description: "Analyze how these events impacted future historical developments",
          type: "assessment",
          priority: "high",
        },
      ],
      collaborators: [
        {
          userId: "user-5",
          userName: "David Chen",
          userAvatar: "/placeholder.svg?height=40&width=40",
          role: "editor",
          addedAt: new Date("2025-03-02"),
          addedBy: "user-3",
        },
      ],
    },
  ]
}

// Get template by ID
export function getTemplateById(templateId: string): Template | null {
  return getDesignerTemplates().find((template) => template.id === templateId) || null
}

// Get marketplace templates (templates from all designers that are published)
export function getMarketplaceTemplates(): Template[] {
  return getDesignerTemplates().filter(
    (template) => template.status === "published" && template.visibility === "public",
  )
}

// Get organization templates
export function getOrganizationTemplates(organizationId: string): Template[] {
  return getDesignerTemplates().filter((template) => template.organizationId === organizationId)
}

// Get templates by designer
export function getTemplatesByDesigner(designerId: string): Template[] {
  return getDesignerTemplates().filter((template) => template.designerId === designerId)
}

// Get templates where user is a collaborator
export function getCollaborativeTemplates(userId: string): Template[] {
  return getDesignerTemplates().filter((template) =>
    template.collaborators?.some((collaborator) => collaborator.userId === userId),
  )
}
