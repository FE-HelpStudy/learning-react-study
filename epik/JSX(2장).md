# JSX란?
- 자바스크립트 확장 문법(공식적인 자바스크립트 문법은 아니다.)
- XML과 비슷하게 생긴 것이 특징
- 하지만 HTML, 문자열템플릿이 아니다.


```js

{/*  function 키워드를 사용하여 App 이라는 함수 컴포넌트 생성  */}
{/*  App 컴포넌트가 반환(return)하는 내용이 렌더링된다.   */}

function App() {
  return (
    <div>
      Hello <b>react</b>
    </div>
  );
}

export default App;
```

<BR><BR>


# JSX의 장점
### 1. 보기 쉽고 익숙하다
 
위에 작성한 코드는 바벨에 의해 다음과 같이 변환된다. 
```js
function App() {
  return React.createElement("div",null,"Hello", React.createElement("b",null,"react"));
}
```
만약 JSX 코드 대신 매번 React.createElement 함수를 사용해야한다면 매우 불편할 것이다. 
즉 이러한 불편함을 해소해주고 가독성을 높여준다.

### 2. 높은 활용도
- div, span과 같은 HTML 태그 뿐만 아니라 컴포넌트도 JSX안에서 작성 가능


  <BR><BR>
  

# JSX 문법 특징
### 1. 반드시 하나의 부모 요소로 감싸야한다.

