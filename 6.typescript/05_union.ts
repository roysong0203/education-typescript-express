export {};

function myFunction(a: number | string) {
  if (typeof a === "number") {
    return a + 1;
  } else {
    return a + "1";
  }
}

console.log(myFunction(1)); // 2
console.log(myFunction("1")); // 11
console.log(myFunction(false)); // Error!
