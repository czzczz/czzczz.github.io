# 防抖和节流

## 防抖

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。

手段：每次触发事件时都取消之前的延时调用方法。

```js
function debounce(fn, delay, ...args) {
	let timer = null;
	return function(...rest) {
		clearTimeout(timer); //清除之前的计时器
		timer = setTimeout(() => {
			//重新计时
			fn.call(this, ...args, ...rest);
		}, delay);
	};
}
```

## 节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

手段：每次触发事件时都判断当前是否有等待执行的延时函数。

```js
function throttle(fn, delay, ...args) {
	let timer = null;
	return (...rest) => {
		if (!timer) {
			//判断是否有计时器
			timer = setTimeout(() => {
				fn.call(this, ...args, ...rest);
				clearTimeout(timer);
				timer = null;
			}, delay);
		}
	};
}
```
