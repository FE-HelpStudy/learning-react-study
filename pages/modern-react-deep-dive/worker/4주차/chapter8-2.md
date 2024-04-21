# 리액트 팀이 권장하는 리액트 테스트 라이브러리

**화이트박스 테스트 (White-box Testing)**

- 소스 코드의 내부 구조와 구현 세부 사항을 알고 있는 상태에서 수행된다.
- 코드의 내부 로직, 분기, 예외 처리 등을 직접 검증한다.

  - 단위 테스트: 개별 함수나 메서드의 동작을 검증한다. 모든 분기와 예외 상황을 다룬다.
  - 통합 테스트: 여러 개의 모듈이나 컴포넌트가 함께 작동하는지 확인한다. 모듈 간의 상호작용과 의존성을 검증한다.

화이트박스 테스트는 코드 커버리지를 높이고, 버그를 빨리 발견할 수 있다는 장점이 있다. 하지만 코드의 내부 구조를 잘 알고 있어야 하며, 코드 변경 시 테스트 코드도 수정해야 하는 단점이 있다.

**블랙박스 테스트 (Black-box Testing)**

- 시스템의 내부 구현 방식을 모르는 상태에서 입력 값과 출력 값만을 바탕으로 테스트를 수행한다. 
- 사용자 관점에서 바라본 기능과 동작을 검증한다.

  - 단위 테스트: 개별 컴포넌트나 함수의 입출력 동작을 검증합니다.
  - 통합 테스트: 여러 컴포넌트가 함께 작동하는지 확인합니다. 컴포넌트 간의 상호작용을 검증합니다.
  - 엔드투엔드(E2E) 테스트: 실제 사용자 시나리오를 시뮬레이션하여 전체 애플리케이션의 동작을 검증합니다.

블랙박스 테스트는 사용자 경험을 중심으로 테스트할 수 있고, 내부 구현 변경에 영향을 받지 않는다는 장점이 있다. 하지만 모든 경계 조건과 예외 상황을 다루기 어려우며, 버그의 원인을 찾기 어려울 수 있다.

실제 프로젝트에서는 화이트박스 테스트와 블랙박스 테스트를 적절히 조합하여 사용하는 것이 가장 좋다. 백엔드에서는 화이트박스 테스트를, 프론트엔드에서는 블랙박스 테스트를 주로 활용하면서, 필요에 따라 서로의 테스트 방식을 보완적으로 활용하는 것이 좋다.

## 상태가 없는 컴포넌트
```typescript
// Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
```
```typescript
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button 컴포넌트', () => {
  let buttonElement, onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
  });

  const renderButton = (props) => {
    render(<Button label="Click me" onClick={onClickMock} {...props} />);
    buttonElement = screen.getByRole('button', { name: 'Click me' });
  };

  it('전달된 label 텍스트를 렌더링한다', () => {
    renderButton();
    expect(buttonElement).toBeInTheDocument();
  });

  it('onClick 함수가 호출된다', () => {
    renderButton();
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('disabled 속성이 true일 때 버튼이 비활성화된다', () => {
    renderButton({ disabled: true });
    expect(buttonElement).toBeDisabled();
  });

  it('disabled 속성이 false일 때 버튼이 활성화된다', () => {
    renderButton({ disabled: false });
    expect(buttonElement).not.toBeDisabled();
  });
});
```

## 상태가 있는 컴포넌트
```typescript
// Counter.tsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```
```typescript
// Counter.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter 컴포넌트', () => {
  let incrementButton, decrementButton, resetButton, countElement;

  beforeEach(() => {
    render(<Counter />);
    incrementButton = screen.getByRole('button', { name: /increment/i });
    decrementButton = screen.getByRole('button', { name: /decrement/i });
    resetButton = screen.getByRole('button', { name: /reset/i });
    countElement = screen.getByText(/Count:/i);
  });

  it('초기 카운트 값이 0이다', () => {
    expect(countElement).toHaveTextContent('Count: 0');
  });

  it('증가 버튼을 클릭하면 카운트 값이 증가한다', () => {
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent('Count: 1');
  });

  it('감소 버튼을 클릭하면 카운트 값이 감소한다', () => {
    fireEvent.click(decrementButton);
    expect(countElement).toHaveTextContent('Count: -1');
  });

  it('리셋 버튼을 클릭하면 카운트 값이 0이 된다', () => {
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(resetButton);
    expect(countElement).toHaveTextContent('Count: 0');
  });
});
```
## 비동기 호출을 하는 컴포넌트
## 사용자 정의 훅

```typescript
// useCounter.tsx
import { useState } from 'react';

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

export default useCounter;
```
```typescript
// useCounter.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

describe('useCounter 훅', () => {
  it('초기 값을 제공하지 않으면 0으로 초기화된다', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('초기 값을 제공하면 해당 값으로 초기화된다', () => {
    const initialValue = 10;
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.count).toBe(initialValue);
  });

  it('increment 함수를 호출하면 count 값이 증가한다', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('decrement 함수를 호출하면 count 값이 감소한다', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });

  it('reset 함수를 호출하면 count 값이 초기 값으로 재설정된다', () => {
    const initialValue = 10;
    const { result } = renderHook(() => useCounter(initialValue));
    act(() => {
      result.current.increment();
      result.current.decrement();
      result.current.reset();
    });
    expect(result.current.count).toBe(initialValue);
  });
});
```