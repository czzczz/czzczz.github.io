# CSS 元素居中方法

## display:flex;

```css
.parent {
	display: flex;
	justify-content: center;
	align-items: center;
}
```

## transform + position

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
```

具体原理为先用 left 和 top 将子元素的左上顶点置于父元素中心，transform: translate 参数如果为百分比形式，将根据元素本身的宽和高作为基准将元素进行移动本身宽和高的 50%，得以居中。

## 内联元素（文字）水平居中

```css
.parent {
	text-align: center;
}
```

## 内联元素（文字）垂直居中

```css
.parent {
	height: 100px;
	line-height: 100px;
}
```
