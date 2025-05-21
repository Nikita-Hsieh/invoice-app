module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@babel/eslint-parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		requireConfigFile: false,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
	rules: {},
}
