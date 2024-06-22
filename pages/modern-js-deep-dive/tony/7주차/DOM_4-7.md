---
  writer : 'tony'
  velog : 'https://velog.io/@taemin-jang/DOM'
---

노드 객체에 대한 정보를 취득하려면 다음과 같은 노드 정보 프로퍼티를 사용해야 한다.

### Node.prototype.nodeType
노드 타입 상수를 반환하는 프로퍼티고, Node에 정의되어 있다.

- Node.ELEMENT_NODE: 요소 노드 타입을 나타내는 상수 1을 반환
- Node.TEXT_NODE: 텍스트 노드 타입을 나타내는 상수 3을 반환
- Node.DOCUMENT_NODE: 문서 노드 타입을 나타내는 상수 9를 반환

### Node.prototype.nodeName
노드의 이름을 문자열로 반환한다.

- 요소 노드: 대문자 문자열로 태그 이름(ex. `ul`, `li`등)을 반환
- 텍스트 노드 타입: 문자열 `#text`를 반환
- 문서 노드 타입: 문자열 `#document`를 반환

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>Hello</div>
  </body>
  <script>
    // 문서 노드의 노드 정보를 취득한다.
    console.log(document.nodeType); // 9
    console.log(document.nodeName); // #document
    
    // 요소 노드의 노드 정보를 취득한다.
    const $foo = document.getElementById('foo');
    console.log($foo.nodeType); // 1
    console.log($foo.nodeName); // DIV
    
     // 텍스트 노드의 노드 정보를 취득한다.
    const $textNode = #foo.firstChild;
    console.log($textNode.nodeType); // 3
    console.log($textNode.nodeName); // #text
  </script>
</html>
```

![](https://velog.velcdn.com/images/taemin-jang/post/82be9e64-7292-488c-addf-11cd460c4a73/image.png)


### nodeValue
노드 정보 프로퍼티는 모두 읽기 전용 접근자 프로퍼티다.

`Node.prototype.nodeValue` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로써 참조와 할당 모두 가능하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>Hello</div>
  </body>
  <script>
    // 문서 노드의 nodeValue 프로퍼티를 참조한다.
    console.log(document.nodeValue); // null
    
    // 요소 노드의 nodeValue 프로퍼티를 참조한다.
    const $foo = document.getElementById('foo');
    console.log($foo.nodeValue); // null
    
     // 텍스트 노드의 nodeValue 프로퍼티를 참조한다.
    const $textNode = #foo.firstChild;
    console.log($textNode.nodeValue); // Hello
  </script>
</html>
```

노드 객체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값을 반환하는데, 노드 객체의 값은 노드 텍스트이다.

따라서 텍스트 노드가 아닌 노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.

