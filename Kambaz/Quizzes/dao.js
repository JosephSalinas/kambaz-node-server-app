import { v4 as uuidv4 } from "uuid";
import quizModel from "./model.js";
import questionModel from "./Questions/model.js";

export function findQuizzesForCourse(courseId) {
    return quizModel.find({ courseId });
}

export function findQuizById(quizId) {
    return quizModel.findById(quizId);
}

export function createQuiz(courseId, quiz) {
    const newQuiz = {
        _id: uuidv4(),
        courseId,
        ...quiz,
    };
    return quizModel.create(newQuiz);
}

export function deleteQuiz(quizId) {
    return quizModel.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, updates) {
    return quizModel.updateOne({ _id: quizId }, { $set: updates });
}

// questions
export function createQuestion(quizId, question) {
    const newQuestion = {
        _id: uuidv4(),
        quizId,
        ...question,
    };
    return questionModel.create(newQuestion);
}

export function findQuestionsForQuiz(quizId) {
    return questionModel.find({ quizId }).sort({ orderIndex: 1 });
}

export function updateQuestion(questionId, updates) {
    return questionModel.updateOne({ _id: questionId }, { $set: updates });
}

export function deleteQuestion(questionId) {
    console.log("Deleted question")
    return questionModel.deleteOne({ _id: questionId });
}

export function findQuestionById(questionId) {
    return questionModel.findById(questionId);
}
