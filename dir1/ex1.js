console.log('Node.js 시작');

function f1() {
    console.log('Hello');
    f2();
} 

function f2() {
    console.log('world!');
}

f1();
console.log('ex1.js 종료');