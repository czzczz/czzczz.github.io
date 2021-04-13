# JS 遍历对象

## for...in

通过获取对象的全部 key 对对象进行遍历，以任意顺序遍历一个对象的除`Symbol`以外的`可枚举属性`

-   遍历的 key 顺序不定
-   全部 key 包括原型链上继承的 key
-   若传入的的目标为基础数据类型，不会执行内部语句，**若目标为 string，string 会被作为字符数组遍历（即获取 index）**
-   [可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)

```js
for (var key in target) {
	console.log(key, target[key]);
}
```

## Object.keys

接收一个参数并返回该参数的除`Symbol`以外的`可枚举属性`

-   遍历的 key 顺序不定
-   全部 key 只包括对象自身的，不包括继承的
-   若传入的的目标为基础数据类型，返回空数组，**若目标为 null 或 undefined 会报 TypeError**

```js
console.log(Object.keys(target));
```

## for...of

根据`可迭代协议`对对象进行迭代。

-   须目标符合可迭代协议，否则报 TypeError。

```js
for (const val of [1, 2, 3]) {
	console.log(val);
}
```

## for await (val of target)

for await...of 与 for...of 类似，须配合`异步迭代协议`，同时`与 await 语句一样只能在 async 函数中使用`。

-   本身遍历对象跟 await 一样可以是同步对象也可以是 PromiseLike 异步[async,await](/#/notes/javascript/Promise.md)
-   若为 `PromiseLike` 其后跟随的代码块内容会在 `resolve之后` 执行

## for (var i = 0; i < max; i++) {}

基本 for 循环。需要注意的是若 i 通过 var 定义，会作为外部变量，因此代码块内存在异步代码需要对该情况作处理

```js
for (var i = 0; i < 10; i++) setTimeout(() => console.log(i)); // 打印结果并非0-9，而是10个10
```

let 声明会生成块级作用域解决此问题

若无法使用 let 也可使用立即执行函数（当然也可是普通函数，我在放屁）覆盖外部作用域的 i

```js
for (var i = 0; i < 10; i++)
	(function(i) {
		setTimeout(() => console.log(i));
	})(i);
```
