export {};

interface MyInterface1 {
  a: number;
}

interface MyInterface2 {
  b: string;
}

interface MyInterface3 extends MyInterface1, MyInterface2 {
  c: boolean;
}
const myFunction = (a: MyInterface3) => {
  console.log(`a.a is ${a.a} and a.b is ${a.b}! and a.c is ${a.c}`);
};

myFunction(0); // Error!
myFunction({ a: 0, b: "Hello World", c: true }); // OK
