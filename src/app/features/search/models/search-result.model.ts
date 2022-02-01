import { GithubPageInfo, SearchItem } from '.';

export interface SearchResult {
	items: SearchItem[];
	pageUsers?: GithubPageInfo;
	pageRepositories?: GithubPageInfo;
}
