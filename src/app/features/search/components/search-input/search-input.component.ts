import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
	@Output() searchTermChanged = new EventEmitter<string>();

	searchControl = new FormControl();

	private sub = new SubSink();

	ngOnInit(): void {
		this.onSearchTermChange();
	}

	onSearchTermChange(): void {
		this.sub.sink = this.searchControl.valueChanges
			.pipe(debounceTime(200))
			.subscribe((term) => {
				this.searchTermChanged.emit(term);
			});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
