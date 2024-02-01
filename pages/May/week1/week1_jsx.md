### JSX 란?

> 자바스크립트의 확장 문법으로 브라우저에서 실행 되기 전에 코드가 번들링 되는 과정에서 바벨을 사용하여 자바스크립트 형태의 코드로 변환된다.

JSX 변환 과정

```jsx
function App() {
  return (
    <div>
      {" "}
      Hello <b>react</b>
    </div>
  );
}
```

```jsx
function App() {
  return;
  React.createElement(
    "div",
    null,
    "Hello",
    React.createElement("b", null, "react")
  );
}
```

**JSX를 이용하면 React.createElement 함수를 이용하지 않아도 편리하게 UI 를 렌더링 할 수 있다.**

### JSX 의 장점

1. 보기 쉽고 익숙하다
2. 더욱 높은 활용도

### JSX 문법

- 감싸인 요소

컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다

VirtualDom 에서 컴포넌트 변화를 감지해낼때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야한다는 규칙이 있기 때문이다

```jsx
function App() {
  return (
    <div>
      <h1>리액트 안녕</h1>
    </div>
  );
}
```

div 태그를 이용하고 싶지 않다면 v16 이상에서 도입된 Fragment 기능 사용

```jsx
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <h1>리액트 안녕</h1>
    </Fragment>
  );
}
```

- 자바스크립트표현
  자바스크립트 코드를 { }로 감싸주어 자바스크립트 표현식을 쓸 수 있다.
  ```jsx
  import { Fragment } from "react";
  const name = "react";
  function App() {
    return (
      <Fragment>
        <h1>{name} 리액트 안녕</h1>
      </Fragment>
    );
  }
  ```
- if 문 대신 조건부 연산자
  { }안에서 if 문을 사용할 수 없기 때문에 조건부 연산자(삼항 연산자)를 이용해 조건을 걸어줄 수 있다.
  ```jsx
  function App() {
    const name = "리액트";
    return (
      <div>
        {name === "리액트" ? <h1>리액트</h1> : <h2>리액트가 아닙니다.</h2>}
      </div>
    );
  }
  export default App;
  ```
- AND 연산자(&&)를 사용한 조건부 렌더링

```jsx
import React from 'react';

function App() {
 cosnt name='리액트';
 return <div> {name === '뤼액트' && <h1>리액트입니다.</h1> } </div>;

 export default App;
```

&& 연산자로 조건부 렌더링을 할 수 있는 이유는 리액트에서 false를 렌더링 할 때 는 null처럼 아무것도 나타나지 않기 때문이다.

\*falsy 한 값인 0 은 예외적으로 화면에 나타남

- undefined 를 렌더링하지 않기

리액트 컴포넌트에서는 함수에서 undefined 만 반환하여 렌더링하는 상황을 만들면 안된다.

```jsx
import React from 'react;

function App() {
 const name='undefined';
 return name;
 }

export default App;
```

JSX 내부에서 undefined를 렌더링하는 것은 괜찮다.

```jsx
import React from "react";

function App() {
  const name = undefined;
  return <div>{name}</div>;
}

export default App;
```

- 인라인 스타일링
- class 대신 className
- 꼭 닫아야하는 태그
- 주석
