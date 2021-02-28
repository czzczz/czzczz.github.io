# JS 用到的浏览器缓存

## cookie

JavaScript 可以使用 document.cookie 属性来创建 、读取、及删除 cookie。

`document.cookie="username=John Doe";`

还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：

`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";`

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";`

读取 cookie：

`var x = document.cookie;`

删除 cookie，将时间设为以前即可：

`document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`

### cookie 特性

cookie 虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。

1. IE6 或更低版本最多 20 个 cookie
2. IE7 和之后的版本最后可以有 50 个 cookie。
3. Firefox 最多 50 个 cookie
4. chrome 和 Safari 没有做硬性限制。

IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie。

cookie 的最大大约为 4096 字节，为了兼容性，一般不能超过 4095 字节。

IE 提供了一种存储可以持久化用户数据，叫做 userData，从 IE5.0 就开始支持。每个数据最多 128K，每个域名下最多 1M。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在。

### cookie 的优点 极高的扩展性和可用性

1. 通过良好的编程，控制保存在 cookie 中的 session 对象的大小。
2. 通过加密和安全传输技术（SSL），减少 cookie 被破解的可能性。
3. 只在 cookie 中存放不敏感数据，即使被盗也不会有重大损失。
4. 控制 cookie 的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的 cookie。

### cookie 的缺点

1. 有长度和数量的限制 每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。
2. 安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，他只要原样转发 cookie 就可以达到目的了。
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

## 浏览器缓存

在较高版本的浏览器中，js 提供了 sessionStorage 和 globalStorage。在 HTML5 中提供了 localStorage 来取代 globalStorage。

html5 中的 Web Storage 包括了两种存储方式：sessionStorage 和 localStorage。

sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。

而 localStorage 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
使用方法：

```js
sessionStorage.setItem(key, value); //设置值
sessionStorage.getItem(key); //获取值
sessionStorage.length; //键值对数量
sessionStorage.clear(); //清空
sessionStorage.key(index); //获取对应index的key
```

### webStorage 与 cookie 的区别

Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。

除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。

`但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生`

浏览器的支持除了 IE ７及以下不支持外，其他标准浏览器都完全支持(ie 及 FF 需在 web 服务器里运行)，值得一提的是 IE 总是办好事，例如 IE7、IE6 中的 UserData 其实就是 javascript 本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持 web storage。

localStorage 和 sessionStorage 都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等。
