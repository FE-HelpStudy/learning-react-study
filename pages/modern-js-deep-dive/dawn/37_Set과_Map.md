# Set과 Map

## Set

- 중복되지 않는 유일한 값들의 집합
- 배열과의 차이점
  - 동일한 값을 중복하여 포함할 수 없다.
  - 요소의 순서가 의미가 없다
  - 인덱스로 요소에 접근할 수 없다.
- 수학적 집합의 특성과 일치하기에 교집합, 합집합, 차집합, 여집합 등을 구현할 수 있다.

### Set 객체의 생성

```js
const set = new Set(); // 생성자 함수로 생성
console.log(set); // Set(0) {}

const set1 = new Set([1, 2, 3, 3]); // Set(3) {1, 2, 3}
const set2 = new Set('hello'); // Set(4) {"h", "e", "l", "o"}
```

### 요소 개수 확인

- Set 객체의 요소 개수를 확인할 때는 `Set.prototype.size` 프로퍼티를 사용

```js
const { size } = new Set([1, 2, 3, 3]); // size = 3
```

- size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티
  - 할당하여 요소의 개수를 변경할 수 없음

### 요소 추가

- `Set.prototype.add` 메서드를 사용

```js
const set = new Set();
set.add(1);

console.log(set); // Set(1) {1}

set.add(2).add(3);
console.log(set); // Set(3) {1, 2, 3}
```

- NaN과 NaN, +0과 -0은 같다고 평가하여 중복으로 추가되지 않음

### 요소 존재 여부 확인

- Set.prototype.has 메서드를 사용

```js
const set = new Set([1, 2, 3]);
console.log(set.has(2)); // true
console.log(set.had(5)); // false
```

### 요소 삭제

- Set.prototype.delete 메서드 사용
- 삭제 성공 여부를 나타내는 불리언 값을 반환한다.

```js
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

// 요소 1을 삭제한다.
set.delete(1);
console. 10g(set); // Set(1) (3}

// 존재하지 않으면 에러 없이 무시
set.delete(0);
console.1og(set); // Set(1) (3}

// delete는 불리언 값을 반환한다.
set.delete(1). delete(2); // TypeError: set.delete( ... ).delete is not a function
```

### 요소 일괄 삭제

- Set.prototype.clear

```js
const set = new Set([1, 2, 3]);
set.clear();
console.log(set); // Set(0) {}
```

### 요소 순회

- Set.prototype.forEach
- Array.prototype.forEach 메서드와 동일하지만, set은 인덱스가 없기 떄문에 첫번째 인수와 두번째 인수 값이 동일하다.

```js
const set = new Set([1, 2, 3]);
set.forEach((v, v2, set) => console.log(v, v2, set));
// Set(3) {1, 2, 3}
// Set(3) {1, 2, 3}
// Set(3) {1, 2, 3}
```

- Set 객체는 이터러블이기에 for ... of 문으로 순회할 수 있고, 스프레드 문법과 배열 디스트럭팅의 대상이 될 수 있다.
- Set 객체는 요소의 순서에 의미를 갖지 않지만 순회하는 순서는 요소가 추가된 순서를 따른다.

### 집합 연산

#### 교집합

```js
Set.prototype.intersection = function (set) {
  const result = new Set();
  for (const value of set) {
    // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다.
    if (this.has(value)) result.add(value);
  }
  return result;
};
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);
// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4)
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) (2, 4)
```

#### 합집합

```js
Set.prototype.union = function (set) {
  //  this(Set 객체)를 복사
  const result = new Set(this);
  for (const value of set) {
    //합집합은 2개의 Set 객체의 모든 요소로 구성된 집합이다. 중복된 요소는 포함되지 않는다.
    result.add(value);
  }
  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);
// setA와 setB의 합집합
console.log(setA.union(setB)); // Set (4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
```

#### 차집합

```js
Set.prototype.difference = function (set) {
  // this(Set 객체)를 회사
  const result = new Set(this);
  for (const value of set) {
    // 차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된 집합이다.
    result.delete(value);
  }
  return result;
};
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);
// SetA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) (1, 3)
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set (0) ()
```

#### 부분 집합과 상위 집합

```js
// this가 subset의 상위 집한인지 확인한다.
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    // sterset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
    if (!this.has(value)) return false;
  }
  return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);
// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false
```

## Map

- 키와 값의 쌍으로 이루어진 컬렉션
- 객체와 유사하지만 차이점이 있다.
  - 객체를 포함한 모든 값을 키로 사용할 수 있다.
  - 이터러블이다.
  - 요소의 개수를 확인할 때 `map.size`

### Map 객체의 생성

- 이터러블을 인수로 전달받아 Map 객체를 생성한다. 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.
- 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다.

