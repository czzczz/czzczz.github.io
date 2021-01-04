<!-- imageRoot:javascript -->

# JS 数据类型

<!-- TOC -->

-   [JS 数据类型](#js数据类型)
    -   [Js 基本数据类型](#js基本数据类型)
        -   [number](#number)
            -   [解决精度丢失](#解决精度丢失)
        -   [bigint](#bigint)
            -   [bigint 一些问题](#bigint一些问题)
            -   [bigint 适用范围](#bigint-适用范围)
    -   [JS 数据类型检测](#js-数据类型检测)
        -   [typeof](#typeof)
        -   [instanceof](#instanceof)
            -   [通过 instanceof 判断基本类型](#通过instanceof判断基本类型)
    -   [数据类型转换](#数据类型转换)
        -   [`'=='`与`'==='`](#与)
        -   [对象转原始类型是根据什么流程运行的？](#对象转原始类型是根据什么流程运行的)

<!-- /TOC -->

## Js 基本数据类型

1. boolean
2. null
3. undefined
4. number
5. string
6. bigint
7. Symbal

此外还有引用型变量：如 Object、Function

### number

JS 中的 number 采用 64 位浮点数的形式编码，因此会有小数精度丢失的问题。于是出现了经典的 `0.1 + 0.2 === 0.30000000000000004` 问题。

#### 解决精度丢失

1. NPM 上有许多支持 JavaScript 和 Node.js 的数学库，比如 math.js，decimal.js,D.js 等等。
2. toFixed()方法，将数据舍入到指定位数，不可靠，需要重写。
3. ES6 在 Number 对象上新增了一个极小的常量——Number.EPSILON。引入一个这么小的量，目的在于为浮点数计算设置一个误差范围，如果误差能够小于 Number.EPSILON，我们就可以认为结果是可靠的。

### bigint

用于弥补 number 导致的大整数精度下降问题，确切地说，JS 中的 Number 类型只能安全地表示-9007199254740991(-(2^53-1))和 9007199254740991（(2^53-1)），任何超出此范围的整数值都可能失去精度。

```js
10n + 20n; // → 30n
10n - 20n; // → -10n
+10n; // → TypeError: Cannot convert a BigInt value to a number
-10n; // → -10n
10n * 20n; // → 200n
20n / 10n; // → 2n
23n % 10n; // → 3n
10n ** 3n; // → 1000n

const x = 10n;
++x; // → 11n
--x; // → 9n
console.log(typeof x); //"bigint"
```

#### bigint 一些问题

1. BigInt 不支持一元加号运算符, 这可能是某些程序可能依赖于 + 始终生成 Number 的不变量，或者抛出异常。另外，更改 + 的行为也会破坏 asm.js 代码。
2. 因为隐式类型转换可能丢失信息，所以不允许在 bigint 和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由 BigInt 或 Number 精确表示。
3. 不能将 BigInt 传递给 Web api 和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报 TypeError 错误。
4. 当 Boolean 类型与 BigInt 类型相遇时，BigInt 的处理方式与 Number 类似，换句话说，只要不是 0n，BigInt 就被视为 truthy 的值。
5. 元素都为 BigInt 的数组可以进行 sort。
6. BigInt 可以正常地进行位运算，如|、&、<<、>>和^

#### bigint 适用范围

目前只有 chrome67、firefox、Opera 这些主流实现，要正式成为规范，其实还有很长的路要走。

## JS 数据类型检测

### typeof

对于原始类型来说，除了 null 为"object"都可以调用 typeof 显示正确的类型。

```js
typeof 1; // 'number'
typeof '1'; // 'string'
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'
```

但对于引用数据类型，除了函数"function"之外，都会显示"object"。

```js
typeof []; // 'object'
typeof {}; // 'object'
typeof console.log; // 'function'
```

### instanceof

基于原型链检查，只要原型链上有即为 true。

#### 通过 instanceof 判断基本类型

自定义 Symbal.hasInstance 方法：

```js
class PrimitiveNumber {
	static [Symbol.hasInstance](x) {
		return typeof x === 'number';
	}
}
console.log(111 instanceof PrimitiveNumber); // true
```

手动实现 instanceof 的功能，逐步向上查找直至找到或者到顶（null）

```js
function myInstanceof(left, right) {
	//基本数据类型直接返回false
	if (typeof left !== 'object' || left === null) return false;
	//getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
	let proto = Object.getPrototypeOf(left);
	while (true) {
		//查找到尽头，还没找到
		if (proto == null) return false;
		//找到相同的原型对象
		if (proto == right.prototype) return true;
		proto = Object.getPrototypeof(proto);
	}
}
```

## 数据类型转换

JS 数据类型转换分三种：

1. 转换成数字
2. 转换成布尔值
3. 转换成字符串

![JS类型转换](images/js数据类型转换.jpg)

[参考图源](https://juejin.im/post/5dac5d82e51d45249850cd20#heading-1)

### `'=='`与`'==='`

===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1'===1 的结果是 false，因为一边是 string，另一边是 number。

==不像===那样严格，对于一般情况，只要值相等，就返回 true，但==还涉及一些类型转换，它的转换规则如下：

-   两边的类型是否相同，相同的话就比较值的大小，例如 1==2，返回 false
-   判断的是否是 null 和 undefined，是的话就返回 true
-   判断的类型是否是 String 和 Number，是的话，把 String 类型转换成 Number，再进行比较
-   判断其中一方是否是 Boolean，是的话就把 Boolean 转换成 Number，再进行比较
-   如果其中一方为 Object，且另一方为 String、Number 或者 Symbol，会将 Object 转换成字符串，再进行比较

### 对象转原始类型是根据什么流程运行的？

象转原始类型，会调用内置的`[ToPrimitive]`函数，对于该函数而言，其逻辑如下：

1. 如果`Symbol.toPrimitive()`方法，优先调用再返回
2. 调用`valueOf()`，如果转换为原始类型，则返回
3. 调用`toString()`，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错

```js
var obj = {
	value: 3,
	valueOf() {
		return 4;
	},
	toString() {
		return '5';
	},
	[Symbol.toPrimitive]() {
		return 6;
	},
};
console.log(obj + 1); // 输出7
```
