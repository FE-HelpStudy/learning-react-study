# 메모이제이션(memoization)이 모야?
간단히 말하면, 동일한 입력으로 여러번 호출되는 함수 또는 컴포넌트가 있을 때 캐싱된 결과를 반환하여 성능을 향상시키고 코드의 복잡성을 줄일 수 있는 프로그래밍 기술이다.

React에서 제공하는 API 중에서 useMemo, useCallback와 같은 메모이제이션 훅을 통해 렌더링을 최소한으로 줄일 수 있다.

위 훅을 사용하면 렌더링 최적화를 통해 성능을 향상시킬 수 있다는건 이해했다.

그렇다면 `언제 사용해야할까?` `무조건 사용하면 최적화해서 성능이 향상되는 걸까?` 와 같은 질문에 명확하게 답하기가 어려운데, 이번에 같이 공부하고 마지막에는 질문에 대한 답을 해보자.

## useMemo
비용이 큰 연산에 대한 결과를 저장(메모이제이션)하고, 저장된 값을 반환하는 훅이다.

```jsx
import { useMemo } from 'react';

const memoizedValue = useMemo(() => expensiveComputation(a, b), [a, b]);
```
첫 번째 인수는 값을 반환하는 함수, 두 번째 인수는 해당 함수가 의존하는 값을 의존성 배열에 등록한다.

useMemo는 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전에 기억해 둔 값을 반환한다.

의존성 배열에 등록된 값이 변경됐다면 첫 번째 인수의 함수를 실행한 후 그 값을 반환하고 해당 값을 다시 기억하며, 단순히 값뿐만 아니라 컴포넌트도 메모이제이션 할 수 있지만 `React.Memo`를 이용하자.

다시 말하면, useMemo는 어떤 값을 계산하는 비용이 많이 들 때 사용하면 좋다.

## React.memo
React는 일반적으로 부모가 리렌더링될 때마다 컴포넌트를 리렌더링한다.

하지만 `memo`를 사용하면, 새로운 props가 이전 props와 동일하다면 부모가 리렌더링되더라도 해당 컴포넌트는 리렌더링되지 않는다.
```jsx
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

memo로 최적화하는 경우는 컴포넌트가 동일한 props로 자주 리렌더링 되고, 리렌더링 로직 비용이 많이 드는 경우에 유용하다.

메모이제이션은 props에만 적용되므로 최대한 잘 활용하기 위해서는 props 변경을 최소화 시키는 것이 좋다.

다음과 같이 prop이 객체인 경우 `useMemo`를 통해 부모 컴포넌트가 객체를 매번 다시 만드는 것을 방지할 수 있다.
```jsx
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```
다른 방법으로는 props에 필요한 최소한의 정보만 전달하는 것이다. `person`이라는 객체 전체를 전달하기 보단 개별 값을 전달할 수 있다.
```jsx
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

만약 위의 두 방법처럼 props의 변경을 최소화하는 것이 불가능할 경우 `memo`의 두 번째 인자인 `arePropsEqual`를 제공하여 React가 얕은 비교를 사용하는 대신 이전 props와 새로운 props를 직접 비교할 수 있다.
```jsx
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```
> `arePropsEqual`를 직접 구현하는 경우 함수를 포함한 모든 prop을 비교해야 한다.

## useCallback
useMemo가 값을 기억한다면, useCallback은 인수로 넘겨받은 콜백 함수를 기억한다.

즉, 특정 함수를 새로 만들지 않고 재사용하는 것이다.

```jsx
const ChildComponent = memo(({ name, value, onChange }) => { 
	
	useEffect(() => { 
	  console .log ( ’ rendering! ’ , name) 
	}) 
  
	return ( 
	  <> 
		<hl> 
		  {name} {value ? ’켜짐' : '꺼짐'}
		</hl> 
		<button onClick={onChange}>toggle</button> 
	  </> 
	)
}) 
          
function App() { 
	const [statusl, setStatusl] = useState(false) 
	const [status2, setStatus2] = useState(false)
    
	const togglel = () => { 
	  setStatusl(!statusl)
    }
    
	const toggle2 = () => { 
	  setStatus2(!status2) 
	} 
    
	return ( 
	  <> 
		<ChildComponent name="l" value={statusl} onChange={togglel} /> 
		<ChildComponent name="2" value={status2} onChange={toggle2} /> 
	  </>
    )
}
```
위 코드는 어떻게 동작할까요?

