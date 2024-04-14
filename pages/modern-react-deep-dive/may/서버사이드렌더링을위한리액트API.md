# 서버 사이드 렌더링을 위한 리액트API

- 리액트는 애플리케이션을 서버에서 렌더링할 수 있는 API 를 제공한다.
- 윈도우 환경이 아닌 Node.js 와 같은 서버 환경에서만 실행 가능.
- 리액트에서 서버사이드 렌더링을 실행할 때 사용되는 API 는 저장소의 react-dom/server.js 를 통해 확인 가능.

### ⚙️React-dom 이 서버에 렌더링 하기 위한 함수

---

1. **renderToString**
   1. `renderToString`은 React 트리를 HTML 문자열로 렌더링
   2. 인수로 넘겨 받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수다.
   3. 서버사이드 렌더링을 구현하는데 가장 기초적인 API 로, 최초의 페이지를 HTML 로 먼저 렌더링 해주는 역할을 하는 함수이다.
2. **renderToStaticMarkup**
   1. 리액트 컴포넌트를 기준으로 HTML 문자열을 만든다는 점에서 renderToString 과 유사하다.
   2. data-reactroot 와 같은 리액트에서만 사용하는 추가적인 DOM 속성을 만들지 않는 다는 차이점이 있다. 이처럼 리액트에서만 사용하는 속성을 제거하면 결과물인 HTML 의 크기를 줄일 수 있다는 장점이 있다.
3. **renderToNodeStream**

   1. renderToString 과 결과물이 완전히 동일하지만 두가지 차이 존재

      차이1.

      renderToString 과 renderToStaticMarkup 은 브라우저에서도 실행할 수 는 있지만 renderToNodeStream 은 브라우저에서 사용하는 것이 불가능하다.

      ⇒ 에러 발생

      차이2.

      renderToString은 결과물이 string 인 문자열이지만, renderToNodeStream 의 결과물은 Node.js 의 ReadableStream 이다.

   ```jsx
   ReadableStream 이란 ?

   utf-8로 인코딩 된 바이트 스트림으로 , Node.js 나 Deno,Bun 같은 서버 환경에서만 사용할 수 있다.
   ```

   ReadableStream 을 만드는 과정이 브라우저에서 불가능하기 때문에 renderToNodeStream 은 브라우저에서 사용이 불가능하다.

   **renderToNodeStream을 쓰는 이유**

   Stream 이란?

   큰데이터를 다룰 때 데이터를 청크로 분할해 조금씩 가져오는 방식

   renderToString 으로 생성하기에 크기가 큰 HTML 의 크기가 큰 경우 Node.js 서버에 부담이 될 수 있기때문에 스트림을 사용하여 청크단위로 분리해 순차적으로 처리 가능

4. **renderToStaticNodeStream**

   renderToNodeStream 과 제공하는 결과물을 동일하나, renderToStaticMarkup 과 마찬가지로 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않는다. hydrate 를 할 필요가 없는 순수 HTML 결과물이 필요할 때 사용하는 메서드다.

5. **hydate**
   1. renderToString 과 renderToNodeStream 으로 생성한 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할을 한다.
   2. hydrate는 정적으로 생성된 HTML 에 이벤트와 핸드러를 붙여 완전한 웹페이지 결과물을 만든다.

```jsx
*render 메서드란?
	ReactDOM.render(<App/>,rootElement)
	브라우저에서만 사용되는 메서드로 컴포넌트와 요소를 인수로 받아 HTML 의 요소에 해당 컴포넌트를 렌더링하며 여기에 이벤트 핸들러를 붙이는 작업까지 한번에 수행한다.
```

```jsx
*hydrate 함수는 render 와 인수를 넘기는것이 거의 비슷하다.
ReactDOM.hydrate(<App/>,element)
```

**render 와 hydrate 의 차이점**

hydrate 는 기본적으로 이미 렌더링된 HTML 이 있다는 가정하에 작업이 수행되며 이렌더링된 HTML 을 기준으로 이벤트를 붙이는 작업만 실행한다.

### ✏️정리

---

- 빠른 웹페이지 결과물
- 서버에서 HTML 과 번들링된 자바스크립소스제공 적절한 캐시 사용 등 고려해야할것이 많음
- 리액트 18 에서는 suspense,concurrent ,ServerComponent 등의 새로운 개념이 추가되면서 서버에서 렌더링하는것이 더욱 복잡해짐
