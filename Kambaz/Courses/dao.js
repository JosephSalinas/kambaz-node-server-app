import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export async function findAllCourses(userId = null) {
    const courses = await model.find();
    
    if (userId) {
        const enrollments = await enrollmentModel.find({ 
            user: userId,
            status: "ENROLLED"
        });
        const enrolledCourseIds = new Set(enrollments.map(e => e.course));

        return courses.map(course => ({
            ...course.toObject(),
            enrolled: enrolledCourseIds.has(course._id)
        }));
    }
    
    return courses;
}

export async function findCoursesForEnrolledUser(userId) {
    const enrollments = await enrollmentModel.find({ 
        user: userId,
        status: "ENROLLED"
    });
    
    const enrolledCourseIds = enrollments.map(e => e.course);
    const enrolledCourses = await model.find({ _id: { $in: enrolledCourseIds } });
    
    return enrolledCourses.map(course => ({
        ...course.toObject(),
        enrolled: true
    }));
}

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}