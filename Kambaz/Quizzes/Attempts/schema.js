import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
    {
        _id: String,
        quizId: { type: String, ref: "QuizModel", required: true },
        userId: { type: String, ref: "UserModel", required: true },
        score: { type: Number, required: true },
        answers: {
            type: Map,
            of: mongoose.Schema.Types.Mixed
        },
        attemptNumber: { type: Number, required: true },
        submittedAt: { type: Date, default: Date.now }
    },
    { 
        collection: "quiz_attempts",
        timestamps: true
    }
);

// indexing for querying attemps.
quizAttemptSchema.index({ quizId: 1, userId: 1, attemptNumber: -1 });

export default quizAttemptSchema; 