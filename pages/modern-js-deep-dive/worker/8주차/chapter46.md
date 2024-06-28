# 제너레이터와 async/await

## 제너레이터

코드 블록의 실행을 일시 중단했다가 필요한 시점에 재개할 수 있는 특수한 함수

### 일반 함수와 다른 특징

#### 제너레이터 함수는 *함수 호출자*에게 함수 실행의 제어권을 양도할 수 있다

일반 함수를 호출하면 제어권이 함수 호출자 (caller)에서 일반 함수로 넘어가고 일반 함수 종료시 함수 호출자에게 돌아온다
제너레이터 함수는 함수 호출자가 제어할 수 있다

#### 제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있다

일반 함수를 호출하면 매개 변수를 통해 함수 외부에서 값을 주입받고 실행한다 

함수가 실행 중에 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다

제너레이터 함수는 함수 호출자와 양방향으로 상태를 주고 받을 수 있다

#### 제너레이터 함수를 호출하면 제너레이터 객체를 리턴한다

이터러블이자 이터레이터인 제너레이터 객체를 리턴한다

### 제너레이터 함수 정의 방법

function* 키워드로 선언하고 하나 이상의 yield 표현식을 포함한다

제너레이터 함수는 화살표 함수로 정의할 수 없고 new 연산자와 함께 생성자 함수로 호출할 수 없다

```javascript
function* genDecFunc() {
  yield 1;
}

const genExpFunc = function* () {
  yield 1;
}

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
} 

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}

// 화살표 함수로 정의 불가
const genArrowFunc = * () => {
  yield 1;
} // SyntaxError: Unexpected token '*'

// new 연산자와 함께 생성자 함수로 호출할 수 없다
function* genFunc() {
  yield 1;
}

new genFunc()l // TypeError: genFunc is not a constructor
```

### 제너레이터 객체

제너레이터 함수를 호출하면 일반 함수처럼 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다

제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블이면서 value, done 프로퍼티를 갖는 iterator result 객체와 next 메서드를 소유하는 이터레이터다

```javascript
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환
const generator = genFunc()

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인으로 상속받은 객체다
console.log(Symbol.iterator in genterator) // true

// 이터레이터는 next 메서드를 가진다
console.log("next" in generator) // true
```

제너레이터 객체는 next 메서드와 이터레이터에 없는 return, throw 메서드를 갖는다

- next 메서드
  
    제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 iterator result 객체를 반환한다

- return 메서드

    인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 iterator result 객체를 반환한다

- throw 메서드

    인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 iterator result 객체를 반환한다

```javascript
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log(e)
  }
}

const generator = genFunc()

console.log(generator.next()) // {value: 1, done: false}
console.log(generator.return("END")) // {value: "END", done: true}
console.log(generator.throw("ERROR")) // {value: undefined, done: true}
```

### 제너레이터의 일시 중지와 재개

yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다

yield 표현식까지만 실행하고 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다

```javascript
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}
const generator = genFunc()

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다
console.log(generator.next()) // {value: 1, done: false}

console.log(generator.next()) // {value: 2, done: false}
console.log(generator.next()) // {value: 3, done: false}

// 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다
console.log(generator.next()) // {value: undefined, done: true}
```

제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지(suspense)되고 함수의 제어권이 함수 호출자로 양도(yield)된다

next 메서드는 iterator result 객체를 반환한다
  - value 프로퍼티: yield 표현식에서 yield된 값(yield 키워드 뒤의 값)
  - done 프로퍼티: 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값

이터레이터의 next 메서드와 달리 제너레이터의 next 메서드에 인수 전달가능

제너레이터 객체의 next 메서드에 전달된 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다

