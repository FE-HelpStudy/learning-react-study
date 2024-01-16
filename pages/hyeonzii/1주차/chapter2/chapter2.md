# 🌐 JSX

# 📍 2.1 코드 이해하기

## import?

리액트로 만든 프로젝트의 자바스크립트 파일에서는 import를 사용하여 다른 파일들을 불러와 사용할 수 있음

**하지만**

이렇게 모듈을 불러와서 사용하는 것은 본래 브라우저에는 없는 기능이다.

브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 환경인 **Node.js**에서 지원하는 기능

이러한 기능을 브라우저에서도 사용하기 위해서 **번들러**를 사용

- 여러개의 파일들을 하나의 파일로 묶어주는 도구

## 웹팩

리액트에서는 번들러로 주로 웹팩을 사용

- 편의성과 확장성이 다른 도구보다 뛰어남

번들러 도구를 사용하면 import(또는 require)로 모듈을 불러왔을 때 불러온 모듈을 모두 합쳐서 하나의 파일을 생성해 줌

최적화 과정에서 여러 개의 파일로 분리될 수도 있음

SVG , CSS 파일로 불러와서 사용 가능

## 웹팩 설치?

CRA, Vite 가 알아서 해줌

# 📍 2.2 JSX란?

**JSX**는 자바스크립트의 확장 문법이며 XML과 비슷하게 생겼습니다.

브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용해 일반 자바스크립트 형태의 코드로 변환됨

- 바벨?
    - JS 문법으로 작성 된 코드를 이전 JS 문법으로 변환 시켜주는 도구

### 코드 변환 예시

```jsx
function App(){
	return(
		<div>
			Hello <b>react</b>
		</div>
	);
}
```

```jsx
function App(){
	return REact.createElement("div",null,"Hello",React.createElement("b",null,"react"));
}
```

- **JSX도 자바스크립트 문법인가요?**
    
    공식적인 자바스크립트 문법이 아닙니다.
    

# 📍 2.3 JSX 장점

### 보기 쉽고 익숙하다

- 가독성이 좋다

### 높은 활용도

- div, span 같은 HTML 태그를 사용할 수 있으며,개발자가 만든 컴포넌트도 JSX 안에서 작성할 수 있다

# 📍 2.3 JSX 문법

### 감싸인 요소

컴포넌트에 여러 요소가 있다면 **반드시 부모 요소 하나로 감싸야 함**

- Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있음

### 자바스크립트 표현

자바스크립트 표현식 작성시 `{ }` 이용

```jsx
function App(){
	const name="리액트";
	return(
		<>
			<h1>{name} 안녕</h1>
		</>
	);
}
```

- **ES6 const 와 let**
    
    **var**
    
    - 함수 단위
    
    **const, let**
    
    - 블록 단위({}로 감싸진 부분)
    
    ES6 문법에서 **var를 사용할 일은 없음**
    
    **let**은 값이 유동적으로 변할 경우 (예시: for문)
    
    **const**는 한번 설정한 후 변할 일이 없는 값에 사용
    

### If 문 대신 조건부 연산자

JSX 내부의 자바스크립트 표현식에는 **삼항 연산자(조건부 연산자)** 사용

### AND 연산자(&&)를 사용한 조건부 렌더링

```jsx
function App(){
	const name="뤼액트";
	return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
}
```

- **JSX 괄호..?**
    
    한줄로 표현 시 괄호로 안 감싸도됨
    

### undefined를 렌더링하지 않기

**name 값이 undefined일 떄 보여주고 싶은 문구가 있는 경우**

아래와 같은 코드는 오류를 유발함

```jsx
import './App.css';

function App(){
	const name=undefined;
	return name;
}

export default App;
```

아래와 같이 수정해주면 된다.

```jsx
import './App.css';

function App(){
	const name=undefined;
	return <div>{name || '리액트'}</div>;
}

export default App;
```

### 인라인 스타일링

DOM 요소에 스타일 적용시 객체 형태로 넣어주어야 함

### class 대신 className

