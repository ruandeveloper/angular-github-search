import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
	let service: ThemeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeService);
	});

	it('deve carregar o tema', () => {
		service.changeTheme('dark');

		const link = document.getElementById('theme-link') as HTMLLinkElement;

		expect(link.href.endsWith('dark-theme.css')).toBeTrue();
	});

	it('deve alterar o tema', () => {
		service.changeTheme('dark');
		service.changeTheme('classic');

		const link = document.getElementById('theme-link') as HTMLLinkElement;

		expect(link.href.endsWith('classic-theme.css')).toBeTrue();
	});
});
