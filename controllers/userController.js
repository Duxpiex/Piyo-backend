const db = require('../db');

const userController = {};

userController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 쿼리를 실행하고 결과를 받습니다.
        const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

        // 쿼리의 반환값을 로그로 출력합니다.
        console.log("Query result:", result);



        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = userController;
