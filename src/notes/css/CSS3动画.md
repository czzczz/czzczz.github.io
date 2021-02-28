# CSS3 动画相关

## transform 变换

用来向元素应用各种 2D 和 3D 转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜等操作。

transform 会用到的方法：

1. none: 定义不进行转换。
2. matrix(n,n,n,n,n,n): 定义 2D 转换，使用六个值的矩阵。
3. matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n): 定义 3D 转换，使用 16 个值的 4x4 矩阵。
4. translate(x,y): 定义 2D 位移转换。
5. translate3d(x,y,z): 定义 3D 位移转换。
6. translateX(x): 定义位移转换，只是用 X 轴的值。
7. translateY(y): 定义位移转换，只是用 Y 轴的值。
8. translateZ(z): 定义 3D 位移转换，只是用 Z 轴的值。
9. scale(x,y): 定义 2D 缩放转换。
10. scale3d(x,y,z): 定义 3D 缩放转换。
11. scaleX(x): 通过设置 X 轴的值来定义缩放转换。
12. scaleY(y): 通过设置 Y 轴的值来定义缩放转换。
13. scaleZ(z): 通过设置 Z 轴的值来定义 3D 缩放转换。
14. rotate(angle): 定义 2D 旋转，在参数中规定角度。
15. rotate3d(x,y,z,angle): 定义 3D 旋转。
16. rotateX(angle): 定义沿着 X 轴的 3D 旋转。
17. rotateY(angle): 定义沿着 Y 轴的 3D 旋转。
18. rotateZ(angle): 定义沿着 Z 轴的 3D 旋转。
19. skew(x-angle,y-angle): 定义沿着 X 和 Y 轴的 2D 倾斜转换。
20. skewX(angle): 定义沿着 X 轴的 2D 倾斜转换。
21. skewY(angle): 定义沿着 Y 轴的 2D 倾斜转换。
22. perspective(n): 为 3D 转换元素定义透视视图。

-   Internet Explorer 10、Firefox、Opera 支持 transform 属性。
-   Internet Explorer 9 支持替代的 -ms-transform 属性（仅适用于 2D 转换）。
-   Safari 和 Chrome 支持替代的 -webkit-transform 属性（3D 和 2D 转换）。
-   Opera 只支持 2D 转换。

## transition 过渡动画

该特性分四个属性：

1. transition-property: 规定应用过渡的 CSS 属性的名称。
2. transition-duration: 规定完成过渡效果需要多长时间。
3. transition-timing-function: 规定过渡效果的时间曲线，默认是”`ease`”，还有`linear`、`ease-in`、`ease-out`、`ease-in-out`和`cubic-bezier`等过渡类型。
4. transition-delay: 规定过渡效果何时开始，默认是 0。

或者说简写属性如`'transition: all 0.3s ease-in-out 0s'`。

## animation 动画

通过设定`keyframes`关键帧来设定一段动画开始到结尾的效果。

animation 为一个简写属性，对应的属性有六个：

1. animation-name：动画的名字，即 keyframes 的名字
2. animation-duration：动画持续时间
3. animation-timing-function：规定过渡效果的时间曲线，默认是”ease”，还有 linear、ease-in、ease-out、ease-in-out 和 cubic-bezier 等过渡类型。
4. animation-delay：规定过渡效果何时开始，默认是 0。
5. animation-iteration-count：规定动画应该播放的次数，值可以为次数`n`或`infinite`。
6. animation-direction：规定是否应该轮流反向播放动画，`normal`代表正常播放，`alternate`代表来回播放。

简写属性 animation，如`'animation: MyAnimation 1.5s ease-in-out 0s infinite alternate;'`。

### keyframes 关键帧

例子：`from`和`to`分别对应`0%`和`100%`

```css
@keyframes MyAnimation {
	from {
		height: 300px;
	}
	33% {
		height: 250px;
	}
	50% {
		height: 275px;
	}
	to {
		height: 150px;
	}
}
```
