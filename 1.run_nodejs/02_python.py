# 1️⃣ 기본적인 변수 선언
a = 1
b = 3
c = a + b
print(c)
print("Hello World")

# 2️⃣ 함수 선언 (매개변수와 반환 타입 지정)
def add(x: int, y: int) -> int:
    return x + y

print(add(5, 7))

# 3️⃣ 딕셔너리 선언
person = {
    "name": "Alice",
    "age": 25
}
print(person)

# 4️⃣ 클래스 선언
class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

dog = Animal("Dog")
dog.speak()
