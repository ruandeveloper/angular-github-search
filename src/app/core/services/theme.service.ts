import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments';
import { Theme } from '../models';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private currentThemeSubject = new BehaviorSubject<Theme>(
		environment.defaultTheme as Theme
	);
	currentTheme = this.currentThemeSubject.asObservable();

	constructor(@Inject(DOCUMENT) private document: Document) {}

	changeTheme(themeName: Theme): void {
		localStorage.setItem('theme', themeName);
		this.currentThemeSubject.next(themeName);
		this.loadStyle(`${themeName}-theme.css`);
	}

	private loadStyle(styleName: string) {
		const head = this.document.getElementsByTagName('head')[0];

		const themeLinkElement = this.document.getElementById(
			'theme-link'
		) as HTMLLinkElement;

		if (themeLinkElement && !themeLinkElement.href.endsWith(styleName)) {
			themeLinkElement.href = styleName;
		} else if (!themeLinkElement) {
			const style = this.document.createElement('link');
			style.id = 'theme-link';
			style.rel = 'stylesheet';
			style.href = `${styleName}`;

			head.appendChild(style);
		}
	}
}
