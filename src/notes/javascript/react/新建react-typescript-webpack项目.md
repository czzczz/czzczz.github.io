<!-- imageRoot:javascript\react -->

# React+Webpack+Typescript 项目初始化

<!-- TOC -->

-   [React+Webpack+Typescript 项目初始化](#reactwebpacktypescript%e9%a1%b9%e7%9b%ae%e5%88%9d%e5%a7%8b%e5%8c%96)
    -   [项目目录结构](#%e9%a1%b9%e7%9b%ae%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)
    -   [npm init](#npm-init)
    -   [安装依赖包](#%e5%ae%89%e8%a3%85%e4%be%9d%e8%b5%96%e5%8c%85)
    -   [TypeScript 配置文件](#typescript-%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6)
    -   [写点示例组件](#%e5%86%99%e7%82%b9%e7%a4%ba%e4%be%8b%e7%bb%84%e4%bb%b6)
    -   [根文件`index.html`](#%e6%a0%b9%e6%96%87%e4%bb%b6indexhtml)
    -   [Webpack.config.js](#webpackconfigjs)
    -   [尝试打包](#%e5%b0%9d%e8%af%95%e6%89%93%e5%8c%85)
    -   [通过 webpack-dev-server 启用热更新。](#%e9%80%9a%e8%bf%87webpack-dev-server%e5%90%af%e7%94%a8%e7%83%ad%e6%9b%b4%e6%96%b0)
        -   [在 package.json 的 script 中添加命令](#%e5%9c%a8packagejson%e7%9a%84script%e4%b8%ad%e6%b7%bb%e5%8a%a0%e5%91%bd%e4%bb%a4)
        -   [修改 webpack.config.js 文件。](#%e4%bf%ae%e6%94%b9webpackconfigjs%e6%96%87%e4%bb%b6)
        -   [修改 html 文件中 bundle 的引用](#%e4%bf%ae%e6%94%b9html%e6%96%87%e4%bb%b6%e4%b8%adbundle%e7%9a%84%e5%bc%95%e7%94%a8)
        -   [运行](#%e8%bf%90%e8%a1%8c)
    -   [添加 redux 以及 react-router](#%e6%b7%bb%e5%8a%a0redux%e4%bb%a5%e5%8f%8areact-router)
    -   [配置 css-modules 和 sass](#%e9%85%8d%e7%bd%aecss-modules%e5%92%8csass)
        -   [css-modules 配合 typescript](#css-modules%e9%85%8d%e5%90%88typescript)
        -   [css-modules, sass 配合 typescript](#css-modules-sass%e9%85%8d%e5%90%88typescript)

<!-- /TOC -->

## 项目目录结构

```
├─build
├─dist
└─src
  └─components
```

build 文件夹存放 webpack 配置相关的文件，dist 用于 webpack 打包。src 文件夹存放项目名源码（react+typescript）。

## npm init

```sh
npm init
```

通过该命令初始化`package.json`文件。全部默认即可，之后可以随时修改。

```json
{
	"name": "test-proj",
	"version": "1.0.0",
	"description": "test project",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "czzczz",
	"license": "ISC"
}
```

## 安装依赖包

安装 webpack

```sh
npm install -g webpack
```

安装 react 包以及 types 名下的 react 包。

```
npm install --save react react-dom @types/react @types/react-dom
```

安装开发依赖，使得 typescript 正常工作。

```
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```

## TypeScript 配置文件

文件名`tsconfig.json`

```json
{
	"compilerOptions": {
		"outDir": "./dist/",
		"sourceMap": true,
		"noImplicitAny": true,
		"module": "commonjs",
		"target": "es5",
		"lib": ["es6", "dom"],
		"jsx": "react"
	},
	"include": ["./src/**/*"]
}
```

`target`为 es6。`include`中包含所有 tsx、ts 文件的路径。

## 写点示例组件

```tsx
import * as React from 'react';

export interface AppProps {
	compiler: string;
	framework: string;
}

export const App = (props: AppProps) => (
	<h1>
		Hello from {props.compiler} and {props.framework}!
	</h1>
);
```

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';

ReactDOM.render(<App compiler="TypeScript" framework="React" />, document.getElementById('root'));
```

## 根文件`index.html`

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Hello React!</title>
	</head>
	<body>
		<div id="root"></div>

		<!-- Dependencies -->
		<script src="./node_modules/react/umd/react.development.js"></script>
		<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

		<!-- Main -->
		<script src="./dist/bundle.js"></script>
	</body>
</html>
```

bundle.js 的路径记得为你 webpack 打包的输出路径。

## Webpack.config.js

```js
module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/../dist',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
		],
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
```

`entry`为你的 react 入口文件。`output.path`为`bundle.js`的输出目录，按照之前 index.html 的引用位置，设置为项目根目录的 dist 文件夹。

## 尝试打包

在 package.json 的 script 字段中添加：

```json
"build": "webpack --config build/webpack.config.js",
```

打包：

```
npm run build
```

在项目目录中的 dist 文件夹中出现了 bundle.js 以及 bundle.js.map 文件，打包成功，此时用浏览器打开 index.html 可以正常显示示例组件了。

## 通过 webpack-dev-server 启用热更新。

```
npm install --save-dev webpack webpack-cli webpack-dev-server
```

### 在 package.json 的 script 中添加命令

```json
"dev": "webpack-dev-server --hot --inline --colors --config build/webpack.config.js",
```

### 修改 webpack.config.js 文件。

添加 devServer 字段与 plugins 字段：

```js
const webpack = require('webpack');

const path = require('path');

function resolve(name) {
	let res = path.join(__dirname, '..', name);
	return res;
}

module.exports = {
	entry: resolve('src/index.tsx'),
	output: {
		filename: 'bundle.js',
		path: resolve('dist/'),
	},

	devServer: {
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
		],
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

### 修改 html 文件中 bundle 的引用

将 index.html 中的 bundle 引用改为引用根目录的文件，因为 webpack-dev-server 并不会根据 output.path 的路径来构建。

```html
<script src="./bundle.js"></script>
```

### 运行

```
npm run dev
```

成功启用了热更新！

## 添加 redux 以及 react-router

```
npm install --save redux react-redux @types/redux @types/react-redux
npm install --save react-router-dom @types/react-router-dom
```

然后该咋用咋用。

## 配置 css-modules 和 sass

```
npm install --save-dev css-loader node-sass sass-loader style-loader
```

`webpack.config.js`的`modules.rules`中添加两项

```js
            // 。。。
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
                include: [resolve('node_modules/'), resolve('src/components/style/global')],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {//设置css-modules
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        }
                        // loader: 'typings-for-css-modules-loader',
                        // options: {
                        //     modules: true,
                        //     namedExport: true,
                        //     camelCase: true,
                        //     minimize: true,
                        //     localIdentName: "[name]__[local]___[hash:base64:5]"
                        // },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
                exclude: [resolve('node_modules/'), resolve('src/components/style/global')],
            },
            // 。。。
```

其中`css-loader@3.0.0`之后将 modules 从 boolean 换成了对象，localIdentName 属性移入其中。

如果是普通 js 项目，此时已经配置完成，可以通过`import from`语法引入相对应的 css-module 文件了。
但如果是 typescript，引入会失败并报错`'Cannot find module './App.css''`，这是由于 typescript 对 import 的特殊封装导致的。

### css-modules 配合 typescript

解决方案 1：

```js
const appStyles = require('./App.css');
```

较为简单的解决方案，强行绕过 typescript 的 import。

解决方案 2（完善）：

通过`ts`的声明文件`d.ts`来对模块进行声明。

```
npm install --save typings-for-css-modules-loader css-loader@1.0.0
```

由于该模块只支持`css-loader@1.0`，所以重新安装`css-loader`。

然后修改 webpack 配置的 loader 部分。

```js
// loader: 'css-loader',
// options: {
//     modules: {//设置css-modules
//         localIdentName: "[name]__[local]___[hash:base64:5]",
//     },
// }
loader: 'typings-for-css-modules-loader',
options: {
    modules: true,
    namedExport: true,
    camelCase: true,
    minimize: true,
    localIdentName: "[name]__[local]___[hash:base64:5]"
},
```

此时可以按照 es6 语法来引入 css-module 了，由于 css 打包次序会比 typescript 晚，导致一开始控制台会报错（实际上马上就会打包好，并不影响开发与调试），但是之后就不会了。

### css-modules, sass 配合 typescript

删除`typings-for-css-modules-loader`依赖，将`awesome-typescript-loader`依赖更换为`ts-loader`

```
npm install --save-dev @types/node-sass css-modules-typescript-loader ts-loader
```

修改 webpack 设置

```js
// 。。。
{ test: /\.tsx?$/, loader: "ts-loader" },
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'sass-loader',
        },
    ],
    include: [resolve('node_modules/'), resolve('src/components/style/global')],
},
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: "css-modules-typescript-loader"
        },
        {
            loader: 'css-loader',
            options: {
                modules: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
            },
        },
        {
            loader: 'sass-loader',
        },
    ],
    exclude: [resolve('node_modules/'), resolve('src/components/style/global')],
},
// 。。。
```

在项目中添加文件`declarations.d.ts`

```ts
declare module '*.scss';
```
