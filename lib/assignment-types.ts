export type AssignmentStatus = "not_started" | "in_progress" | "submitted" | "graded" | "late" | "missing"
export type AssignmentType = "homework" | "quiz" | "test" | "project" | "essay" | "lab" | "reading"
export type GradeType = "letter" | "percentage" | "points" | "pass_fail"

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  type: AssignmentType
  status: AssignmentStatus
  dueDate: string
  assignedDate: string
  points: number
  maxPoints: number
  grade?: {
    value: string | number
    type: GradeType
    feedback?: string
  }
  attachments?: {
    id: string
    name: string
    type: string
    url: string
  }[]
  submissionUrl?: string
  teacherName: string
  classId: string
  className: string
}
