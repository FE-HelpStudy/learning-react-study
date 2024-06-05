---
  writer : 'worker'
---

# let, const 키워드와 블록 스코프

## var 키워드로 선언한 변수의 문제점

### 변수의 중복선언 허용

```js
var x = 1;
var y = 1;

var x = 100;
var y;

console.log(x) // 100
console.log(y) // 1
```

### 함수 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다

함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다

```js
var x = 1;

if(true) {
  // 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다
  // 의도치 않게 변수값이 변경되는 부작용이 발생한다
  var x = 10;
}

console.log(x) // 10
```

for문의 변수 선언문애서 var 키워드로 선언한 변수도 전역 변수가 된다

```js
var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i) // 0 1 2 3 4
}

console.log(i) // 5
```

### 변수 호이스팅

var 키워드로 변수을 선언하면 변수 호이스팅이 발생한다. 즉, var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다

```js
console.log(foo);

foo = 123;

console.log(foo);

var foo
```

## let 키워드

### 변수 중복 선언 금지

let 키워드는 var 키워드와 다르게 변수의 중복 선언에 대해 문법 에러를 발생시킨다.

```js
let bar = 123;

let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

### 블록 레벨 스코프

let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다

```js
let foo = 1; // 전역 변수

{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

### 변수 호이스팅

let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
console.log(foo) //  ReferenceError: foo is not defined
let foo
```
chapter 4.3 "변수 선언" 에서 JS 엔진은 **"선언 단계"** 와 **"초기화 단계"** 를 진행한다

#### var 키워드의 호이스팅

**var 키워드로 선언된 변수는 선언과 초기화가 한번에 진행된다.** 

즉, 선언 단계에서 스코프 (실행 컨택스트의 렉시컬 환경) 에 변수 식별자를 등록해 JS 엔진에 변수의 존재를 알린다

그리고 즉시 초기화 단계에서 undefined 로 변수를 초기화한다.

#### let 키워드의 호이스팅

**let 키워드로 선언한 변수는 "선언 단계" 와 "초기화 단계" 가 분리되어 진행된다.**

let 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점 (변수 선언문) 까지 변수를 참조 할 수 없는 일시적 사각지대(TDZ)를 가진다.

let const class를 사용한 선언문은 TDZ를 가진다.

### 전역 객체와 let

var 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다.

let 전역 변수는 실행 컨택스트의 전역 렉시컬 환경의 선언적 환경 래코드 에 존재한다 (대충 전역 객체 window 를 통해 접근할 수 없다)

```js
var x = 1;

y = 2; // 암묵적 전역

function foo() {}
// window의 프로퍼티가 된 var 전역 변수
console.log(window.x); // 1

// 암묵적 전역은 window의 프로퍼티다
console.log(window.y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다
console.log(window.foo); // f foo () {}

let d = 1;

console.log(window.d) // undefined
```

## const 키워드

let과 거의 동일하니 다른 부분을 살펴 본다

### 선언과 초기화

**const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다**

let 과 동일하게 블록 레벨 스코프를 가지며 TDZ를 가진다.

### 재할당 금지

var 또는 let 키워드로 선언한 변수와는 달리 const 키워드로 선언한 변수는 재할당이 금지된다

### 상수

const 키워드로 선언한 변수에 원시 값을 할당한 경우 재할당 할 수 없다.

일반적으로 상수의 이름은 대문자 스네이크 케이스로 선언한다

```js
const TAX_RATE = 0.1;
```

### const 키워드와 객체

const 키워드로 선언된 변수에 객체를 할당한 경우 값을 재할당할 수 있다

## var vs. let vs.  const

- ES6 를 사용하면 var 키워드는 사용하지 않는다
- 재할당이 필요한 경우에 한정해 let 키워드르 사용한다 이때의 변수 스코프는 최대한 좁게 만든다
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값(상수)과 객체에는 const 키워드를 사용한다