JSX에서는 class → className 으로

### 꼭 닫아야 하는 태그

JSX는 태그를 닫지 않으면 오류 발생

`<input />` 이런 형태는 작성 가능

### 주석

`{/* … */}` 이렇게 처리

`command + /` 하면 알아서 주석 처리

# 📍 2.3 ESLint 와 Prettier

## ESLint 설치

: 코드를 분석해 문법적인 오류나 안티 패턴을 찾아주고 일관된 코드 스타일을 유지(포맷팅)하여 개발자가 쉽게 읽도록 코드를 만들어준다.

[참조블로그](https://lakelouise.tistory.com/199)

1. 설치

```bash
npm install eslint --save-dev
```

1. json 파일 생성

```bash
npx eslint --init 
```

![스크린샷 2023-08-23 오전 2.51.24.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e46d05f9-c4e8-4396-90c3-5586bb8dab2c/78aa0d20-7f1e-41d8-8030-fee024b5e0b0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-08-23_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_2.51.24.png)

1. .eslintrc.json 파일도 수정

```bash
{
  ...
  "extends": [
	...
    "plugin:prettier/recommended",
    "prettier"
  ],
  ...
}
```

플러그인을 여기서 적용해줍니다.

eslint 관련한 플러그인들도 추가해줍니다.

```bash
		"eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
```

1. ignore 파일 설정
    
    [참고 블로그](https://worker-k.tistory.com/entry/%EC%97%84%EA%B2%A9%ED%95%9C-eslint-ignore-%ED%95%98%EB%8A%94-%EC%97%AC%EB%9F%AC%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95-eslintignore)
    
    esLint를 적용하고 싶지 않은 파일들을 제외해주기 위해서 ignore 설정을 해주어야 합니다.
    
    ### 파일 전체 적용하지 않기
    
    1. package.json 에 추가
    
    ```jsx
    "eslintIgnore": [
        "tailwind.config.js",
        "next.config.js",
        "postcss.config.js"
      ]
    ```
    
    2. .eslintignore 파일
    
    디렉토리 경로를 넣어줘야 합니다.
    
    ```jsx
    ./tailwind.config.js
    ./next.config.js
    ./postcss.config.js
    
    /node_modules
    ```
    
    3. 무시하고자 하는 파일 상단에 아래 코드 추가
    
    ```jsx
    /* eslint-disable */
    ```
    
    ### 부분적으로 적용하지 않기
    
    1. 특정라인만 무시하고 싶은 경우
        
        무시하고자 하는 라인 위에 `// eslint-disable-next-line` 을 추가한다.
        
    
    ### 특정 규칙을 무시하기
    
    1. 무시하고자 하는 규칙을 .eslintrc 파일 “rules” 안에 추가
        
        무시하고자 하는 특정 규칙을 모든 파일에서 무시하게 됩니다.
        
        ```jsx
        "rules": {
            ...
            "react-hooks/exhaustive-deps": "off"
          },
        ```
        
    

## Prettier 설치

: 코드 쓸 때 줄 간격을 맞춰준다던지, 들여쓰기를 자동으로 해준다던지 등등 코드 가독성을 높이는데 도움을 주는 도구, 코드포맷팅을 가능하게 해준다.

[참고블로그](https://velog.io/@he0_077/React-Typescript-eslint-prettier-%EC%84%A4%EC%A0%95)

저는 사실 vscode 확장 프로그램으로 프리티어를 깔아서 전역으로 설정을 해두었지만 이번에는 따로 프로젝트에 설치를 해보도록 하겠습니다.

1. 설치
    
    ```bash
    npm install --save-dev --save-exact prettier
    ```
    
    그리고 ESLint와 Prettier가 서로 충돌이 되지 않고 잘 작동하도록 `eslint-config-prettier`와 `eslint-plugin-prettier`를 설치해주었습니다.
    
    ```bash
    npm i -D eslint-config-prettier eslint-plugin-prettier
    ```
    
2. json 파일 설정
    
    .prettierrc.json 파일을 직접 생성합니다.