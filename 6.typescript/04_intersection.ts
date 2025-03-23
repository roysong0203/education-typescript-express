export {};

type MyType1 = {
  a: number;
  b: string;
};
type MyType2 = {
  b: string;
  c: boolean;
};

function myFunction(a: MyType1 & MyType2) {
  console.log(`a.a is ${a.a}, a.b is ${a.b} and a.c is ${a.c}!`);
}

myFunction({ a: 1, b: "Hello" }); // Error! This is MyType1
myFunction({ b: "Hello", c: true }); // Error! This is MyType2
myFunction({ a: 1, b: "Hello", c: true }); // OK
