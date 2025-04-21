import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        _id: String,
        quizId: { type: String, ref: "QuizModel" },
        text: String,
        type: { 
            type: String, 
            enum: ['multiple-choice', 'true-false', 'fill-in-blank'],
            required: true
        },
        points: { type: Number, default: 1 },
        orderIndex: Number,
        options: [{
            text: String,
            isCorrect: Boolean
        }],
        correctAnswer: Boolean,
        correctAnswers: [String],
        caseSensitive: { type: Boolean, default: false }
    },
    { collection: "quiz_questions" }
);

export default questionSchema; 