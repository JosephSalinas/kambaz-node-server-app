import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const result = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(result);
    });

    app.delete("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const result = enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.json(result);
    });
}
