# Promise

## Promise 特性分析

详见 外部的 Promise 特性分析
[Promise 特性分析](/#/notes/javascript/Promise.md)

## Promise then catch 代码实现

**由于异步通过 nextTick 等功能实现，因此 MyPromise 可以跟 Promise 混用，但是执行顺序有一定区别**

```js
(function(w) {
	var PENDING = 'pending', // 挂起状态
		FULLFILLED = 'fullfilled', // 已接受
		REJECTED = 'rejected'; //已拒绝

	var nextTick = (this.process && this.process.nextTick) || this.queueMicrotask;

	var statusSymbol = this.Symbol ? this.Symbol('myPromiseStatus') : 'myPromiseStatus',
		valueSymbol = this.Symbol ? this.Symbol('myPromiseValue') : 'myPromiseValue',
		onFullfilledCallbackSymbol = this.Symbol ? this.Symbol('onFullfilledCallback') : 'onFullfilledCallback',
		onRejectedCallbackSymbol = this.Symbol ? this.Symbol('onRejectedCallback') : 'onRejectedCallback';

	w.MyPromise = function MyPromise(executor) {
		this[statusSymbol] = PENDING; // 状态位
		this[valueSymbol] = undefined; // 结果
		this[onFullfilledCallbackSymbol] = null; // 接收态回调
		this[onRejectedCallbackSymbol] = null; // 拒绝态回调

		var _this = this;
		function resolve(value) {
			//用于传给executor的接收函数
			if (_this[statusSymbol] !== PENDING) return;
			_this[statusSymbol] = FULLFILLED;
			_this[valueSymbol] = value;
			if (_this[onFullfilledCallbackSymbol]) _this[onFullfilledCallbackSymbol]();
		}
		function reject(reason) {
			//用于传给executor的拒绝函数
			if (_this[statusSymbol] !== PENDING) return;
			_this[statusSymbol] = REJECTED;
			_this[valueSymbol] = reason;
			if (_this[onRejectedCallbackSymbol]) _this[onRejectedCallbackSymbol]();
			else throw reason;
		}

		try {
			executor(function(value) {
				// 递归处理嵌套 PromiseLike 值
				resolvePromise(_this, value, resolve, reject);
			}, reject);
		} catch (e) {
			reject(e);
		}
	};

	MyPromise.prototype.then = function(onFullfilled, onRejected) {
		onFullfilled = // 填充默认值，没有接收直接往下一次then传递
			typeof onFullfilled === 'function'
				? onFullfilled
				: function(v) {
						return v;
				  };
		onRejected = // 填充默认值，没有接收直接往下一次then传递
			typeof onRejected === 'function'
				? onRejected
				: function(r) {
						throw r;
				  };
		var _this = this;
		var promise2 = new MyPromise(function(resolve, reject) {
			// 新的Promise
			function callFn(cb) {
				// 调用then的回调
				nextTick(function() {
					// 异步调用
					try {
						var x = cb(_this[valueSymbol]); // 获取回调返回值
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			}
			if (_this[statusSymbol] === FULLFILLED) callFn(onFullfilled);
			// 判断状态是否已经变化
			else if (_this[statusSymbol] === REJECTED) callFn(onRejected);
			else {
				// 状态还没变化，先注册回调
				_this[onFullfilledCallbackSymbol] = function() {
					callFn(onFullfilled);
				};
				_this[onRejectedCallbackSymbol] = function() {
					callFn(onRejected);
				};
			}
		});
		return promise2;
	};
	MyPromise.prototype.catch = function(onRejected) {
		// then 语法糖
		return this.then(null, onRejected);
	};

	MyPromise.prototype.finally = function(onFinally) {
		// then 语法糖
		return this.then(onFinally, onFinally);
	};

	function resolvePromise(promise2, x, resolve, reject) {
		// 判断 then 回调返回结果的函数
		if (promise2 === x) throw 'Promise2 cannot be x'; // 不可链式的把已定义的 Promise 作为 then 的返回值

		var called = false; // flag判断，resolve和reject不可重复执行

		if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
			// 判断PromiseLike，是则递归then，不是则直接resolve
			try {
				var then = x.then;
				if (typeof then === 'function') {
					//判断PromiseLike
					then.call(
						x,
						function(y) {
							if (called) return;
							// 递归.then直到获取到非PromiseLike值
							called = true;
							resolvePromise(promise2, y, resolve, reject);
						},
						function(r) {
							if (called) return;
							called = true;
							reject(r);
						},
					);
				} else resolve(x);
			} catch (e) {
				if (called) return;
				called = true;
				reject(e);
			}
		} else resolve(x);
	}
})(window);
```

## Promise.resolve（rejecct）

```js
MyPromise.resolve = function(value) {
	return new MyPromise(function(resolve) {
		resolve(value);
	});
};
MyPromise.reject = function(reason) {
	return new MyPromise(function(resolve, reject) {
		reject(reason);
	});
};
```

## Promise.all

```js
MyPromise.all = function(iterable) {
	var _len = iterable.length, // 数组长度
		_endCount = 0, // 记录整个数组处理完成的数量
		_res = []; // 结果
	return new MyPromise(function(resolve, reject) {
		for (var p = 0; p < _len; p++) {
			(function(idx, el) {
				function resolveEl(el, resolve, reject) {
					// 递归获取PromiseLike的值
					try {
						if (
							((typeof el === 'object' && el !== null) || typeof el === 'function') &&
							typeof el.then === 'function'
						) {
							el.then(function(y) {
								resolveEl(y, resolve, reject);
							});
						} else resolve(el);
					} catch (e) {
						reject(e);
					}
				}
				resolveEl(
					el,
					function(res) {
						_res[idx] = res;
						_endCount++;
						if (_endCount === _len) resolve(_res); // 整个数组都处理完成了，all resolve
					},
					function(r) {
						reject(r); // 任意一个成员处理失败，抛出异常
					},
				);
			})(p, iterable[p]); // 作用域隔离
		}
	});
};

MyPromise.all([
	1,
	2,
	new MyPromise(resolve => resolve(3)),
	new MyPromise(resolve => resolve(4)),
	// new MyPromise((resolve, reject) => reject(5)),
]).then(res => {
	console.log(res);
});
```