```javascript
function* genFunc() {
  // 처음 호출 시
  // x 변수에는 아직 할당되지 않았고 next 메서드가 두 번째 호출될 떄 결정된다
  const x = yield 1;
  // 두 번째 호출 시
  // x 변수에 함수 호출자에서 인수로 전달한 값이 할당된다
  // y 변수에는 아직 할당되지 않았고 next 메서드가  번째 호출될 떄 결정된다
  const y = yield (x + 10);
  // 세 번째 호출 시
  // y 변수에 함수 호출자에서 인수로 전달한 값이 할당된다
  return x + y;
}

const generator = genFunc()

let res = generator.next()
console.log(res) // {value: 1, done: false}
res = generator.next(10)
console.log(res) // {value: 20, done: false}
res = generator.next(20)
console.log(res) // {value: 30, done: false}
```

함수 호출자는 next 메서드를 통해 yield 표션식까지 함수를 실행시켜 제너레이터 객체가 관리하는 상태(yield된 값)를 꺼내올 수 있고, next 메서드에 인수를 전달해서 제너레이터 객체에 상태(yield 표션식을 할당받는 변수)를 밀어넣을 수 있다

제너레이터의 특성을 활용해 비동기 처리를 동기 처리처럼 구현할 수 있다

### 제너레이터 활용

#### 비동기 처리

Promise의 후속 처리 메서드 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있다

```javascript
// 제너레이터 실행기
const async = generatorFunc => {
  const generator = generatorFunc(); // 2

  const onResolved = arg => {
    const result = generator.next(arg) // 5

    return result.done 
      ? result.value // 9
      : result.value.then(res => onResolved(res)) // 7
  }

  return onResolved // 3
}

(async (function* fetchTodo() { // 1
  const url = "https://jsonplaceholder.typicode.com/todo/1"
  
  const response = yield fetch(url) // 6
  const todo = yield response.json() // 8
  console.log(todo) // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
})()) // 4
```
실행 순서

1. async 함수가 호출(1)되면 인수로 전달받은 제너레이터 함수 fetchTodo를 호출하여 제너레이터 객체를 생성(2)하고 onResolved 함수를 반환(3)한다
  
    onResolved 함수는 상위 스코프의 generator 변수를 기억하는 클로저다 
  
    async 함수가 반환한 onResolved 함수를 즉시 호출(4)하여 2에서 생성한 제너레이터 객체의 next 메서드를 처음 호출한다(5)

2. next 메서드가 처음 호출(5)되면 제너레이터 함수 fetchTodo의 첫 번째 yield문(6)까지 실행된다

    이때 next  메서드가 반환한 iterator result 객체의 value 프로퍼티 값이 첫 번째 yield된 함수
  
    즉, fetch(url)가 반환한 Promise가 resolve한 Response 객체를 onResolved 함수에 인수로 전달하면서 재귀호출(7)한다

3. onResolved 함수에 인수로 전달된 Response 객체를 next 메서드에 인수로 전달하면서 next 메서드를 두번째로 호출(8)한다

    이때 next 메서드에 인수로 전달한 Response 객체는 제너레이터 함수 fetchTodo의 response 변수(6)에 할당되고 제너레이터 함수 fetchTodo의 두 번째 yield문(8)까지 실행한다

4. next 메서드가 반환한 iterator result 객체의 value 프로퍼티 값인 두 번째 yield된

    response.json 메서드가 반환한 Promise가 resolve한 todo 객체를 onResolved 함수의 인수로 전달하면서 재귀호출한다(7)

5. onResolved 함수에 인수로 전달된 todo 객체를 next 메서드에 인수로 전달하면서 next 메서드를 세 번째 호출(5)한다

    이때 next 메서드에 인수로 전달한 todo 객체는 제너레이터 함수 fetchTodo의 todo 변수(8)에 할당되고 제너레이터 함수 fetchTodo가 끝까지 실행된다

6. next 메서드가 반환한 iterator result 객체의 done 프로퍼티 값이 true로 fetchTodo가 끝까지 실행되었다면 
    
    value 프로퍼티 값을 제너레이터 함수 fetchTodo의 반환값인 undefined를 그대로 반환(9)하고 처리를 종료한다


