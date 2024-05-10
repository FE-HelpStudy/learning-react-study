# 타입 변환과 단축 평가

## 타입변환이란

### 암묵적 타입 변환 (타입 강제 변환)
- 개발자의 **의도와 상관없이** 자바스크립트 엔진에 의해 암묵적으로 타입 변환

자바스크립트는 브라우저 환경에서 실행되는 스크립트 언어로 설계되었기 때문에  타입에 대한 유연성을 추구하게 되었다.

웹 브라우저는 다양한 환경과 상황에서 동작해야 하므로, 자바스크립트는 최대한 에러 없이 실행되도록 설계되었다. 

이를 위해 암묵적 타입 변환과 같은 유연한 특성을 가지게 되었다.

기존의 변수 값을 재할당하여 변경하는 것이 아니라 표현식을 에러없이 평가하기 위해 피연산자의 값을 암묵적 타입 변환을 통해 새로운 타입의 값을 만들어 단 한 번 사용하고 버린다.

```javascript
var x = 10
var str = x + ''
console.log(typeof str, str) // string 10
console.log(typeof x, x) // number 10
```

개발자의 의도와 상관없이 **코드의 문맥**을 고려해 암묵적으로 데이터 타입을 강제 변환 한다.

```javascript
// 피연산자가 모두 문자열 타입이어애 하는 문맥
'10' + 2 // '102'

// 피연산자가 모두 숫자 타입이어애 하는 문맥
5 * '10' // 50

// 피연산 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // true
if(1) { }
```

#### 문자열 타입으로 변환
```javascript
1 + '2' // "12"
```
에제의 + 연산자는 피연산자 중 하나 이상이 문자열이므로 **문자열 연결 연산자로 동작**한다. 따라서 모든 피연산자는 문자열 타입이어야 한다.

템플릿 리터럴의 표현식 삽입 또한 암묵적 타입 변환에 해당한다
```javascript
`1 + 1 = ${1 + 1}` // "1 + 1 = 2"
```

자바스크립트 엔진은 문자열 타입이 아닌 값을 문자열 타입으로 암묵적 타입 변환을 수행할 떄 다음과 같이 동작한다.
```javascript
// 숫자 타입
0 + '' // "0"
-0 + '' // "0"
1 + '' // "1"
-1 + '' // "-1"
NaN + '' // "NaN"
Infinity + '' // "Infinity"
-Infinity + '' // "-Infinity"

// 불리언 타입
true + '' // "true"
false + '' // "false"

// null 타입
null + '' // "null"

// undefined 타입
undefined + '' // "undefined"

// 심벌 타입
(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + '' // "[object Object]"
Math + '' // "[object Math]"
[] + '' // ""
[10, 20] + ''//"10, 20"
(function() {}) + '' /// "function() {}"
Array + '' // "function Array() {[native code]}"
```

#### 숫자 타입으로 변환
```javascript
1 - '1' // 0
1 * '10' // 10
1 / 'one' // NaN
```
산술 연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야 한다.
피연산자를 숫자 타입으로 변환할 수 없는 경우는 평가 결과가 NaN 이 된다.

```javascript
'1' > 0 // true
```
비교 연산자의 결과는 불리언 값이다
비교 연산자 > 의 피연산자는 코드 문맥상 모두 숫자 탕비이어애 한다/

자바스크립트 엔진은 숫자 타입이 아닌 값을 숫자 타입으로 암묵적 타입 변환을 수행할 때 다음과 같이 동작한다.

단항 연산자로 사용된 + 는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.
```javascript
// 문자열 타입
+'' // 0
+ '0' // 0
+ '1' // 1
+ 'string' // NaN

// 불리언 타입
+true // 1
+false // 0

// null 타입
+null // 0

//undefined 타입
+undefined // NaN

// 심벌 타입
+Symbol() // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{} // NaN
+[] // 0
+[10,20] // NaN
+(function(){}) // NaN
```

#### 불리언 타입으로 변환

