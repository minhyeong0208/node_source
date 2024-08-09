// 동기와 비동기 메소드
// setTimeout 등은 비동기 처리를 한다.
// fs 모듈의 경우에도 그러한 메소드를 많이 가지고 있다.
// fs 모듈은 비동기 처리가 기본!

import { readFile } from "fs";
readFile('./ex3write.txt', (err, data) => {  // 해당 파일 읽기
    if(err) {
        throw err;
    }
    console.log('1번', data.toString());  // 데이터 출력
});

readFile('./ex3write.txt', (err, data) => {  // 해당 파일 읽기
    if(err) {
        throw err;
    }
    console.log('2번', data.toString());  // 데이터 출력
});

readFile('./ex3write.txt', (err, data) => {  // 해당 파일 읽기
    if(err) {
        throw err;
    }
    console.log('3번', data.toString());  // 데이터 출력
});

console.log();

// 동기의 경우, 호출된 내용이 반환이 끝나야 다음 작업을 수행.
// 위 작업은 순서가 매번 바뀌므로 비동기 처리가 되고 있음을 알 수 있다.

// 순서대로 처리하고 싶은 경우, promise를 사용하여 인위적으로 처리하면 된다. 처리하고 then 처리하고 then