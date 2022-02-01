import { first } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponent } from './action-buttons.component';

describe(`${ActionButtonsComponent.name}`, () => {
	let component: ActionButtonsComponent;
	let fixture: ComponentFixture<ActionButtonsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatButtonModule, FontAwesomeModule],
			declarations: [ActionButtonsComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ActionButtonsComponent);
		component = fixture.componentInstance;
	});

	it('deve emitir evento ao excluir item', (done) => {
		fixture.detectChanges();

		component.removeClicked.pipe(first()).subscribe(() => {
			expect().nothing();
			done();
		});

		component.remove();
	});

	it('deve emitir evento ao favoritar', (done) => {
		fixture.detectChanges();

		component.favoriteChanged.pipe(first()).subscribe((isFavorite) => {
			expect(isFavorite).toBeTrue();
			done();
		});

		component.toggleFavorite();
	});
});
