---
 writer : 'oliv'
 velog : ''
---

# Next.js

create-react-app, create-next-app 없이 하나씩 구축해보자!

## tsconfig.json

tsconfig를 잘 작성해야하는 이유는?

1. vscode의 intellisense(코드 문법 자동완성)가 typescript 처리하는 방법을 제어하기 위해서
2. typescript를 컴파일하는 방법을 제어하기 위해서

### $schema

schema는 schemaStore에서 제공해주는 정보로 자동완성, 툴팁, 공개API 사용을 가능하게 해준다.

```javascript
    "$schema" : "https//json.schemastore.org/tsconfig.json"
```

### 옵션 살펴보기

```javascript
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames" : true,
    "esModuleInterop" :true,
    "useDefineForClassFields": true,
    "skipDefaultLibCheck": false,
    /* Bundler mode */
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "include": ["src", "**/*.ts", "**/*.tsx", "vite.config.ts"],
  "exclude": ["node_modules"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

- compilerOptions : 타입스크립트를 스크립트로 컴파일할 때 사용하는 옵션

  - "target" : "ESNext"  
    타입스크립트가 변환을 목표로 하는 언어의 버전

  - "lib": ["ES2020", "DOM", "DOM.Iterable"]  
     lib 항목을 정의하지 않았다면 target 항목에서 지정한 버전에 따라 기본값이 정의

    - ES5의 기본 값: dom, es5, scripthost
    - ES6의 기본 값: dom, dom.iterable, es6, scripthost

  - "allowJs": false
    자바스크립트 파일 컴파일 여부
  - "skipLibCheck": true
    라이브러리에서 제공하는 d.ts 검사 여부, 일반적으로 껴놓는 경우가 많다.

  - "strict": true  
    컴파일러의 엄격모드 제어
    - alwaysStrict : 모든 js 파일에 use strict 추가
    - strictNullChecks : null과 undefined 구분
    - strictBindCallApply : call, bind, apply에 대해 정확한 인수 요구
    - strictFunctionTypes : 함수 타입에 대한 엄격함 활성화
    - strictPropertyInitialization : 클래스 내부의 프로퍼티에 값을 할당할 때 타입 파악
    - noImplicitAny : 타입을 명시하지 않은 변수에 any를 넣지 않고 에러 발생
    - noImplicitThis : this를 추론할 수 없는 상황에서 any를 할당하지 않고 에러 발생
    - useUnknownInCatchVariables : catch 구문에서 잡은 변수에 대해서 unknown 할당
  - "useDefineForClassFields" : 파일 이름의 대소문자 구분 여부
  - "noEmit" : 컴파일하지 않고, 타입만 체크 / Next.js는 swc가 타입스크립트 파일을 컴파일
  - "esModuleInterop" : CommonJS 방식으로 내보낸 모듈을 ES모듈 방식으로 import 가능하도록 해준다.
  - "module" : 모듈 시스템 설정 / commonjs - require와 esnext - import
  - "moduleResolution" : 모듈 해석방식
  - "resolveJsonModule" : Json 파일을 import할 수 있게 해준다.
  - "isolatedModules" : import나 export없는 모듈 시스템과 연계되지 않은 파일의 생성을 막기 위한 옵션
  - "jsx" : JSX를 어떻게 컴파일할지 설정
  - "incremental" : 마지막 컴파일 정보를 .tsbuildinfo 파일 형태로 디스크에 저장 -> 컴파일이 빨라지는 효과
  - "baseUrl" : 모듈을 찾을 때 기준이 되는 디렉토리 지정
  - "paths" : 상대경로를 활용하면 중첩되면서 복잡해질수 있는데, 이때 경로에 별칭을 지정 / @는 스코프 패키지에 널리 사용되기 때문에 @의 사용은 자제하는 것이 좋다.

- include : 타입스크립트 컴파일 대상에서 포함시킬 파일목록
- exclude : 타입스크립트 컴파일 대상에서 제외시킬 파일목록

## next.config.js

Next

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuild: true,
  },
};

module.exports = nextConfig;
```

- reactStrictMode : 리액트의 엄격 모드를 활성화
- poweredByHeader : 보안 취약점으로 취급되는 X-Powered-By 헤더(서버 사이드에서 사용하는 기술 ASP.NET, PHP, JBoss 등을 표시하는 비표준 헤더) 제거
- eslint.ignoreDuringBuild : 빌드시 ESLint 무시

## ESLint, Prettier

잠재적인 문제, 띄어쓰기, 줄바꿈 등 코드의 스타일링을 정의하기 위해 아래와 같이 설치한다.
@titicaca/eslint-config-triple는 설치 및 설정이 가장 쉽다.

```bash
  npm i @titicaca/eslint-config-triple --save-dev
```

설치 후 package.json의 scripts 속성에 다음을 추가한다.

```json
{
  "scripts": {
    "lint:es": "eslint .",
    "lint:es:fix": "eslint . --fix"
  }
}
```
