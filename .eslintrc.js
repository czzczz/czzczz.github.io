module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		semi: [2, 'always'],
		'one-var': 0,
		'no-unused-vars': 1,
		'no-multi-spaces': 'warn',
		'no-tabs': [
			0,
			{
				allowIndentationTabs: true, // 允许tab缩进
			},
		],
		'no-mixed-spaces-and-tabs': 1,
		indent: 0,
		'vue/script-indent': ['warn', 'tab', { baseIndent: 0 }],
		'comma-dangle': [0],
		'space-before-function-paren': 0,
		quotes: 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-empty-function': 1,
		'@typescript-eslint/no-var-requires': 0,
		curly: [1, 'multi'],
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				indent: 'off',
			},
		},
	],
};
