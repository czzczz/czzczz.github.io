# css3 背景渐变色

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

## 径向渐变可用于实现卡片缺口

**实现的缺口其实是背景图的一部分，因此 box-shadow 不会计算空白区域从而导致阴影位置异常，若需要阴影可能需要再设置两个圆形元素设置颜色来补齐阴影的缺口**

```css
.child {
	width: 100%;
	height: 100%;
	/*以 21px  22px 的位置一个 20px 15px的椭圆为中心进行渐变*/
	background: radial-gradient(ellipse 20px 10px at 21px 22px, , , rgba(0, 0, 0, 0) 30px, #fff 30px);
	border-radius: 20px;
}
```

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

### 径向渐变实现卡券效果（带阴影）

```css
.card {
	margin: 50px;
	width: 200px;
	height: 200px;
	background-image: radial-gradient(circle at left 30%, transparent 10px, red 10px), radial-gradient(circle at right
				30%, transparent 10px, red 10px);
	background-position: left 0, right 0;
	background-size: 50% 100%, 50% 100%;
	background-repeat: no-repeat, no-repeat;
	filter: drop-shadow(3px 5px 4px #666);
}
```

![卡券缺口特效](images/卡券缺口特效.png)

## 重复的径向渐变 `repeating-radial-gradient`
