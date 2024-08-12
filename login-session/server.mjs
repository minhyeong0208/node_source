import express from 'express';
import session from 'express-session'; // 세션 모듈 : 세션 사용을 위해 필요
import bodyParser from 'body-parser';  // 요청 본문 파싱을 위해 필요
import path from 'path';  // 경로 조작을 위해 필요
import { fileURLToPath } from 'url';  // url을 파일 경로로 변환하기 위해 필요

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7777;

// bodyParser.urlencoded() 미들웨어 설정(). 주로 전송된 폼 데이터룰 파싱한다.
app.use(bodyParser.urlencoded({extended:true}));  // 데이터 파싱 방법을 결정, false의 경우, 단순한 json 데이터만 처리 가능?

// session 미들웨어 설정()
app.use(session({
    secret:'secret-key',  // 세션 암호화를 위한 비밀 키 설정
    resave:false, // resave : 세션이 수정되지 않은 경우에도 세션을 다시 설정
    saveUninitialized: true, // saveUninitialized : 초기화되지 않은 저장 여부
    cookie: {maxAge:30 * 60 * 1000}  // 세션 유효 시간 30분 설정
}));

app.set('view engine', 'ejs'); // 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views'));

const auth = {
    id:'kor',
    password:'111'
}

app.get('/', (req, res) => {  // root로 접속하면
    res.sendFile(path.join(__dirname, 'login.html')); // 로그인 페이지로 호출
});

app.post('/login', (req, res) => {    // 로그인 버튼 클릭 시,
    const {id, password} = req.body;

    if(id === auth.id && password === auth.password) {
        req.session.user = id;  // 세션에 사용자 id를 30분간 저장 <- express-session 사용
        res.redirect('/main');  // 로그인 성공 시, main 페이지로 리다이렉션
    } else {
        res.send('로그인 실패 <a href="/">로그인 창으로</a>');
    }
});

app.get('/main', (req, res) => {
    // 사용자가 로그인한 경우, main.ejs 파일을 호출
    if(req.session.user) {
        res.render('main', {sessionID:req.sessionID});
    } else {
        res.send('접근 권한이 없음. <a href="/">로그인</a>')
    }
});

// 로그아웃
app.get('/logout', (req, res) => {
    req.session.destroy(err => {  // 서버에 있는 세션을 삭제
        if(err) {
            return res.redirect('/main');
        }
    });

    res.clearCookie('connect.sid');  // 클라이언트의 세션 쿠키도 삭제
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 로 서비스 시작 ... `);
});