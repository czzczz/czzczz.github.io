<!-- imageRoot:css -->

# css3 背景渐变色

<!-- TOC -->

-   [css3 背景渐变色](#css3-%e8%83%8c%e6%99%af%e6%b8%90%e5%8f%98%e8%89%b2)
    -   [重复的线性渐变：`repeating-linear-gradient`](#%e9%87%8d%e5%a4%8d%e7%9a%84%e7%ba%bf%e6%80%a7%e6%b8%90%e5%8f%98repeating-linear-gradient)
    -   [径向渐变 `radial-gradient`](#%e5%be%84%e5%90%91%e6%b8%90%e5%8f%98-radial-gradient)
    -   [重复的径向渐变 `repeating-radial-gradient`](#%e9%87%8d%e5%a4%8d%e7%9a%84%e5%be%84%e5%90%91%e6%b8%90%e5%8f%98-repeating-radial-gradient)

<!-- /TOC -->

```html
<style>
	.linear {
		margin: 0 auto;
		width: 200px;
		height: 200px;
		background: linear-gradient(to left top, #333 50%, #eee 50%, red 80%, red 80%, green 80%);
	}
</style>
<div class="linear"></div>
```

![线性渐变](images/线性渐变.png)

第一个参数可选，为方向或角度，后面的参数指定渐变的颜色与渐变的点。
方向的可选参数：to top/right/left/bottom/角度(如 90deg)。

## 重复的线性渐变：`repeating-linear-gradient`

## 径向渐变 `radial-gradient`

```html
<style>
	.linear {
		margin: 0 auto;
		width: 300px;
		height: 200px;
		background: radial-gradient(circle, #333 50%, #eee 50%, red 80%, red 80%, green 80%);
	}
</style>
<div class="linear"></div>
```

形状可选 circle 或 ellipse，默认为椭圆 ellipse

![径向渐变](images/径向渐变.png)

## 重复的径向渐变 `repeating-radial-gradient`
