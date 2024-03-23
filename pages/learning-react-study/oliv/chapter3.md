# 3장. 컴포넌트

## Deep Dive - React 라이프 사이클(ft. useEffect)

- 클래스형 컴포넌트의 라이프 사이클
  1. componentWillMount
  1. componentDidMount
  1. componentDidUpdate
  1. componentWillUnmount

그러나 React 공식 문서에 따르면 클래스형 컴포넌트가 아닌 함수형 컴포넌트의 사용을 권장한다.  
그러나 함수형 컴포넌트엔 라이프 사이클 API가 없지 않은가?  
useEffect를 사용하라!!

### The lifecycle of an Effect

- 컴포넌트의 라이프 사이클
  1. 컴포넌트가 화면에 추가되면 _mount_
  2. 상호작용에 대한 응답으로 새 prop나 state를 받았을 때 컴포넌트는 _update_
  3. 컴포넌트가 화면에서 제거되면 _unmount_

useEffect는 컴포넌트 라이플 사이클과 별개로 생각해야한다.  
useEffect는 props 및 state와 동기화하는 방법으로 두 가지 작업을 수행한다.  
**첫번째, 무언가 동기화를 시작하고 두번째, 나중에 동기화를 중지하는 것**

```javascript
import { useEffect } from "react";
import { createConnection } from "./chat.js";

function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    // setup code
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // cleanup code
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
    // list of dependencies
  }, [roomId]);
}
```

### Thinking from the Effect’s perspective

그럼 대체 라이프 사이클과 useEffect는 무슨 상관인가!?

- useEffect 실행 순서

  1. 컴포넌트가 mount된 후 useEffect의 setup code를 실행한다.
  2. dependencies이 변경된 컴포넌트를 리렌더링할 때마다
     - old props와 state에 cleanup code를 실행한다.
     - new props와 state로 setup code를 실행한다.
  3. 컴포넌트가 페이지에서 제거(unmount)된 후 cleanup code가 마지막으로 한 번 실행된다.

#### 관점의 차이

- 컴포넌트의 관점

  1. ChatRoom mounted with roomId set to "general"
  2. ChatRoom updated with roomId set to "travel"
  3. ChatRoom updated with roomId set to "music"
  4. ChatRoom unmounted

- useEffect의 관점
  1. Your Effect connected to the "general" room
  2. Your Effect disconnected from the "general" room and connected to the "travel" room
  3. Your Effect disconnected from the "travel" room and connected to the "music" room
  4. Your Effect disconnected from the "music" room

### 요약

Q. React의 라이프사이클에 대해 설명해주세요  
A. 리액트의 라이프 사이클은 클래스형 컴포넌트와 함수형 컴포넌트의 차이가 있습니다. 클래스형 컴포넌트는 componentWillMount, ...로 구성됩니다. 하지만 React 공식 문서에서는 함수형 컴포넌트를 권장합니다. 함수형 컴포넌트에는 라이프 사이클 API가 없지만, useEffect를 사용하여 유사하게 작업을 수행할 수 있습니다. useEffect는 컴포넌트가 마운트될 때 실행되고, 의존성 배열 값이 변경될 때마다 업데이트됩니다. 마지막으로 컴포넌트가 언마운트될 때 clean up 작업을 수행합니다.

### 출처

- https://react.dev/learn/lifecycle-of-reactive-effects
- https://react.dev/reference/react/useEffect#connecting-to-an-external-system

## 3장 - 정리

### 3-1. 클래스형 컴포넌트

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
  ```
