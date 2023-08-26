const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true 
})

calculationSchema.index({ createdAt: -1 });

const History = new mongoose.model("History", calculationSchema);

module.exports = History;