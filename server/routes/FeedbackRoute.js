const { Router } = require('express');
const { getFeedback, saveFeedback } = require('../controllers/feedbackControllers');

const router = Router();

// router.get('/get', getFeedback);
router.post('/save', saveFeedback);

module.exports = router;