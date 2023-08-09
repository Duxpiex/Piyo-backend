require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());

app.use(express.json());



// 라우팅을 위한 라우터 설정
const usersRouter = require('./routes/users'); // 사용자 라우터
const learningRecordsRouter = require('./routes/learningRecords'); // 학습 기록 라우터

app.use('/users', usersRouter);
app.use('/learning-records', learningRecordsRouter);


module.exports = app;