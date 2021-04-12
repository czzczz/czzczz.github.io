# Iterator 迭代器

迭代器用于自定义一个可被 `for...of` 遍历的的对象。其需要遵守两个协议
[可迭代协议(iterable)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
与
[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)

## 可迭代协议

一个对象要符合可迭代协议，需要本身实现`@@iterator`方法，可通过`[Symbol.iterator]`访问。该方法**没有参数**，同时返回一个满足`迭代器协议`的对象

当JS通过`for...of`遍历一个对象时，不带参数调用对应的`@@iterator`方法，并获取对应的迭代器对象来处理数据。

-  `@@iterator`方法可以是普通方法也可以是生成器(Generator)方法
-  函数内部的this指向对象本身，依旧遵守谁调用this就是谁的策略

## 迭代器协议

迭代器定义了遍历过程中一个`任意对象`生成一组系列值用于引擎读取的标准规范。若系列值为有限个数，那么迭代完成后会返回一个默认值(`{ done: true, value: undefined }`)。

实现迭代器需要对象本身拥有`next`方法
1.  next为无参函数
2.  next须返回一个带有`done`和`value`字段的对象（done为true时value可以省略），否则遍历会抛出 TypeError 异常
3.  若对象迭代已经完成为true，否则为false
4.  遍历方法取到的值，可为任意JS值
