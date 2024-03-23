# axios

Axios는 브라우저와 Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리.

- 요청과 응답 인터셉트
- HTTP 요청 취소
- HTTP 요청과 응답을 JSON 형태로 자동 변경
- 등등

fetch( nextjs fetch 아님 ) 보다 기능이 많다

## 기본적인 사용법

```typescript
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

```typescript
// 기본 URL
// https://api.asac-front.com/v0
// 
// 나머지
// /news/1
// /newestpost/1
// /comment/1

const res = await axios.get(`${SERVER}/write-post`, postDto, {
  headers: {
    access_token: cookies.get('access_token'),
  },
});
```
기본 사용법의 문제는 3가지로 나눌 수 있다

1. 매번 중복되는 URL을 입력한다.
2. 매번 중복되는 헤더 혹은 config를 입력한다.
3. 에러 발생시 각각의 호출 장소에서 처리해야 한다.

## 파일 구조
```text
📦 api
┣ 📂 api(api 요청/응답 코드만 작성)
┃ ┗ 📜user.ts
┣ 📂 services(데이터를 정제해주는 함수 모음)
┃ ┗ 📜user.ts
┣ 📂 utils(인스턴스/공통 함수 작성)
┃ ┣ 📜instance.ts
┃ ┣ 📜interceptor.ts
┃ ┣ 📜interface.ts // 파라미터 같은 인터페이스 타입 선언용 api가 많아지면 폴더로 분리
┗ 📜 index.ts(모듈 export)
```

복잡하면

```text
📦 api
┣ 📂 api(api 요청/응답 코드만 작성)
┃ ┗ 📜user.ts
┣ 📂 services(데이터를 정제해주는 함수 모음)
┃ ┗ 📜user.ts
┣ 📂 utils(인스턴스/공통 함수 작성)
┃ ┣ 📜instance.ts // instance와 interceptor를 한 곳에서 관리
┗ 📜 index.ts(모듈 export)
```

## Axios Instance

```typescript
// src/api/utils/instance.ts

// axios.create([config])

import axios, { Axios } from "axios";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: Axios = axios.create({
    // 1. 매번 중복되는 URL을 입력한다. ✅
    baseURL: process.env.REACT_APP_BASE_API_URL
    // 2. 매번 중복되는 헤더 혹은 config를 입력한다.✅
    headers: {}, 
    // timeout: 1000, ... 원하는 설정
});

const baseAPI = {
  get: async <T> = ( url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<<T>>> => {
    const response = await axiosInstance.get(url, config);
    return response
  },

  post: async <T> = ( url: string, data?: any, config:AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const response = await axiosInstance.post(url, data, config);
    return response
  },
  //...
}

export default baseAPI;
```

```typescript
// src/api/api/user.ts
import { UserInfoParam } from "src/api/utils/interface.ts"

export const getUserInfo = async () => {
  const url = `/user/user`;
  const res = await baseAPI.get<UserInfo>(url);
  return res.data;
};

export const postUserInfo = async (body: UserInfoParam) => {
  const url = `/user/post/user`;
  const additional_config = {timeout:1000}
  const res = await baseAPI.get<UserInfo>(url, body, additional_config);
  return res.data;
};

// component에서 호출시 
const res: UserInfo = getUserInfo()
```
###  AxiosResponse
[AxiosResponse 스키마 타입](https://axios-http.com/kr/docs/res_schema)

```typescript
export interface AxiosResponse<T = any, D = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```
만약 data 안에 한 번 더 래핑된 데이터 타입이 존재하는 경우
```typescript
export interface CommonResponse<T> {
  code: 'SUCCESS' | 'ERROR' | 'FAIL';
  data: T;
  message: string;
  statusCode: number;
}
```

```json
{
  data: {
    code:"SUCCESS"
    data:{범인:"fff"}
    message:"헉"
    statusCode: 200
  }
  status: 200
  statusText: ....
}
```
instance의 함수에서 `Promise<AxiosResponse<T>>`를 `Promise<AxiosResponse<CommonResponse<T>>>`로 변경한다

## Axios Interceptor

 then 또는 catch로 처리되기 전에 요청과 응답을 가로채는 역할을 한다.
 에러 처리, 헤더 추가, 인증 관리(토큰 등), 로깅, 데이터 가공에 유용

### 기본 구조
 ```typescript
/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
    function (config) {
        // 요청이 전달되기 전에 작업 수행.
        // axios 설정값에 대해 작성합니다.
        return config;
    }, 
    function (error) {
        // 요청 에러 처리를 작성합니다.
        return Promise.reject(error);
    }
);

