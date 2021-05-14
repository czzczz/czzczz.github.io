# 编译器复习，the-super-tiny-compiler 源码中文注释

编译过程主要内容

1.  词法分析，将源代码字符串拆分为`token`列表。
2.  语法分析，通过对`token列表`进行遍历，构筑成可以描述源代码语义的`抽象语法树（AST）`。
3.  AST 变换，通过遍历 AST 树，对 AST 树进行语义上的理解和结构上的调整及转换
4.  目标代码生成，也可作为 3 中的一部分。通过遍历 AST 树通过对 AST 结构的解析拼接出最终的目标代码。

[仓库地址](https://github.com/czzczz/the-super-tiny-compiler)

## 实战

Vue 用的 VSCode 插件。内部使用`自建Vue模板编译器`以及 `TS Compiler` 对 Vue 单文件组件进行解析并实现其他功能

1.  通过模板编译收集模板内的作用域变量、CSS 内的 class 变量，通过`TS Compiler`收集`script`中的变量，以此实现对应的定义跳转。
2.  通过`TS Compiler`生成 AST 树，解析函数 Node 节点信息以 `自动生成 JSDOC 注释`

[Helpue](https://github.com/czzczz/helpue)
