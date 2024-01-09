// express 모듈 및 관련 미들웨어 import
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// express 앱 초기화
const app = express();
const PORT = 3001;

// CORS 및 JSON 파싱 미들웨어 등록
app.use(cors());
app.use(bodyParser.json());

// 가상의 사용자 데이터 배열
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// JWT 시크릿 키
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// 로그인 엔드포인트
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // 사용자 확인
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // 유효한 사용자일 경우 JWT 토큰 생성 및 반환
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        // 유효하지 않은 자격 증명일 경우 401 Unauthorized 응답
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 회원가입 엔드포인트
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // 이미 존재하는 사용자 확인
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        // 이미 존재하는 사용자일 경우 409 Conflict 응답
        res.status(409).json({ message: 'Username already exists' });
    } else {
        // 새로운 사용자 생성 및 JWT 토큰 반환
        const newUser = { id: users.length + 1, username, password };
        users.push(newUser);

        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
