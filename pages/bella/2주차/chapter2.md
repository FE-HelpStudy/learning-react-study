# 컴포넌트

컴포넌트는 리엑트에서 화면 UI요소를 구분할 때 사용하는 단위이다.

컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나눌 수 있다.

컴포넌트를 정의하는 방법에는 두가지가 있다. (함수 컴포넌트, 클래스형 컴포넌트)

### 함수 컴포넌트

```jsx
import'./App.css';

function App() {
	const name = '리액트';
	return <div className="react">{name}<div>;
}

export default App;
```

컴포넌트를 정의하는 가장 간단한 방법은 자바스크립트 함수를 작성하는 것이다

함수형 컴포넌트는 JS함수를 선언하는것과 같기 때문에 클래스형보다 선언이 편하며 메모리 자원도 덜 사용한다. 또한 빌드 후 배포 시에도 파일 크기가 더 작다.

state와 라이프사이클 API를 사용할 수 없지만 이를 대체해 Hook을 사용해 비슷한 작업을 할 수 있다.

리액트 공식 메뉴얼에서는 함수 컴포넌트와 hook 사용을 권장한다.

### 클래스형 컴포넌트

```jsx
import { Component } from 'react';
class App extends Component {
	render () {
		const name = 'react';
		return <div className="react">{name)</div>;
	}
}
export default App;
```

클래스형 컴포넌트의 경우 state기능과 라이프사이클 기능을 사용할 수 있고 임의 메서드를 정의할 수 있다.

reder 함수가 꼭 있어야 하고, 그 안에서 JSX를 반환해야 한다.

### 모듈 export, import

컴포넌트를 export 해서 다른 파일에서 해당 컴포넌트 import 하여 불러올 수 있다.

## Props (properties)

props는 컴포넌트 속성을 설정할 때 사용하는 요소이다.

props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.

### **JSX 내부에서 props 렌더링**

```jsx
// MyComponent.js

import React from 'react';

const MyComponent = (props) => {
  return <div>안녕하세요, 제 이름은 {props.name} 입니다.</div>;
};

export default MyComponent;
```

props값은 컴포넌트 함수의 파라미터로 받아 와서 사용할 수 있다.

### **컴포넌트를 사용 시 props 값 지정**

```jsx
// App.js

import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="React" />;
};

export default App;
```

props값을 지정해주지 않았을 때 보여줄 기본값을 defaultProps를 사용해 설정할 수 있다.

```jsx
// MyComponent.js

import React from 'react';

const MyComponent = (props) => {
  return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};

MyComponent.defaultProps = {
  name: '기본 이름',
};

export default MyComponent;
```

### **children**

children은 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여주는 props이다.

props.children 으로 사이의 값을 가져올 수 있다.

```jsx
// MyComponent.js

import React from 'react';

const MyComponent = (props) => {
  return (
    <div>
      안녕하세요, 제 이름은 {props.name}입니다.
      <br />
      children 값은 {props.children}
      입니다.
    </div>
  );
};

export default MyComponent;
```

```jsx
// App.js

import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="React"> 리액트 </MyComponent>;
};

export default App;
```

### **비구조화 할당 문법을 통해 props 내부 값 추출하기**

객체에서 값을 추출하는 문법을 비구조화 할당(destructuring assignment)이라고 부른다. 이 문법을 통해 props 내부 값을 추출해 props 키워드를 붙여주지 않고 편하게 내부 값을 바로 추출할 수 있다.

```jsx
// MyComponent.js

import React from 'react';

const MyComponent = (props) => {
  const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}
      입니다.
    </div>
  );
};

export default MyComponent;
```

함수 파라미터 부분에서도 사용할 수 있다. 만약 함수의 파라미터가 객체라면 그 값을 바로 비구조화해서 사용하는 것이다.

```jsx
// MyComponent.js

import React from 'react';

const MyComponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}
      입니다.
    </div>
  );
};

export default MyComponent;
```

### **propTypes를 통한 props 검증**

컴포넌트의 필수 props를 지정하거나 props의 타입을 지정하기 위해 propTypes를 사용할 수 있다.

import 구문을 사용하여 protoTypes를 불러와 사용한다.

```jsx
// MyComponent.js

import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}
      입니다.
    </div>
  );
};

MyComponent.propTypes = {
  name: PropTypes.string, // name 값은 무조건 문자열(string) 형태로 전달해야한다.
};

export default MyComponent;
```

```jsx
// App.js

import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name={3}> 리액트 </MyComponent>;
};

export default App;
```

컴포넌트에서 설정한 props가 propTypes에서 지정한 타입과 일치하지 않으면 콘솔에 경고메시지가 출력된다.

(Failed prop type)

> **propTypes 종류**
> array, arrayOf(propType), bool, func, number, object, string, symbol, node→랜더링 가능한 모드 것, instanceOf, any \*\*\*\*

