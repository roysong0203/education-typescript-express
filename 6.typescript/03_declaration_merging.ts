export {};

interface MyInterface1 {
  a: number;
  b: string;
}

interface MyInterface1 {
  b: string;
  c: boolean;
}

const myFunction = (a: MyInterface1) => {
  console.log(`a.a is ${a.a} and a.b is ${a.b}! and a.c is ${a.c}`);
};

myFunction({ a: 1, b: "Hello" }); // Error! This is MyType1
myFunction({ b: "Hello", c: true }); // Error! This is MyType2
myFunction({ a: 1, b: "Hello", c: true }); // OK
