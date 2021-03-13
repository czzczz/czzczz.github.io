# 深拷贝实现

## es6

要处理循环引用，同时要继承对应原型。

es6 处理循环引用可以不借助数组，而借助 `WeakMap` 对引用进行保存，保证内存健康

```js
function myDeepCopy(target) {
	const map = new WeakMap();
	function isArr(tar) {
		// 判断数组
		return {}.toString.call(tar) === '[object Array]';
	}
	function myDeepCopyInner(target) {
		// 基本类型直接返回对应的值
		if (typeof target !== 'object' || target == null) return target;
		// 一些特殊的类型，可以直接借助构造器进行深拷贝
		if (target instanceof Date) return new Date(target);
		if (target instanceof RegExp) return new RegExp(target);

		// 若有对应的引用记录，说明该引用的对象已经进行过深拷贝，返回对应的结果
		if (map.get(target)) return map.get(target);

		// 引用型的值，偷懒可以直接调用其构造器，不过不保证构造器不会报错
		let result;
		try {
			result = new target.constructor();
		} catch {
			result = isArr(target) ? [] : {};
		}
		// 记录深拷贝结果
		map.set(target, result);
		for (k in target) {
			// 遍历成员变量进行递归
			if ({}.hasOwnProperty.call(target, k)) {
				result[k] = myDeepCopyInner(target[k]);
			}
		}
		return result;
	}
	return myDeepCopyInner(target);
}
```

## es5

### 处理循环引用

处理循环引用的手段是`利用引用型变量的特点，用数组记录已经被深拷贝过的变量及其结果`

在下一次发现数组中的引用又被要求拷贝的时候，直接返回其结果的引用。

其中的重点在于数组中记录的是引用，`不可等成员都deepCopy结束再放入数组，而应该在其之前`。否则成员变量中又有上层节点的引用的话 deepCopy 就会调用栈溢出了

```js
function myDeepCopy(target) {
	var copiedArrSource = []; // 记录已经进行过深拷贝的对象引用
	var copiedArrTarget = []; // 记录已经进行过深拷贝的结果对象引用
	function isArr(tar) {
		// 判断数组
		return {}.toString.call(tar) === '[object Array]';
	}
	function myDeepCopyInner(target) {
		// 基本类型直接返回对应的值
		if (typeof target !== 'object' || target == null) return target;

		// 若有对应的引用记录，说明该引用的对象已经进行过深拷贝，返回对应的结果
		for (var i = 0; i < copiedArrSource.length; i++) {
			if (copiedArrSource[i] === target) return copiedArrTarget[i];
		}

		// 引用型的值，区分数组和对象
		var result = isArr(target) ? [] : {};
		// 记录深拷贝结果，防止循环引用，必须在递归前写入数组
		copiedArrSource.push(target);
		copiedArrTarget.push(result);
		for (k in target) {
			// 遍历成员变量进行递归
			if ({}.hasOwnProperty.call(target, k)) {
				result[k] = myDeepCopyInner(target[k]);
			}
		}
		return result;
	}
	return myDeepCopyInner(target);
}
```

### 不处理循环引用

不处理循环引用的话非常简单

```js
function isArr(tar) {
	return {}.toString.call(tar) === '[object Array]';
}
function myDeepCopy(target) {
	// 基本类型直接返回对应的值
	if (typeof target !== 'object' || target == null) return target;
	// 引用型的值，区分数组和对象
	var result = isArr(target) ? [] : {};
	for (k in target) {
		if (Object.prototype.hasOwnProperty.call(target, k)) {
			result[k] = myDeepCopy(target[k]);
		}
	}
	return result;
}
```
