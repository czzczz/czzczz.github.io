# uni-app cli

通过cli版创建项目依赖于[vue-cli](https://cli.vuejs.org/zh/)。

``` bash
npm install -g @vue/cli
vue create -p dcloudio/uni-preset-vue my-project-name
```

## 常用插件

uni-app的cli版要安装插件须自行通过npm安装对应的包。且由于uni-app本身依赖的node版本较低，所以需要调整node版本的同时再安装依赖。
```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash 
# 重启终端
# 安装并使用node8
nvm install v8.17.0
nvm use v8.17.0
```

### less-loader

uni-app使用的less-loader版本须为`less4`与`less-loader7`（node8环境，`20210421可用`）。

```json
{
    "less": "^4.1.1",
    "less-loader": "^7.3.0",
}
```

### scss-loader

uni-app使用的sass-loader版本须为`node-sass4`与`sass-loader8`（node8环境，`20210421可用`）。

```json
{
    "node-sass": "^4.14.1",
    "sass-loader": "^8.0.2",
}
```
