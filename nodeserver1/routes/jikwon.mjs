// 직원 컴포넌트
import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();  // 라우터 객체

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); // 현재 파일 위치. /routes/jikwon.mjs

router.get('/', (req, res) => {
    // res.send('Hi, Jikwon!');
    res.sendFile(path.join(__dirname,'../public/abc.html'));
});

const employees = [
    {id:1, name:'유비'},
    {id:2, name:'관우'},
    {id:3, name:'장비'},
];

router.get('/employees', (req, res) => {
    res.json(employees);
});

router.post('/employees', (req, res) => {
    const newEmployee = req.body;
    if(!newEmployee || !newEmployee.name) {
        return res.status(400).json({error:'잘못된 데이터'});
    }
    employees.push(newEmployee);
    res.status(201);  // 201 : 요청이 성공적으로 처리되었으며, 자원이 생성되었음을 나타내는 성공 상태 코드.
    // POST 요청 후, 새로운 리소스가 생성되었을 때 사용한다.
});

export default router;