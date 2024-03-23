## 리액트 라우터

멀티페이지 애플리케이션과 싱글페이지애플리케이션(SPA) 의 동작방식

**MPA ⇒ssr 방식 렌더링**

- 사용자가 다른 페이지로 이동할 때마다 새로운 html 을 받아오고 페이지를 로딩 할 때마다 서버에서 리소스를 전달 받아 브라우저 화면에 보여준다.
- 정적인 페이지들은 멀티페이지 애플리케이션이 적합하지만 서버의 자원을 많이 사용하기 때문에 동적 페이지에는 적합하지 않다.

=> 이를 보완하기 위해 SPA 방식 사용

**SPA ⇒ CSR방식렌더링**

- html 을 한번만 받아와서 웹 애플리케이션을 실행시킨 후 , 이후에는 필요한 데이터만 받아와서 화면에 업데이트
- 라우팅을 통해 다른 페이지로 이동할 때 서버에 다른 페이지의 html 을 새로 요청하는 것이 아니라, 브라우저의 history api 를 사용하여 브라우저의 주소창 값만 변경하고 기존의 웹애플리케이션을 그대로 유지하면서 라우팅 설정에 따른 또 다른 페이지를 보여줌

|  | MPA | SPA |
| --- | --- | --- |
| 장점 | SEO 유리
첫로딩이 짧음 | 깜박임X
필요한 부분만 로딩
컴포넌트별 개발 용이 |
| 단점 | 깜박임O
리로딩 발생
불필요한 템플릿도 중복해서 로딩
서버렌더링에 따른 부하 | 초기구동속도가 느림
SEO 가 어려움
보안 이슈 |

### 리액트라우터

```jsx
import {BrowserRouter,Route,Routes,Link, useParmas,
useLocation,useSearchParams,useParams,Outlet,useNavigate,NavLink}
from ‘react-router-dom’
```

---

리액트라우터를 사용하는 프로젝트에서는 <a> 를 사용하면 안된다. ⇒ 왜냐면 a 태그를 클릭하여 페이지를 이동할때 브라우저에서는 페이지를 새로 불러오기 때문이다.

### <Link>

Link 컴포넌트를 이용하면 페이지를 새로 불러오는 것을 막고 History Api 를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장 되어있다.

```jsx
<Link to="경로">링크이름</Link>
```

### URL 파라미터

```jsx
/profile/**velopert =>유동적인 부분**
```

- 주로 ID 또는 이름을 사용하여 특정 데이터를 조회할때 사용

### 쿼리스트링

**?detail=true&mode=1**

쿼리스트링은 URL 파라미터와 달리 Route 컴포넌트를 사용할때 별도로 설정해야하는 것이 없다.

- useLocation 이라는 Hook 을 사용⇒ location 객체(현재 사용자가 보고 있는 페이지의 정보) 를 반환

  - pathname
  - search
  - hash
  - state
  - key

- useSearchParams 를 이용해 key 와 value를 파싱

### useNavigate

Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야하는 상황에 사용하는 Hook

Link 와 유사하지만 useNavigate 는 데이터로딩완료, 버튼 클릭등의 사용자액션에 따라 특정페이지로 이동할때 사용하고 Link 는 주로 정적페이지 이동시 사용한다.

### NavLink

NavLink 컴포넌트는 링크에서 사용하는 경로가 현재 라우트의 경로와 일치하는 경우 특정 스타일 또는 CSS 클래스를 적용하는 컴포넌트이다.

```jsx
<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} />
```
