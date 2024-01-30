비록 리액트 관련된 내용은 아니지만 문득 console의 정확한 뜻이 무엇인지 궁금해서 조사해봤습니다.

# console이란?

> 정보·통신 시스템 관리자가 시스템의 상태를 알아보거나, 각종 업무를 처리하기 위하여 사용하는 단말 장치.
> [출처] 네이버 국어사전

라고 명시되어있습니다. 아직까진 잘 와닿지 않습니다.

<br><br>

MDN는 다음과 같이 설명합니다.

> The console object provides access to the browser’s debugging console. The specifics of how it works varies from browser to browser, but there is de facto set of features that are typically privided.

해석하면, 콘솔 객체는 브라우저 디버깅 콘솔로의 접근을 제공한다. 동작 원리는 브라우저마다 다르지만, 사실상 전형적으로 제공되는 특징은 존재한다.

<br><br>

node.js는 다음과 같이 설명합니다.

> The console module provides a simple debugging console that is similar to the JavsScript console mechanism provided by web browsers.

해석하면, console 모듈은 웹 브라우저에 의해 제공되는 JS console 메커니즘과 유사하며 간단한 디버깅 콘솔을 제공한다.

<br><br>

즉
console은 JS 엔진 별로 detail한 기능은 조금씩 다르지만 **디버깅을 위해 존재하는 객체**라고 합니다.
우리가 자주 사용하는 콘솔찍기 (console.log) 출력기능은 디버깅을 위한 여러 가지 기능 중 하나라고 합니다.

<br><br>

## level별 console 함수들

자바스크립트는 심각성 레벨에 따른 4가지 console함수가 있습니다

### 1. console.log()

- 개발단계에서 부수적인 데이터를 출력하고자 할 때 사용합니다.
- product를 배포할 때는 다 지우는 것이 좋습니다.
- 제품의 성능에 영향을 줄 수 있기 때문이지요.

### 2. console.info()

- 어떤 특정한 정보를 출력할 때 사용합니다.
- log와 마찬가지로 배포 시 출력되지않는 것이 좋습니다.

### 3. console.warn()

- 심각한 문제는 아니지만 신경써야하는 경고단계 issue를 출력할 때 사용합니다.

### 4. console.error()

- 심각한 에러(예상치 못한 에러, 시스템 에러 등)를 출력해야 할 경우 사용합니다.

브라우저에서 각 console을 출력해보면
![](https://velog.velcdn.com/images/dogmnil2007/post/2353d331-5a86-47b1-805c-9e74ee1d22ac/image.png)
출력정보의 심각성(level)에 따라 색이 다르게 표시되는 것을 확인할 수 있습니다.
-> level별 출력 형태 상이

심각성에 따라 알맞는 함수를 이용해야하는 이유는
console.log, console.info 함수의 경우 제거한 상태로 배포하는 것이 좋고
console.warn()과 console.error()는 어떤 특별한 동작을 하도록 설정할 수 있기 때문입니다.

<br><br>

## object 출력 함수

### 1.console.table

console.table 함수는 데이터를 테이블형식으로 출력합니다.

```js
const dog = { type: "dog", name: "puppy", owner: "epik" };
console.table(dog);
```

![](https://velog.velcdn.com/images/dogmnil2007/post/f0cc32ef-7662-448e-af65-00678e3fc5e1/image.png)

### 2. console.dir

console.dir 함수는 object 출력시 다양한 옵션을 부여할 수 있습니다.

```js
const dog = {
  type: "dog",
  name: "puppy",
  owner: { leader: "epik", colors: "red" },
};
console.dir(dog, { depth: 0 });
//depth 속성을 통해 출력하고자하는 객체의 깊이를 설정할 수 있습니다.
```

![](https://velog.velcdn.com/images/dogmnil2007/post/d2df9ea6-4482-4dc8-838c-bda612405ee5/image.png)
위 사진과 같이 depth 가 0 이기 때문에 owner 객체 프로퍼티가 출력되지 않습니다.

<br><br>

## 실행 시간 함수

### console.time()

함수 프로퍼티에 이름을 지정해주면 이름이 실행된 순간부터 console.timeEnd() 함수를 출력할 때 까지의 시간을 출력해줍니다.

```js
console.time("for loop");
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd("for loop");
```

![](https://velog.velcdn.com/images/dogmnil2007/post/f3af3e59-3ee6-4a6c-9d19-dc535b1c94a3/image.png)

<br><br>

## 실행 횟수 함수

### console.count()

특정 함수가 몇 번 호출되는지 출력해줍니다.

```js
function a() {
  console.count("a function");
}
a();
a();
a();
a();
```

![](https://velog.velcdn.com/images/dogmnil2007/post/230d9a6c-9c88-4134-ac68-dc5bd011b56f/image.png)

참고로 console.countReset()은 출력 횟수를 초기화 해줍니다.

```js
function a() {
  console.count("a function");
}
a();
a();
console.countReset("a function");
a();
```

![](https://velog.velcdn.com/images/dogmnil2007/post/34754b27-9292-401a-a734-94133187c042/image.png)

<br><br>

## 함수 출처 출력

### console.trace

함수 호출 출처를 알 수 있습니다.

```js
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.trace();
}

f1();
```

![](https://velog.velcdn.com/images/dogmnil2007/post/9f0271cb-e6ee-4ff2-85b8-27dddf221b41/image.png)

<br><br>

### ❗ 중요한 점 ❗

console은 개발자가 디버깅 용도로 사용하는 객체기 때문에 product 사용자(user)에게는 필요없는 정보인 경우가 많습니다.
때문에 product 배포 시 필요없는 console은 꼭 삭제하는 것이 좋습니다.

# 3줄 요약

1. console은 디버깅을 위한 객체로 js 엔진마다 조금씩 기능은 다르지만 공통적인 부분이 존재합니다.
2. 상황, 환경에 따라 다양하게 사용 가능한 console 함수가 존재합니다.
3. product 배포 시 가급적 console은 제거하는 것이 좋습니다.

<details>

<summary>출처</summary>

<div markdown="1">

https://developer.mozilla.org/ko/docs/Web/API/console/dir_static
https://www.youtube.com/watch?v=KxsVV5jbJe4

</div>

</details>
