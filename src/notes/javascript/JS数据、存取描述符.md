# 数据、存取描述符

## JS 的描述符如下：

-   enumerable：描述该属性是否可枚举，不可枚举的属性不会被`for...in`及`Object.keys`获取，但该描述符会被`Object.getOwnPropertyNames`无视。初步定义默认为 false。
-   configurable：描述该属性的描述符能否再次修改，若为 false 再次修改会报`TypeError`，同时该属性也不可被删除（**delete 返回 false，删除失败，不报错**），默认为 false。

### 数据描述符特有：

-   value：属性值，默认 undefined。
-   writable：是否可写，为 true 时才能被赋值表达式改变（**为 false 不会影响赋值表达式左值，也不会报错**），默认 false

### 存取描述符特有：

-   get：无参函数，返回值即为属性值
-   set：接收新值作为参数的函数

若我们直接对对象对属性进行赋值，相当于设置了 value 以及 writable，enumerable，configurable：true

```js
var dd = { b: 2 };
dd.a = 1;
console.log(Object.getOwnPropertyDescriptors(dd));
// {
//   b: { value: 2, writable: true, enumerable: true, configurable: true },
//   a: { value: 1, writable: true, enumerable: true, configurable: true }
// }
```

## Object.defineProperty

接收三个参数对某一个属性进行描述符定义

-   obj，目标对象，必须为引用值，否则报错。
-   prop，属性名，可为任意 JS 值，`调用toString()后`作为属性名。
-   descriptor，必须为引用值。**获取其上的属性时会往原型链查找**。若六个属性皆无则默认数据描述符。

### Object.defineProperties

接收两个参数，obj 与`prop 与 descriptor 字典`。
