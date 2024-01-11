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
const secretKey = 'your-secret-key-here';

// 가상의 본문 데이터 배열
const articles = [
    { id: 1, title: '제목1', content: '내용1' },
    { id: 2, title: '제목2', content: '내용2' }
];

// 본문 리스트 조회 엔드포인트
app.get('/articles', (req, res) => {
    res.json(articles);
});

// 본문 조회 엔드포인트
app.get('/articles/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);

    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: '해당 ID의 본문을 찾을 수 없습니다.' });
    }
});

// 본문 추가 엔드포인트
app.post('/articles', (req, res) => {
    const { id, title, content } = req.body;
    const newArticle = { id, title, content };

    articles.push(newArticle);

    res.status(201).json(newArticle);
});

// 본문 삭제 엔드포인트
app.delete('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const index = articles.findIndex(a => a.id === articleId);

    if (index !== -1) {
        articles.splice(index, 1);
        res.json({ message: '본문 삭제 성공' });
    } else {
        res.status(404).json({ message: '해당 ID의 본문을 찾을 수 없습니다.' });
    }
});

// 본문 수정 엔드포인트
app.put('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const { title, content } = req.body;
    const index = articles.findIndex(a => a.id === articleId);
    articles[index] = { id: articleId, title, content };
    res.json(articles[index]);

});

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
        res.status(401).json({ message: '잘못된 자격 증명' });
    }
});

// 회원가입 엔드포인트
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // 이미 존재하는 사용자 확인
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        // 이미 존재하는 사용자일 경우 409 Conflict 응답
        res.status(409).json({ message: '사용자 이름이 이미 존재합니다' });
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
