import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { SearchItemDialogComponent } from '../../dialogs';
import { GithubUser, SearchItem, SearchItemDialogResult } from '../../models';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
	@Input() user?: GithubUser;
	@Input() isFavorite = false;
	@Input() dialogMode = false;

	@Output() favoriteChanged = new EventEmitter<boolean>();
	@Output() removeClicked = new EventEmitter<void>();

	icons = {
		faUsers
	};

	constructor(private matDialog: MatDialog) {}

	remove(): void {
		this.removeClicked.emit();
	}

	toggleFavorite(value: boolean): void {
		this.favoriteChanged.emit(value);
	}

	openDialog(canOpenLink = true): void {
		if (this.dialogMode) {
			if (canOpenLink) window.open(this.user?.url, '_blank');
			return;
		}

		if (
			this.matDialog.getDialogById(
				SearchItemDialogComponent.DIALOG_CONFIG.id ?? ''
			)
		)
			return;

		const dialog = this.matDialog.open<
			SearchItemDialogComponent,
			SearchItem,
			SearchItemDialogResult
		>(SearchItemDialogComponent, {
			...SearchItemDialogComponent.DIALOG_CONFIG,
			data: {
				user: this.user
			}
		});

		dialog
			.afterClosed()
			.pipe(first())
			.subscribe((result) => {
				if (result?.deleteItem) {
					this.remove();
				}
			});
	}
}
