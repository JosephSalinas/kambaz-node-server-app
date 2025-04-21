import * as dao from "./dao.js";
import * as attemptsDao from "./Attempts/dao.js";

export default function QuizRoutes(app) {
    // everything for quizzes. Note: implement passcode locally!
    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        const quizzes = await dao.findQuizzesForCourse(req.params.courseId);
        res.json(quizzes);
    });

    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        const newQuiz = await dao.createQuiz(req.params.courseId, req.body);
        res.json(newQuiz);
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    });

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const status = await dao.updateQuiz(req.params.quizId, req.body);
        res.json(status);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    });

    // questions routes
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const questions = await dao.findQuestionsForQuiz(req.params.quizId);
        res.json(questions);
    });

    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const newQuestion = await dao.createQuestion(req.params.quizId, req.body);
        res.json(newQuestion);
    });

    app.get("/api/questions/:questionId", async (req, res) => {
        const question = await dao.findQuestionById(req.params.questionId);
        res.json(question);
    });

    app.put("/api/questions/:questionId", async (req, res) => {
        const result = await dao.updateQuestion(req.params.questionId, req.body);
        res.json(result);
    });

    app.delete("/api/questions/:questionId", async (req, res) => {
        const result = await dao.deleteQuestion(req.params.questionId);
        res.json(result);
    });

    // quiz attempt routes
    app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
        try {
            const attempt = await attemptsDao.submitQuizAttempt(
                req.params.quizId,
                req.session.currentUser._id,
                req.body
            );
            res.json(attempt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
        try {
            const attempts = await attemptsDao.getQuizAttempts(req.params.quizId);
            res.json(attempts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId/attempts/current", async (req, res) => {
        try {
            const attempts = await attemptsDao.getCurrentUserQuizAttempts(
                req.params.quizId,
                req.session.currentUser._id
            );
            res.json(attempts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId/attempts/last-score", async (req, res) => {
        try {
            const lastAttempt = await attemptsDao.getLastAttemptScore(
                req.params.quizId,
                req.session.currentUser._id
            );
            res.json(lastAttempt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId/can-take", async (req, res) => {
        try {
            const result = await attemptsDao.canTakeQuiz(
                req.params.quizId,
                req.session.currentUser._id
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
