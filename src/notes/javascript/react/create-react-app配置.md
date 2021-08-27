# create-react-app 配置

## 自定义配置

```sh
yarn add -D react-app-rewired customize-cra
```

通过`config.overrides.js`返回 override 函数（`customize-cra`包中的）执行结果，覆盖 webpack 默认配置。

## ts 下添加别名。

ts 模式下的 cra 启动时会复写 tsconfig.json 的配置，别名配置 baseUrl 和 paths 会被删除，即使通过 extends 写到别的文件也会报错。

`config.overrides.js`中 override 加一个`addWebpackAlias`提供别名的映射关系

```sh
yarn add -D craco-alias
```

根据该包的功能修复启动时 paths 报错导致无法构建的问题
