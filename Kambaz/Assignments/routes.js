import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
    console.log("Fetched assignments");
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = await assignmentsDao.createAssignment(courseId, req.body);
    res.json(newAssignment);
    console.log("Added assignment");
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const result = await assignmentsDao.deleteAssignment(assignmentId);
    res.json(result);
    console.log("Deleted assignment");
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const updated = await assignmentsDao.updateAssignment(assignmentId, req.body);
    if (updated.modifiedCount > 0) {
      res.json({ status: "updated" });
      console.log("Updated assignment");
    } else {
      res.status(404).send("Assignment not found");
      console.log("No assignment to update");
    }
  });
}
