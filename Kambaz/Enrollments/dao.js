import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function findEnrollmentsByUser(userId) {
    return Database.enrollments.filter((e) => e.user === userId);
}

export function enrollUserInCourse(userId, courseId) {
    const existing = Database.enrollments.find(
        (e) => e.user === userId && e.course === courseId
    );
    if (!existing) {
        const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
        Database.enrollments.push(newEnrollment);
        return newEnrollment;
    }
    return existing;
}

export function unenrollUserFromCourse(userId, courseId) {
    Database.enrollments = Database.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
    );
    return { status: "ok" };
}
