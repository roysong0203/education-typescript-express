export {};

type MyType1 = number;
type MyType2 = string;
type MyType3 = {
  a: MyType1;
  b: MyType2;
  c: boolean;
};

const myFunction = (a: MyType3) => {
  console.log(`a.a is ${a.a} and a.b is ${a.b}! and a.c is ${a.c}`);
};

myFunction(0); // Error!
myFunction({ a: 0, b: "Hello World", c: true }); // OK
