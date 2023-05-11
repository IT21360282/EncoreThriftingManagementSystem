const FeedbackModel = require('../models/feedbackModel');

module.exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find();
        res.send(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

module.exports.saveFeedback = async (req, res) => {
    const { feedback } = req.body;

    try {
        const newFeedback = new FeedbackModel({ feedback });
        const savedFeedback = await newFeedback.save();
        console.log("Saved Successfully...");
        res.status(201).send(savedFeedback);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};