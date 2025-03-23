export {};

function myFunction1(a: any) {
  return a + a;
}

function myFunction2(a: unknown) {
  // 타입 검사를 하지 않으면 컴파일 에러 발생
  if (typeof a == "number") {
    return a + a;
  } else if (typeof a == "string") {
    return a + a;
  }
}

const stringA: string = "1";
const numberA: number = 1;

console.log(myFunction1(stringA)); // 11
console.log(myFunction1(numberA)); // 2

console.log(myFunction2(stringA)); // 11
console.log(myFunction2(numberA)); // 2
