useState

# useEffect

클래스형 컴포넌트의 componentDidMount 와 componentDidupdate 를 합친 형태

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

```jsx
useEffect(()=>{console.log(마운트될 때만 실행됩니다. )},[]);
```

```jsx
useEffect(() => {
  console.log(name);
}, [name]);
```

# useReducer

컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.상태 업데이트 로직을 컴포넌트 바깥 또는 다른 파일에 작성 후 불러와 사용할 수 있다.

```jsx
useReducer(리듀서함수,리듀서의 기본값)
```

### reducer 란?

현재 상태와 액션 객체(업데이트를 위해 필요한 정보를 담은값) 를 파라미터로 받아와서 새로운 상태를 반환해주는 함수

- reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다.
- reducer 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 한다.
- action 은 업데이틀 위한 정보를 가지고 있음

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const useReducer = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default useReducer;
```

- useReducer 훅을 사용하면 state 값과 dispatch 함수를 받아옴
- state 는 현재 가리키고 있는 상태
- dispatch 는 액션을 발생시키는 함수 ⇒ dispatch(action) 과 같은 형태로 함수안에 파라미터로 액션값을 넣어주면 리듀서 함수가 호출되는 구조

# useMemo

함수컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.

리렌더사이의 계산 결과값을 캐싱함

```jsx
const cachedValue = useMemo(calculateValue, dependencies);
```

useMemo 사용법

1. 계산 함수는 매개변수를 받지 않아야 한다.

   사용 예 : ( ) ⇒,

1. 계산을 수행하고 결과를 반환
1. usmemo 의 두번째 매개변수인 dependencies는 계산내에서 사용되는 모든 값이 포함되어야 한다. ⇒ dependencies 중 **하나라도 변경되면 usememo 는 새로운 계산을 수행**하고 그렇지 않으면 이전에 계산된값을 재사용한다.

input 안의 값이 바뀌어도 average 는 바뀌지 않음

```jsx
import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };
  const avg = useMemo(() => getAverage(list), [list]);
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

# useCallback

, 함수의 새로운 인스턴스가 매 렌더링마다 생성되는 것을 방지하고, 함수를 메모리에 캐시하여 성능을 최적화하는 데 사용된다.

**`useCallback`**은 주로 자식 컴포넌트에 콜백 함수를 전달할 때 유용하게 쓰인다.

```jsx
const memoizedCallback = useCallback(() => {
  //캐시하고자 하는 함수
}, [dependencies]);
```

```jsx
import React, { useCallback, useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  // useCallback을 사용하여 memoizedCallback 함수를 캐시
  const memoizedCallback = useCallback(
    () => {
      console.log("Button Clicked!");
      setCount(count + 1);
    },
    [count] // count 값이 변경될 때만 함수를 다시 생성
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={memoizedCallback}>Click me</button>
    </div>
  );
};

export default MyComponent;
```

위의 코드에서 **`memoizedCallback`**은 **`count`** 값에 의존하고 있으므로, **`count`** 값이 변경될 때만 함수가 새로 생성되어 매 렌더링에서 새로운 함수를 생성하는 비용을 피할 수 있다.

# useRef

Ref의 사용사례

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때.
- 애니메이션을 직접적으로 실행시킬 때.
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때.

```jsx
const refContainer = useRef(initialValue);
```

**`myRef.current`**를 통해 참조에 접근할 수 있다.

**`current`**는 현재 참조된 값이며, 변경해도 컴포넌트가 리렌더링 되지 않는다.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

`React.createRef()`를 통해 생성되고 `ref` 어트리뷰트를 통해 React 엘리먼트에 부착.

보통, 컴포넌트의 인스턴스가 생성될 때 Ref를 프로퍼티로서 추가하고,

그럼으로서 컴포넌트의 인스턴스의 어느 곳에서도 Ref에 접근가능 함

Ref 에 접근 하는 법

```jsx
const node = this.myRef.current;
```

1. useRef 를 이용한 dom 요소에 대한 참조

```jsx
import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const myInputRef = useRef(null);

  useEffect(() => {
    // 마운트 후에 input 요소에 포커스를 준다
    myInputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={myInputRef} type="text" />
      <button onClick={() => myInputRef.current.focus()}>Focus Input</button>
    </div>
  );
};

export default MyComponent;
```

1. 이전 값 기억

```jsx
import React, { useState, useRef } from "react";

const MyComponent = () => {
  const count = useRef(0);

  const handleClick = () => {
    count.current += 1;
    console.log(`Clicked ${count.current} times.`);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default MyComponent;
```
