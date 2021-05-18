# 对已经加载的模块进行一个批量的操作

## 为所有匹配的模块添加顶部注释

`webpack-parallel-uglify-plugin`

## JS代码压缩

-   `uglifyjs-webpack-plugin` 较旧，缺点是单线程操作导致压缩过程很慢
-   `webpack-parallel-uglify-plugin`，对第一条进行多线程优化，速度更快
-   `terser-webpack-plugin`，同样高效。

## 构建速度优化

`DllPlugin`，`DllReferencePlugin`
