import {promises as fs} from 'fs';  // fs : 파일 시스템 접근 모듈
// fs 모듈은 기본적으로 콜백 형식으로 사용. 그러므로 promise 형식으로 바꿔주는 방식을 사용
const ss = '파일로 저장된 문서.';  // 저장할 내용

fs.writeFile('./ex3write.txt', ss)
.then(() => {
    return fs.readFile('./ex3write.txt');
})
.then((data) => {
    console.log(data.toString());
})
.catch((err) => {
    console.log('err', err);
})