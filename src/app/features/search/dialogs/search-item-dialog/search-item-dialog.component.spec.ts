import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchItemDialogResult } from '../../models';

import { SearchItemDialogComponent } from './search-item-dialog.component';

describe('SearchItemDialogComponent', () => {
	let component: SearchItemDialogComponent;
	let fixture: ComponentFixture<SearchItemDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchItemDialogComponent],
			providers: [
				{
					provide: MatDialogRef,
					useValue: jasmine.createSpyObj<
						MatDialogRef<
							SearchItemDialogComponent,
							SearchItemDialogResult
						>
					>('MatDialogRef', ['close'])
				},
				{
					provide: MAT_DIALOG_DATA,
					useValue: {}
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchItemDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve ser instanciado', () => {
		expect(component).toBeTruthy();
	});

	it('deve fechar o dialog quando remover o item', () => {
		const service = TestBed.inject(MatDialogRef);

		component.onRemoveItem();

		expect(service.close).toHaveBeenCalledWith({ deleteItem: true });
	});
});
