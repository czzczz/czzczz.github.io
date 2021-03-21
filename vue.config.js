module.exports = {
	publicPath: './',
	productionSourceMap: false,
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8080,
		https: false,
	},
	chainWebpack: config => {
		config.module
			.rule('md')
			.test(/\.md$/)
			.use('vue-loader-v16')
			.loader('vue-loader-v16')
			.end()
			.use('md-loader-for-doc')
			.loader('md-loader-for-doc/lib')
			.end();
	},
};
