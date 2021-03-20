# JS 中的 Promise，async await

## Promise 特性分析

1. Promise 构造函数接收一个函数（executor），该函数接收两个参数 resolve 和 reject 并且在构造器中同步执行
2. executor 不应该返回一个 Promise
3. executor 中执行的代码如果抛出异常，该异常会被 Promise catch 并转为拒绝态
4. Promise 可以通过 then 传入回调函数，该回调函数会在 Promise 状态转换时执行，参数为 Promise resolve 或 reject 的值
5. Promise then 注册的回调函数通过微任务异步执行
6. Promise 只能进行一次状态转换，从 Pending 转到 Fullfilled 或 Rejected
7. Promise then 返回一个新的 Promise，有如下规则
    - then 的回调返回一个`非PromiseLike的值` ，则新 Promise 状态为 fullfilled，值为该返回值
    - 函数没有返回值遵守上一条规则
    - `PromiseLike` 指对象或函数有一个 then 成员且 then 成员的规则与 Promise then 一致，`并不一定要 instanceof Promise`
    - then 的回调返回一个 fullfilled 的 Promise，则新 Promise 为 fullfilled，value 为返回的 Promise 的 value
    - then 的回调返回一个 rejected 的 Promise，则新 Promise 为 rejected，value 为 reject 的 reason
    - `then 的回调返回一个 pending 的 Promise，则新 Promise 为 pending，.then 的链式执行就此中断`
    - then 的回调执行过程出错，则新 Promise 状态为 rejected，value 为 catch 的 error 信息
8. Promise catch 是 then 的语法糖，完全等价于 then 只传第二个参数

[MyPromise 代码实现](/#/notes/javascript/implementation/Promise.md)

## async await 特性分析

1. async 用于修饰函数，使得函数以同步的语法执行 `PromiseLike` 异步代码
2. async 函数返回 Promise，该 Promise 的 value 为 async 函数 return 的值
3. 若 async 函数 return 语句就是返回的 `PromiseLike`，则通过 Promise then 的特性取最终值
4. await 修饰 js 语句，若该语句值为 `PromiseLike`，则中止 async 函数执行直到 js 语句的 Promise then 时机触发，若该值一直 pending 那么 async 函数将不会再执行
