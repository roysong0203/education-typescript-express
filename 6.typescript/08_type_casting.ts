export {};

const value: unknown = "hello";

// 방법 1 (angle-bracket syntax)
const str1 = <string>value;

// 방법 2 (as-syntax)
const str2 = value as string;

console.log(str1.toUpperCase());
