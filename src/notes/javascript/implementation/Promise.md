# Promise

## Promise 特性分析

### Promise 回调均为异步微任务

#### 现象

Promise 除构造器接收的函数为同步执行的外，所有通过 then（以及 catch）注册的回调均通过微任务执行。

```js
Promise.resolve().then(() => console.log(1));
console.log(2);
// 2  1
```

#### 实现思路

通过微任务 API 对回调进行包裹。微任务 API 可通过

1. queueMicrotask 注册微任务回调
2. MutationObserver 设置监听页面内容，该方法为对 IE11 的兼容处理

```js
function doMicroCallback(cb) {
	if (this.queueMicrotask) {
		queueMicrotask(function() {
			cb();
			console.log('queueMicrotask');
		});
	} else if (this.MutationObserver) {
		var mo = new MutationObserver(function() {
			cb();
			console.log('MutationObserver');
			mo.disconnect();
		});
		mo.observe(document.querySelector('body'), {
			childList: true,
		});
	} else throw new Error('cannot do microtask');
}
```

### .then 会返回一个新的 Promise

1. then 的回调函数若没有返回。新 Promise 状态为 fullfilled，值为 undefined
2. 若有返回值，值为一般值，新 Promise 状态为 fullfilled，值为返回值
3. 若返回一个 Promise，新 Promise 状态与值与之相同。
4. 回调抛出异常，新 Promise 为 rejected，原因为异常信息

```js
Promise.resolve()
	.then(() => console.log(1))
	.then(() => console.log(2));
console.log(3);
queueMicrotask(() => console.log(4));
// 3  1  4  2
```

## Promise 功能实现（含 executor、then、catch）

```js
var PENDING = 'pending', // 挂起状态
	FULLFILLED = 'fullfilled', // 已接受
	REJECTED = 'rejected'; //已拒绝

var nextTick = (this.process && this.process.nextTick) || queueMicrotask;
/*
 * 发起微任务并处理回调
 *
 * @param {Function} cb 微任务执行的主体任务，即 then 的回调
 * @param {Function} reso 转变 Promise 至接收态，该 Promise 为 then 返回的新 Promise
 * @param {Function} reje 转变 Promise 至拒绝态，该 Promise 为 then 返回的新 Promise
 * @param {any} param then 回调的参数
 */
function doMicrotask(cb, reso, reje, param) {
	// 发起微任务
	nextTick(function() {
		try {
			// cb的返回值作为当前 Promise 的 value
			reso(cb(param));
		} catch (e) {
			// cb抛出的异常为当前 Promise reject 的 reason
			reje(e);
		}
	});
}
function MyPromise(executor) {
	this.status = PENDING; // 状态
	this.value = undefined; // 值
	this.fullfilledCallback = null; // 接收态回调
	this.rejectedCallback = null; // 拒绝态回调

	try {
		// 执行执行器
		executor(this.resolve.bind(this), this.reject.bind(this));
	} catch (e) {
		// 执行器异常，拒绝
		this.reject(e);
	}
}
MyPromise.prototype.resolve = function(data) {
	// 状态只能转换一次
	if (this.status !== PENDING) return;
	this.status = FULLFILLED;
	this.value = data;
	if (this.fullfilledCallback) this.fullfilledCallback(data);
};
MyPromise.prototype.reject = function(reason) {
	// 状态只能转换一次
	if (this.status !== PENDING) return;
	this.status = REJECTED;
	if (this.rejectedCallback) this.rejectedCallback(reason);
	// 没有对应的捕获回调，直接抛出异常
	else throw reason;
};
MyPromise.prototype.then = function(onFullfill, onReject) {
	var _this = this;
	return new MyPromise(function(resolve, reject) {
		// then 注册的回调为对当前 Promise（_this） 的状态订阅，
		// 当 _this 的状态改变时，then 的 Promise 状态需要同样的变化
		_this.fullfilledCallback = doMicrotask.bind(this, onFullfill, resolve, reject);
		_this.rejectedCallback = doMicrotask.bind(this, onReject, resolve, reject);
		// 若 executor 中已经同步 resolve 或 reject，_this 的状态已经变化，直接触发回调
		if (_this.status === FULLFILLED) _this.fullfilledCallback();
		if (_this.status === REJECTED) _this.rejectedCallback();
	});
};
MyPromise.prototype.catch = function(onReject) {
	// .then 的语法糖
	return this.then(undefined, onReject);
};
```
