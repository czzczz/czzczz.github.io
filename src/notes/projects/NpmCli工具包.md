# 发布一个 Npm 包包装常用的 Cli 指令

```sh
npm config set registry http://www.npmjs.org # 源换为npm官方源，非官方源不支持注册等功能
npm adduser # 注册用户，其中需要填写用户名（登陆用）、密码、邮箱（注册验证用）
npm login # 若登陆始终不生效可以删除对应的.npmrc文件再重新登陆
npm publish # 发布
npm config set registry https://registry.npm.taobao.org # 切换阿里源
```

## package.json 配置

### main

包入口，即引用该包时`require('my-pack')`时默认引入的 js 入口

### bin

指明要创建的可执行文件，及其对应的入口 js 文件

```json
"bin": {
	"nsh": "./dist/index.js"
}
```
