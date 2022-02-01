import { Component, Input } from '@angular/core';
import { faPlus, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
	@Input() tags: string[] = [];

	icons = {
		faPlus,
		faTags,
		faTrash
	};

	addNewTag(): void {
		this.tags.push('');
	}

	changeTag(index: number, newValue: Event): void {
		this.tags[index] = (
			newValue.target as unknown as { value: string }
		).value;
	}

	removeTag(index: number): void {
		this.tags.splice(index, 1);
	}

	trackBy(index: number, tag: string): string {
		return tag;
	}
}
