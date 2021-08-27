# uni-app cli

通过 cli 版创建项目依赖于[vue-cli](https://cli.vuejs.org/zh/)。

```bash
npm install -g @vue/cli
vue create -p dcloudio/uni-preset-vue my-project-name
```

## 常用插件

uni-app 的 cli 版要安装插件须自行通过 npm 安装对应的包。且由于 uni-app 本身依赖的 node 版本较低，所以需要调整 node 版本的同时再安装依赖。

```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 重启终端
# 安装并使用node8
nvm install v8.17.0
nvm use v8.17.0
```

### less-loader

uni-app 使用的 less-loader 版本须为`less4`与`less-loader7`（node8 环境，`20210421可用`）。

```json
{
	"less": "^4.1.1",
	"less-loader": "^7.3.0"
}
```

### scss-loader

uni-app 使用的 sass-loader 版本须为`node-sass4`与`sass-loader8`（node8 环境，`20210421可用`）。

```json
{
	"node-sass": "^4.14.1",
	"sass-loader": "^8.0.2"
}
```

#### 别用 node-sass 是更优方案的样子

```json
{
	"sass": "^1.34.1",
	"sass-loader": "^8.0.2"
}
```

然后配置 vue.config.js

```js
exports.css = {
	loaderOptions: {
		sass: {
			implementation: require('sass'), // 重新指定dart-sass为sass-loader的sdk源
		},
	},
};
```
