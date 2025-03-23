// 1️⃣ 기본적인 변수 선언 (명시적 타입 지정)
var a = 1;
var b = 3;
var c = a + b;
console.log(c);
console.log("Hello World");

// 2️⃣ 함수 선언 (매개변수와 반환 타입 지정)
function add(x, y) {
  return x + y;
}

console.log(add(5, 7));

// 3️⃣ 객체 선언 (딕셔너리랑 비슷)
var person = {
  name: "Alice",
  age: 25,
};
console.log(person);

// 4️⃣ 클래스 선언
var Animal = /** @class */ (function () {
  function Animal(name) {
    this.name = name;
  }
  Animal.prototype.speak = function () {
    console.log(`${this.name} makes a sound`);
  };
  return Animal;
})();

var dog = new Animal("Dog");
dog.speak();
