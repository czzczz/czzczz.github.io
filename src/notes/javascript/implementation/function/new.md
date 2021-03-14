# 对构造函数的 new 操作实现

## new 的特点

1. 接收一个构造器以及对应构造器的若干参数
2. 会返回一个 new 的结果对象，该对象是经过构造器处理过的
3. 若构造器返回一个自定义的引用型变量，则 new 的结果也是该变量，否则才是 new 中指定的带有原型链的对象（传给构造器的 this）

```js
function myNew(con, args) {
	if (typeof con !== 'function') throw new TypeError('con is not a constructor');
	if (args == null) args = [];
	else if ({}.toString.call(args) !== '[object Array]') args = [args];
	var _this = {
		__proto__: con.prototype, // 继承原型
	};
	var _newObj = con.apply(_this, args); // 把 this 替换成新对象调用目标构造器
	// 若构造器返回了一个引用型变量则直接将该对象作为 new 的结果
	if ((typeof _newObj === 'object' && _newObj != null) || typeof _newObj === 'function') return _newObj;
	return _this; // 否则返回构造器处理过的 _this 对象
}
```
