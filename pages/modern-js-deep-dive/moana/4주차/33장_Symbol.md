# 33장 7번째 데이터타입 symbol

> symbol은 ES6에 도입된 7번째 데이터 타입으로 원시타입이다. 이는 다른 값과 중복되지 않는 유일한 값이다. 따라서 주로 이름의 충돌 위험이 없는 **유일한 프로퍼티 키**를 만들기 위해 사용한다. 프로퍼티 키로 사용할 수 있는 값은 빈 문자열을 포함하는 모든 문자열 또는 심벌 값이다.

## 📖심벌 값 생성

### Symbol 함수

- symbol값은 Symbol 함수를 호출해 생성해야 한다.
- 심벌 값은 외부로 노출되지 않아 확인 불가하며, 다른 값과 절대 중복되지 않는 유일무이한 값이다.
- 심벌은 new연산자와 함께 호출하지 않는다.

  ```javascript
  const exSymbol = Symbol();
  console.log(typeof exSmbol()); //symbol
  //심벌 값은 외부로 노출되지 않아 값확인 불가
  console.log(mySymbol); //Symbol()
  ```

- Symbol함수에는 선택적으로 문자열을 인수로 전달할 수 있다.
- 이 문자열은 생성된 심벌 값에 대한 설명으로 디버깅 용도로만 쓰인다.(심벌 값 생성에 영향x)
- 심벌 값의 설명이 같아도 여전히 심벌값은 유일하다.

  ```javascript
  const mySymbol1 = Symbol('mySymbol');
  const mySymbol2 = Symbol('mySymbol');

  console.log(mySymbol1 === mySymbol2); //false
  ```

- 심벌 값도 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다.

  > 문자열, 숫자, 불리언 값에 대해 객체처럼 마침표 표기법으로 접근하면 엔진이 원시값을 연관된 객체로 변환해주는데 이를 래퍼 객체라 한다.

  ```javascript
  const mySymbol = Symbol('mySymbol');
  console.log(mySymbol.description); //mySymbol
  console.log(mySymbol.toString()); //Symbol(mySymbol)
  ```

- 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다. 단, 불리언 타입으로는 암묵적으로 타입 변환한다.
  ```javascript
  const mySymbol = Symbol();
  console.log(mySymbol + ''); //TypeError
  console.log(+mySymbol); //TypeError
  console.log(!!mySymbol); //true
  ```

### Symbol.for / Symbol.keyFor 메서드

- Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용하여 해당 키와 일치하는 심벌 값을 검색한다.
- Symbol.for 을 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수 심벌값을 단 하나만 생성해 전역 심벌 레지스트리를 통해 공유 가능.

  ```javascript
  // 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 *새로 생성*
  const s1 = Symbol.for('mySymbol');
  // 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 *해당 심벌 값을 반환*
  const s2 = Symbol.for('mySymbol');
  console.log(s1 === s2); // true
  ```

- Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있습니다.

  ```javascript
  // 전역 심벌 레지스트리에 mySymbol 키로 저장된 심벌 값이 없으면 새로 생성
  const s1 = Symbol.for('mySymbol');
  // 심벌 값의 키를 추출
  Symbol.keyFor(s1); // mySymbol

  // Symbol함수를 호출해 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않음
  const s2 = Symbol('foo');
  Symbol.keyFor(s2); // undefined
  ```

## 📖심벌과 상수

값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우 변경/중복될 가능성이 없는 심벌 값을 사용할 수 있습니다

```javascript
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성한다.
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('you are going up');
}
```

## 📖심벌과 프로퍼티 키

심벌 값은 유일무이하여 프로퍼티 키에 이용하면 다른 프로퍼티 키와 절대 충돌하지 않는다.

```javascript
// 심벌 값을 프로퍼티 키로 사용하려면 대괄호를 사용해야 한다.
const obj = {
  [Symbol.for('mySymbol')]: 1,
};

// 프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용해야 한다.
obj[Symbol.for('mySymbol')]; // 1
```

## 📖심벌과 프로퍼티 은닉

심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `for ...in`문이나 `Object.keys, Object.getOwnPropertyNames` 메서드로 찾을 수 없다. 이처럼 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

```javascript
const obj = {
  // 심벌 값으로 프로퍼티 키를 생성
  [Symbol('mySymbol')]: 1,
};

for (const key in obj) {
  console.log(key); // 아무것도 출력되지 않음
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []

//getOwnPropertySymbols 메서드는 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

//getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있음
const symbolKey1 = Object.getOwnPropertySymbols(obj)[0]; //Symbol(mySymbol)
console.log(obj[symbolKey1]); // 1
```

# 📖심벌과 표준 빌트인 객체 확장

일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않고 읽기 전용으로 사용하는 것이 좋다.
미래에 표준 사양으로 추가될 **메서드의** 이름이 중복될 수 있기 때문이다.

하지만 중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하게 확장할 수 있다.

```javascript
Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

[1, 2][Symbol.for('sum')](); // 3
```

# 📖Well-known **Symbol**
자바스크립트가 기본 제공하는 빌트인 심벌 값이다. 빌트인 심벌 값은 Symbol 함수의 프로퍼티에 할당되어 있다. 이는 `Well-known Symbol` 

```javascript
const iterable ={
    //Symbol.iterator 메서드를 구현해 이터러블 프로토콜을 준수
    [Symbol.iterator](){
        let cur=1;
        const max=5;
        //Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터 반환 
        return{
          next(){
            return { value: cur++, done: cur> max+1}
          }
        }****
    };
    for (const num of iterable){
      console.log(num) // 1 2 3 4 5
    }
}
```