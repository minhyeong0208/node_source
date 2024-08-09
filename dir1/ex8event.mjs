// 이벤트 처리 : event 모듈을 사용
// EventEmitter 객체를 사용해 이벤트와 이벤트 핸들러를 연결해 동기적으로 호출
import { EventEmitter } from "events";

const myEvent = new EventEmitter();  // 이벤트 객체 생성

// 리스너 등록 : addListener(이벤트명, 콜백함수) 
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});  

myEvent.on('event2', () => {  // addListener()과 on()은 동일
    console.log('이벤트 2');
});

myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});

myEvent.once('event3', () => {  // once() : 1회만 수행 후, 자동으로 제거됨
    console.log('이벤트 3');
});

// emit(이벤트명) : 이벤트 호출 함수
myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');  // event3는 두 번 걸었다. -> 한 번만 수행(once)된 것을 확인할 수 있다.
myEvent.emit('event1');



console.log('===============');
myEvent.on('event4', () => {
    console.log('이벤트 4');
});

myEvent.emit('event4');  // 이건 호출됨.

// 이벤트 제거
myEvent.removeAllListeners('event4');
myEvent.emit('event4');  // 이벤트 제거가 되었으므로 호출되지 않음.



const listener = () => {
    console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.emit('event5');

// 이벤트 해제 함수 off()
myEvent.off('event5', listener);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event5'));

console.log('======= 매개변수 전달 =======');
// EventEmitter 클래스를 상속받은 MyEmitter 클래스
class MyEmitter extends EventEmitter{};

// MyEmitter 클래스 인스턴스
const myEmitter = new MyEmitter();
myEmitter.on('ev', () => {
    console.log('이벤트 처리');
});
myEmitter.emit('ev');


// 매개변수가 있는 경우
const myEmitter2 = new MyEmitter();
myEmitter2.on('ev', (a, b) => {
    console.log('이벤트 처리 : ', a, b);
});
myEmitter2.emit('ev', '2024','0809');