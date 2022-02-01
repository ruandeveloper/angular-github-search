import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchItem, StorageItemInfo } from '../../models';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { SearchResult } from '../../models/search-result.model';
import {
	DeleteItemService,
	FavoriteItemService,
	GithubSearchService
} from '../../services';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	icons = {
		faSync
	};
	currentSearchTerm = '';
	isLoading = false;

	result$?: Observable<SearchResult | undefined>;
	refreshSubject$ = new BehaviorSubject<{
		searchTerm?: string;
		nextPage?: boolean;
		removeItem?: SearchItem;
	}>({});

	constructor(
		private githubSearchService: GithubSearchService,
		private deleteItemService: DeleteItemService,
		private favoriteItemService: FavoriteItemService
	) {}

	ngOnInit(): void {
		this.initSearch();
	}

	public initSearch(): void {
		this.result$ = this.refreshSubject$.asObservable().pipe(
			tap((params) => {
				this.isLoading = !!(params.nextPage || params.searchTerm);
			}),
			switchMap((params) => {
				if (params.nextPage) return this.searchNextPage();

				if (params.searchTerm)
					return this.searchByTerm(params.searchTerm);

				if (params.removeItem && this.result$)
					return this.removeItem(params.removeItem);

				return this.result$?.pipe(first()) ?? of(undefined);
			}),
			shareReplay(1),
			tap(() => {
				this.isLoading = false;
			})
		);
	}

	public onSearchTermChange(term: string): void {
		this.currentSearchTerm = term;
		this.refreshSubject$.next({ searchTerm: term });
	}

	public onRemoveItem(item: SearchItem): void {
		this.refreshSubject$.next({ removeItem: item });
	}

	public onToggleFavorite(item: SearchItem, isFavorite: boolean): void {
		const storageItem: StorageItemInfo = {
			id: item?.user?.id ?? item?.repository?.id ?? '',
			type: item?.user ? 'user' : 'repository'
		};

		isFavorite
			? this.favoriteItemService.addToFavorite(storageItem)
			: this.favoriteItemService.removeFromFavorite(storageItem);
	}

	public nextPage(): void {
		this.refreshSubject$.next({
			nextPage: true
		});
	}

	private searchByTerm(term: string) {
		return this.githubSearchService.searchByUserAndRepository({
			term
		});
	}

	private searchNextPage() {
		if (!this.result$) return of(undefined);

		const newResult$ = this.result$.pipe(
			first(),
			switchMap((lastResult) => {
				return this.githubSearchService.searchByUserAndRepository({
					term: this.currentSearchTerm,
					startAfterUser: lastResult?.pageUsers?.endCursor,
					startAfterRepository:
						lastResult?.pageRepositories?.endCursor
				});
			})
		);

		const lastResult$ = this.result$?.pipe(first());

		return forkJoin([lastResult$, newResult$]).pipe(
			map(([lastResult, newResult]) => {
				return {
					...newResult,
					items: [...(lastResult?.items ?? []), ...newResult.items]
				} as SearchResult;
			})
		);
	}

	private removeItem(itemRemove: SearchItem) {
		this.deleteItemService.deleteItem(
			itemRemove.user ? 'user' : 'repository',
			itemRemove.user?.id ?? itemRemove.repository?.id ?? ''
		);

		return (
			this.result$?.pipe(
				first(),
				map((result) => {
					return {
						...result,
						items:
							result?.items.filter(
								(fItem) => fItem != itemRemove
							) ?? []
					} as SearchResult;
				})
			) ?? of(undefined)
		);
	}

	trackBy(index: number, item: SearchItem): string {
		return item.user ? item.user.id : item.repository?.id ?? '';
	}
}
