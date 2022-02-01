import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ThemeService } from 'src/app/core/services';

describe(`${HeaderComponent.name}`, () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FontAwesomeModule, MatTooltipModule],
			declarations: [HeaderComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve ser instanciado', () => {
		expect(component).toBeTruthy();
	});

	it('deve alterar o tema', () => {
		const themeService = TestBed.inject(ThemeService);
		spyOn(themeService, 'changeTheme');

		component.changeTheme('classic');
		expect(themeService.changeTheme).toHaveBeenCalledWith('dark');

		component.changeTheme('dark');
		expect(themeService.changeTheme).toHaveBeenCalledWith('classic');
	});
});
