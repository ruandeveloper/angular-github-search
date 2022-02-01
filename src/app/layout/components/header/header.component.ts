import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services';
import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	faGithub = faGithub;
	currentTheme$?: Observable<'classic' | 'dark'>;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.currentTheme$ = this.themeService.currentTheme;
	}

	changeTheme(currentTheme: 'classic' | 'dark'): void {
		this.themeService.changeTheme(
			currentTheme === 'classic' ? 'dark' : 'classic'
		);
	}
}
