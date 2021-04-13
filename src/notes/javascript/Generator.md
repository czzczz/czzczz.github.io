# Generator 生成器

## generator function(function\* 语法)

定义一个生成器函数。
[function\*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

-   生成器函数内直接 return 的话会直接把生成器状态置为 done
-   生成器函数不可作为构造器，会报 TypeError

```js
function* generator(i) {
	yield i;
	yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20
```

## Generator 对象

生成器对象，同时也是符合迭代器规范的对象

-   next 方法与标准的迭代器 next 不同，可以接收一个参数作为`上一次yeild语句的值`。即该参数会被赋给上一次 yeild 语句的左值（若有的话）

```js
function* gen() {
	yield 10;
	x = yield 'foo';
	yield x;
}

var gen_obj = gen();
console.log(gen_obj.next()); // 执行 yield 10，返回 10
console.log(gen_obj.next()); // 执行 yield 'foo'，返回 'foo'
console.log(gen_obj.next(100)); // 将 100 赋给上一条 yield 'foo' 的左值，即执行 x=100，返回 100
console.log(gen_obj.next()); // 执行完毕，value 为 undefined，done 为 true
```

## yeild\* 语句

yeild\*语句代表`当前迭代目标会暂停`，将迭代过程`移交`给后面跟随的表达式

-   后面跟随的表达式必须可迭代

```js
function* anotherGenerator(i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}

function* generator(i) {
	yield i;
	yield* anotherGenerator(i); // 移交执行权
	yield i + 10;
}

var gen = generator(10);
console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

通过 yeild\*来对多维数组进行平铺

```js
function* iterArr(arr) {
	// 依然是数组，递归
	if (Array.isArray(arr)) {
		for (let i = 0; i < arr.length; i++) {
			yield* iterArr(arr[i]); // (*)递归
		}
	} else {
		// 直接返回
		yield arr;
	}
}
var arr = ['a', ['b', 'c'], [['d', 'd2'], 'e']];
var gen = iterArr(arr);
arr = [...gen];
console.log(arr); // ["a", "b", "c", "d", "d2", "e"]
```
