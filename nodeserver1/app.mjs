import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import gogekRouter from './routes/gogek.mjs';
import jikwonRouter from './routes/jikwon.mjs';

const app = express();

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());  // express.json() : JSON 파싱용 미들웨어
// ex. 클라이언트가 JSON 데이터를 요청으로 보낼 때, 
// {"name":"tom", "age":30} <- 자동으로 파싱해 req.body 객체를 만듦
// req.body.name 또는 req.body.age로 접근이 가능해진다.


app.set('port', process.env.PORT || 3000);

const __filename = fileURLToPath(import.meta.url);  // app.mjs의 경로(현재 파일)
const __dirname = path.dirname(__filename);

// 정적 파일 제공 폴더(public) 정의
app.use(express.static(path.join(__dirname, 'public')));

// 직원 및 고객 컴포넌트 호출
app.use('/', jikwonRouter);
app.use('/gogek', gogekRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트로 서버 서비스 중...');
});