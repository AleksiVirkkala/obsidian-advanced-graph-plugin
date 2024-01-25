module.exports = {
	useTabs: true,
	singleQuote: true,
	semi: true,
	arrowParens: 'avoid',
	trailingComma: 'none',
	printWidth: 100,
	plugins: [require('prettier-plugin-svelte')],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
