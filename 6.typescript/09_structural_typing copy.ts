export {};

interface MyInterface1 {
  a: number;
  b: string;
}

interface MyInterface2 {
  a: number;
}

const obj1: MyInterface1 = {
  a: 1,
  b: "Hello",
};

const obj2: MyInterface2 = obj1; // MyInterface2는 b가 없다.

console.log(obj2);
