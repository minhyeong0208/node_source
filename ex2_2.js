const {odd, even} = require('./ex2_1');  // './ex2_1' 경로에 있는 odd, even 값 불러오기

function checkNum(num) {
    if(num % 2) {
        return odd;
    }
    return even;
}

module.exports = checkNum;