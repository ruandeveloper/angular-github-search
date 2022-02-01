import { Component, Inject } from '@angular/core';
import {
	MatDialogConfig,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { SearchItemDialogResult } from '../../models/search-item-dialog-result.model';
import { SearchItem } from '../../models';

@Component({
	selector: 'app-search-item-dialog',
	templateUrl: './search-item-dialog.component.html',
	styleUrls: ['./search-item-dialog.component.scss']
})
export class SearchItemDialogComponent {
	static DIALOG_CONFIG: MatDialogConfig<SearchItem> = {
		id: 'search-item-dialog',
		width: '900px',
		maxWidth: '95%',
		autoFocus: false
	};

	constructor(
		public dialogRef: MatDialogRef<
			SearchItemDialogComponent,
			SearchItemDialogResult
		>,
		@Inject(MAT_DIALOG_DATA)
		public data: SearchItem
	) {}

	onRemoveItem(): void {
		this.dialogRef.close({ deleteItem: true });
	}
}
