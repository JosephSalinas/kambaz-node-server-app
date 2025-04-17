import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createAssignment(courseId, assignment) {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
    course: courseId,
  };
  return model.create(newAssignment);
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, updates) {
  return model.updateOne({ _id: assignmentId }, { $set: updates });
}