/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(
    function (response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다. 
        .then() 으로 이어집니다.
        응답 데이터가 있는 작업 수행
    */
        return response;
    },

    function (error) {
    /*
        보통 switch 문으로 http code 상태에 맞게 처리
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.    
    */
        return Promise.reject(error);
    }
);
 ```

 ### 로깅 함수
 ```typescript
 export const logOnDev = (message:string) => {
  // vite 실행 환경 체크
  if(import.meta.env.MODE !== "development") return 

  console.log(message)
 }
 ```
 [vite의 환경 변수와 모드](https://ko.vitejs.dev/guide/env-and-mode.html)


### Request Interceptor
http request시 호출 되는함수
- request config 수정
- 인증관련 작업 (토큰 갱신 등)

 ```typescript
 const onRequest = ( config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config;
    logOnDev(`[API - REQUEST] ${method?.toUpperCase()} ${url}`);

    // 리프레시 토큰 처리 함수 추가
    // checkToken()

    const token = getCookie(COOKIE_KEY.LOGIN_TOKEN);
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  };
 ```
 ### Response Interceptor (success)
http response가 then으로 넘어가기 전에 호출되는 함수

 ```typescript
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status, statusText } = response.data;

    logOnDev(`[API - RESPONSE] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`)
    
    return response;
  };
 ```
### Response Interceptor (fail)
http response가 catch로 넘어가기 전에 호출되는 함수

에러 메세지의 형태와 내용 status code는 벡엔드 개발자와 소통하여 작성한다

 ```typescript
 const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      const { message } = error
      const { method, url } = error.config as InternalAxiosRequestConfig;
      const {status, statusText } = error.response as AxiosResponse

      logOnDev(`[API - ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${statusText} | ${message}`)

      switch (status) {
        case 401 : {
          // 에러 핸들링 코드 작성
          break
        }
        case 403 : {
          // 에러 핸들링 코드 작성
          break
        }
        case 404 : {
          // 에러 핸들링 코드 작성
          break
        }
        case 500 : {
          // 에러 핸들링 코드 작성
          break
        }
      }

    } else {
      logOnDev(`[API] | Error ${error.message}`)
      // 에러핸들링 코드 작성
    }
    return Promise.reject(error);
  };
 ```

### Instance에 연결
 ```typescript
// src/api/instance.ts or interceptor.ts
export const setUpInterceptor = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponse, onError);
  
  return instance
}
//
const instance = setUpInterceptor(axiosInstance)
```

## Intercepter와 hook 같이 사용하기

위에서 설명한 코드는 에러 발생시 토스트 메세지 팝업을 보여주고 싶고 useToast와 같은 커스텀 훅으로 정의한 경우 interceptor 에서는 사용할 수 없는 형태로 구현되어 있다.
```typescript
switch (status) {
  case 401 : {
    // 에러 핸들링 코드 작성
    useToast(message) // 이렇게 쓰고 싶다.
    break
  }
```
인터셉터 custom hook으로 만들어 사용하거나

provider로 감싸는 방법을 사용하거나

```typescript
const useAxiosInterceptor = ({ children }: { children: any }) => { 

  const { fireToast } = useToast();
  // 위의 onRequest, onResponse, onError 함수를 선언해준다

  const onErrorResponse = (error) => {
    let msg = error.message;
    fireToast({ content: ` ${msg} 🔥 `, duration: 2000 });
  };

  const onResponse = (response) => {
    return response;
  };
  ...
  const reqInterceptor = axiosInstance.interceptors.request.use(onRequest);
  const resInterceptor = axiosInstance.interceptors.response.use(
    onResponse,
    onErrorResponse,
  );
  
  // 참고한 블로그에서는 useEffect 사용시, refresh 직후에 인터셉터가 적용되기 전에
  // API 호출이 일어나는 문제가 있다고 함.
  // => 확인 필요

  // useEffect(() => {
  useLayoutEffect(() => {
    // 클린업
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  },[reqInterceptor, resInterceptor])
}
```

```typescript
// 최상단 전역 컴포넌트 layout 혹은 _app.tsx
// src/Layout/index.tsx or _app.tsx 
import { Header } from 'Header';
import { useAxiosInterceptor } from 'src/hooks/useAxiosInterceptor.ts';

export const Layout = ({ children }) => {
  useAxiosInterceptor(); // AxiosInterceptor 선언

  return (
    <>
      <Header />
      {children}
    </>
  );
};
```

## reference
- https://axios-http.com/kr/docs/interceptors
- https://brunch.co.kr/@14e1a0684a6c4d5/6
- https://velog.io/@yyeonggg/Typescript%EB%A1%9C-%EB%8D%94-%EA%B9%94%EB%81%94%ED%95%98%EA%B2%8C-Axios-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0#onrequest-onresponse-onerror
- https://velog.io/@jce1407/Axios-Interceptor%EC%97%90%EC%84%9C-Hook%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
- https://velog.io/@2wndrhs/Axios-interceptor%EB%A1%9C-API-%EC%9D%91%EB%8B%B5-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81%ED%95%98%EA%B8%B0
- https://velog.io/@skyepodium/axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A1%9C-API-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
- https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0#4-%EB%A6%AC%ED%94%84%EB%A0%88%EC%89%AC-%ED%86%A0%ED%81%B0-%EC%B2%98%EB%A6%AC-with-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0-%F0%9F%A7%A8
- https://velog.io/@hsk10271/TIL-33
- https://1yoouoo.tistory.com/36
- https://velog.io/@ysg81/a
- https://ghost4551.tistory.com/163
- https://velog.io/@boyeon_jeong/axios-%EB%AA%A8%EB%93%88%ED%99%94%EC%99%80-Type-%EC%A7%80%EC%A0%95