# JS 遍历

## 对于对象的遍历

### for...in

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

### Object.keys

接收一个参数并返回该参数的除`Symbol`以外的`可枚举属性`

-   遍历的 key 顺序不定
-   全部 key 只包括对象自身的，不包括继承的
-   若传入的的目标为基础数据类型，返回空数组，**若目标为 null 或 undefined 会报 TypeError**

```js
console.log(Object.keys(target));
```

### Reflect.ownKeys

返回一个由目标对象自身的属性键组成的数组。它的返回值等同于`Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。

忽略 enumerable 描述符

### Object.getOwnProperties

接收一个参数并返回该参数的除`Symbol`以外的属性，忽略 enumerable 描述符

```js
console.log(Object.getOwnProperties(target));
```

### for...of

根据`可迭代协议`对对象进行迭代。

-   须目标符合可迭代协议，否则报 TypeError。

```js
for (const val of [1, 2, 3]) {
	console.log(val);
}
```

### for await (val of target)

for await...of 与 for...of 类似，须配合`异步迭代协议`，同时`与 await 语句一样只能在 async 函数中使用`。

-   本身遍历对象跟 await 一样可以是同步对象也可以是 PromiseLike 异步[async,await](/#/notes/javascript/Promise.md)
-   若为 `PromiseLike` 其后跟随的代码块内容会在 `resolve之后` 执行

### for (var i = 0; i < max; i++) {}

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

## 数组

JS 内置的引用类型，可用于存放一组结构化的数据

1.  含有属性 length 以及其它原型上的属性及方法。
2.  toString 行为默认为：对内部所有元素执行一次 toString 后将结果用`","`拼接。
3.  数组 length 是一个可写的属性，通过设置 length 属性将改变数据实际长度（数组的长度重定义有兼容区别，IE9）
    -   若 length 设置的长度比原值小，数据将被裁剪，后边的元素会被抛弃。
    -   若比原值大，那么数组将被填充。新增的位置视为 `empty 值`。
4.  数组的 `empty 值`并非实际的数据值，而是描述**数组长度覆盖了该键的位置但数组并不拥有该键**，hasOwnProperty 会返回 false。
5.  数组可以直接通过访问键的方式设置不同位置的值。
    -   若设置值的键名为自然数（大于等于 0 且是整数）且超出当前数组长度，数组的 length 将会被改写，当然其它位置会被填充为 empty。

### 数组扩展方法

数组的遍历除了使用对象通用方式进行外，还可使用[数组的扩展方法](/#/notes/javascript/implementation/array/数组扩展方法.md)，不过兼容问题比较严重。

## 类数组

结构和字段类似数组的其它对象统称为类数组（`arrayLike`）

### Array.from

可以将类数组以及可迭代对象转为数组。
参数：

-   arrayLike，目标对象遵循一些条件
    1.  不能是 null,undefined,number,boolean。
    2.  string 会作为迭代目标将每个字符转为数组的一项。
    3.  目标对象没有 length，或 length 不是自然数，length 被置为 0，即必定返回空数组。
    4.  目标对应位置没有属性不会作为 `empty 值`，而会被填充 `undefined`。
    5.  符合迭代协议的对象即遵循迭代遍历规范依次放入数组。
-   mapFn，map 的回调，可以对每个元素执行 map 回调后再转为新数组
-   thisArg，map 回调的 this 指向
