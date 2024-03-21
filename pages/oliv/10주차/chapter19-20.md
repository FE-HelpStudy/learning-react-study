# 19장-20장. 코드 스플리팅, 서버 사이드 렌더링

## Deep Dive - SEO

SPA의 단점?

- 초기 로딩 시간이 느리다 -> 코드 스플리팅으로 보완
- SEO가 어렵다 -> 서버 사이드 렌더링.... 등등...?

### SEO부터 알아보자!

검색엔진 최적화 작업은 사이트 내 콘텐츠 정보를 검색엔진이 잘 이해할 수 있도록 정리하는 작업이다. 이 작업을 통하여 사이트 내 콘텐츠가 검색 결과에 누락되지 않도록 조치할 수 있다.

1. 크롤링 : 크롤러라는 자동화된 프로그램을 사용하여 정기적으로 웹을 탐색하고 인터넷에서 찾은 페이지로부터 텍스트, 이미지, 동영상을 다운로드한다.
2. 색인 생성: 페이지의 텍스트, 이미지, 동영상 파일을 분석하고 대규모 데이터베이스인 색인에 이 정보를 저장한다.
3. 검색결과 게재: 사용자가 검색엔진기업(Google,네이버)에서 검색하면 사용자의 검색어와 관련된 정보를 반환한다.

연결되는 링크를 따라 돌아다니며 HTML을 읽고 관련 콘텐츠의 색인을 저장해두기 때문에  
SPA의 경우 한 개의 페이지만 수집되기 때문에 검색엔진 최적화가 어렵다고 하는 것이다!😥

#### 코테PT로 테스트

1. #root 찾기 🆗

```bash
    startIndex: null,
    endIndex: null,
    children: [],
    name: 'div',
    attribs: [Object: null prototype] { id: 'root' },
    type: 'tag',
    namespace: 'http://www.w3.org/1999/xhtml',
    'x-attribsNamespace': [Object: null prototype] { id: undefined },
    'x-attribsPrefix': [Object: null prototype] { id: undefined }
```

2. #root header 찾기 ❎

```bash
    startIndex: null,
    endIndex: null,
    children: [Array],
    type: 'root',
    'x-mode': 'no-quirks'
```

클라이언트 사이드에서 렌더링이 되기 때문에 초기 페이지에 있는 #root만 찾기 가능

### SEO, 그래서 어떻게 하라고?

#### 1. 서버 사이드 렌더링

- Next.js와 같은 프레임워크 활용하기
- Node.js와 Express를 사용한 SSR 구현하기

  - react-dom/server 패키지에서 제공하는 ReactDOMServer 객체를 사용하여 React 컴포넌트를 서버에서 정적 HTML로 렌더링한다.

  ```javascript
  import express from "express";
  import React from "react";
  import ReactDOMServer from "react-dom/server";
  import App from "../src/App";

  const app = express();

  app.get("/*", (req, res) => {
    const appHtml = ReactDOMServer.renderToString(<App />);
    res.send(renderFullPage(appHtml));
  });

  function renderFullPage(html) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>My Page</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `;
  }

  app.listen(3000);
  ```

  - 데이터 가져오기와 상태 하이드레이션(SSR) 처리를 해줘야 한다.

#### 2. history API 활용

- History API 를 이용하면, 브라우저의 세션 기록(사용자가 방문했던 페이지)과 상호작용할 수 있다.
- History.pushState(): 세션 기록에 새 항목을 추가
- 리로드 없이 URL만 갱신 가능

```javascript
var stateObject = { 데이터_종류: "중요한 더미 데이터" };
history.pushState(stateObject, "", "새페이지.html");
```

- pushState 메서드로 주소를 바꿔준다면 해당 뷰를 새 콘텐츠가 있는 새 페이지로 인식한 검색엔진 봇이 해당 페이지를 크롤링하고 색인을 생성한다. -> 여러가지 페이지를 가진 것처럼 검색엔진에 표시가능

#### 3. React Helmet

- head 태그는 검색 결과에 영향을 미칠 수 있는 meta 태그 등 중요한 SEO 요소가 있기 때문에 페이지마다 달라지도록 관리해야 한다.
- Helmet은 react에서 유저가 조작할 때마다 그에 맞는 head 태그를 업데이트하는 기능

#### 4. React Snap

- 변화하는 html 파일을 스냅 사진 찍듯이 고유한 html 파일로 변환하여 빌드
- SSR 방식을 사용하지 않고 고유한 html를 만들어낼 수 있다.
- 🚨유지 보수를 하지 않는 라이브러리

SSR을 사용할 것을 권장한다고 한다;;(https://searchadvisor.naver.com/guide/seo-advanced-javascript)

### 출처

- https://wikidocs.net/197645
- https://seo.tbwakorea.com/blog/how-to-seo-spa/
- https://searchadvisor.naver.com/guide/seo-advanced-javascript
- https://developers.google.com/search/docs/fundamentals/get-started-developers?hl=ko
