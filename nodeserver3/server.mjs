import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from './db.mjs';

const __filename = fileURLToPath(import.meta.url); //import.meta.url : 현재 파일의 경로
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send('요청 보내기 /sangdata, /sangdata/2');
});

// 전체 자료 읽기(read all)
app.get('/sangdata', async(req, res) => {
    try {
        // MariaDB Connection Pool에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection();

        const rows = await conn.query("select * from sangdata");
        conn.release();  // 연결 해제

        res.json(rows);
        console.log(rows);
    } catch(err) {
        res.status(500).json({error:err.message});  // 서버 오류 발생 시, 500 응답
    }
});

// 부분 자료 읽기
app.get('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    try {
        const conn = await pool.getConnection();

        const rows = await conn.query("select * from sangdata where code=?", [code]);
        conn.release();  // 연결 해제

        if(rows.length === 0) {
            return res.status(404).json({error:'자료 없음🚫'});
        }

        res.json(rows[0]);
        console.log(rows);
    } catch(err) {
        res.status(500).json({error:err.message});  // 서버 오류 발생 시, 500 응답
    }
});

// 자료 추가 : insert
app.post('/sangdata', async(req, res) => {
    const {code, sang, su, dan} = req.body;
    try {
        const conn = await pool.getConnection();

        await conn.query("insert into sangdata values(?,?,?,?)", [code,sang,su,dan]);
        // 위 값을 변수로 할당하는 경우, 얻을 수 있는 값은 다음과 같다.
        // affectedRows: 쿼리로 영향을 받은 행의 수입니다. 이 예시에서는 1개의 행이 삽입되었음을 나타냅니다.
        // insertId: 자동 증가 필드(AUTO_INCREMENT)가 있는 경우, 새로 삽입된 레코드의 ID입니다. 예시에서는 5라는 ID가 생성되었습니다.
        // warningCount: 쿼리 실행 중 발생한 경고 수입니다. 이 예시에서는 경고가 없음을 나타냅니다.
        // changedRows: 변경된 행의 수입니다. 주로 UPDATE 쿼리에서 사용됩니다.
        conn.release();  

        
        res.status(201).json({code, sang, su, dan});
    } catch(err) {
        res.status(500).json({error:err.message});  // 서버 오류 발생 시, 500 응답
    } 
});

// 자료 수정 : update
app.put('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    const {sang, su, dan} = req.body;
    try {
        const conn = await pool.getConnection();

        const result = await conn.query("update sangdata set sang=?,su=?,dan=? where code=?", [sang,su,dan,code]);
        conn.release();  
        
        if(result.affectedRows === 0) { // 수정사항이 없는 경우,
            res.status(404).json({error:'수정 대상 자료가 없음.'});
        }
        res.json({code, sang, su, dan});
    } catch(err) {
        res.status(500).json({error:err.message});  // 서버 오류 발생 시, 500 응답
    } 
});

// 자료 삭제 : delete
app.delete('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    try {
        const conn = await pool.getConnection();

        const result = await conn.query("delete from sangdata where code=?",[code]);
        conn.release();

        if(result.affectedRows === 0) { // 삭제 대상이 없는 경우
            res.status(404).json({error:'삭제 대상 자료가 없음.'});
        }
        res.json({message:'delete success'});
    } catch (err) {
        res.status(500).json({error:err.message});  // 서버 오류 발생 시, 500 응답
    }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 시작 중");
});