원래 생각한대로라면 값이 변경되지 않는 컴포넌트는 리렌더링이 되지 않고, 클릭한 컴포넌트만 리렌더링이 되어야 한다.

하지만 버튼을 클릭하면 클릭하지 않은 컴포넌트도 리렌더링이 발생한다.

그 이유는 state 값이 변경되면서 App 컴포넌트가 리렌더링되고, 그때마다 매번 onChange로 넘기는 함수가 재생성되고 있기 때문이다.

이를 해결하기 위해 사용하는 것이 `useCallback`이다.

사용 법은 `useMemo`와 같으며 의존성 배열에 등록된 값이 변경되지 않는 한 함수를 재생성하지 않는다.
```jsx
function App() { 
	const [statusl, setStatusl] = useState(false) 
	const [status2, setStatus2] = useState(false)
    
	const togglel = useCallback(
      function toggle1() {
        setStatus1(!status1)
      },
      [status1],
    )
    
	const toggle2 = useCallback(
      function toggle2() {
        setStatus2(!status2)
      },
      [status2],
    )
    
	return ( 
	  <> 
		<ChildComponent name="l" value={statusl} onChange={togglel} /> 
		<ChildComponent name="2" value={status2} onChange={toggle2} /> 
	  </>
    )
}
```
> useCallback에 기명 함수를 넘겨준 이유? 
화살표 함수를 통한 익명 함수로 넘겨도 무방하지만 크롬 메모리 탭에서 디버깅을 용이하게 할 수 있다.
익명 함수는 추적하기 어렵기 때문이다.

아래 코드는 useMemo와 useCallback을 사용했지만 동일하게 동작한다.
```jsx
function App() { 
	const [counter, setCounter] = useState(0) 
    
	const handleClick1 = useCallback(() => {
        setCounter((prev) => prev + 1)
      },
      [],
    )
    
	const handleClick2 = useMemo(() => {
        return () => setCounter((prev) => prev + 1)
      },
      [],
    )
}
```
동일한 기능을 하지만 유일한 차이는 메모이제이션을 하는 대상이 변수와 함수의 차이며, 메모이제이션하는 용도를 분리한 것이다.

JavaScript에서 함수 또한 값으로 표현되기 때문에 동일하게 동작할 수 있고, useMemo는 값을 반환해야 하므로 return을 통해 반환하도록 코드를 작성해야 한다.

따라서 함수를 메모이제이션 하는 용도로 useCallback을 사용하는 것이 가독성에도 도움이 된다.

기억해야할 것은 useMemo나 useCallback **모두 동일한 역할(메모이제이션)**을 한다는 점이다.

### 모든 곳에 memo를 하는 것이 좋을까?
메모이제이션도 비용이 든다. 값을 비교하고 렌더링이 필요한지, 이전 값을 저장해두었다가 다시 꺼내와야하는 비용이 든다.

이러한 비용이 리렌더링 비용보다 덜 드는지는 상황에 따라 다르기 때문에 섣부른 최적화는 항상 경계해야 한다.

메모이제이션은 어느 정도의 트레이드 오프가 있는 기법이라는 것을 잊지 말아야 한다.


### 참고
- [모던 리액트 Deep dive](https://wikibook.co.kr/react-deep-dive/)
- [리액트 공식문서 - useMemo](https://react.dev/reference/react/useMemo)
- [리액트 공식문서 - memo](https://react.dev/reference/react/memo#minimizing-props-changes)
- [리액트 공식문서 - useCallback](https://react.dev/reference/react/useCallback)