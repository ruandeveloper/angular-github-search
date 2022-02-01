import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	faBug,
	faCode,
	faStar,
	faEye
} from '@fortawesome/free-solid-svg-icons';
import { SearchItemDialogComponent } from '../../dialogs';
import {
	GithubRepository,
	SearchItem,
	SearchItemDialogResult
} from '../../models';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-repository-card',
	templateUrl: './repository-card.component.html',
	styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent {
	@Input() repository?: GithubRepository;
	@Input() isFavorite = false;
	@Input() dialogMode = false;

	@Output() removeClicked = new EventEmitter<void>();
	@Output() favoriteChanged = new EventEmitter<boolean>();

	icons = {
		faCode,
		faBug,
		faStar,
		faEye
	};

	constructor(private matDialog: MatDialog) {}

	remove(): void {
		this.removeClicked.emit();
	}

	toggleFavorite(value: boolean): void {
		this.favoriteChanged.emit(value);
	}

	openDialog(): void {
		if (this.dialogMode) {
			window.open(this.repository?.url, '_blank');
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
				repository: this.repository
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
