// 각 각은 다른 방식으로 함수를 선언하는 방법

// Named Function
function greet1() {
  console.log("안녕하세요!");
}

// Anonymous Function
const greet2 = function () {
  console.log("안녕하세요!");
};

// Arrow Function
// 화살표 함수 사용 추천. 최근 코드에서 가장 많이 사용됨.
const greet3 = () => {
  console.log("안녕하세요!");
};

greet1();

greet2();

greet3();
