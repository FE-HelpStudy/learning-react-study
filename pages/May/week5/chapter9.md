CSS 스타일의 종류

- Inline style(인라인 스타일)
- Embedding style(내부참조)
- Link style(외부 참조)

### **SASS(Syntactically Awesome Style Sheets**)

- css 의 단점(반복되는 코드 작성 등) 을 보완하기 위해 만든 CSS 전처리기이다.
- 코드의 재활용성과 가독성을 높여줌
- .sass 확장자와 .scss 확장자를 모두 지원해줌

**.sass**

```sass
$font-stack:Helvetica, sans-serif
$primary-color:#333

body
 font:100% $font-stack
 color:$primary-color
```

**.scss (sass 와 달리 중괄호와 세미콜론을 사용)**

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

utils 함수 분리

```scss
src/styles/utils.scss

$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

/* 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음) */
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

```

```scss
SassComponent.scss

@import './styles/utils';
.SassComponent {
  display: flex;
  .box {
    background: red; /* 일반 CSS에서는 .SassComponent .box와 마찬가지 */
    cursor: pointer;
    transition: all 0.3s ease-in;
    (...)
  }
}
```

### css module

- css 클래스가 중첩되는 것을 방지
- name.module.css 형식으로 파일명 작성

### styled components ⇒개발자들이 가장 선호하는 방식

JS 파일 하나에 스타일까지 작성할 수 있기 때문에 외부 css 파일을 따로 만들지 않아 전역적으로 중복되는 상황을 방지

props 로 전달해주는 값을 쉽게 스타일에 적용할 수 있음

props 에 따른 조건부 스타일링 가능

하지만 빠른 페이지로드에 불리하다.

```scss
//styledCompoonent.js
import React from 'react';
import styled, {css} from 'styled-components';

const Box = styled.div`
		/*props로 넣어 준 값을 직접 전달해 줄 수 있음*/
    background: ${props => props.color || 'blue'};
    padding:1rem;
    display:flex;
`;
const Button = styled.button`
bakcground:white;
color:black;
border-radius:4px;
padding:0.5rem;
display:flex;
align-items:center;
justify-content: center;
box-sizing:border-box;
font-size:1rem;
font-weight:600;

/* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
&:hover{
    background:rgba(255,255,255,0.9);
}
/* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줌 */
${props =>
    props.inverted && css`
        background:none;
        border:2px solid white;
        color:white;
        &:hover{
        background:white;
        color:black;
        }
    `};
    &+button{
        margin-left:1rem;
    }
`;

const StyledComponent = () => (
    <Box color="black">
        <Button>안녕하세요</Button>
        <Button inverted={true}>테두리만</Button>
    </Box>
);

export default StyledComponent;
```

반응형 디자인

```scss
import React from 'react';
import styled, {css} from 'styled-components';

const sizes = {
    desktop:1024,
    tablet:768
};
// 위에있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어줍니다.
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
      }
    `;
    return acc;
}, {});

const Box = styled.div`
//props 로 넣어준 값 전달
    background : ${props => props.color || 'blue'};
    padding:1rem;
    display:flex;
    width:1024px;
    margin:0 auto;
    ${media.desktop`width: 768px;`}
    ${media.tablet`width: 100%;`};
`;
```

(추가 예정)
