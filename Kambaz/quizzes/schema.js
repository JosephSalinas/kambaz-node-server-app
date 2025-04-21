import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    courseId: { type: String, required: true },
    title: { type: String, default: "New Quiz" },
    description: String,
    quizType: { type: String, default: "Graded Quiz" },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
    published: { type: Boolean, default: false },
    totalPoints: { type: Number, default: 0 },
    questions: [{ type: String, ref: 'QuestionModel' }]
  },
  { 
    collection: "quizzes",
    timestamps: true 
  }
);

// field to populate questions
quizSchema.virtual('questionsList', {
  ref: 'QuestionModel',
  localField: 'questions',
  foreignField: '_id'
});

// when a quiz is found, pre-fill it
quizSchema.pre('find', function() {
  this.populate('questionsList');
});

quizSchema.pre('findOne', function() {
  this.populate('questionsList');
});

export default quizSchema;