```js
const map = new Map();
console.log(map): // Map(0) ()

const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"keyl" => "value1", "key2" => "value2"}
const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object

const map = new Map ([['key1' , 'value1'], ['key1', 'value2']]):
console.log(map); // Map(1) ("key1" => "value2")
```

### 요소 개수 확인

- Map.prototype.size

```js
const { size } = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.1og(size); // 2
```

### 요소 추가

- Map.prototype.set

```js
const map = new Map();
console.log(map); // Map(0) (}
map.set('key1', 'value1');
console.log(map); // Map(1) {"key1" => "valuel"}

// set 메서드는 새로운 요소가 추가된 Map 객체를 반환하기 때문에 연속으로 호출할 수 있다.
const map = new Map();
map.set('key1', 'value1').set('key2', 'value2');
console.log(map); // Map(2) ("key1" => "value1", "key2" →> "value2"}
```

- NaN과 NaN, +0과 -0을 갖다고 판단하여 중복 추가를 허용하지 않는다.

```js
const map = new Map();
console.log(NaN === NaN); // false console. log(0 === -0); // true

//  NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
map.set(NaN, 'valuel').set(NaN, 'value2');
console.log(map); // Map(1) { NaN => 'value2' }

// +0과 0을 같다고 평가하여 중복 추가를 허용하지 않는다.
map.set(0, 'value1').set(-0, 'value2');
console.log(map); // Map(2) { NaN => 'value2', 0 => 'value2' }
```

객체는 문자열 또는 심벌 값만 키로 사용할 수 있다. 하지만 Map 객체는 키 타입에 제한이 없다.

```js
const map = new Map();
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
// 객체도 키로 사용할 수 있다.
map.set(lee, 'developer').set(kim, 'designer');

// Map(2) { {name: "Lee"} => "developer", {name: "Kim"} => "designer"} }
```

### 요소 취득

- Map.prototype.get
- 인수로 키를 전달하면 Map 객체에서 인수로 전달한 키를 갖는 값을 반환한다.(존재하지 않으면 undefined)

```js
const map = new Map();
const lee = { name:'Lee' };
const kim = { name:'Kim' }:
map.set(lee,'developer').set(kim,'designer');
console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```

### 요소 존재 여부 확인

- Map.prototype.has
- 특정 요소의 존재 여부를 나타내는 불리언 값을 반환

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);
console.log(map.has(lee)); // true
console.log(map.has('key')); // false
```

### 요소 삭제

- Map.prototype.delete
- 삭제 성공 여부를 나타내는 불리언을 반환(연속적으로 호출할 수 없다.)

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);
map.delete(kim);
console.log(map); // Map(1) ( name: "Lee") →> "developer /
```

만약 존재하지 않는 키로 Map 객체의 요소를 삭제하려 하면 에러 없이 무시된다.

### 요소 일괄 삭제

- Map.prototype.clear
- 언제나 undefined 반환

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);
map.clear();
console.Log(map); // Map(0) ()
```

### 요소 순회

- Map.prototype.forEach
- Array.prototype.forEach와 유사하게 콜백 함수를 전달한다.
  - 첫번째 인수: 순회 중인 요소값
  - 두번째 인수: 순회 중인 요소키
  - 세번째 인수: 순회 중인 Map 객체 자체

```js
const lee = { name:
'Lee'
};
const kim = { name: 'Kim' }:
const map = new Map([[lee, 'developer'], [kim,'designer']]);
map.forEach((v, k, map) =› console.log(v, k, map));
/*
developer {name: "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
designer {name: "Kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
*/
```

Map 객체는 이터러블이기 때문에 for ... of 문으로 순회할 수 있고, 스프레드 문법과 배열 디스트럭처링 할당의 대상이 될 수 있다.

Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.

- Map.prototype.keys: Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환
- Map.prototype.values: Map 객체에서 요소값를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환
- Map.prototype.entries: Map 객체에서 요소키와 요소값를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };
const map = new Map([
  [lee, 'developer'],
  [kim, 'designer'],
]);
// Map.prototype.keys는 Map 객체에서 요소키를 값으로 갖는 이터레이터를 반환한다.
for (const key of map.keys()) {
  console.log(key); // {name: "Lee"} {name: "Kim")
}
// Map.prototype.values는 Map 객체에서 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const value of map.values()) {
  console.log(value); // developer designer
}
// nap.prototype.entries는 Map 객체에서 요소키와 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const entry of map.entries()) {
  console.log(entry); // [{name: "Lee"}, "developer"] [(name: "Kim"}, "designer"]
}
```

Map 객체는 요소의 순서에 의미를 갖지 않지만 Map 객체를 순회하는 순서는 요소가 추가된 순서를 따른다.
