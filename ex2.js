// commonjs 사용
const {odd, even} = require('./ex2_1');
const checkNum = require('./ex2_2');

function checkString(str) {
    if(str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNum(3));
console.log(checkNum(4));

console.log(checkString('friday'));
console.log(checkString('saturday'));