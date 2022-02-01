import { Component, Input } from '@angular/core';
import { GithubLanguage } from '../../models';

@Component({
	selector: 'app-languages',
	templateUrl: './languages.component.html',
	styleUrls: ['./languages.component.scss']
})
export class LanguageTagComponent {
	@Input() languages?: GithubLanguage[];

	trackBy(index: number, language: GithubLanguage): string {
		return language.name;
	}
}
