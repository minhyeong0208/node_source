// 예외 처리 : node에서 에러 처리는 매우 중요함.
// node는 한 개의 스레드만 사용할 수 있기 때문에 소중히 다뤄야 한다.
// try ... catch 구문 활용
import readline from 'readline';

const inout = readline.createInterface({
    input:process.stdin,   // 표준 입력 장치 사용을 위해 작성
    output:process.stdout,  // 표준 출력 장치 사용을 위해 작성
});

const divide = (a, b) => {
    if(b === 0) {
        throw new Error('0으로 나눌 수 없습니다.');  // 예외 throw
    }
    return a / b;
};

inout.question('첫 번째 숫자 입력 : ', (num1) => {
    inout.question('두 번째 숫자 입력 : ', (num2) => {
        try {
            const a = parseFloat(num1);
            const b = parseFloat(num2);

            if(isNaN(a) || isNaN(b)) {
                throw new Error('숫자 입력')
            }
            const result = divide(a, b);
            console.log(`${a}을(를) ${b}로 나눈 결과는 ${result}`);
        } catch(error) {
            console.error('오류 발생', error.message);
        } finally {
            inout.close();
        }
    });
});