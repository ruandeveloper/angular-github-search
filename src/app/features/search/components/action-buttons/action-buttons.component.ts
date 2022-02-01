import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
	faTrash,
	faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-action-buttons',
	templateUrl: './action-buttons.component.html',
	styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
	@Input() isFavorite = false;

	@Output() favoriteChanged = new EventEmitter<boolean>();
	@Output() removeClicked = new EventEmitter<void>();

	icons = {
		faHeartRegular,
		faHeartSolid,
		faTrash
	};

	toggleFavorite(): void {
		this.isFavorite = !this.isFavorite;
		this.favoriteChanged.emit(this.isFavorite);
	}

	remove(): void {
		this.removeClicked.emit();
	}
}
