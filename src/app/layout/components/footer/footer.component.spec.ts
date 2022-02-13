import { ComponentFixture, TestBed } from '@angular/core/testing';
import { queryElementByDataTest } from 'src/app/core/utils';

import { FooterComponent } from './footer.component';

describe(`${FooterComponent.name}`, () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
	});

	it('deve ser instanciado', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('deve exibir o link do perfil do github', () => {
		fixture.detectChanges();

		const linkEl: HTMLLinkElement = queryElementByDataTest(
			fixture,
			'footer-link'
		).nativeElement;

		expect(linkEl.innerText).toContain('@ruandeveloper');
		expect(linkEl.href).toContain('https://github.com/ruandeveloper');
	});
});