![](https://velog.velcdn.com/images/dogmnil2007/post/f045118e-f4e9-464a-800c-9858eaff8dee/image.png)
다음과 같이 컴포넌트를 2개 요소로 감싸면
![](https://velog.velcdn.com/images/dogmnil2007/post/86d3d017-84e4-4ece-933d-b457e95c4a9c/image.png)
에러가 뜬다.
그 이유는 Virtual DOM에서 컴포넌트 변화를 감지해낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야하는 규칙이 있기 때문이다. 

![](https://velog.velcdn.com/images/dogmnil2007/post/0d268911-4418-4096-af5c-28f5a76d43cd/image.png)
 때문에 다음과 같이 하나의 요소로 컴포넌트를 감싸주면 에러를 해결할 수 있다.
 <BR>
 
 ### 2. fragment 기능
 컴포넌트를 하나의 요소로 묶을 때 div를 사용하고 싶지 않다면
 ![](https://velog.velcdn.com/images/dogmnil2007/post/67d16c61-553e-4f08-92b2-e325969f2d57/image.png)
빨간색 동그라미속 fragment라는 컴포넌트를 사용해서 묶을 수 있다. 

<BR>
    

### 3. 자바스크립트 표현
a. JSX 내부에서 자바스크립트 표현식을 사용할 수 있다.
  
```js

function App() {
  const name = '리액트'
  return (
    <>
      <div>{name}안녕</div>
      <div>헬로</div>
    </>
  );
}

export default App;
```
  
  ![](https://velog.velcdn.com/images/dogmnil2007/post/05767113-ae39-49b1-a176-c4135244083b/image.png)

다음과 같이 잘 적용되는 것을 확인할 수 있다. 참고로 JSX 내부에서 자바스크립트 표현식을 사용할 떈 꼭 중괄호로 묶어줘야한다. 
  
  <BR>
   
b. 조건부 연산자(삼항연산자, &&연산자) 사용 가능

   
![](https://velog.velcdn.com/images/dogmnil2007/post/aa380784-1a4f-4ea3-8780-f8a6c13e3a17/image.png)

사진과 같이 삼항연산자를 사용할 수 있다. 
   
 ![](https://velog.velcdn.com/images/dogmnil2007/post/2f14986d-4164-437f-b1df-16968ca8e22f/image.png)
위 사진은 && 연산자를 이용한 표현식으로
   && 앞 name === '리액트' 가 true라면 && 뒤 `<div>리액트가 아닙니다.</div>`가
   출력되고 false라면 null 즉 아무것도 출력되지 않는다.
   즉 &&기준 앞내용이 true면 뒷 내용이 출력되고
   false라면 아무것도 출력되지 않는다. 
   
   
   <BR>
   

### 3. 인라인 스타일링시 객체 형태로 넣어줘야한다.

스타일 객체를 미리 선언하는 경우
```js

function App() {
  const name = "리액트";
  const style = {
    backgroundColor : 'black',
  }
  return (
    <>
      {name === "리액트" && 
        <div>리액트가 아닙니다.</div>
      }

      <div style={style}>헬로</div>
    </>
  );
}

export default App;

```
   
   다음과 같이 작성하면
   ![](https://velog.velcdn.com/images/dogmnil2007/post/948f46eb-cf75-45a6-ad04-5d74dc61f2a1/image.png)

   style이 적용되어 렌더링된다. 
   
   style객체를 미리 선언하지않을 경우
   
   ```js

function App() {
  const name = "리액트";
  return (
    <>
      {name === "리액트" && <div>리액트가 아닙니다.</div>}

      <div style={{ backgroundColor: "black" }}>헬로</div>
    </>
  );
}

export default App;

   ```
다음과 같이 작성하면 된다. 
    
 
  <BR> 
   

### 4. class대신 className
    
JSX에서 css 속성을 적용시킬 때 class대신 className 이라는 키워드로 설정해야한다.
    
    
```js

import "./App.css";

function App() {
  const name = "리액트";
  return (
    <>
      {name === "리액트" && <div>리액트가 아닙니다.</div>}

      <div className="App">헬로</div>
    </>
  );
}

export default App;

```

 <BR>
    
### 5. self-closing 태그

    
    
 `<input>`처럼 태그 사이에 별도의 내용이 들어가지 않는 경우
  `<input />` 다음과 태그를 선언함과 동시에 닫을 수 있다.
  
  
  
<details>

<summary>import와 webpack</summary>

<div markdown="1">

JSX 코드를 보면 import 라는 구문이 사용된다.
```js
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

```
  
이는 특정 파일을 불러오는 역할을 한다.
즉 다른파일 (위 코드의 경우 App.css)을 현재 JSX 코드가 위치한 파일로 불러오는 것이다. 
  
이러한 기능을 사용하기 위해 브라우저도 **번들러(bundler)**를 사용한다. 
번들(bundle)은 묶는다는 뜻이다.
  
  번들러 도구를 사용해 import로 모듈을 불러왔을 경우 불러온 모듈을 모두 합쳐서 하나의 파일을 생성해준다. 
  
  대표적인 번들러로 **webpack**이 있고 리액트에서는 주로 webpack을 사용한다. 그리고 이 불러오는 기능을 담담하는 부분이 **webpack의 loader**이다. 
</div>

</details>
    
  
    
 <BR> <BR>

    
 # ESLint & Prettier
두 도구 모두 vscode 마켓플레이스에서 설치할 수 있다. 

   ![](https://velog.velcdn.com/images/dogmnil2007/post/939e6133-14e5-45ed-ba83-1e80c2bc5c82/image.png)
![](https://velog.velcdn.com/images/dogmnil2007/post/d69d3db4-08c8-4e8d-81d9-892da4dbb934/image.png)

  ## ESLint
  문법검사도구
   코드 작성 시 실수하면 에러 또는 경고 메시지를 출력해준다. 
![](https://velog.velcdn.com/images/dogmnil2007/post/8c5cc848-a697-4d44-8242-f4ed5552bbc2/image.png)
   
   만약 빨간색 줄 경고가 그어진 코드는 반드시 고쳐야한다. 고치지않으면 에러가 발생하기 때문이다. 


   
  ## Prettier
   코드 스타일 자동 정리 도구
   보통 코드의 가독성을 위해 들여쓰기를 사용하는데 이를 자동으로 적용시켜준다. 
   
![](https://velog.velcdn.com/images/dogmnil2007/post/470e05b0-3ed7-4e93-b8c1-acc8cfe4883e/image.png)
위 사진과 같이 들여쓰기가 안돼있어 가독성이 안좋은 코드를
   
   ![](https://velog.velcdn.com/images/dogmnil2007/post/1389361f-f1a0-4b14-a1be-bb96300ddd09/image.png)
`f1`을 누른후 format을 입력하면 가장 위에 뜨는 format document 를 클릭(혹은 엔터)해주거나
 단축키 `shift + alt + f` 를 누르면 들여쓰기 및 코드 정리가 실행된다. 
   ![](https://velog.velcdn.com/images/dogmnil2007/post/efc618ee-c811-4bf4-a603-e06f2ca22be1/image.png)

   
   결과
   
   ![](https://velog.velcdn.com/images/dogmnil2007/post/bb0f1aee-6931-4354-b46f-8804a78c648a/image.png)
훨씬 더 깔끔해진 모습을 확인할 수 있다.
   
   
   <BR>

   
  만약 이러한 과정이 번거롭다면 vscode 설정(window기준 : file - preference - setting - format on save 입력)에서 작성한 코드를 저장할 때마다 자동으로 코드를 정리하도록 설정할 수 있다. 
   
   
   ![](https://velog.velcdn.com/images/dogmnil2007/post/59895386-cab4-48de-956b-5735894769bd/image.png)
