<!-- imageRoot:css -->

# CSS 选择器

<!-- TOC -->

-   [CSS 选择器](#css选择器)
    -   [选择器类型](#选择器类型)
    -   [CSS3 新增选择器](#css3-新增选择器)
        -   [属性选择器](#属性选择器)
        -   [伪类](#伪类)
    -   [选择器优先级](#选择器优先级)

<!-- /TOC -->

## 选择器类型

1. id 选择器(# myid) 根据 id 来选择
2. 类选择器(.myclassname) 根据类名选择
3. 标签选择器(div, h1, p) 根据标签名选择
4. 相邻选择器(h1 + p) 选择每个跟在 h1 后面的 p
5. 子选择器(ul > li) 选择 ul 的直接子元素（第一层）
6. 后代选择器(li a) 选择 li 内部的所有 a（不论是否是第一层）
7. 通配符选择器( \* ) 匹配所用选择器
8. 属性选择器(a[rel = "external"]) 根据属性来选择（CSS3 新增）
9. 伪类选择器(a: hover, li:nth-child) 根据一定的条件来选择

## CSS3 新增选择器

1. element1~element2: 选择前面有 element1 元素的每个 element2 元素。

### 属性选择器

1. `[attribute^=value]`: 选择某元素 attribute 属性是以 value 开头的。
2. `[attribute$=value]`: 选择某元素 attribute 属性是以 value 结尾的。
3. `[attribute*=value]`: 选择某元素 attribute 属性包含 value 字符串的。

### 伪类

1. `E:first-of-type`: 选择属于其父元素的首个 E 元素的每个 E 元素。
2. `E:last-of-type`: 选择属于其父元素的最后 E 元素的每个 E 元素。
3. `E:only-of-type`: 选择属于其父元素唯一的 E 元素的每个 E 元素。
4. `E:only-child`: 选择属于其父元素的唯一子元素的每个 E 元素。
5. `E:nth-child(n)`: 选择属于其父元素的第 n 个子元素的每个 E 元素。
6. `E:nth-last-child(n)`: 选择属于其父元素的倒数第 n 个子元素的每个 E 元素。
7. `E:nth-of-type(n)`: 选择属于其父元素第 n 个 E 元素的每个 E 元素。
8. `E:nth-last-of-type(n)`: 选择属于其父元素倒数第 n 个 E 元素的每个 E 元素。
9. `E:last-child`: 选择属于其父元素最后一个子元素每个 E 元素。
10. `:root`: 选择文档的根元素。
11. `E:empty`: 选择没有子元素的每个 E 元素（包括文本节点)。
12. `E:target`: 选择当前活动的 E 元素。
13. `E:enabled`: 选择每个启用的 E 元素。
14. `E:disabled`: 选择每个禁用的 E 元素。
15. `E:checked`: 选择每个被选中的 E 元素。
16. `E:not(selector)`: 选择非 selector 元素的每个元素。
17. `E::selection`: 选择被用户选取的元素部分。

## 选择器优先级

1. 优先级就近原则，同权重情况下样式定义最近者为准;
2. 载入样式以最后载入的定位为准;
3. !important > id > class > tag
4. important 比 内联优先级高，但内联比 id 要高
