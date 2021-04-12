# Generator 生成器

## generator function(function* 语法)

定义一个生成器函数。
[function*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

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
