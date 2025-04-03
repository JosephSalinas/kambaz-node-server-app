import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((a) => a.course === courseId);
}

export function createAssignment(courseId, assignment) {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
    course: courseId,
  };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  const index = Database.assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    Database.assignments.splice(index, 1);
    return { status: "deleted" };
  }
  return { status: "not found" };
}

export function updateAssignment(assignmentId, updates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, updates);
    return assignment;
  }
  return null;
}
