import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
    console.log("Fetched assignments")
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const newAssignment = assignmentsDao.createAssignment(courseId, req.body);
    res.json(newAssignment);
    console.log("Added assignments")
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const result = assignmentsDao.deleteAssignment(assignmentId);
    res.json(result);
    console.log("Deleted assignments")

  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updated = assignmentsDao.updateAssignment(assignmentId, req.body);
    if (updated) {
      res.json(updated);
      console.log("Updated assignments")
    } else {
      res.status(404).send("Assignment not found");
      console.log("No assignment to update")
    }
  });
}
