# position 属性

## absolute

绝对定位，逐层往父元素找，之后的定位将基于定义了 position 属性的父元素的左上角进行。

## fixed

基于窗口的绝对定位，之后的定位将基于窗口的左上角进行，同时不受内容滚动的影响。

## relative

相对定位，之后的定位将基于默认定位的位置进行。

## inherit

继承父组件的 position 属性。

## position 的 absolute 与 fixed 共同点与不同点

共同点：

1. 改变行内元素的呈现方式，display 被置为 inline-block；
2. 让元素脱离普通流，不占据空间；
3. 默认会覆盖到非定位元素上

不同点：
absolute 的”根元素“是可以设置的，而 fixed 的”根元素“固定为浏览器窗口。
当你滚动网页，fixed 元素与浏览器窗口之间的距离是不变的。
