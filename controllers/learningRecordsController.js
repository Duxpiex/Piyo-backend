const db = require('../db');

const learningRecordController = {};

learningRecordController.saveLearningRecord = async (req, res) => {
    const { user_id, character, learned_at, is_successful } = req.body;

    try {
        await db.query('INSERT INTO learning_records (user_id, character, learned_at, is_successful) VALUES ($1, $2, $3, $4)',
            [user_id, character, learned_at, is_successful]);
        res.status(200).json({ message: 'Record saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = learningRecordController;
