import model from "./model.js";

export const submitQuizAttempt = async (quizId, userId, attempt) => {
    const lastAttempt = await model.findOne({ quizId, userId })
        .sort({ attemptNumber: -1 });
    const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

    const newAttempt = {
        _id: new Date().getTime().toString(),
        quizId,
        userId,
        score: attempt.score,
        answers: attempt.answers,
        attemptNumber
    };

    return await model.create(newAttempt);
};

export const getQuizAttempts = async (quizId) => {
    return await model.find({ quizId })
        .sort({ submittedAt: -1 });
};

export const getCurrentUserQuizAttempts = async (quizId, userId) => {
    return await model.find({ quizId, userId })
        .sort({ attemptNumber: -1 });
};

export const getLastAttemptScore = async (quizId, userId) => {
    const lastAttempt = await model.findOne({ quizId, userId })
        .sort({ attemptNumber: -1 });
    return lastAttempt;
};

export const canTakeQuiz = async (quizId, userId) => {
    // get the quiz to check max attempts
    const quiz = await import("../model.js")
        .then(module => module.default.findById(quizId));
    
    if (!quiz) {
        throw new Error("Quiz not found");
    }

    // case for when only 1 attempt allowed
    if (!quiz.multipleAttempts) {
        const attempts = await model.countDocuments({ quizId, userId });
        return { canTake: attempts === 0 };
    }

    const attempts = await model.countDocuments({ quizId, userId });
    return { canTake: attempts < quiz.maxAttempts };
}; 