```javascript
if('') console.log(x)
```

자바스크립트 엔진은 조건식의 평과 결과를 불리언 타입으로 암묵적 타입 변환한다.

```javascript
if ('') console.log('1')
if (true) console.log('2')
if (0) console.log('3')
if ('str') console.log('4')
if (null) console.log('5')

// 2 4
```

자바스크립트 엔진은 불리언 타입이 안닌 값을 `Truthy` 값 (참으로 평가되는 값) 또는 `Falsy` 값 (거짓으로 평가되는 값) 으로 구분한다.

Falsy 값의 목록
- false
- undefined
- null
- 0, -0
- NaN
- '' (빈 문자열)

Falsy 값을 제외한 모든 값은 모두 true로 평가되는 Truthy 값이다.

- 문자열
- 숫자
- 배열
- 객체

### 명시적 타입 변환 (타입 캐스팅)
- 개발자의 **의도한** 타입 변환

```javascript
var x = 10
var str = x.toString();
console.log(typeof str, str) // string 10
console.log(typeof x, x) // number 10
```

표준 빌트인 생성자 함수 (String, Number, Boolean) 를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법 그리고 암묵적 타입 변환을 이용하는 방법이 있다.

#### 문자열 타입으로 변환

1. String 생성자 함수를 new 연산자 없이 호출
2. Object.prototype.toString 메서드를 사용
3. 문자열 연결 연산자를 이용하는 방법

#### 숫자 타입으로 변환

1. Number 생성자 함수를 new 연산자 없이 호출
2. parseInt, parseFloat 함수를 사용 (문자열만 숫자 타입으로 변환 가능)
3. + 단항 연산자를 이용하는 방법
3. * 산술 연산자를 이용하는 방법

### 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출
2. ! 부정 논리 연산자를 두번 사용

```javascript
!!'x' // true
!!0 // false
```

## 단축 평가

논리 연산자 && 및 ||를 사용할 때 발생하는 특성

### 논리 연산자를 사용한 단축 평가

#### 논리곱 (&&) 연산의 단축 평가

두 피연상자 중 첫 번째 피연상자가 falsy 값이면, 두 번째 피연상자는 평가되지 않는다.

#### 논리합 (||) 연산의 단축 평가

두 피연상자 중 첫 번째 피연상자가 truthy 값이면, 두 번째 피연상자는 평가되지 않는다.

#### 단축 평가 진리표
```javascript
true || 'anything' // true
false || 'anything' // 'anything'
true && 'anything' // 'anything'
false && 'anything' // false
```

#### 단축 평가 활용
1. 논리곱 연산자 (&&)를 사용해 if 문 대체 가능
    ```javascript
    var done = true
    var message = ''

    if (done) message = '완료'

    message = done && '완료'
    ```

2. 조건이 Falsy 값 일 때 무언가를 해야 한다면 논리합 (||) 연산자 표현식으로 if 문 대체 가능

    ```javascript
    var done = false
    var message = ''

    if (!done) message = '미완료'

    message = done || '미완료'
    ```

3. 삼항연산자 써라

#### 객체에 대한 단축 평가 활용

객체는 키와 값으로 구성된 프로퍼티의 집합이다.
객체를 가리키는 변수 값이 null 또는 undefined 인 경우 참조 에러가 발생하고 프로그램이 강제 종료된다.

이때 단축 평가를 사용하면 에러를 발생시키지 않는다.
```javascript
var elem = null
var value = elem && elem.value // null
```

함수의 매개변수에 기본값을 설정할 때
함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined 가 할당된다.

이때 단축 평가를 사용해 매개변수의 기본값을 지정하면 undefined 로 인해 발생할 수 있는 에러를 방지할 수 있다.

```javascript
function getStringLength(str) {
  str || ''
  return str.length
}

getStringLength() // 0
getStringLength('hi') // 2

// 또는 매개변수 기본값 설정
function getStringLength(str = '') {
  return str.length
}

getStringLength() // 0
getStringLength('hi') // 2
```