module.exports = {
	presets: 'ts-jest/presets/js-with-ts',
	clearMocks: true,
	automock: false,
	resetMocks: false,
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@root(.*)$': '<rootDir>/src/$1',
		'^.+\\.svg$': '<rootDir>/__mocks__/svg.js',
	},
	setupFiles: ['<rootDir>/jest/setupJest.ts'],

	browser: true,
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
	testMatch: [
		'**/__tests__/**/*.js?(x)',
		'**/__tests__/**/*.ts?(x)',
		'**/?(*.)(spec|test).js?(x)',
		'**/?(*.)(spec|test).ts?(x)',
	],
	testPathIgnorePatterns: [
		'/public/',
		'/webpack',
		'/.husky/',
		'/.vscode/',
		'/node_modules/',
	],
	transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
	transform: {
		'^.+\\.(j|t)sx?$': 'babel-jest',
	},
};
