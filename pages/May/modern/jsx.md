# 2.1 JSX

## ✏️JSX란?

- JSX 는 트랜스파일러를 거쳐야 자바스크립트코드로 변환된다.
- 설계 목적 : 다양한 트랜스파일러에서 다양한 속성을 가진 트리 구조를 토큰화해 ECMAScript 로 변환하는데 초점을 둔다.

⇒ JSX  내부 트리구조로 표현하고 싶은 다양한 것들을 작성해 두고 이 JSX를 트랜스파일이라는 과정을 거쳐 자바스크립트(ECMAScript) 가 이해할 수 있는 코드로 변경하는 것이 목표이다. 

즉 

- JSX 는 자바스크립트 내부에서 표현하기 까다로웠던 XML 스타일의 트리 구문을 작성하는데 많은 도움을 주는 새로운 문법이다.

## ✏️JSX 의 정의

### JSX를 구성하는 네가지 컴포넌트

### **1.JSXElement**

- JSXOpeningElement
    - JSX 를 구성하는 가장 기본 요소
    - <JSXElement JSXAttributes(optional)>
- JSXClosingElement
    - JSXOpeningElement 와 쌍으로 사용된다.
    - </JSXElement>
- JSXSelfClosingElement
    - <JSXElement JSXAttributes(optional)/>
- JSXFragment
    - 아무런 요소가 없는 형태로 JSXSelfClosingElement 형태를 띨 수는 없다. </Head> 불가
    - <>JSXChildren(optional)</>

**JSXElementName : JSElement 의 요소 이름으로 쓸 수 있는것을 의미** 

- **JSXIdentifier**
    - ****자바스크립트 식별자 규칙과 동일
- **JSXNamespacedName**
    - JSXIdentifier : JSXIdentifier 의 조합 : 을 통해 서로다른 식별자를 이어주어 하나의 식별자로 취급. :로 묶을 수 있는것은 한개뿐이다.
- **JSXMemberExpression**
    - JSXIdentifier . JSXIdentifier 의 조합 . 을 통해 서로 다른 식별자를 이어주어 하나의 식별자로 취급 . 을 여러개 연결 가능 , 하지만 JSXNamespacedName 과 이어서 사용하는 것은 불가능

### **2.JSXAttributes : JSXElement 에 부여할 수 있는 속성을 의미, 필수X**

- JSXSpreadAttributes : 자바스크립트의 전개 연산자와 동일한 역할
    
    {…AssignmentExpression} : 조건문 표현식, 화살표함수,할당식 등 자바스크립트에서            AssignmentExpression 으로 취급되는 모든 표현식이 존재할 수 있다. 
    
- JSXAttribute: 속성을 나타내는 키와 값으로 짝을 이루어서 표현한다.
    
    JSXAttributeName : JSXNamespacedName  (키 : 값) 
    
- JSXAttributeValue : 속성의 키에 할당할 수 있는 값으로 , 다음 중 하나를 만족해야 한다.
    
     -”큰따옴표,작은따옴표로 구성된 문자열” : 자바스크립트의 문자열과 동일하다. 안에 아무런 내용이 없어도 상관없다. 
    
    -{AssignmentExpression}: 자바스크립트에서 값을 할당할때 쓰는 표현식인 AssignmentExpression 을 의미한다. 
    
    -JSXElement : 값으로 다른 JSX 요소가 들어갈 수 있다
    
    ```jsx
    function Child ({attribute})
    { 
     return(<Child attribute=<div>hello</div> /> )
    }
    ```
    
    -JSXFragment : 값으로 별도 속성을 갖지 않는 형태의 JSX 요소가 들어갈 수 있다. 즉 비어있는 형태도 허용된다. <> </> 
    

### 3)JSXChildren

JSXElement 의 자식 값을 나타낸다. JSX 는 속성을 가진 트리구조를 나타내기 위해 만들어졌기 때문에 JSX 로 부모와 자식 관계를 나타낼 수 있으며, 그 자식을 JSXChildren 이라고 한다. 

JSXChild : JSXChildren 을 이루는 기본 단위다. JSXChildren 은 JSXChild를 0개 이상 가질 수 있다. 

- JSXText : {,<,>,} 을 제외한 문자열
    
    
    ```jsx
    //{,<,>,} 을  JSX 문법과 혼돈되지 않게 문자열로 사용하는 법 
    function valid(){
    
    return<>{’{}<>’ }</>}
    ```
    
- JSXElement :값으로 다른 JSX 요소가 들어갈 수 있다
- JSXFragment : 값으로 빈 JSX요소인 <></>가 들어갈 수 있다.
- {JSXChildExpression(optional)} : 이 JSXChildExpression 은 자바스크립트의 AssignmentExpression을 의미한다.

```jsx
export default function App() {
return <>{(()=>'foo'()}</>
} //foo 라는 문자열 출력
```

### 4)JSXStrings

- HTML 에서 사용 가능한 문자열은 모두 JSXStrings 에서도 사용 가능

## ✏️JSX 의 변환 과정

@bable/plugin-transform-react-jsx 플러그인을 이용해 JSX 구문을 자바스크립트가 이용할 수 있는 형태로 변환한다. 

```jsx
const ComponentA = <A required={true}>Paper</A>;

const ComponentB = <>Paper</>;

const ComponentC= (
	<div>
		<span>Paper</span>
	</div>
  );
```

🔧변환 후

```jsx
'use strict’

var ComponentA =React.createElement(
 A, 
  {
    required: true,
  },
'Paper',
)

var ComponentB = React.createElement(React.Fragment, null, ’Paper’) 

var ComponentC = React.createElement(
      ’div’,
      null,
      React.createElement(’span’, null, ’Paper'),
	)
```

🔧리액트 17, 바벨 7.9.0 이후 버전에서 추가된 자동 런타임으로 트랜스파일한 결과

```jsx
'use strict’

var _jsxRuntime = require (’custom-jsx-library/jsx-runtime')

var ComponentA = (0, _jsxRuntime.jsx)(A, 
{ 
  required: true,
  children : 'Paper' ,
})

var ComponentB = (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, { 
  children : 'Paper’,
})

var ComponentC = (0, _jsxRuntime.jsx)('div’, {      
  children: (0, _jsxRuntime.jsx)(’span’, {
    children: ’Paper’ 
  }),
})
```