### isRequired

isRequired를 사용하여 필수 propTypes 설정해줄 수 있다.

propTypes를 지정할 때 뒤에 isRequired를 붙여 주면 propTypes를 지정하지 않았을 때 경고 메시지가 뜬다.

```jsx
// MyComponent.js

import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, favoriteNumber, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}
      입니다.
      <br />
      제가 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  name: '기본 이름',
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};

export default MyComponent;
```

```jsx
// App.js

import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent name="React"> 리액트 </MyComponent>;
  // return <MyComponent name='React' favoriteNumber={4}> 리액트 </MyComponent>;
  // 위와 같이 지정해 주면 경고가 사라진다.
};

export default App;
```

### **클래스형 컴포넌트에서 props 사용하기**

클래스형 컴포넌트에서 props를 사용할 때는 render 함수에서 this.props를 조회하면 된다.

defaultProps와 propTypes는 똑같은 방식으로 설정할 수 있다.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다.
        <br />
        children 값은 {children}
        입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: '기본 이름',
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};

export default MyComponent;
```

defaultProps와 propTypes를 class 내부에서 지정하는 방법도 있다.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static defaultProps = {
    name: '기본 이름',
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다.
        <br />
        children 값은 {children}
        입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

export default MyComponent;
```

## **State**

자바스크립트로 화면의 데이터 변경을 시키려면?

DOM에 접근하여 직접 수정 (JS객체와 화면의 데이터를 직접 일치시켜야 함)

리액에서는 state를 사용해 컴포넌트 내부의 값을 바꿀 수 있다.

### 데이터 바인딩

제공자와 소비자로부터 데이터 원본을 결합시켜 동기화 시키는 기법

(JS객체와 화면의 데이터를 일치시켜 주는 것)

리액트는 단방향 데이터 바인딩을 제공한다.

리엑트에서 데이터는 하향식으로 흐른다. 부모 컴포넌트는 자신의 state를 props로 자식컴포넌트에게 전달한다.

리액트에서 지원하는 state를 사용해 데이터를 변경할 수 있다. state 사용 시 state가 변경되면 자동으로 화면이 리랜더링된다.

props: 부모로 부터 전달받는 값, 읽기 전용 데이터

state: 해당 컴포넌트에서 관리됨

리액트에는 **두 가지 종류의 state**가 있다.

- 클래스형 컴포넌트의 state
- 함수 컴포넌트의 useState 함수를 통해 사용하는 state

### 3.4.1 **클래스형 컴포넌트의 state**

```jsx
// Counter.js

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    // 컴포넌트 생성자 메서드
    super(props); // constructor를 작성시 반드시 super(props) 호출 -
    // super 호출 -> 리액트 Component 클래스가 지닌 생성자 함수 호출
    this.state = {
      // state 초깃값 설정, state는 객체형식이어야 함
      number: 0,
      fixedNumber: 0,
    };
  }
  //state = {
  //    number: 0,
  //    fixedNumber:0
  // }
  // constructor 메서드를 선언하지 않고도 state 초깃값을 설정 가능

  render() {
    // this.state로 현재 state 조회
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
            // this.setState를 사용해 state 업데이트 가능
            // setState 함수는 인자로 전달된 객체 안에 들어있는 값만 바꿔줌
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
```

### 어떻게 화면이 변경되는가?

화면이 리랜더링 되려면 render함수가 실행되어야 하는데

setState는 컴포넌트 업데이트 프로세스를 trigger한다. 그러므로 setState를 통해 state를 변경하면 리액트가 이를 감지하고 화면을 업데이트 한다.

업데이트 프로세스 중 shouldComponentUpdate는 state가 변경되었는지 비교연산을 진행한다. 이때 퓨어컴포넌트가 아닌 이상 true를 반환하기 때문에 setState사용 시 항상 리랜더가 일어난다.

```jsx
// App.js

import Counter from './Counter';

const App = () => {
  return <Counter />;
};

export default App;
```

constructor 메서드를 선언하지 않고도 state 초깃값을 설정할 수 있다.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number: 0,
        fixedNumber:0
    }

    render(){
        const {number , fixedNumber} = this.state // this.state로 state 조회
        return (...);
    }
}

export default Counter;
```

### this.setState에 객체 대신 함수 인자 전달

this.setState를 사용하여 state 값을 업데이트할 때는 상태가 비동기적으로 업데이트됩니다.

```jsx
// Counter.js - button onClick 부분

