// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// 사용자 로그인
router.post('/login', userController.login);

// 사용자 회원가입
router.post('/register', userController.register);

// 사용자 회원탈퇴
router.delete('/delete', userController.deleteAccount);



module.exports = router;
