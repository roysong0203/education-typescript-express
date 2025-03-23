export {};

const a: any = {
  b: null,
  c: undefined, // 실제로는 undefined를 할당하지 않는 것이 좋다.
};

console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(a.b ? "Yes" : "No"); // No
console.log(a.c ? "Yes" : "No"); // No
console.log(a.b); // null
console.log(a.c); // undefined
console.log(a.d); // undefined
