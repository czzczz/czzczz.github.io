# JS 面向对象

JS 的面向对象是基于`原型`的面向对象，继承关系基于`原型链`。

-   `prototype`：JavaScript 中每个函数都有一个 prototype 属性，此属性指向了该函数的原型对象。
-   `__proto__`：JavaScript 中每一个对象（null 除外），包括函数创建的对象、函数自身、原型对象，都有一个**proto**属性，指向了创建该对象的函数的原型。
-   `constructor`：该属性属于原型对象，指向相关的构造函数。

## JS 函数对象

```js
function F() {}
var f = new F();
F.prototype; // {constructor: ƒ}
f.__proto__; // {constructor: ƒ}
F.prototype === f.__proto__; // true
F.prototype.constructor === F; // true

F.__proto__; // ƒ () { [native code] }
F.prototype.__proto__; // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
F.__proto__ === Function.prototype; // true
F.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__; // null
```

首先，F 作为一个函数的同时它也是对象，所以它拥有属性**proto**指向了 Function.prototype，因为所有的函数都可以理解为 Function 的实例；

同样的，F.prototype 作为一个对象，它的**proto**指向 Object.prototype，因为它是对象且没有指明的构造函数，所以它直接是 Object 函数生成的实例，自然**proto**就指向 Object.prototype。

## 继承实例

```js
function fa() {
	this.a = 'a';
}
function fb() {
	this.b = 'b';
}
function fc() {
	this.c = 'c';
}
fb.prototype = new fa();
fc.prototype = new fa();
let b = new fb();
let c = new fc();
console.log(b.a, c.a); // a a
b.__proto__.a = 'ba';
console.log(b.a, c.a); // ba a
fc.prototype = fb.prototype;
console.log(b.a, c.a); // ba a
console.log(b.__proto__ === fb.prototype); //true
console.log(c.__proto__ === fc.prototype); //false
c = new fc();
b.a = 'bba';
console.log(b.a, c.a, b.__proto__, b.__proto__ === c.__proto__); //bba ba fa { a: 'ba' } true
```

# Object.create

将提供的参数作为创建对象的原型并创建一个新的对象

参数：

1. proto，原型对象，会被直接用作新对象的**proto**；
2. propertiesObject，属性对象，上面的属性会成为新对象的属性。

**若 proto 为 null，那么新创建的 Object 将没有原型，`这也是唯一的创建无原型对象的方法`**
