import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { RepositoryCardComponent } from './repository-card.component';

describe('RepositoryCardComponent', () => {
	let component: RepositoryCardComponent;
	let fixture: ComponentFixture<RepositoryCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RepositoryCardComponent],
			providers: [
				{
					provide: MatDialog,
					useValue: jasmine.createSpyObj<MatDialog>('MatDialog', [
						'getDialogById',
						'open'
					])
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RepositoryCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve ser instanciado', () => {
		expect(component).toBeTruthy();
	});
});