onClick = {() => {
	// this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
	this.setState({ number: number + 1 });
	this.setState({ number: this.state.number + 1 });
}}
```

코드를 위와 같이 작성하면 this.setState를 두 번 사용하는 것임에도 불구하고 버튼을 클릭할 때 숫자가 1씩 더해진다.

**왜일까?**

setState는 state를 바로 업데이트하지 않는다.

setState는 state 변경사항을 대기열에 집어넣고 컴포넌트에게 새로운 state를 사용하기 위해 rerender 하도록 요청한다.

→ 비동기적으로 작동한다. (why? 성능 저하 때문, 리액트는 인지 성능 향상을 위해 setState 실행을 지연시키고 여러 컴포넌트를 한번에 갱신한다.)

이를 해결하기 위해(최신 state를 사용하기 위해) this.setState에 객체 대신 함수를 넘겨주면 된다.

이때 넘겨주는 함수를 updator함수라고 하는데 이 updator함수를 넘겨주면 state가 갱신 된 후 업데이트 되는 것이 보장된다.

```jsx
this.setState((prevState, props) => {
  return {
    // 업데이트하고 싶은 내용
  };
});
```

updator함수의 첫번째 매개변수는 최신 state임을 보장해주고 두번째 매개변수는 최신 props임을 보장해준다.

만약 업데이트하는 과정에서 props가 필요하지 않다면 생략해도 된다.

```jsx
// Counter.js - button

