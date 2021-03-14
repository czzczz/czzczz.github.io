# 函数方法 call、apply、bind

## call

1. call 可以接收若干个参数。第一个为 thisArg，后续其他为函数本身的参数列表。
2. 若没有指定 thisArg，默认为 window，若为基础类型则要用包装类包裹。

**实现方案：利用 js 的函数在何处执行则 this 指向何处的特性，把目标函数放到对应的 thisArg 对象上执行，执行后删除**

```js
Function.prototype.myCall = function() {
	var _ctx = arguments.length > 0 ? Object(arguments[0]) : window, // 如果是基础类型做this，必须用包装类
		_args = [];
	for (var i = 1; i < arguments.length; i++) {
		// eval 执行js字符串时要用的参数
		_args.push('arguments[' + i + ']');
	}
	_ctx.__proto__._myCallFn = this;
	var _res = eval('_ctx._myCallFn(' + _args + ')');
	delete _ctx.__proto__._myCallFn;
	return _res;
};
```

## apply

apply 的实现大体与 call 相同，但是由于接受的不是参数列表而是一个数组作为参数，所以 apply 需要对参数做检查

1. args 为空的话视为参数为空，但是不会报错
2. args 为非引用变量需要抛出异常
3. args 为引用型变量但是不是数组，视为参数为空

```js
Function.prototype.myApply = function(ctx, args) {
	var _ctx = ctx ? Object(ctx) : window,
		_args = [];
	if (args == null)
		// 参数为空，不会报错
		args = [];
	else if (typeof args !== 'object' && typeof args !== 'function')
		// 基础类型需要抛出异常
		throw new TypeError('CreateListFromArrayLike called on non-object');
	else if ({}.toString.call(args) !== '[object Array]')
		// 为对象或其他引用变量，不接受
		args = [];
	for (var i = 0; i < args.length; i++) {
		_args.push('args[' + i + ']');
	}
	_ctx.__proto__._myCallFn = this;
	var _res = eval('_ctx._myCallFn(' + _args + ')');
	delete _ctx.__proto__._myCallFn;
	return _res;
};
```

## bind

1. ctx 为空，则设置为 window，否则对该值的包装对象
2. 返回一个新的函数
3. 新的函数内部已经用闭包记录了 bind 时预先填充的参数
4. 新的函数可被正常的用作构造器

```js
Function.prototype.myBind = function(ctx) {
	var _ctx = ctx != null ? Object(ctx) : window,
		_fn = this, // 记录原函数
		_argsPrev = [].slice.apply(arguments, [1]); // 记录 bind 的参数
	var _newFn = function() {
		var _trueCtx =
				this instanceof _newFn // 判断 this 是否是结果函数的实例
					? this // 当前正在进行 new 操作，需要传递正确的 this 指向
					: _ctx, // 普通调用，直接使用 bind 的 this 指向
			_args = _argsPrev.concat([].slice.apply(arguments)); // 拼接 bind 过程与调用过程的参数
		return _fn.apply(_trueCtx, _args);
	};
	// 使用同样的原型
	_newFn.prototype = _fn.prototype;
	return _newFn;
};
```
