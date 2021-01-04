<!-- imageRoot:javascript -->

# JS 箭头函数与 this

<!-- TOC -->

-   [JS 箭头函数与 this](#js-%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0%e4%b8%8ethis)
    -   [JS 中的 this](#js%e4%b8%ad%e7%9a%84this)
    -   [箭头函数](#%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0)

<!-- /TOC -->

## JS 中的 this

this 是一个特殊的对象，由函数调用时传入

```js
function a() {
	console.log(this);
}

let obj = {
	id: 1,
};

a(); //输出window对象，是默认传入的
a.call(obj); //输出obj对象
```

```js
let obj = {
	id: 1,
	a() {
		console.log(this);
	},
};

obj.a(); //输出obj
a.call(obj); //输出obj
```

当函数为对象的某个变量时，函数调用将默认传入直接包含该函数的对象。

## 箭头函数

箭头函数的 this 将会固定为上层作用域的 this，无法修改。

```js
let obj = {
	f() {
		console.log(this);
		let a = () => {
			console.log(this);
		};
		a();
	},
};

obj.f();
/*输出
{ f: [Function: f] }
{ f: [Function: f] }
*/
```

```js
function foo() {
	console.log('1', this.id);
	return function() {
		// 用的是这一层的this，如果是多层箭头函数，就是最外层的this
		console.log('2', this.id);
		{
			console.log('3', this.id);
			return () => {
				console.log('4', this.id);
			};
		}
	};
}
foo.call({ id: 2 }).call({ id: 1 })();
/*输出
1 2
2 1
3 1
4 1
*/
```

通过`call`调用`foo`，因此`this`指向 2 的对象，`foo`返回的函数被`call`调用并传入 1 的对象，代码块的块级作用域只影响`let`和`const`，对`this`无影响，所以箭头函数的`this`为 1 的对象。
