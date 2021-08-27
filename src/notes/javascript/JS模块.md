# JS 模块化

## CommonJS 模块

NodeJS 的标准模块规范，使用 `require` 用于引入其他模块代码，`module.exports` 导出模块自身内容。**在 require 同时目标模块内代码会先执行。**

## ESModule 模块

ES6 模块规范，使用 `import` 语法引入其他模块，`export` 用于导出自身内容。**import 语句会自动提升到模块代码顶部，即最先执行。会将当前模块的所有引入内容先执行后再执行自身内容。**

## CommonJS 与 ESModule 的区别

### 引入值

-   CommonJS 引入内容即 `module.exports` 对象本身的引用，外部可以做任何操作。
-   ESModule 不能修改引用（`import a` 则 a 不能做其他赋值）。

### 执行顺序

-   CommonJS 引入的模块会在 `require` 语句处执行，模块执行完成后主体再继续执行。
-   ESModule `import` 语句会提升到顶部，模块执行完成后主体开始执行。

### 重复引入和循环引入

-   CommonJS 已经引入的模块会做缓存，模块执行完成或执行暂停（又 `require` 了其他模块）时对当前执行结果进行暂存。之后若又引入该模块则直接取缓存。
-   ESModule 若模块已经经过预处理，却没有执行（即循环 `import`），则模块内预处理的 export 信息全部为`<Uninitialized>`，访问即报错未初始化。
