# 9장. 컴포넌트 스타일링

## Deep Dive - Tagged Template Literal

### Template literals

ES6부터 도입된 문자열 표기법으로,
표현식을 허용하는 문자열 리터럴이다.

```javascript
const greeting = `Hello, ${name}, the weather is ${current_weather}.`; // Template literals - ES6
const greeting = "Hello, " + name + ", the weather is " + current_weather + "."; // Template string - ES5
```

#### 기본문법

1. 템플릿 리터럴은 작은따옴표(')나 큰따옴표(") 대신 백틱(`)로 감싸준다.

```javascript
const greeting = `Hello`;
```

2. 일반적인 문자열과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있다.

```javascript
const template = `<ul class="nav-items">
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
</ul>`;
```

### Tagged templates literals

템플릿 리터럴의 발전된 형태로써, 템플릿 리터럴을 함수로 파싱 할 수 있다.

```javascript
var 변수명 = "문자열";
function 태그함수(매개변수) {
  //템플릿으로 사용할 함수 선언
  return; //태그함수 호출시 변환될 값
}
var 태그템플릿리터럴변수명 = 태그함수`문자블라블라 ${변수명}`;
```

```javascript
const logArgs = (...args) => console.log(...args);

logArgs("a", "b");
// -> a b

logArgs``;
// -> [""]

logArgs`I like pizza`;
// -> ["I like pizza"]

const favoriteFood = "pizza";

logArgs(`I like ${favoriteFood}.`);
// -> I like pizza.

logArgs`I like ${favoriteFood}.`;
// -> ["I like ", "."] "pizza"

const favoriteDrink = "coke";

logArgs`I like ${favoriteFood} and ${favoriteDrink}.`;
// -> ["I like ", " and ", "."] "pizza" "obi"
```

#### 왜 유용한가? (ft.styled-components)

```javascript
const logArgs = (...args) => console.log(...args);

logArgs(`Test ${() => console.log("test")}`);
// -> Test () => console.log('test') 문자열!!

logArgs`Test ${() => console.log("test")}`;
// -> ["Test", ""] () => console.log('test')

const Title = styled.h1`
  ${(props) => props.$upsideDown && "transform: rotate(180deg);"}
  text-align: center;
`;
```

### 요약

Q.
A.

### 출처

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
- https://styled-components.com/docs/advanced#tagged-template-literals
- https://mxstbr.blog/2016/11/styled-components-magic-explained/

<!-- ## 6장 - 정리

### 6-1. 클래스형 컴포넌트

- 클래스형 컴포넌트의 특징 및 장점

  1.  컴포넌트 내에 render() 함수가 필수적으로 있어야 JSX 반환이 가능하다.
  2.  state기능 및 라이프 사이클API를 사용할 수 있다.
  3.  임의 메서드를 정의할 수 있다.

- 함수형 컴포넌트의 특징 및 장점
  1.  클래스형 컴포넌트보다 선언하기 편하다.
  2.  state와 라이프 사이클API의 사용이 불가능하지만, hooks 기능으로 해결가능하다.
  3.  함수는 한번 실행되고 나면 메모리 상에서 사라지기 때문에 메모리 자원을 덜 사용하는 것이 장점이다.

### 3-2. 모듈 내보내기 및 불러오기

- 모듈 내보내기 (export)
  ```javascript
   export defalut Component;
  ```
- 모듈 불러오기 (import)
  ```javascript
  import Component from "./Component";
  ```

### 3-3. props

props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다. props 값은 부모 컴포넌트에서 설정할 수 있다.

- JSX 내부에서 props 렌더링

  ```javascript
  import React from "react";

  const MyComponent = (props) => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
  };

  export default MyComponent;
  ```

- 컴포넌트 사용시 props 값 지정

  ```javascript
  import MyComponent from "./MyComponent";

  const App = () => {
    return <MyComponent name="React" />;
  };

  export default App;
  ```

  - defaultProps를 이용하여 props 기본값을 설정할 수 있다.

  ```javascript
  import React from "react";

  const MyComponent = (props) => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
  };

  MyComponent.defaultProps = {
    name: "기본 이름",
  };

  export default MyComponent;
  ``` -->
