import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app) {
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.get("/api/courses", (req, res) => {
        const userId = req.query.user;
        const courses = dao.findAllCourses();

        if (userId) {
            const userEnrollments = enrollmentsDao.findEnrollmentsByUser(userId);
            const enrolledCourseIds = userEnrollments.map((e) => e.course);
            const enrichedCourses = courses.map((course) => ({
                ...course,
                enrolled: enrolledCourseIds.includes(course._id),
            }));
            res.json(enrichedCourses);
        } else {
            res.json(courses);
        }
    });

    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const status = dao.deleteCourse(courseId);
        res.send(status);
    });
    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}
