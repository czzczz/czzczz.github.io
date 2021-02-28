# 样式初始化

目的：由于各浏览器中对详细标签的默认实现不一致，可能会导致样式显示 bug，因此通过样式初始化将浏览器标签的默认样式全部消除，样式由程序员自己设计，减小不同浏览器可能带来的 bug。

简易版：

```css
body {
	padding: 0;
	margin: 0;
}
```

豪华版：

```css
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
	margin: 0;
	padding: 0;
}
body,
button,
input,
select,
textarea {
	font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-size: 100%;
}
address,
cite,
dfn,
em,
var {
	font-style: normal;
}
code,
kbd,
pre,
samp {
	font-family: couriernew, courier, monospace;
}
small {
	font-size: 12px;
}
ul,
ol {
	list-style: none;
}
a {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
sup {
	vertical-align: text-top;
}
sub {
	vertical-align: text-bottom;
}
legend {
	color: #000;
}
fieldset,
img {
	border: 0;
}
button,
input,
select,
textarea {
	font-size: 100%;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
