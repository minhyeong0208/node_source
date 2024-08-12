// 고객 컴포넌트
import { Router } from "express";

const router = Router();  // 라우터 객체

router.get('/', (req, res) => {
    res.send('Hello, Gogek!');
});

export default router;