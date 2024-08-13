import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json()); 

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

let datas = [
    {id:1, name:'하이', position:'자바개발자'},
    {id:2, name:'바이', position:'웹퍼블리셔'},
]

let nextid = 3;  // 새로운 직원이 추가될 때, id 값 증가를 위해 선언

app.get('/', (req, res) => {
    res.send('시작! /emp, /emp/1, /abc.html');
});

// 전체 자료 읽기
app.get('/emp', (req, res) => {
    res.json(datas);
});

// 부분 자료 읽기
app.get('/emp/:id', (req, res) => {
    //console.log(res.body);
    const employee = datas.find(emp => emp.id === parseInt(req.params.id, 10));
    if(!employee) return res.status(404).send('자료 없음.')
    res.json(employee);
});

// 자료 추가
app.post('/emp', (req, res) => {
    const newEmployee = {  // 추가할 객체
        id:nextid++,
        name:req.body.name,
        position:req.body.position
    };
    datas.push(newEmployee);
    res.status(201).json(newEmployee);
});

// 자료 수정
app.put('/emp/:id', (req, res) => {
    const employee = datas.find(emp => emp.id === parseInt(req.params.id, 10));
    if(!employee) return res.status(404).send('자료 없음.')
    
    employee.name = req.body.name || employee.name;  // 새로운 데이터 || 기존 데이터
    employee.position = req.body.position || employee.position;

    res.json(employee);
});

// 자료 삭제
app.delete('/emp/:id', (req, res) => {
    console.log(req.params.id);

    const empIndex = datas.findIndex(emp => emp.id === parseInt(req.params.id, 10));  // 해당 자료가 있으면 index를 가짐.
    if(empIndex === -1) return res.status(404).send('자료 없음.')
    
    const [delEmp] = datas.splice(empIndex, 1);

    res.json(delEmp);
});1

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트로 서버 서비스 중...');
});