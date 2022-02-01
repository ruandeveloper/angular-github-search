import {
	GithubUser,
	GithubRepository,
	GithubSearch
} from './../models/github-response.model';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { SearchItem, SearchResult } from '../models';
import { DeleteItemService, FavoriteItemService } from '.';

export const QUERY_SEARCH = gql`
	query SearchQuery(
		$first: Int!
		$query: String!
		$type: SearchType!
		$after: String
	) {
		search(query: $query, type: $type, first: $first, after: $after) {
			nodes {
				... on User {
					id
					email
					bio
					avatarUrl(size: $first)
					followers(first: 10) {
						totalCount
						nodes {
							avatarUrl
							url
							name
						}
					}
					url
					name
					repositories(
						privacy: PUBLIC
						first: 10
						orderBy: { field: CREATED_AT, direction: DESC }
					) {
						totalCount
						nodes {
							id
							url
							name
							description
							languages(first: 10) {
								nodes {
									color
									id
									name
								}
								totalCount
								totalSize
							}
						}
					}
				}
				... on Repository {
					id
					name
					description
					descriptionHTML
					homepageUrl
					languages(first: $first) {
						nodes {
							color
							id
							name
						}
					}
					url
					stargazerCount
					issues(states: OPEN) {
						totalCount
					}
					watchers(first: 10) {
						totalCount
						nodes {
							id
							avatarUrl(size: 10)
							name
						}
					}
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			userCount
			repositoryCount
		}
	}
`;

@Injectable({
	providedIn: 'root'
})
export class GithubSearchService {
	constructor(
		private apollo: Apollo,
		private deleteItemService: DeleteItemService,
		private favoriteItemService: FavoriteItemService
	) {}

	searchByRepository(
		term: string,
		startAfter?: string
	): Observable<GithubSearch<GithubRepository | GithubUser>> {
		return this.query({
			searchTerm: term,
			type: 'REPOSITORY',
			startAfter
		});
	}

	searchByUser(
		term: string,
		startAfter?: string
	): Observable<GithubSearch<GithubRepository | GithubUser>> {
		return this.query({
			searchTerm: term,
			type: 'USER',
			startAfter
		});
	}

	searchByUserAndRepository({
		term,
		startAfterUser,
		startAfterRepository
	}: {
		term: string;
		startAfterUser?: string;
		startAfterRepository?: string;
	}): Observable<SearchResult> {
		return forkJoin([
			this.searchByRepository(term, startAfterRepository),
			this.searchByUser(term, startAfterUser)
		]).pipe(
			map((responses) => {
				const [repository, user] = responses;

				let items = this.joinUsersAndRepositories({
					repository: repository as GithubSearch<GithubRepository>,
					user: user as GithubSearch<GithubUser>
				});

				items = this.filterItemsNotDeleted(items);
				items = this.setIfItemIsFavorite(items);

				return {
					items,
					pageUsers: user?.search?.pageInfo,
					pageRepositories: repository?.search?.pageInfo
				} as SearchResult;
			})
		);
	}

	private joinUsersAndRepositories(data: {
		repository: GithubSearch<GithubRepository>;
		user: GithubSearch<GithubUser>;
	}): SearchItem[] {
		const users: SearchItem[] = data.user?.search?.nodes
			?.filter((user) => user.__typename === 'User')
			?.map((user) => {
				return { user };
			});
		const repositories: SearchItem[] = data.repository?.search?.nodes.map(
			(repository) => {
				return {
					repository
				};
			}
		);

		return [...users, ...repositories];
	}

	private filterItemsNotDeleted(items: SearchItem[]) {
		const deletedItems = this.deleteItemService.getDeletedItems();
		return items.filter(
			(item) =>
				!deletedItems?.some((deletedItem) =>
					item.user
						? deletedItem.type === 'user' &&
						  deletedItem.id === item.user?.id
						: deletedItem.type === 'repository' &&
						  deletedItem.id === item.repository?.id
				)
		);
	}

	private setIfItemIsFavorite(items: SearchItem[]) {
		const favoriteItems = this.favoriteItemService.getFavorites();

		return items.map((item) => {
			item.isFavorite = favoriteItems?.some((favoriteItem) =>
				item.user
					? favoriteItem.type === 'user' &&
					  favoriteItem.id === item.user?.id
					: favoriteItem.type === 'repository' &&
					  favoriteItem.id === item.repository?.id
			);

			return item;
		});
	}

	private query({
		type,
		searchTerm,
		startAfter
	}: {
		type: 'USER' | 'REPOSITORY';
		searchTerm: string;
		startAfter?: string;
	}) {
		return this.apollo
			.query<GithubSearch<GithubRepository | GithubUser>>({
				query: QUERY_SEARCH,
				variables: {
					first: 10,
					query: searchTerm,
					type,
					after: startAfter
				}
			})
			.pipe(map((response) => response?.data));
	}
}
