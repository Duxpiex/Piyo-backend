const db = require('../db');

const userController = {};

const bcrypt = require('bcrypt');


// 로그인
userController.login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Received email and password:', email, password);  // 1. Request 검증 로그

    try {
        // 사용자 정보 가져오기
        const userData = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        console.log('User fetched from DB:', userData.rows);  // 2. DB 조회 검증 로그
        console.log('Full DB query response:', userData);


        if (!userData || userData.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userPasswordHash = userData[0].password;
        console.log('Comparing passwords:', password, userPasswordHash);  // 3. 비밀번호 비교 검증 로그

        // 비밀번호 확인
        if (!userPasswordHash) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, userPasswordHash);
        console.log('Bcrypt comparison result:', validPassword);  // 4. bcrypt 비교 결과 로그

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' ,email: userData[0].email});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};






// 회원가입
userController.register = async (req, res) => {
    const { email, password } = req.body;

    // 비밀번호 중복 확인
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rowCount > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User created successfully' });

};

// 회원탈퇴
userController.deleteAccount = async (req, res) => {
    const { email } = req.body;

    console.log("Received email for deletion:", email);

    const result = await db.result('DELETE FROM users WHERE email = $1 RETURNING *', [email]);
    console.log(result.rowCount);


    if (result.rowCount > 0) {
        res.status(200).json({ message: 'User deleted successfully'  });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


module.exports = userController;
