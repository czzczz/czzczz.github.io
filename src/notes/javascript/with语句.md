# JS 中的 with 语句

with 语句，用于扩展一个语句的作用域链。

**`with` 会在 strict 中被禁止，不建议使用**

```js
with (exp) {
	statement;
}
```

-   `exp` 将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。
-   `statement` 即要执行的表达式。

## with 的优劣

优点：

1. with 语句可以在不造成性能损失的情況下，减少变量的长度（减少了指针地址查询的消耗，用变量缓存一下目标值也有同样的效果）。**with 也会查原型链。**

### 使用实例

使用 with 来解构 `Math` 对象，其中`PI,cos,sin`都是 `Math` 上的成员。

```js
var a, x, y;
var r = 10;

with (Math) {
	a = PI * r * r;
	x = r * cos(PI);
	y = r * sin(PI / 2);
}
```

缺点：

1. 查找性能：with 会将 `exp` 作为作用域的顶层。程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。`statement` 中的变量最好都是 `exp` 中的成员。
2. 语义不明：难以排查对应的变量具体来源，且难以实现兼容。若`exp`在新版本中扩展了新的成员，会导致上层作用域原本调用的变量被覆盖导致查找失败。

### 语义不明实例

如果是在 `ES5` 环境调用 `f([1,2,3], obj)`，则 with 语句中变量 `values` 将指向函数的第二个参数 `values`。但是，`ES6` 标准给 `Array.prototype` 添加了一个新属性 `values`，所有数组实例将继承这个属性。所以在 `ES6` 环境中，with 语句中变量 `values` 将查找原型链并指向 `[1,2,3].values`。

```js
function f(foo, values) {
	with (foo) {
		console.log(values);
	}
}
```