![](https://velog.velcdn.com/images/taemin-jang/post/132cea4f-f6d1-4089-a41c-1951e07a5491/image.png)

### textContent
`Node.prototype.textContent` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>
      Hello
      <span>world!</span>
    </div>
  </body>
  <script>
    // #foo 요소 노드의 텍스트를 모두 취득한다.
    const $foo = document.getElementById('foo');
    console.log($foo.textContent); // Hello world!
  </script>
</html>
```

이 때 HTML 마크업이 포함되어 있어도 무시하고 문자열인 텍스트만 취득할 수 있다.

![](https://velog.velcdn.com/images/taemin-jang/post/07721bd2-f15b-4bc8-ae12-faace48dc877/image.png)

![](https://velog.velcdn.com/images/taemin-jang/post/d3c24fc8-f005-4c69-ac43-186c7736ca88/image.png)

> textContent와 유사한 동작을 하는 innerText 프로퍼티가 있지만 다음과 같은 이유로 사용하지 않는 것이 좋다.
>
> - innerText 프로퍼티는 CSS에 의해 비표시(`visibility: hidden;`)로 지정된 요소 노드의 텍스트를 반환하지 않는다.
> - innerText 프로퍼티는 CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다.

## DOM 조작
DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다.

DOM 조작에 의해 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하는 원인이 되어 성능에 영향을 준다.

> **리플로우와 리페인트**
>
> - 리플로우: 요소 추가, 제거, 크기 및 위치 변경과 같이 레이아웃이 변경될 때 발생합니다.
> - 리페인트: 요소의 색상, 배경과 같이 웹 페이지의 스타일이 변경될 때 발생합니다.

### innterHTML
`Element.prototype.innerHTML` 프로퍼티는 setter와 getter모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>
      Hello
      <span>world!</span>
    </div>
  </body>
  <script>
    // #foo 요소 노드의 텍스트를 모두 취득한다.
    const $foo = document.getElementById('foo');
    console.log($foo.innerHTML); // Hello <span>world!</span>
  </script>
</html>
```

앞서 살펴본 `textContent` 프로퍼티는 HTML 마크업을 무시하고 텍스트만 반환하지만, `innerHTML` 프로퍼티는 HTML 마크업이 포함된 문자열 그대로 반환한다.

![](https://velog.velcdn.com/images/taemin-jang/post/298700a3-8edd-4b95-9190-091cb311949e/image.png)

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>
      Hello
      <span>world!</span>
    </div>
  </body>
  <script>
    const $foo = document.getElementById('foo');
    $foo.innerHTML = 'Hello span>there!</span>'
  </script>
</html>
```
이렇게 `innerHTML` 프로퍼티를 사용하면 간단히 DOM 조작이 가능하다.

![](https://velog.velcdn.com/images/taemin-jang/post/a25f5941-178b-4d75-a635-720857005b3c/image.png)

간단히 DOM 조작이 가능하다는 의미는 위험할 수 있다. 만약 사용자로부터 입력받은 데이터를 그대로 `innerHTML` 프로퍼티에 할당하는 것은 **크로스 사이트 스크립팅 공격 (XSS)**에 취약하다.

> **크로스 사이트 스크립팅 공격**
>
> 브라우저에 스크립트가 실행되도록 해서 사용자의 세션을 가로채거나 웹사이트를 변조, 악의적인 콘텐츠를 삽입 등과 같은 공격을 의미합니다.

하지만 HTML5는 `innerHTML` 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않는다.

script 요소 없이도 XSS 공격은 가능하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id='foo'>
      Hello
    </div>
  </body>
  <script>
    // 에러 이벤트를 강제로 발생시켜서 자바스크립트 코드가 실행된다.
    const $foo = document.getElementById('foo');
    $foo.innerHTML = '<img src="x" onerror="alert(document.cookie)">';
  </script>
</html>
```

`innerHTML` 프로퍼티를 사용하면 DOM 조작이 간편하지만 XSS 공격에 취약하기 때문에 주의해야 한다.

> **HTML 새니티제이션**
>
> HTML 새니티제이션은 사용자로부터 입력받은 데이터에 의해 발생할 수 있는 XSS 공격을 예방하기 위해 위험을 제거하는 기능을 말한다.
>
> 새니티제이션 함수를 직접 구현도 가능하지만, `DOMPurify` 라이브러리를 사용하는 것을 권장한다.
> 
> ```js
> DOMPurify.sanitize('<img src="x" onerror="alert(document.cookie)">');
> // => <img src="x">
>```

### insertAdjacentHTML 메서드
`Element.prototype.insertAdjacentHTML(position, DOMString)` 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입할 수 있다.

- position은 DOMString을 전달할 위치로 문자열을 전달하는데 아래 이미지처럼 4가지로 정의되어 있다.

![](https://velog.velcdn.com/images/taemin-jang/post/64cac31b-fa02-4597-9dc8-e43034148dd7/image.png)

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- beforebegin -->
    <div id='foo'>
      <!-- afterbegin -->
      Hello
      <!-- beforeend -->
    </div>
    <!-- afterend -->
  </body>
  <script>
    const $foo = document.getElementById('foo');
    
    $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
    $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
    $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
    $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
  </script>
</html>
```
`insertAdjacentHTML` 메서드는 `innerHTML` 프로퍼티와 다르게 요소를 추가할 때 기존 요소에는 영향을 주지 않고 새로 추가되는 요소만 파싱하여 효율적이고 빠르다.

하지만 `innerHTML` 프로퍼티와 마찬가지로 HTML 마크업 문자열을 파싱하기 때문에 XSS 공격에 취약하다.

### createElement(tagName)
`Document.prototype.createElement(tagName)` 메서드는 요소 노드를 생성하여 반환한다.

```js
// 요소 노드 생성
const $li = document.createElement('li');

// 생성된 요소 노드는 자식 노드를 가지고 있지 않다.
console.log($li.childNodes); // NodeList []
```

`createElement` 메서드로 생성한 요소 노드는 자식 노드를 가지고 있지 않고 홀로 존재하는 상태다.

### createTextNode(text)
`Document.prototype.createTextNode(text)` 메서드는 텍스트 노드를 생성하여 반환한다.

```js
// 텍스트 노드 생성
const textNode = document.createTextNode('Banana');
```

텍스트 노드 또한 자식 노드로 추가되지 않고 홀로 존재하는 상태라 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

### appendChild(childNode)
`Node.prototype.appendChild(childNode)` 메서드는 매개변수 childNode에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가한다.

```js
// 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
$li.appendChild(textNode);
```

![](https://velog.velcdn.com/images/taemin-jang/post/8081f27c-45f7-456a-9693-bddac0bc4d46/image.png)

이렇게 요소 노드와 텍스트 노드는 부자 관계로 연결되었지만 아직 DOM에 추가되지 않은 상태다.

위 예제처럼 요소 노드에 자식 노드가 하나도 없는 경우에는 `textContent` 프로퍼티를 사용하여 추가하는 편이 더욱 간편하다.

```js
// 텍스트 노드를 생성하여 요소 노드의 자식 노드로 추가
$li.appendChild(document.createTextNode('Banana'));

// $li 요소 노드의 자식 노드가 하나도 없으면 위 코드와 동일하게 동작한다.
$li.textContent = 'Banana';
```

### 노드 생성과 추가 과정

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id='fruits'>
      <li>Apple</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');
    
    // 요소 노드 생성
	const $li = document.createElement('li');
    
    // 텍스트 노드 생성
	const textNode = document.createTextNode('Banana');
    
    // 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
	$li.appendChild(textNode);
    
    // $li 요소 노드를 $fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($li);
  </script>
</html>
```
![](https://velog.velcdn.com/images/taemin-jang/post/fd25f020-2a58-4e52-97d8-5e674bbf4476/image.png)

이 과정에서 새롭게 생성한 요소 노드 1개가 DOM에 추가되는데 이 때 리플로우와 리페인트가 1번 실행된다.

만약 요소 노드가 여러개 생성되어 DOM에 여러번 추가되면 리플로우와 리페인트도 여러번 실행되므로 성능에 좋지 않다.

### insertBefore(newNode, childNode)

`appendChild` 메서드는 인수로 전달받은 노드를 자신이 호출한 노드의 마지막 자식 노드로 DOM에 추가한다.

이때 노드 위치를 지정할 수 없고 항상 마지막에 추가하게 되는데 `Node.prototype.insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달 받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id='fruits'>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');
    
    // 요소 노드 생성
	const $li = document.createElement('li');
    
    // 텍스트 노드 생성
	const textNode = document.createTextNode('Orange');
    
    // 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
	$li.appendChild(textNode);
    
    // $li 요소 노드를 $fruits 요소 노드의 마지막 자식 노드 앞에 삽입
    $fruits.insertBefore($li, $fruits.lastElementChild);
  </script>
</html>
```
![](https://velog.velcdn.com/images/taemin-jang/post/8612143f-337c-40d5-b7f9-bbbd379279eb/image.png)
