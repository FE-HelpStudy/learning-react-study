# 6장. 컴포넌트 반복

## Deep Dive - React 배열 index를 key로 사용하면 안되는 이유

map() 함수를 사용할 때 key 값으로 index를 자주 사용한다.  
그러나, 공식문서에서는 key 값으로 index 사용을 권장하지 않는다.

### 왜 key를 사용해야하는가?

리액트에서 key는 어떤 원소에 변동이 있었는지 알기 위해 사용한다.  
Virtual DOM을 비교하는 과정에서 key를 이용하여 정확하고 빠르게 변화를 추론하고 DOM 트리를 올바르게 업데이트하는 데 도움을 준다.

### 그런데 왜 index를 사용하면 안되는가?

미묘하고 복잡한 버그가 생길 수 있다.

```javascript
import React, { useEffect, useState } from "react";

const Example = () => {
  const [list, setList] = useState([
    { name: "철수" },
    { name: "영희" },
    { name: "민수" },
  ]);

  const addItem = () => {
    setList([{ name: "정국" }, ...list]);
  };

  const delItem = () => {
    setList(list.filter((l) => l.name != "철수"));
  };

  return (
    <>
      {/* 추가 버튼과 삭제 버튼*/}
      <input type="button" value="추가" onClick={addItem} />
      <input type="button" value="삭제" onClick={delItem} />

      <h2> Show Problem Example</h2>
      {list.map((v, index) => (
        <div key={index}>
          {v.name}, idx: {index} <input type="text" />
        </div>
      ))}
    </>
  );
};

export default Example;
```

### key의 규칙

1. key는 형제 간에 고유한다. 그러나 다른 배열의 JSX 노드에 동일한 키를 사용하는 것은 OK
2. key는 변경되어서는 안 된다.
3. 렌더링하는 동안 key를 생성하면 안 된다.

### 어떤 데이터가 key로 적합한가?

List 데이터에서 유니크한 값을 key로 사용해야한다.

- 데이터베이스의 데이터: 데이터가 데이터베이스에서 오는 경우 본질적으로 고유한 데이터베이스 키/ID를 사용
- 로컬에서 생성된 데이터: 데이터가 로컬에서 생성되고 유지되는 경우 항목을 생성할 때 처럼 증분 카운터나 메소드를 사용

  - crypto.randomUUID()
  - shorid

  ```javascript
  var shortid = require("shortid");
  function createNewTodo(text) {
    return {
      id: shortid.generate(),
      text,
    };
  }
  ```

### 배열 index를 key로 사용할 수 있는 경우?

1. 배열과 각 요소가 static이며 computed 되지 않고 변하지 않아야 한다.
2. 데이터 내부에 id로 쓸만한 unique 값이 없을 경우
3. 데이터가 결코 reordered or filtered 되지 않을 경우

### 요약

Q.
A.

### 출처

- https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

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
