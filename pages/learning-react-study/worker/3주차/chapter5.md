# Chapter 5 Ref

- 사용이유

  DOM을 직접 조작해야하는 경우 html의 id 또는 name 속성을 지정하여 참조 및 조작할 수 있다.

  [리액트에서 DOM을 직접 조작할 수 있는 방법을 제공하지 않는다.](https://react.dev/learn/manipulating-the-dom-with-refs)

  따라서 ref를 사용해 DOM 노드를 참조한다.

- useRef(initialValue)

  **Parameter**
  
  - initialValue : ref 객체의 current 속성의 초기 값으로 초기 렌더링 이후 무시된다

  **Returns**
  ```javascript
  // 초기 렌더링 시
  {
    current : initialValue
  }

  {
    current : ref 객체를 ref 속성으로 전달한 JSX 노드
  }
  ```
  **사용시 주의점**

  - ref.current 속성을 변경 가능하지만 state와 같이 렌더링에 사용되는 객체를 가지고 있다면 변경해서는 안된다.

  - **ref는 일반 JavaScript 객체**이기 때문에 ref.current 속성을 변경하면 React는 언제 변경되는지 인식하지 못하기 떄문에 컴포넌트를 리렌더링하지 않는다.

  - 초기화를 제외하고 렌더링 중에 ref.current 속성을 쓰거나 읽지 않는 것이 순수 함수로 취급되는 컴포넌트의 동작을 예측할 수 있다.
    ```javascript
    function MyComponent() {
    // 🚩 Don't write a ref during rendering
    myRef.current = 123;
    // 🚩 Don't read a ref during rendering
    return <h1>{myOtherRef.current}</h1>;
    }
    ```

    ```javascript
    function MyComponent() {
    useEffect(() => {
      // ✅ You can read or write refs in effects
      myRef.current = 123;
    });
    function handleClick() {
      // ✅ You can read or write refs in event handlers
      doSomething(myOtherRef.current);
    }
    }
    ```

## ref를 사용한 값의 참조

ref를 변경해도 리렌더링이 되지 않는다. ref는 컴포넌트의 시각적 결과에 영향을 주지 않는 정보(화면에 표시되지 않는 정보)를 저장하는 데 적합하다.

```javascript
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
```

**특성**

- 일반 변수와 다르게 리렌더링되어도 유지되며 
- state와 다르게 변경해도 리렌더링이 발생하지 않는다 
- 복사된 각각의 컴포넌트와 공유되지 않는다

## ref를 사용한 DOM 조작 + TS

### TLDR
useRef는 3가지 반환 타입이 있다

```typescript
// ref에 특정 값을 담는 용으로 사용할 때
const menuRef = useRef<number>(0);
// DOM을 다룰 때 반드시 초깃값은 null로 설정한다.
const menuRef = useRef<HTMLInputElement>(null);
```

1. 인자의 타입과 제네릭의 타입이 T로 일치하는 경우
    ```typescript
    function useRef<T>(initialValue: T): MutableRefObject<T>;

    interface MutableRefObject<T> {
      current: T;
    }
    ```
2. 인자의 타입이 null을 허용하는 경우 
    ```typescript
    function useRef<T>(initialValue: T|null): RefObject<T>;

    interface RefObject<T> {
      readonly current: T | null;
    }
    ```
3. 제네릭의 타입이 undefined인 경우(타입을 제공하지 않은 경우)
    ```typescript
    function useRef<T = undefined>(): MutableRefObject<T | undefined>;
    ```

### 예제

```typescript
import React, { useRef } from "react";

const App = () => {
  /**
   * 1번 case
   * MutableRefObject<number>
   * {
   *  current : number
   * }
   * 로컬 변수처럼 사용가능
  */
  const localVarRef = useRef<number>(0);

  const handleButtonClick = () => {
		if (localVarRef.current) {
	    localVarRef.current += 1;
	    console.log(localVarRef.current);
		}
  };

  return (
    <div className="App">
      <button onClick={handleButtonClick}>+1</button>
    </div>
  );
};

export default App;
```

```typescript
...
  const localVarRef = useRef<number>(null);
  /**
   * 2번 case
   * useRef<T>(initialValue: T|null): RefObject<T>;
   * 
   * interface RefObject<T> {
   *   readonly current: T | null;
   * }
   * 
   * current가 read-only 라서 수정 불가
  */
  const handleButtonClick = () => {

    localVarRef.current += 1; // Error
    // cannot assign to 'current' beacuse it is read-only property. ts(2540)
    console.log(localVarRef.current);
  };
...
```

```typescript
import React, { useRef } from "react";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  /**
   * 2번 case
   * useRef<T>(initialValue: T|null): RefObject<T>;
   * 
   * interface RefObject<T> {
   *   readonly current: T | null;
   * }
   * 
   * current가 read-only 라서 수정 불가?
  */
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Error?
    }
  };

  return (
    <div className="App">
      <input ref={inputRef} />
      <button onClick={handleButtonClick}>Clear</button>
    </div>
  );
};

export default App;
```

2번 경우의 useRef는 수정 불가능한 RefObject<T>를 반환하는데, 왜 inputRef.current.value는 수정 가능한가?

정의 상 current 속성만 읽기 전용으로, current 속성의 하위 속성인 value는 여전히 수정 가능하다. 이는 typescript의 접근제한자 readonly가 shallow하기 때문이다. HTMLInputElement를 받아온 시점에서 그럴 일은 없겠지만, current 속성를 직접 수정하려 하면 에러가 발생하는 것을 볼 수 있다.

참조
- https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5
- https://react.dev/reference/react/useRef#referencing-a-value-with-a-ref