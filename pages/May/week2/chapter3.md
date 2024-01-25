# 3장 컴포넌트

컴포넌트의 기능

데이터가 주어졌을때 이에 맞추어 ui 를 만들고 라이프사이클 api 를 이용하여 컴포넌트가 화면에서 나타날 때 사라질때 변화가 일어날 대 주어진 작업들을 처리할 수 잇고 임의 메서드를 만들어 특별한 기능을 붙여줄 수 있다.

## 함수형 컴포넌트와 클래스형 컴포넌트

- 클래스형 컴포넌트

ES6 이후 JS 에 클래스 등장

- 함수형 컴포넌트

state 와 라이프사이클 api 의 사용이 불가능했지만 리액트 v16.8 이후 hooks 기능 도입되어 해결

**화살표 함수**

함수를 파라미터로 전달할때 유용함

**화살표함수의 특징**

- **This 바인딩**

화살표 함수에는 this 라는 변수 자체가 존재하지 않기 때문에 그 상위 환경에서의 this 를 참조

기존의 바인딩 규칙을 무시하고 화살표 함수가 아닌 가장 가까운 함수의 this 를 가리킨다.

## props 와 state

### props (properties): 데이터를 다른 컴포넌트로 전달할때 사용

예제 출처:https://react.vlpt.us/basic/05-props.html

```jsx
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

```jsx
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

props 기능 및 사용법

1.default props

props 의 값을 지정하지 않았을때 보여줄 기본값을 설정

```jsx
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}

export default App;
```

```jsx
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}
Hello.defaultProps = { name: "기본이름" };
export default Hello;
```

2.children

태그사이의 내용을 보여줌

```jsx
import MyComponent from "./MyComponent";

const App = () => {
  return <MyComponent>리액트</MyComponent>;
};
export default App;
```

```jsx
const MyComponent = (props) => {
  return (
    <div>children 값은 {props.children} 입니다. </div> // children 값은 리액트입니다.
  );
};
export default MyComponent;
```

3.비구조화 할당 문법

props 라는 키워드를 붙이지 않고 간단한 작업 가능

```jsx
import React from "react";

const MyComponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children 값은 {children}
      입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  name: "기본 이름",
};

export default MyComponent;
```

4.prop Types 를 통한 props 검증

컴포넌트의 필수 props 를 지정하거나 props의 타입을 지정 할 때 사용

```jsx
import React from "react";
import PropTypes from "prop-types";

export default function MyComponent({ name, children, favoriteNumber }) {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}입니다.
      <br />
      제가 좋아하는 숫자는 {favoriteNumber}
    </div>
  );
}

MyComponent.defaultProps = {
  name: "기본이름",
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
  //isrequired 요소 가 빠졌기 때문에 콘솔창에 경고
};
```

```jsx
import MyComponent from "./MyComponent";

function App() {
  return (
    <MyComponent name="React" favoriteNumber={1}>
      리액트
    </MyComponent>
  );
}
```

## State

컴포넌트 내부에서 바뀔 수 있는 값

- 클래스형 컴포넌트가 가진 state
- 함수 컴포넌트의 useState

(추가예정)
