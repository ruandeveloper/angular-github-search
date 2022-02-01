import { Injectable } from '@angular/core';
import { StorageItemInfo } from '../models';

@Injectable({
	providedIn: 'root'
})
export class DeleteItemService {
	private STORAGE_KEY = 'deleted-items';

	getDeletedItems(): StorageItemInfo[] | undefined {
		const json = localStorage.getItem(this.STORAGE_KEY);

		if (!json) return;

		return JSON.parse(json) as StorageItemInfo[];
	}

	deleteItem(type: 'user' | 'repository', id: string): void {
		let deleteditems = this.getDeletedItems();

		if (!deleteditems) deleteditems = [];

		deleteditems.push({ type, id });

		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(deleteditems));
	}
}
