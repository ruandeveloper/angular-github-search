import { GithubRepository, GithubUser } from '.';

export interface SearchItem {
	repository?: GithubRepository;
	user?: GithubUser;
	isFavorite?: boolean;
}
