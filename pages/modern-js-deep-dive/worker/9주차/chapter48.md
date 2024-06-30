# 모듈

## JS와 모듈

JS는 웹 페이지의 단순한 보조 기능을 처리하기 위한 제한적인 용도의 언어로 설계되어 모듈 시스템을 지원하지 않았다

script 태그를 사용하여 외부의 JS 파일을 로드할 수 있지만 독립적인 스코프를 갖지 않고 하나의 파일처럼 동작한다

JS의 동작 환경이 다양화되면서 모듈 시스템 지원을 위해 [CommonJS](http://www.commonjs.org)와 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 진영이 생겼다

|CommonJS|AMD (Asynchronous Module Definition)|
|---|---|
|서버 사이드(Node.js)에서 사용|브라우저 환경에서 사용|
|동기적으로 모듈을 로드|비동기적으로 모듈을 로드|
|require() 함수를 사용|define() 함수를 사용하여 모듈을 정의|
|module.exports 또는 exports를 사용하여 모듈을 공개|require() 함수를 사용하여 모듈을 로드|

Node.js는 모듈 시스템의 사실상 표준인 CommonJS를 채택하고 독자적으로 발전시켜 100% 동일하진 않지만 기본적으로 CommonJS를 따른다

## ESM

ESM(ECMAScript Modules)은 JavaScript의 공식 모듈 시스템이다

ES6 부터 지원하기 시작했다 mjs 확장자를 사용한다

|||
|---|---|
|문법| import와 export 키워드를 사용|
|정적 구조| 모듈 의존성을 정적으로 분석 가능|
|비동기 로딩| 브라우저에서 기본적으로 비동기적으로 로드|
|트리 쉐이킹| 사용하지 않는 코드를 제거|
|브라우저 지원| 모던 브라우저에서 지원|
|Node.js 지원| Node.js 13.2.0 버전부터 ESM을 지원|

```javascript
<script type="module" src="app.mjs"></script>
```

## 모듈 스코프

ESM이 아닌 일반적인 JS 파일은 script 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않는다

따라서 변수명의 중복 및 전역 오염이 일어난다

## export & import

### export
```javascript
// lib.mjs
//export const pi = Math.PI
const pi = Math.PI

//export function square(x) {
function square(x) {
  return x * x
}

//export class Person {
class Person {
  constructor(name) {
    this.name = name
  }
}
// 하나의 객체로 구성하여 export 가능
export { pi, square, Person }
```
모듈에서 하나의 값만 export 한다면 default 키워드를 사용할 수 있다

default 키워드를 사용하는 경우 이름 없이 하나의 값을 export 한다, 이때 var, let, const 키워드를 사용할 수 없다

```javascript
// lib2.mjs
export default x => x * x

export default const foo = () => {}
// SyntaxError: Unexpected token 'const'
```

### import

모듈이 export한 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 한 번에 import 가능하다

```javascript
// app.mjs
import { pi, square, Person } from "./lib.mjs"

// lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import
import * as lib from "./lib.mjs"

// lib.mjs 모듈이 export한 식별자 이름을 변경하여 import
import { pi as PI, square as sq, Person as P } from "./lib.mjs"

// defult 키워드로 export한 모듈은 {} 없이 임의의 이름으로 import 한다
import square from "./lib2,mjs"
```
