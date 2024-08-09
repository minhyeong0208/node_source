// 키보드로 단을 받아 구구단 출력
import { EventEmitter } from "events";
import readline from 'readline';

const myEvent = new EventEmitter();  // 이벤트 객체 생성

// 키보드 입력을 위한 readLine 인터페이스 생성
// input 스트림에서 데이터를 읽고, output 스트림으로 데이터를 쓸 수 있게 함.
const inout = readline.createInterface({
    input:process.stdin,   // 표준 입력 장치 사용을 위해 작성
    output:process.stdout,  // 표준 출력 장치 사용을 위해 작성
});

const printGugudan = (dan) => {
    console.log(`\n구구단 ${dan}단 출력`);
    for (let index = 1; index < 10; index++) {
        console.log(`${dan} * ${index} = ${dan * index}`);
    }
};

// 구구단 출력
myEvent.on('gugudan', (dan) => {
    printGugudan(dan);
    inout.close();
});

// question(query, callback)
inout.question('출력할 단 입력 : ', (input) => {
    const dan = parseInt(input, 10);
    if(!isNaN(dan)){
        myEvent.emit('gugudan', dan);
    } else {
        console.log('단은 숫자로 입력!');
        inout.close();
    }
});