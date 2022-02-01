declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		_env_: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		env: any;
	}
}

export const environment = {
	production: true,
	defaultTheme: 'dark',
	githubGraphQlUrl: 'https://api.github.com/graphql',
	githubToken: `${window.env?.GITHUB_TOKEN}`
};
