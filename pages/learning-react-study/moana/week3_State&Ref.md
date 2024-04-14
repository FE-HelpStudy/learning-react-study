# State: A Component Memory

공식문서를 기반으로 리액트 state에 대해 정리해본다. 📝
[리액트 공식문서](https://react.dev/learn/state-a-components-memory)
> Components need to “remember” things: the current input value, the current image, the shopping cart. In react, this kind of component-specific memory is called state
> 
> 컴포넌트는 현재 입력 값을 업데이트 해야 하기 때문에, 이를 기억해 줄 메모리 “State”가 필요하다

### **컴포넌트를 업데이트 하기 위해서는**

1. 지역변수는 렌더하는 동안 지속되지 않는다. 👉🏻렌더하는 동안 데이터를 지속시켜야 하고
2. 지역변수의 변화가 렌더링을 트리거하지 않는다. 👉🏻 새로운 데이터와 함께 컴포넌트가 렌더되도록 해야 한다. (물론 javascript처럼 let을 쓴 다음 getElementById를 써서 바꿔줄 수 있겠지만, 그것은 DOM을 직접 조작하기 때문에 리액트를 쓰는 이유가 없다.)

### **`useState Hook`이 위 두 조건을 제공한다.**

1. **state variable**이 렌더 사이에 데이터를 유지할 수 있도록 함.
2. **state setter function**이 variable을 update하고, 리액트가 컴포넌트를 렌더하도록 함.

#### 코드 예시
```js
import {useState} from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
// index=state variable, setIndex = setter function

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        {sculpture.name} 
				{sculpture.description}
      </h2>
    </>
  );
}

```

- **[ ] syntax**: Array destructuring으로 array는 useState로 부터 항상 **두 개의 값**을 리턴 받는다. [] syntax는 이 array로부터 두 값을 읽는다. index와 setIndex를 각각 받음
- 위 useState는 React에게 index를  기억해달라고 요청하는것.
- 렌더가 될 때마다, useState는 다음 값을 반환함
    - 내가 저장시켜 놓은 `state variable(index)`
    - `state variable`을 업데이트 시키고, 리액트가 컴포넌트를 렌더하도록 하는 `state setter function`(setIndex)

**useState 흐름**

1. 컴포넌트가 처음 렌더될 때, useState는 `[0, setIndex]`를 반환. 리액트는 0을 state의 최신 값으로 기억.
2. 버튼을 눌렀을 때 `setIndex(index+1)`을 호출 ⇒ `setIndex(1)`이 됨. ⇒ 리액트에게 index는 1로 저장하게 하고, 렌더를 트리거함.
3. 두 번째 렌더 때, useState는 `[1, setIndex]`를 반환 함.

### State is isolated & private
```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```

- 위 Gallery 컴포넌트를 렌더할 때, 버튼을 누르더라도 state는 독립적으로 수행 된다.
- Page 컴포넌트는 Gallery의 state를 모른다 = state is fully private. 부모 컴포넌트가 바꿀 수 없다.
- 만약 두 컴포넌트의 state를 sync하고 싶다면 ⇒ 각 자식 컴포넌트의 state를 지우고, 공유되는 가장 가까운 **부모 컨포넌트에 state 생성**.



<br/>
<br/>
<br/>

# Manipulating the DOM with Refs

### Ref란?
> DOM 요소에 이름을 달아 직접 접근할 때 사용. 
HTML을 작성할 때 div등의 DOM 요소에 이름을 달 경우 `<div id=”id”>`처럼 id를 사용한다. 이렇게 하면 특정 id에 해당하는 DOM 요소에만 스타일을 따로 적용하거나, js에서 해당 DOM 요소에 접근해 여러 가지 작업을 할 수 있다.

> HTML을 작성할 때 이렇게 id를 붙이는 것처럼, 리액트에서도 **DOM을 선택해 직접 접근하기 위해 ref를 사용한다.**


### 왜 필요?

React가 렌더 출력과 매치 시키기 위해 자동으로 DOM을 업데이트 해주지만, 직접 DOM요소에 접근해야 할 때가 있다.
- focus a node : 예, input에 focus주기
- scroll to node: 예, 스크롤 박스 조작
- measure node’s size and position

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

- useRef Hook은 `current`라는 object를 반환한다. 최초에는 inputRef값이 null⇒ 리액트가 DOM노드를 input 태그에 생성하면, `inputRef.current`를 통해 참조할 수 있게 한다.
- 이벤트 핸들러를 통해 DOM노드에 접근이 가능해진다.

### Ref 연결과정
React에서는 모든 업데이트가 두 단계로 분리되어 진행된다.

1. 렌더링단계
   - 이 단계에서 리액트는 컴포넌트 함수를 호출하고 JSX를 반환받는다. 
   - 이 과정에서 리액트는 실제 DOM 노드가 아닌, 무엇이 화면에 렌더링될지에 대한 설명(즉, 가상 DOM)을 작성한다.
   - 이 단계에서는 아직 실제 DOM 업데이트가 이루어지지 않았으므로, DOM 노드를 가리키는 ref는 아직 연결되지 않았다.(ref.current는 null)
2. 커밋 단계
   - 리액트는 렌더링 단계에서 만들어진 변경사항을 실제 DOM에 반영한다.
   - Ref 연결: 리액트는 실제 DOM 노드에 대한 참조를 ref 객체에 연결한다.
   -  이 과정에서
      -  업데이트 전: 리액트는 실제 DOM을 업데이트하기 전에, 영향을 받는 ref.current 값을 null로 설정한다. 이는 ref가 가리키던 이전 DOM 노드가 더 이상 유효하지 않을 수 있음을 반영한다.
       - 업데이트 후: 실제 DOM 업데이트가 완료되면, 리액트는 ref.current를 새로운 DOM 노드로 설정한다. 이로써 ref는 새로운 DOM 노드를 정확하게 가리키게 됨.
3. Ref와 렌더링/커밋 단계의 관계
   - 렌더링 중에 ref 접근을 권장하지 않는 이유: 렌더링 단계에서는 아직 실제 DOM 업데이트가 이루어지지 않았기 때문에, ref.current가 가리키는 값이 최종적이지 않을 수 있다. 따라서 렌더링 단계에서 ref.current에 접근하여 DOM 노드를 조작하거나 읽는 것은 부정확하거나 예기치 않은 결과를 초래할 수 있다.
   - 커밋 단계에서의 ref 연결: 커밋 단계에서 리액트는 실제 DOM 업데이트를 수행하고, 이때 ref를 새로운 DOM 노드에 연결한다. 이는 ref를 통한 접근이 실제 DOM 상태를 정확하게 반영하도록 보장한다.
  
**gpt 코드예시**
```js
import React, { useState, useEffect, useRef } from 'react';

function ExampleComponent() {
    const [text, setText] = useState('Initial text');
    const textRef = useRef(null);

    useEffect(() => {
        // 올바른 사용: 커밋 단계에서 실행되므로, ref.current는 실제 DOM 노드를 정확하게 가리킨다.
        console.log('The actual DOM node:', textRef.current);
    }, [text]);

    const handleChangeText = () => {
        // 렌더링 단계에서 ref 접근을 시도하는 부적절한 예
        console.log('Trying to access ref during rendering:', textRef.current);
        setText('Updated text');
    };

    return (
        <div>
            <p ref={textRef}>{text}</p>
            <button onClick={handleChangeText}>Change Text</button>
        </div>
    );
}

export default ExampleComponent;
```
`handleChaneText` 함수는 렌더링 단계에서 `ref`를 접근하고 있다. `ref.current`는 새로운 DOM 노드에 연결되어 있지 않을 수 있기 때문에 예상치 못한 값을 출력할 수도 있다.
반면, `useEffect` 안에서는 `ref.current` 접근이 안전하다. 왜냐하면 `useEeffect`의 콜백은 커밋 단계에서 실행되기 때문에 실제 DOM 노드에 정확히 연결됐기 때문이다. 