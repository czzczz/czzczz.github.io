# script 标签的 async 与 defer

二者都可以使 script 异步执行

![async与defer](images/async与defer.png)

-   若 script 没有这两个标签，dom 解析到 script 标签会暂停执行解析，转而下载资源文件并执行。

-   若 script 有 async，dom 继续解析的同时进行下载，下载完成后 dom 暂停解析并执行 js。

-   若 script 有 defer，下载时继续解析 dom，dom 解析完成后（`DOMContentLoaded`前）再**顺序**执行 js。

关于 DomContentLoaded 与 onload 的区别。前者代表 dom tree 解析完成，后者则是需要所有图片及 iframe 等子内容加载完成。
