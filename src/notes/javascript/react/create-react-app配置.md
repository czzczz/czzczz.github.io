# create-react-app 配置

## 自定义配置

```sh
yarn add -D react-app-rewired customize-cra
```

通过`config.overrides.js`返回override函数（`customize-cra`包中的）执行结果，覆盖webpack默认配置。

## ts下添加别名。

ts模式下的cra启动时会复写tsconfig.json的配置，别名配置baseUrl和paths会被删除，即使通过extends写到别的文件也会报错。

`config.overrides.js`中override加一个`addWebpackAlias`提供别名的映射关系

```sh
yarn add -D craco-alias
```

根据该包的功能修复启动时paths报错导致无法构建的问题


