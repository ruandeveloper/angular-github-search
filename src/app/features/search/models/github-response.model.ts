export interface GithubSearchResponse {
	repository: GithubSearch<GithubRepository>;
	user: GithubSearch<GithubUser>;
}

export interface GithubSearch<T> {
	search: GithubSearchData<T>;
}

export interface GithubSearchData<T> {
	__typename: string;
	nodes: T[];
	pageInfo: GithubPageInfo;
	userCount: number;
	repositoryCount: number;
}

export interface GithubPageInfo {
	__typename: string;
	startCursor: string;
	endCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface GithubListNode<T, L> {
	__typename: L;
	nodes: T[];
	totalCount: number;
	totalSize: number;
}

export interface GithubRepository {
	__typename: NodeTypename;
	id: string;
	name: string;
	description: string;
	descriptionHTML: string;
	homepageUrl: string;
	languages: GithubListNode<GithubLanguage, string>;
	url: string;
	watchers: GithubListNode<GithubUser, string>;
	stargazerCount: number;
	issues: {
		totalCount: number;
	};
}

export interface GithubLanguage {
	color: string;
	name: string;
}

export interface GithubUser {
	__typename: string;
	id: string;
	email: string;
	bio: string;
	avatarUrl: string;
	followers: GithubListNode<GithubUser, string>;
	url: string;
	name: string;
	repositories: GithubListNode<GithubRepository, string>;
}

export enum NodeTypename {
	Language = 'Language',
	Repository = 'Repository'
}

export enum LanguagesTypename {
	LanguageConnection = 'LanguageConnection'
}
