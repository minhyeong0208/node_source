// http 모듈을 이용해 웹 서버 구축 가능
import http from 'http';  // 웹 관련 모듈

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h3>환영합니다! 노드 서버 세상에 오신 것을</h3>');
    res.write('하이?');
    res.end('<p>바이!</p>');  // 응답 종료
    // res.write('Hello~');  
})
.listen(3000, () => {
    console.log('서버 서비스 중...');
});