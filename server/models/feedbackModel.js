const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Feedback", feedbackSchema);