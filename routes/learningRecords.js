// routes/learningRecords.js
const express = require('express');
const router = express.Router();
const learningRecordsController = require('../controllers/learningRecordsController');

// 학습 기록 저장
router.post('/', learningRecordsController.saveLearningRecord);

module.exports = router;