<button
	// onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다.
	onClick={() => {
		this.setState(prevState => {
			return {
				number: prevState.number +1
			};
		});
		// 위 코드와 아래 코드는 완전히 똑같은 기능을 합니다.
		// 아래 코드는 함수에서 바로 객체를 반환한다는 의미입니다.
		this.setState(prevState => (
			{
				number: prevState.number + 1
			},
			() => {
        console.log("방금 setState가 호출되었습니다.");
        console.log(this.state);
	    }
		);
	}}
>
	+1
</button>
```

이렇게 작성하면 숫자가 2씩 증가한다.

setState를 사용하여 값을 업데이트하고 난 다음에 특정 작업을 하고 싶을 때는 setState의 두 번째 파라미터로 콜백(callback) 함수를 등록하여 작업을 처리할 수 있다.

### **useState**

함수 컴포넌트는 stateless컴포넌트 이다.

함수 안에 있는 변수들은 함수까 끝나면 사라지기 때문이다. state를 update해도 함수가 다시 실행되면 다시 초기값이 된다.

→ state를 저장하기 위해 useState hook을 사용한다.

useState는 다음 리랜더링 시 배열의 첫번째 요소로 최신 state를 반환한다.

→ 함수 컴포넌트에서도 갱신된 최신 state를 사용할 수 있다!

### useState 사용예시

클래스형 컴포넌트에서의 state 초깃값은 객체 형태를 넣어 주어야 하지만, useState에서는 값의 형태가 자유입니다.

```jsx
// Say.js

import React, { useState } from 'react';

const Say = () => {
  // useState 함수의 인자에는 상태의 초깃값을 넣어 줍니다.
  const [message, setMessage] = useState(''); // 배열의 첫번째 원소: 현재 상태, 두번째 원소: 상태 바꿔주는 함수
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요.');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Say;
```

```jsx
// App.js

import Say from './Say';

const App = () => {
  return <Say />;
};

export default App;
```

## **state를 사용할 때 주의 사항**

- 배열이나 객체를 업데이트 할 때는 객체 사본을 만들고 그 사본에 값을 업데이트한 후, 그 사본의 상태를 setState 혹은 세터 함수를 통해 업데이트 합니다.
  ```jsx
   // 사본을 만들어서 업데이트하는 예시

  // 객체 다루기
  const object = {a: 1, b: 2, c: 3};
  const nextObject = {...object, b: 2}; // 사본을 만들어서 b 값만 덮어 쓰기

  // 배열 다루기
  const array = [
  	{ id: 1, value: true },
  	{ id: 2, value: true },
  	{ id: 3, value: false}
  ];
  let nextArray = array.concat({ id: 4 }); // 새 항목 추가
  nextArray.filter(item => item.id !== 2); // id가 2인 항목 제거
  nextArray.map(item => (item.id === 1 ? { ...item, value: false } : item)); // id가 1인 항목의 value를 false로 설정

  {/*
  	객체에 대한 사본을 만들 때는 spread 연산자라 불리는 ...을 사용하여 처리하고,
  	배열에 대한 사본을 만들 때는 배열의 내장 함수들을 활용합니다.
  *}
  ```

---

# 이벤트 핸들링

**이벤트:** 사용자가 웹 브라우저에서 DOM 요소들과 상호작용하는 것

HTML과 비슷하지만 다르다.

### 리액트에서 **이벤트 사용 시 주의사항**

1. 이벤트 이름은 camelCase로 작성

2. 이벤트에는 함수 형태의 값을 전달. (자바스크립트 코드 x)

3. DOM 요소에만 이벤트 설정 가능

- 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음
- 하지만 전달 받은 props를 컴포넌트 내부의 DOM 이벤트에 설정 가능

### 예시

input 요소와 해당 요소에 onChange 이벤트를 설정

```jsx
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: '',
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
        />
      </div>
    );
  }
}

export default EventPractice;
```

e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체

이벤트에 등록하는 함수에서 e 객체를 파라미터로 받아서 사용 가능.

e.target은 이벤트가 발생한 DOM인 input DOM을 가르킨다.

DOM의 value값을 조회하면 현재 input에 입력한 값이 무엇인지 알 수 있다.

### state

이벤트 핸들링 함수 내부에서 this.setState 메서드를 호출하여 state를 업데이트 하고 input의 value 값을 state에 있는 값으로 설정해서 state에 input값을 담아 관리할 수 있다.

이유는 JS에서 기본적으로 클래스 함수들이 바운드되지 않기 때문이다. 그래서 바인딩을 하지 않으면 정의된 함수는 글로벌 스코프에서 호출되게 되고 글로벌 스코프에서 해당 함수는 undefined 이므로 사용할 수가 없다.

### 임의의 함수

이벤트 핸들러에 전달할 함수를 따로 빼내서 외부에서 정의하여 호출할 수도 있다.

이때 주의할 점은 클래스의 함수로 정의한 후 constructor에서 해당 메서드를 this와 바인딩 해주어야 한다.

이가 번거롭다면 transform class properties 문법을 사용해 화살표 함수 형태로 메서드를 정의하거나 이벤트 핸들러를 넣는 곳에 화살표 함수를 사용하는 방법도 있다.

```jsx
class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // callback에서 this'를 사용하기 위해서는 바인딩을 필수적으로 해줘야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleon ? '켜짐' : '꺼짐'}
      </button>
    );
  }
}
```

```jsx
class MyButton extends React.Component {
	handleclick =（） => {
		console.log('this is:', this);
	}
	render() {
		return (
			<button onClick={this.handleClick}>
				클릭
			</button>
		);
	}
}
```

```jsx
class MyButton extends React.Component {
	handleClick() {
		console. log('this is:', this);
	｝
	render () {
		// 이렇게 하면 this 가 바운드됩니다.
		return (
			<button onClick={() => this.handleClick( )}>
				클릭
			</button>
		);
	}
}
```

## 함수 컴포넌트에서 이벤트 핸들러

함수 컴포넌트에서의 이벤트 처리는 다음과 같다.

함수 컴포넌트 내에서 이벤트 핸들러 함수를 정의하는 방법은 함수 또는 화살표 함수가 있다. 이러헤 정의한 함수를 곧바로 이벤트 핸들러에 넣어주면 된다.

```jsx
function Toggle(props) {
	const [isToggleOn, setIsToggleOn] = useState(true);

	// 방법 1. 함수 안에 함수로 정의
	function handleClick() {
		setIsToggleOn((isToggleOn) => !isToggleOn);
	｝

	// 방법 2. 화살표 함수를 사용하여 정의
	const handleClick = () = {
		setIsToggleOn((isToggleOn) => !isToggleOn);
	｝

	return (
		<button onClick={handleClick}>
			{isToggleon ? "켜짐" : "꺼짐"}
		</button>
	);
}
```

# **여러 개의 input 상태를 관리하기**

```jsx
import React, {useState}from 'react';

functionEventPractice () {
const [inputs, setInputs] = useState({
        name : '',
        nickname: ''
    });

const {name, nickname} = inputs;

const onChange = (e) =>{
const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };

const onReset = () =>{
        setInputs({
            name : '',
            nickname: '',
        })
    }
return (
        <div>
            <h1>이벤트 연습</h1>
            <input  name = "name" placeholder="이름" onChange = {onChange}value = {name}></input><br />
            <input  name = "nickname" placeholder="닉네임" onChange = {onChange}value = {nickname}></input><br />
            <button onClick = {onReset}>초기화</button>
            <div>
                <b>값 :</b>
                {name} ({nickname})
            </div>
        </div>
    )
}

exportdefault EventPractice
```

input의 개수가 여러 개 있을 때는 input에 name을 설정하고 이벤트가 발생했을 때 값을 참조하는 것이다.

useState에서는 문자열이 아닌 객체 형태의 상태를 관리.

리액트에서 객체 형태의 상태를 수정할 때는 새로운 객체를 만들어서 새로운 객체에 변화를 주고

이것을 상태에 사용해야 한다.

```jsx
setInputs({
  ...inputs,
  [name]: value,
});
```

... 문법은 객체의 내용을 모두 펼쳐 기존 객체를 복사.

이런 작업을 "불변성을 지킨다" 고 한다. 불변성을 지켜줘야 컴포넌트에서 상태가 업데이트 됐음을 감지하고

필요한 리렌더링이 진행이 된다. 그리고 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있게 된다.
