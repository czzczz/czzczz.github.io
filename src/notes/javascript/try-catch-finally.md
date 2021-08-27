# JS 中的 Try-Catch-Finally

## 基本使用

try...catch 语句标记要尝试的语句块，并指定一个出现异常时抛出的响应。

若 try 中的代码抛出异常，则 catch 中的代码将会执行

```js
try {
	// doSth
} catch (e) {
	console.log(e);
	// 万一这里又异常，那么需要嵌套try
}
```

## finally

与 Promise 的 `finally` 类似。不论 try 中的代码是否执行成功，finally 中的代码均会在 try 执行完成后执行。

** 若同时有 catch 代码要执行，那么 finally 最后执行 **

```js
try {
	// doSth
} catch (e) {
	console.log(e);
} finally {
	console.log('finally');
}
```

## try 代码块嵌套

**任何给定的异常只会被离它最近的封闭 catch 块捕获一次。**

```js
try {
	try {
		throw new Error('oops');
	} finally {
		// 如果这里catch了，外部catch不到，如果这里catch了但catch内部又异常，外部可catch到
		console.log('finally');
	}
} catch (ex) {
	console.error('outer', ex.message);
}
// Output:
// "finally"
// "outer" "oops"
```

## try-catch-finally 中 的 return

如果是函数中的 try 代码块中有 return，那么遵循以下的优先度返回

1.  若 finally 中有 return，等`try-catch-finally`中所有代码执行完成后函数返回
2.  若 catch 中有 return，等`try-catch-finally`中所有代码执行完成后函数返回
3.  若 try 中有 return，等`try-catch-finally`中所有代码执行完成后函数返回

```js
function a() {
	try {
		console.log(1);
		return b();
	} catch {
		console.log(5);
		return 6;
	} finally {
		console.log(3);
	}
}
function b() {
	console.log(4);
	throw new Error(2);
}
// 1,4,5,3
// 函数返回： 6
```
