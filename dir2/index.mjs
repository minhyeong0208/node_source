// express module
// 웹 서버를 생성하는 것과 관련된 기능을 담당하는 프레임워크
// 웹 애플리케이션을 만들기 위한 각종 메소드와 미들웨어 등이 내장되어 있다.
// http 모듈만 사용해서 서버를 구성할 수도 있지만, 이 경우엔 직접 설정해야 하는것들이 많아짐
// 이로 인해 사용하는 것이 바로 Express 모듈 !!

// nodemon module : npm install --save-dev nodemon
// nodemon은 node monitor의 약자로, 노드가 실행하는 파일이 속한 디렉터리를 감시하고 있다가 
// 파일이 수정되면 자동으로 노드 애플리케이션을 재시작하는 확장 모듈이다. 
// nodemon을 설치하면 재시작 없이 코드를 자동 반영 할수 있다
// package.json에 nodemon을 등록

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  // 현재 모듈에 파일과 디렉토리 경로 설정 시, 사용
// -----------------------------------------
// CORS 문제 해결용
import cors from 'cors'; // <- 추가 1

const app = express();
app.use(cors()); // <- 추가 2

// set() : express 모듈에 존재하는 함수
app.set('port', process.env.PORT || 3000)  // -> 환경변수 PORT가 존재하면 그 값을 사용하고, 아니면 3000번 포트를 사용한다.
// process는 내장 객체이므로 import 하지 않아도 된다.
// env : 환경 변수 설정을 위해 사용

// 현재 폴더를 지정 : __dirname을 ES6(ECMAScript Module) 환경에서 사용하기
const __filename = fileURLToPath(import.meta.url);  // 현재 실행 중인 파일 경로
const __dirname = path.dirname(__filename);  // 현재 실행 중인 폴더 경로
// -----------------------------------------

// app.get(요청, 라우팅처리)
app.get('/', function(req, res){
    res.send('Hi?');  // send에 전해진 argument에 따라서 Content-type을 지정해준다.
});

app.get('/html', (req, res) => {
    res.send('<h3>크크🎶🎶</h3>'); 
});

app.get('/node', (req, res) => {
    res.send('<a href="https://cafe.daum.net/flowlife/RM66">🎶데이터 과학자(Node.js)🎶</a>'); 
});

app.get('/abc', (req, res) => {
    res.sendFile(path.join(__dirname, 'abc.html'));  // 현재 폴더의 abc.html 호출 
});

// json 데이터
app.get('/json', (req, res) => {
    res.send({'name':'minhy'});  
});

// 요청명?변수=값 인 경우, req.query로 받는다.
// URL 경로에 정보가 담긴 경우 추출 https://localhost:3000/singer/son/7
app.get('/user/:num/:name', (req, res) => {
    const {num, name} = req.params;
    res.json({num,name});  
});

// http://localhost:3000/user/winter가 넘어옴
app.get('/user/:season', (req, res) => {
    const {season} = req.params;

    if(season === 'summer') {
        res.json({'season':'hot'});
    } else if(season === 'winter') {
        res.json({'season':'cold'});
    } else {
        res.json({'season':'warm'});
    }
    
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));  // 현재 폴더의 abc.html 호출 
});

app.get('/api/users', (req, res)=> {
    res.json([
        { id: 1, name: '김밥' },
        { id: 2, name: '공기밥' },
        { id: 3, name: '주먹밥' }
    ]);
});

// console.log('서버 서비스 시작...');
// app.listen(3000);
app.listen(app.get('port'), () => {  // express 모듈의 멤버 필드 port(18행에서 port 값을 설정.)
    console.log(app.get('port'), '번 포트를 사용해 서버 서비스 중...');
});