제너레이터 실행기를 직접 구현할 필요가 없다면 [co 라이브러리](https://www.google.com/search?q=co+library+generator&oq=co+library++generator&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBDIKCAMQABiABBiiBDIKCAQQABiABBiiBDIGCAUQRRhA0gEJMTE3NDZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#ip=1)를 사용하는 것이 좋다

## async await

async await는 프로미스 기반으로 동작하며 Promise의 후속처리 메서드 없이 동기 처럼 Promise 처리 결과를 반환하는 것을 구현할 수 있다

```javascript
async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todo/1"
  
  const response = await fetch(url) 
  const todo = await response.json()
  console.log(todo) // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo()
```

### async 함수

async 함수는 언제나 프로미스를 반환한다 

async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다

클래스의 constructor 메서드는 constructor 메서드는 인스턴스를 반환해야하기 때문에 async 메서드가 될 수 없다

```javascript
async function foo(n) { return n }
foo(1).then(v => console.log(v)) // 1

const bar = async function (n) { return n }
bar(2).then(v => console.log(v)) // 2

const baz = async n => n;
baz(3).then(v => console.log(v)) // 3

const obj = {
  async foo(n) { return n }
}
obj.foo(4).then(v => console.log(v)) // 4

class MyClass {
  async bar(n) { return n }
}
const myClass = new MyClass()
myClass.bar(5).then(v => console.log(v)) // 5
```

## await 키워드

await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때가지 대기하다가 settled 상태가 되면 Promise가 resolve한 처리 결과를 반환한다

```javascript
const getGithubUserName = async (id) => {
  const url = `https://api.github.com/users/${id}`
  
  const response = await fetch(url) // 1
  const { name } = await response.json() // 2
  console.log(name) // goldmayo
}
fetchTodo("goldmayo")
```

fetch 함수가 수행한 http 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 Promise가 settled 상태가 될 때까지 1에서 대기한다

이후 settled 상태가 되면 response에 resolved된 값이 할당된다

```javascript
async function foo() {
  const a = await new Promise(resolve => setTimeout(()=> resolve(1),3000))
  const b = await new Promise(resolve => setTimeout(()=> resolve(2),2000))
  const c = await new Promise(resolve => setTimeout(()=> resolve(3),1000))

  console.log([a, b, c]) // [1, 2, 3]
}

foo() // 약 6초 소요

// 서로 연관없이 개별 수행이 가능한 비동기 처리는 all을 사용하여 처리한다
async function goo() {
  const res = await new Promise.all([
  new Promise(resolve => setTimeout(()=> resolve(1),3000)),
  new Promise(resolve => setTimeout(()=> resolve(2),2000)),
  new Promise(resolve => setTimeout(()=> resolve(3),1000))
  ])

  console.log(res) // [1, 2, 3]
}

goo() // 약 3초 소요
```

### 에러처리

콜백을 통한 에러 처리의 문제점으로 에러는 호출자 방향으로 전파된다 

즉 콜 스택의 아래 방향(실행 중인 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다

비동기 함수의 콜백 ㅎ마수를 호출한 것은 비동기 함수가 아니기 때문에 try...catch 문을 사용해 에러를 캐치할 수 없다

```javascript
try {
  setTimeout(() => { throw new Error("Error"), 1000})
} catch (e) {
  // 에러를 캐치하지 못한다
  console.log("캐치된 에러\n",e)
}
```
async/await 에서는 try...catch 문을 사용할 수 있다

```javascript
const foo = async () => {
  try {
    const url = `https://wrongurl`
    
    const response = await fetch(url)
    const data = await response.json()
    console.log(data) 
  } catch (e) {
    console.error(e) // TypeError: Failed to fetch
  }
}
foo()
```

async 함수 내에서 catch 문을 사용해서 에러처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 Promise를 반환한다

따라서 후속처리 메서드 catch를 통해 에러를 캐치할 수 있다 
```javascript
const foo = async () => {
  const url = `https://wrongurl`
  
  const response = await fetch(url)
  const data = await response.json()
  console.log(data) 
}
foo()
  .then(console.log)
  .catch(console.error) // TypeError: Failed to fetch
```