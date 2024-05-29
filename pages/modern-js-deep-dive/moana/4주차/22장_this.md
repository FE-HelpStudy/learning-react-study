# 1. this 키워드

> this는 **자신이 속한 객체** 또는 **자신이 생성할 인스턴스**를 가리키는 **자기 참조 변수(self-referencing variable)다.** this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
> 

```jsx
//객체 리터럴로 생성한 객체의 경우.
const person={
	name: 'ha',
	sayHello(){
		return `${person.name} hi`
	}
}
console.log(person.sayHello())
---------------------------------------
//생성자 함수로 객체를 생성하는 경우
function Person(name){
//이 시점에 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
	???.name = name; 
}
Person.prototype.sayHello =function(){
	return `${???.name} hi`
}
//생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수 정의가 필요하다.
const person= new Person('Lee')
```

객체 리터럴로 생성하는 경우, `sayHello` 라는 메서드를 호출하는 시점에 이미 객체 리터럴은 평가가 완료되어 객체가 생성되었다. 따라서 메서드 내부에서 `person` 식별자 참조가 된다.

반면, 생성자 함수는 1. 생성자 함수 정의  2. new 연산자와 함께 생성자 함수 호출  이다.  따라서 인스턴스 생성 전, 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다. 그것이 `this` 

함수를 호출하면 함수 내부에 `arguments` 와 `this` 가 전달된다. 둘 다 지역변수처럼 활용 가능하다. **단, this가 가리키는 값 (this 바인딩) 은 함수 호출 방식에 의해 동적으로 결정된다.**

| 함수 호출 방식 | this가 가리키는 값(this바인딩) |
| --- | --- |
| 일반 함수로서 호출 | 전역 객체 |
| 메서드로서 호출 | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스  |

```jsx
function foo(){
	console.log(this)
}
//일반 함수로서 호출
foo() //window

const obj={foo}; //ES6 프로퍼티 축약표현

//메서드로서 호출
obj.foo(); //obj

//생성자 함수로서 호출
const inst = new foo(); //inst 
```

this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수로 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undfined가 바인딩된다.