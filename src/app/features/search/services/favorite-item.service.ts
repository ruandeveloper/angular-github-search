import { Injectable } from '@angular/core';
import { StorageItemInfo } from '../models';

@Injectable({
	providedIn: 'root'
})
export class FavoriteItemService {
	private STORAGE_KEY = 'favorite-items';

	getFavorites(): StorageItemInfo[] | undefined {
		const json = localStorage.getItem(this.STORAGE_KEY);

		if (!json) return;

		return JSON.parse(json) as StorageItemInfo[];
	}

	addToFavorite(item: StorageItemInfo): void {
		let favoriteItems = this.getFavorites();

		if (!favoriteItems) favoriteItems = [];

		favoriteItems.push(item);

		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoriteItems));
	}

	removeFromFavorite(item: StorageItemInfo): void {
		let favoriteItems = this.getFavorites();

		if (!favoriteItems) favoriteItems = [];

		favoriteItems = favoriteItems.filter(
			(favoriteItem) => favoriteItem.id !== item.id
		);

		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoriteItems));
	}
}
