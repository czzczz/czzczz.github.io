# JS 中的Try-Catch-Finally

## 基本使用

try...catch语句标记要尝试的语句块，并指定一个出现异常时抛出的响应。

若try中的代码抛出异常，则catch中的代码将会执行

```js
try {
	// doSth
} catch (e) {
	console.log(e)
	// 万一这里又异常，那么需要嵌套try
}
```

## finally

与Promise的 `finally` 类似。不论try中的代码是否执行成功，finally中的代码均会在try执行完成后执行。

** 若同时有catch代码要执行，那么finally最后执行 **


```js
try {
	// doSth
} catch (e) {
	console.log(e)
} finally {
	console.log('finally')
}
```

## try代码块嵌套

**任何给定的异常只会被离它最近的封闭 catch 块捕获一次。**

```js
try {
  try {
    throw new Error("oops");
  }
  // 如果这里catch了，外部catch不到，如果这里catch了但catch内部又异常，外部可catch到
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}
// Output:
// "finally"
// "outer" "oops"
```

## try-catch-finally中 的 return

如果是函数中的try代码块中有return，那么遵循以下的优先度返回

1.   若finally中有return，等`try-catch-finally`中所有代码执行完成后函数返回
2.   若catch中有return，等`try-catch-finally`中所有代码执行完成后函数返回
2.   若try中有return，等`try-catch-finally`中所有代码执行完成后函数返回

```js
function a() {
    try {
        console.log(1);
        return b();
    } catch {
        console.log(5)
        return 6
    } finally {
        console.log(3)
    }
}
function b() {
    console.log(4);
    throw new Error(2)
}
// 1,4,5,3
// 函数返回： 6
```
